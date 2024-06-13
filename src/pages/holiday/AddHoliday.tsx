import { DatePicker, Form, Input, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

import { createHoliday, readHoliday, updateHoliday } from "../../redux/actions/holidayAction";
import { useAppDispatch } from "../../redux/hooks";
import { IHoliday } from "../../types/iHoliday";

export const AddHoliday = ({ handleCancel, record, setSelectRecord, form }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readHoliday());
  }, [dispatch]);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        year: dayjs(record.year),
        title: record.title,
        date: dayjs(record.date),
      });
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    const holiday: IHoliday = {
      title: values.title,
      date: dayjs(values.date).format("YYYY-MM-DD"),
      year: dayjs(values.date).format("YYYY"),
    };
    record ? dispatch(updateHoliday({ ...holiday, _id: record._id })) : dispatch(createHoliday(holiday));
    form.resetFields();
    setSelectRecord(undefined);
    handleCancel();
  };

  return (
    <>
      <Form name="Holiday " onFinish={onFinish} autoComplete="off" form={form}>
        <Typography.Title level={5}>Holiday Title</Typography.Title>
        <Form.Item name="title" rules={[{ required: true, message: "Please Enter Holiday Title!" }]}>
          <Input placeholder="Type your Title" type="text" id="title" name="title" />
        </Form.Item>
        <Typography.Title level={5}> Holiday Date</Typography.Title>
        <Form.Item name="date" rules={[{ required: true, message: "Please Enter Holiday Title!" }]}>
          <DatePicker style={{ width: "100%" }} picker="date" id="date" name="date" />
        </Form.Item>
      </Form>
    </>
  );
};
