import "./profile.scss";
import {
  Avatar,
  Button,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Spin,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import {
  EnvironmentOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();

  return (
    <>
      {currentUser ? (
        <>
          <Row gutter={[16, 16]} className="container-image">
            <Col span={21}>
              <Space size={30} align="start">
                <Space>
                  {currentUser.profileImage ? (
                    <Avatar size={108} src={currentUser.profileImage && currentUser.profileImage} />
                  ) : (
                    ""
                  )}
                </Space>
                <Space direction="vertical" size={0}>
                  <Typography.Title level={2} className="profile-username" style={{ marginTop: 0 }}>
                    {currentUser.firstName} {currentUser.lastName}
                  </Typography.Title>
                  <div style={{ marginTop: -17 }}>
                    <Typography.Text>
                      {currentUser.type && currentUser.type.charAt(0).toUpperCase() +
                        currentUser.type.slice(1)}
                    </Typography.Text>
                  </div>
                  <Space style={{ marginTop: 10 }} size={20}>
                    <Space size={4}>
                      <EnvironmentOutlined />
                      <Typography.Text>
                        {currentUser.address && currentUser.address.country},&nbsp;
                        {currentUser.address && currentUser.address.state}
                      </Typography.Text>
                    </Space>
                    <Space size={4}>
                      <UserOutlined />
                      <Typography.Text>
                        {currentUser.designation && currentUser.designation}
                      </Typography.Text>
                    </Space>
                  </Space>
                </Space>
              </Space>
            </Col>
            <Col span={3} style={{ textAlign: "right" }}>
              <Button
                style={{ marginLeft: "auto" }}
                type="primary"
                onClick={() => navigate("/profile-edit")}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Overview" key="1">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Space direction="vertical" size={15}>
                    <Card title=" Complete Your Profile">
                      <Progress percent={30} />
                    </Card>
                    <Card title="Skills">
                      <Tag>UI/UX</Tag>
                      <Tag>Web Development</Tag>
                      <Tag>Dev ops</Tag>
                      <Tag>Management</Tag>
                    </Card>
                    <Card title="Portfolio">
                      <Space size={20}>
                        <Avatar icon={<TwitterOutlined />} />
                        <Avatar icon={<FacebookOutlined />} />
                        <Avatar icon={<LinkedinOutlined />} />
                        <Avatar icon={<InstagramOutlined />} />
                        <Avatar icon={<GithubOutlined />} />
                      </Space>
                    </Card>
                  </Space>
                </Col>
                <Col span={16}>
                  <Space direction="vertical" size={15}>
                    <Card title="Information">
                      <Space size={13} direction="vertical">
                        <Space align="start">
                          <Typography.Text strong>Full Name :</Typography.Text>
                          <Typography.Text>
                            {currentUser.firstName} {currentUser.lastName}
                          </Typography.Text>
                        </Space>
                        <Space align="start">
                          <Typography.Text strong>Mobile :</Typography.Text>
                          <Typography.Text>
                            {currentUser.phoneNumber && currentUser.phoneNumber}
                          </Typography.Text>
                        </Space>
                        <Space align="start">
                          <Typography.Text strong>E-mail :</Typography.Text>
                          <Typography.Text>
                            {currentUser.email}
                          </Typography.Text>
                        </Space>
                        <Space align="start">
                          <Typography.Text strong>Location :</Typography.Text>
                          <Typography.Text>
                            {currentUser.address && currentUser.address.state}
                          </Typography.Text>
                        </Space>
                        <Space align="start">
                          <Typography.Text strong>
                            Joining Date :
                          </Typography.Text>
                          <Typography.Text>
                            {currentUser.joiningDate && currentUser.joiningDate.slice(0, 10)}
                          </Typography.Text>
                        </Space>
                      </Space>
                    </Card>
                  </Space>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Projects" key="2">
              Coming Soon...
            </Tabs.TabPane>
            <Tabs.TabPane tab="Documents" key="3">
              Coming Soon...
            </Tabs.TabPane>
          </Tabs>
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Profile;
