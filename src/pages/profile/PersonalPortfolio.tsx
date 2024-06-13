import { Avatar, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";

import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined
} from "@ant-design/icons";

type IPropType = {
  values?: any;
  callbackForm?: any;
  callbackValues?: any;
};

const PersonalPortfolio = ({ values, callbackForm, callbackValues }: IPropType) => {
  const [form] = Form.useForm();
  const [changed, setChanged] = useState<any>();

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        github: values.portfolio?.github,
        linkedin: values.portfolio?.linkedin,
        instagram: values.portfolio?.instagram,
        facebook: values.portfolio?.facebook,
        twitter: values.portfolio?.twitter,
      });
    }
  }, [values, form]);

  useEffect(() => {
    const data: any = {};
    if (changed) {
      if (changed.github) data["portfolio.github"] = changed.github;
      if (changed.linkedin) data["portfolio.linkedin"] = changed.linkedin;
      if (changed.instagram) data["portfolio.instagram"] = changed.instagram;
      if (changed.facebook) data["portfolio.facebook"] = changed.facebook;
      if (changed.twitter) data["portfolio.twitter"] = changed.twitter;
      callbackValues(data);
    }
  }, [changed]);

  const handleChange = (changedFields: any) => {
    changedFields.map((field: any) => setChanged({ ...changed, [field.name[0]]: field.value }));
  };

  return (
    <Card title={<Typography.Text>Portfolio</Typography.Text>}>
      <Form
        className="personal-details-form"
        layout="vertical"
        initialValues={values}
        form={form}
        onFieldsChange={handleChange}
      >
        <Space direction="vertical" size={16}>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col>
              <Avatar icon={<GithubOutlined />} />
            </Col>
            <Col span={20}>
              <Form.Item name="github">
                <Input placeholder="Github" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col>
              <Avatar icon={<LinkedinOutlined />} />
            </Col>
            <Col span={20}>
              <Form.Item name="linkedin">
                <Input placeholder="LinkedIn" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col>
              <Avatar icon={<InstagramOutlined />} />
            </Col>
            <Col span={20}>
              <Form.Item name="instagram">
                <Input placeholder="Instagram" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col>
              <Avatar icon={<FacebookOutlined />} />
            </Col>
            <Col span={20}>
              <Form.Item name="facebook">
                <Input placeholder="Facebook" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8} style={{ alignItems: "center" }}>
            <Col>
              <Avatar icon={<TwitterOutlined />} />
            </Col>
            <Col span={20}>
              <Form.Item name="twitter">
                <Input placeholder="Twitter" />
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
    </Card>
  );
};

export default PersonalPortfolio;
