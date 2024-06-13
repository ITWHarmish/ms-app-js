import { Col, DatePicker, Form, Input, Radio, RadioChangeEvent, Row, Space } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import { DATE_FORMAT } from "../../util/constants";

type IPropType = {
  values?: any;
  callbackForm?: any;
  callbackValues?: any;
};

dayjs.extend(localizedFormat);

const CompanyDetails = ({ values, callbackForm, callbackValues }: IPropType) => {
  const [office, setOffice] = useState<string>("");
  const [changed, setChanged] = useState<any>();

  const [form] = Form.useForm();

  useEffect(() => {
    callbackForm && callbackForm(form);
  }, [callbackForm, form]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        joiningDate: dayjs(values.joiningDate),
        designation: values.designation,
        team: values.team,
        officeLocation: values.officeLocation,
      });
    }
  }, [values, form]);

  useEffect(() => {
    if (changed) {
      const data = { ...changed };
      if (changed.joiningDate) data.joiningDate = dayjs(changed.joiningDate).format();
      callbackValues(data);
    }
  }, [changed]);

  const officeLocation = [
    { label: "Bhatar", value: "bhatar" },
    { label: "Varachha", value: "varachha" },
    { label: "Pune", value: "pune" },
    { label: "Work From Home", value: "wfh" },
  ];

  const handleChange = (changedFields) => {
    changedFields.map((field) => setChanged({ ...changed, [field.name[0]]: field.value }));
  };

  return (
    <Form
      className="personal-details-form"
      layout="vertical"
      form={form}
      onFieldsChange={handleChange}
    >
      <Space direction="vertical" size={16}>
        <Row gutter={16}>
          <Col md={8}>
            <Form.Item name="joiningDate" label="Joining Date" rules={[{ required: true, message: "Required" }]}>
              <DatePicker autoComplete="off" style={{ width: "100%" }} clearIcon={false} format={DATE_FORMAT} />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item name="designation" label="Designation" rules={[{ required: true, message: "Required" }]}>
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
          <Col md={8}>
            <Form.Item name="team" label="Team (Team Learder)" rules={[{ required: true, message: "Required" }]}>
              <Input autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="officeLocation" label="Office Location" rules={[{ required: true, message: "Required" }]}>
          <Radio.Group
            options={officeLocation}
            onChange={({ target: { value } }: RadioChangeEvent) => setOffice(value)}
            value={office}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Space>
    </Form>
  );
};

export default CompanyDetails;
