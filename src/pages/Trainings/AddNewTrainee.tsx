import { useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SelectSearch from "../../components/custom/SelectSearch";
import { ITrainingList } from "../../types/iTrainingList";
import { createTrainingList, updateTrainingList } from "../../redux/actions/trainingListAction";

dayjs.extend(localizedFormat);

const AddNewTrainee = ({ handleOnCancel, selectedRecord, form }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (selectedRecord) {
      form.setFieldsValue({
        startDate: dayjs(selectedRecord.startDate),
        endDate: dayjs(selectedRecord.endDate),
        fname: selectedRecord.firstName,
        lname: selectedRecord.lastName,
        assigned: selectedRecord.mentorName,
        type: "",
        College: "",
      });
    }
  }, [form, selectedRecord]);

  const finishHandler = async (values: any) => {
    const traineeData: ITrainingList = {
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
      firstName: values.fname,
      lastName: values.lname,
      mentorName: values.assigned,
      type: "",
      College: "",
    };
    selectedRecord
      ? dispatch(updateTrainingList({ ...traineeData, _id: selectedRecord._id }))
      : dispatch(createTrainingList(traineeData));
    handleOnCancel();
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={finishHandler} layout="vertical">
      <Row>
        <Col span={11} style={{ marginBottom: -17 }}>
          <Form.Item label="First Name" name="fname" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={11} offset={2} style={{ marginBottom: -17 }}>
          <Form.Item label="Last Name" name="lname" rules={[{ required: true, message: "Required" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginBottom: -17 }}>
          <Form.Item name="assigned" label="Assign To" rules={[{ required: true, message: "Required" }]}>
            <SelectSearch>
              {users &&
                users.map((user: any, index) => (
                  <Select.Option value={user.id} key={index}>
                    {`${user.firstName} ${user.lastName}`}
                  </Select.Option>
                ))}
            </SelectSearch>
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginBottom: -17 }}>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker style={{ width: 470 }} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginBottom: -17 }}>
          <Form.Item label="End Date" name="endDate">
            <DatePicker style={{ width: 470 }} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginBottom: -17 }}>
          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginBottom: -17 }}>
          <Form.Item label="College" name="college">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={16} style={{ marginTop: 7 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
            {selectedRecord ? "Update" : "Create"}
          </Button>
          <Button type="primary" ghost onClick={onReset}>
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewTrainee;
