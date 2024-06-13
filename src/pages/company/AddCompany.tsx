import { Card, Form, Input } from "antd";
import { useEffect } from "react";

import { createCompany, readCompany, updateCompany } from "../../redux/actions/companyAction";
import { useAppDispatch } from "../../redux/hooks";
import { ICompany } from "../../types/iCompany";

const AddCompany = ({ handleCancel, record, setSelectRecord, form }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readCompany());
  }, [dispatch]);

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.name,
        owner: record.owner,
        industryType: record.industryType,
        location: record.location,
        webiste: record.webiste,
        email: record.contact?.email,
      });
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    const company: ICompany = {
      name: values.name,
      owner: values.owner,
      industryType: values.industryType,
      location: values.location,
      webiste: values.webiste,
      contact: { email: values.email },
    };
    record ? dispatch(updateCompany({ ...company, _id: record._id })) : dispatch(createCompany(company));

    form.resetFields();
    setSelectRecord(undefined);
    handleCancel();
  };
  return (
    <>
      <Card bordered={false}>
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          Name
          <Form.Item name="name" rules={[{ required: true, message: "Please input your Name!" }]}>
            <Input placeholder="Type your Name" type="text" id="company" name="company" />
          </Form.Item>
          Owner
          <Form.Item name="owner" rules={[{ required: true, message: "Please input your Owner!" }]}>
            <Input placeholder="Enter Your owner" type="text" id="company" name="company" />
          </Form.Item>
          Industry Type
          <Form.Item name="industryType" rules={[{ required: true, message: "Please input your Industry Type!" }]}>
            <Input placeholder="Enter your industry type" type="text" id="company" name="company" />
          </Form.Item>
          Location{" "}
          <Form.Item name="location" rules={[{ required: true, message: "Please input your Location!" }]}>
            <Input placeholder="Enter location" type="text" id="company" name="company" />
          </Form.Item>
          Website
          <Form.Item name="webiste" rules={[{ required: true, message: "Please input your Website!" }]}>
            <Input placeholder="Enter website" type="text" id="company" name="company" />
          </Form.Item>
          Email
          <Form.Item name="email" rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input placeholder="Enter Contact email" type="text" id="email" name="email" />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default AddCompany;
