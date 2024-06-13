import { Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import Editor from "../../components/Editor/Editor";
import { useAuthValue } from "../../context/AuthContext";
import { createLeave, updateLeave } from "../../redux/actions/leaveAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IApplyLeave } from "../../types/iApplyLeave";
import { LEAVE_TYPE } from "../../util/constants";

dayjs.extend(localizedFormat);

const leavetype: any = [
  { value: LEAVE_TYPE.PAID_LEAVE, label: "Paid Leave" },
  { value: LEAVE_TYPE.SICK_LEAVE, label: "Sick Leave" },
  { value: LEAVE_TYPE.CASUAL_LEAVE, label: "Casual Leave" },
  { value: LEAVE_TYPE.HALF_LEAVE, label: "Half Leave" },
];

const ApplyLeave = ({ form, selectRecord, setSelectRecord, handleCancel }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthValue();
  const leaveState = useAppSelector((state: any) => state.leave.leave);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ckData, setCKData] = useState<any>();

  useEffect(() => {
    if (leaveState && selectRecord) {
      const leave = leaveState.find((leave: any) => leave._id === selectRecord._id);
      setCKData(leave);
    }
  }, [leaveState, selectRecord]);

  useEffect(() => {
    if (selectRecord) {
      form.setFieldsValue({
        from: dayjs(selectRecord.from),
        to: dayjs(selectRecord.to),
        noOfDays: selectRecord.noOfDays,
        leavetype: selectRecord.leavetype,
      });
    }
    
  }, [selectRecord]);

  useEffect(() => {
    const dateDifference = startDate && endDate ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 : null;
    if (!selectRecord) {
      form.setFieldValue("noOfDays", dateDifference);
    }
    if (selectRecord && startDate && endDate) {
      form.setFieldValue("noOfDays", dateDifference);
    }
  }, [selectRecord, startDate, endDate]);

  const finishHandler = async (values: any) => {
    const leaveApp: IApplyLeave = {
      userId: currentUser.uid,
      from: dayjs(values.from).format(),
      to: dayjs(values.to).format(),
      noOfDays: values.noOfDays,
      leavetype: values.leavetype,
      reason: values.reason,
    };
    selectRecord ? dispatch(updateLeave({ ...leaveApp, _id: selectRecord._id })) : dispatch(createLeave(leaveApp));
    form.resetFields();
    setSelectRecord(undefined);
    handleCancel();
  };

  return (
    <>
      <Form form={form} onFinish={finishHandler} layout="vertical" style={{ paddingTop: 10 }}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="From" name="from" rules={[{ required: true, message: "Required" }]}>
              <DatePicker onChange={(date) => setStartDate(date)} style={{ width: 240 }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="To" name="to" rules={[{ required: true, message: "Required" }]}>
              <DatePicker onChange={(date) => setEndDate(date)} style={{ width: 240 }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Space align="start" size={10} direction="vertical">
              <Form.Item label="No .of days" name="noOfDays">
                <Input disabled style={{ width: 240 }} />
              </Form.Item>
            </Space>
          </Col>
          <Col span={6}>
            <Form.Item name="leavetype" label="Leave Type" rules={[{ required: true, message: "Required" }]}>
              <Select
                showSearch
                placeholder="Select Type"
                style={{ width: 240 }}
                filterOption={(input, option) =>
                  //eslint-disable-next-line
                  (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
              >
                {leavetype.map((c: { value: string; label: string }) => (
                  <Select.Option key={c.value} value={c.value}>
                    {c.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="reason" label="Reason" rules={[{ required: true, message: "Required" }]}>
              <Editor
                data={selectRecord ? ckData?.reason : ""}
                handleChange={(data: string) => {
                  form.setFieldValue("reason", data);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ApplyLeave;
