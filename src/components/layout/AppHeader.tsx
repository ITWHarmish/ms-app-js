import { Avatar, Button, Card, Divider, Dropdown, Form, Input, Modal, Select, Space, Typography } from "antd";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

import { useAuthValue } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { API_URL } from "../../util/secrets";
import AppNavigation from "./AppNavigation";
import { createTeam, readTeam } from "../../redux/actions/teamAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const AppHeader = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const { currentUser, userAccess, updateUserAccess } = useAuthValue();

  const [addTeamModel, setAddTeamModel] = useState<boolean>(false);

  const users = useAppSelector((state) => state.userState.user);
  const team = useAppSelector((state) => state.teams.team);
  const options = [];
  const teamOptions = [];

  const items = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <Space>
            <UserOutlined /> Profile
          </Space>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Typography.Link onClick={() => signOut(auth)}>
          <Space>
            <LogoutOutlined /> Logout
          </Space>
        </Typography.Link>
      ),
    },
  ];

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      axios.get(`${API_URL}/retrievetoken/${currentUser.uid}?for=drive&code=${code}`).then(() => {
        axios
          .get(`${API_URL}/checkaccess/${currentUser.uid}`)
          .then((response) => {
            updateUserAccess(response.data);
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(readTeam());
  }, []);

  const handleConnect = async () => {
    axios.get(`${API_URL}/oauthcallback?for=drive`).then((response) => {
      window.location.href = response.data.url;
    });
  };

  const handleOnCancel = () => {
    setAddTeamModel(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const team = {
      name: values.name,
      section: values.section,
    };
    dispatch(createTeam(team));
    setTimeout(() => {
      dispatch(readTeam());
    }, 500);
    handleOnCancel();
  };

  users.map((item: any) =>
    options.push({
      key: item.id,
      value: item.id,
      label: (
        <>
          <Typography>{`${item.firstName} ${item.lastName}`}</Typography>
        </>
      ),
    }),
  );

  team.map((item: any) =>
    teamOptions.push({
      key: item._id,
      value: item._id,
      label: (
        <>
          <Typography>{item.name}</Typography>
        </>
      ),
    }),
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {/* <img src="/logo.png" alt="Toshal Infotech" className={"logo"} /> */}
        <Select
          placeholder="Select Team"
          style={{ width: 150 }}
          // onChange={(val) => console.log(val)}
          options={teamOptions}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider
                style={{
                  margin: "8px 0",
                }}
              />
              <Space
                style={{
                  padding: "0 8px 4px",
                }}
              >
                <Button type="text" icon={<PlusOutlined />} onClick={() => setAddTeamModel(true)}>
                  Create Team
                </Button>
              </Space>
            </>
          )}
        />
        <div style={{ flex: 1 }}>
          <AppNavigation />
        </div>
      </div>
      <Space>
        {userAccess === null && <Button onClick={handleConnect}>Connect Google</Button>}
        <Dropdown menu={{ items }}>
          <Space>
            <Typography.Text>{currentUser.firstName + " " + currentUser.lastName || currentUser.email}</Typography.Text>
            {currentUser.profileImage ? (
              <Avatar size={40} src={currentUser.profileImage} />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} />
            )}
          </Space>
        </Dropdown>
      </Space>
      <Modal
        title={
          <>
            <div>Create team</div>
            <div style={{ fontSize: 12, color: "rgb(133, 135, 152)" }}>
              Add a new team to manage products and customers.
            </div>
          </>
        }
        open={addTeamModel}
        onCancel={() => handleOnCancel()}
        footer={
          <div style={{ marginRight: "20px" }}>
            <Button key="back" onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Create
            </Button>
          </div>
        }
      >
        <Card bordered={false}>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            initialValues={{ name: "", section: [] }}
          >
            Team Name
            <Form.Item name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
              <Input placeholder="Enter Team Name" />
            </Form.Item>
            Member Section
            <Form.Item name="section" rules={[{ required: true, message: "Please select section!" }]}>
              <Select showSearch placeholder="Select Section" mode="multiple" allowClear options={options} />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default AppHeader;
