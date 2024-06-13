import { Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from "antd";
import dayjs from "dayjs";

import "./calender.scss";
import Editor from "../Editor/Editor";

const EventForm = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const event = {
      title: values.name,
      date: dayjs(values.date).format(),
      startTime: dayjs(values.time[0]).format(),
      endTime: dayjs(values.time[1]).format(),
      description: values.description,
    };
    console.log("event", event);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        onFinish={handleFinish}
        autoComplete="off"
        form={form}
        className="formStyle"
      >
        <Form.Item name="type" label="Event Type" rules={[{ required: true, message: "Event Type is Required" }]}>
          <Select showSearch placeholder="Select Type">
            <Select.Option value="Type One">Type One</Select.Option>
            <Select.Option value="Type Two">Type Two</Select.Option>
            <Select.Option value="Type Three">Type Three</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Event Name" name="name" rules={[{ required: true, message: "Event Name is Required" }]}>
          <Input type="text" id="name" name="name" />
        </Form.Item>
        <Form.Item label="Event Date" name="date" rules={[{ required: true, message: "Please select Date" }]}>
          <DatePicker placeholder="select date" className="width100" format={"DD-MM-YYYY"} />
        </Form.Item>
        <Form.Item name="time" label="Event Time" rules={[{ required: true, message: "Please select Time" }]}>
          <TimePicker.RangePicker use12Hours format="HH:mm" className="width100" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Editor
            handleChange={(data: string) => {
              form.setFieldValue("description", data);
            }}
          />
        </Form.Item>
        <Row>
          <Col offset={16} span={4}>
            <Button type="primary" ghost onClick={onReset}>
              Reset
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EventForm;
