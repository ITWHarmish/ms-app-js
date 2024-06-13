import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { iLogin } from "../../types/iAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "./toshal_logo.png";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = ({ email, password }: iLogin) => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/");
      message.success("Login Successful!");
    });
  };

  return (
    <div>
      <div className="bg-img">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>
      <div className="loginForm-Wrapper">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="container">
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              email: "",
              password: "",
            }}
          >
            <Form.Item
              name="email"
              label="E-Mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="E-Mail"
                size="large"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              className="form-item"
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
                autoComplete="off"
              />
            </Form.Item>
            {/* <Form.Item>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Form.Item> */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
            {/* <Form.Item>
              Don't Have an account? &nbsp;
              <Link to="/registration">Sign Up</Link>
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
