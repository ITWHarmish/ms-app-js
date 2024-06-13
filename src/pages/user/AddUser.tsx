import { useState } from "react";
import { Button, Divider, Modal, Steps } from "antd";
import PersonalDetails from "../profile/PersonalDetails";
import CompanyDetails from "../profile/CompanyDetails";
import GeneratePassword from "./GeneratePassword";
import { createUser } from "../../services/auth.crud";

const AddUser = ({ visible, setModalVisible }: any) => {
  const [current, setCurrent] = useState<number>(0);
  const [formPersonalDetails, setFormPersonalDetails] = useState<any>();
  const [formCompanyDetails, setFormCompanyDetails] = useState<any>();
  const [formGeneratePassword, setFormGeneratePassword] = useState<any>();
  const [formData, setFormData] = useState<any>();

  const steps = [
    {
      title: "Personal Detail",
      content: (
        <PersonalDetails
          values={formData}
          callbackForm={(form: any) => setFormPersonalDetails(form)}
          callbackValues={(values: any) =>
            setFormData({ ...formData, ...values })
          }
        />
      ),
    },
    {
      title: "Role In Company",
      content: (
        <CompanyDetails
          values={formData}
          callbackForm={(form: any) => setFormCompanyDetails(form)}
          callbackValues={(values: any) =>
            setFormData({ ...formData, ...values })
          }
        />
      ),
    },
    {
      title: "Last",
      content: (
        <GeneratePassword
          values={formData}
          callbackForm={(form: any) => setFormGeneratePassword(form)}
          callbackValues={(values: any) =>
            setFormData({ ...formData, ...values })
          }
        />
      ),
    },
  ];

  const next = () => {
    let form: any;
    if (current === 0) form = formPersonalDetails;
    if (current === 1) form = formCompanyDetails;

    form
      .validateFields()
      .then(() => {
        form.submit();
        setCurrent(current + 1);
      })
      .catch((errors: any) => {
        console.error("error", errors);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = () => {
    formGeneratePassword.validateFields().then(async () => {
      await formGeneratePassword.submit();
      await createUser(formData);
    });
  };

  const handleClose = () => {
    formPersonalDetails && formPersonalDetails.resetFields();
    formCompanyDetails && formCompanyDetails.resetFields();
    formGeneratePassword && formGeneratePassword.resetFields();
    setModalVisible(false);
    setCurrent(0);
  };

  return (
    <Modal
      title="Add New User"
      open={visible}
      onOk={() => setModalVisible(false)}
      onCancel={handleClose}
      footer={null}
      width={1000}
      style={{ top: 20 }}
    >
      <Steps current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ padding: "24px 0" }}>
        {steps[current].content}
      </div>
      <Divider />
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default AddUser;
