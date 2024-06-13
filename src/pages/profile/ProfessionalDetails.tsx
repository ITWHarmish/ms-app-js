import { Button, Col, DatePicker, Form, Input, Row, Space } from "antd";
import { useEffect, useState } from "react";

type IPropType = {
  values?: any;
  callbackForm?: any;
  callbackValues?: any;
};

const ProfessionalDetails = ({ values, callbackForm, callbackValues }: IPropType) => {
  const [form] = Form.useForm();
  const [changed, setChanged] = useState<any>();

  useEffect(() => {
    const data: any = {};
    if (changed) {
      if (changed.company) data["experience.company"] = changed.company;
      if (changed.stratYear) data["experience.stratYear"] = changed.stratYear;
      if (changed.endYear) data["experience.endYear"] = changed.endYear;
      if (changed.job) data["experience.job"] = changed.job;
      if (changed.jobDesc) data["experience.jobDesc"] = changed.jobDesc;
      callbackValues(data);
    }
  }, [changed]);

  const handleChange = (changedFields: any) => {
    changedFields.map((field: any) => setChanged({ ...changed, [field.name[0]]: field.value }));
  };

  return (
    <Form
      className="Professional-details-form"
      layout="vertical"
      initialValues={values}
      form={form}
      onFieldsChange={handleChange}
      disabled={true}
    >
      <Space direction="vertical" size={16}>
        <Form.Item name="job" label="Job Title">
          <Input autoComplete="off" />
        </Form.Item>
        <Row gutter={16}>
          <Col md={12}>
            <Form.Item name="company" label="Company Name">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item name="stratYear" label="Experience From">
              <DatePicker picker="year" style={{ width: "100%" }} clearIcon={false} />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item name="endYear" label="Experience to">
              <DatePicker picker="year" style={{ width: "100%" }} clearIcon={false} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="jobDesc" label="Job Description">
          <Input.TextArea autoSize={true} autoComplete="off" />
        </Form.Item>
        <Space style={{ justifyContent: "flex-end" }}>
          <Button type="primary">Update</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
        <Space>
          <Button type="primary">Add New</Button>
        </Space>
      </Space>
    </Form>
  );
};

export default ProfessionalDetails;
