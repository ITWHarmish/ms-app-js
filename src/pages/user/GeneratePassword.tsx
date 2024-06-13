import { Form, Input } from "antd";
import { useEffect } from "react";

type IPropType = {
  values?: any;
  callbackForm?: any;
  callbackValues?: any;
};

const GeneratePassword = ({
  values,
  callbackForm,
  callbackValues,
}: IPropType) => {
  const [form] = Form.useForm();

  useEffect(() => {
    callbackForm && callbackForm(form);
  }, [callbackForm, form]);

  const handleChange = (event: any) => {
    const data = { ...values, password: event.target.value };
    callbackValues(data);
  };

  return (
    <Form initialValues={values} autoComplete="off" form={form}>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Password is required!",
          },
        ]}
      >
        <Input
          type="password"
          autoComplete="new-password"
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
};

export default GeneratePassword;
