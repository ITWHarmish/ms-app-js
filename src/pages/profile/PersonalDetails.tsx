import { Col, Form, Input, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";

import { PHONE_CODE } from "../../util/constants";

type IPropType = {
  values?: any;
  callbackForm?: any;
  callbackValues?: any;
};

const PersonalDetails = ({
  values,
  callbackForm,
  callbackValues,
}: IPropType) => {
  const [form] = Form.useForm();

  const [changed, setChanged] = useState<any>();

  useEffect(() => {
    callbackForm && callbackForm(form);
  }, [callbackForm, form]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        address: values["address.line1"],
        city: values["address.city"],
        state: values["address.state"],
        country: values["address.country"],
        zipCode: values["address.zipCode"],
      });
    }
  }, [values, form]);

  useEffect(() => {
    const data: any = {};
    if (changed) {
      if (changed.firstName) data.firstName = changed.firstName;
      if (changed.lastName) data.lastName = changed.lastName;
      if (changed.phoneNumber) data.phoneNumber = changed.phoneNumber;
      if (changed.email) data.email = changed.email;
      if (changed.address) data["address.line1"] = changed.address;
      if (changed.city) data["address.city"] = changed.city;
      if (changed.state) data["address.state"] = changed.state;
      if (changed.country) data["address.country"] = changed.country;
      if (changed.zipCode) data["address.zipCode"] = changed.zipCode;
      callbackValues(data);
    }
  }, [changed]);

  const phoneCodeSelector = (
    <Form.Item name="phoneCode" noStyle initialValue={"+91"}>
      <Select style={{ width: 70 }}>
        {PHONE_CODE.map((p) => (
          <Select.Option value={p.dial_code} key={p.code}>
            {p.dial_code}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  const handleChange = (changedFields: any) => {
    changedFields.map((field: any) =>
      setChanged({ ...changed, [field.name[0]]: field.value }),
    );
  };

  return (
    <Form
      name="normal_login"
      className="personal-details-form"
      onFieldsChange={handleChange}
      layout="vertical"
      form={form}
      initialValues={values}
    >
      <Space direction="vertical" size={16}>
        <Row gutter={16}>
          <Col md={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col md={12}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input autoComplete="off" addonBefore={phoneCodeSelector} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              name="email"
              label="E-Mail"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="Address">
          <Input autoComplete="off" />
        </Form.Item>

        <Row gutter={16}>
          <Col md={6}>
            <Form.Item name="city" label="City">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item name="state" label="State">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item name="country" label="Country">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item name="zipCode" label="Zip-Code">
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default PersonalDetails;
