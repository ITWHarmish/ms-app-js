import "./user.scss";

import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography
} from "antd";
import { useState } from "react";
import { BsFillGeoAltFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

import {
  AntDesignOutlined,
  DribbbleOutlined,
  FacebookOutlined,
  FileZipOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PictureOutlined,
  TwitterOutlined,
  UserAddOutlined,
  UserOutlined
} from "@ant-design/icons";

import { useAppSelector } from "../../redux/hooks";

const { Panel } = Collapse;

const UserDetails = () => {
  const { userId } = useParams();

  const users = useAppSelector((state) => state.userState.user);

  const [currentUser, setCurrentUser] = useState<any>();

  if (userId && users) {
    const user = users.find((user: any) => user.id === userId);
    setCurrentUser(user);
  }

  return (
    <>
      <div className="div">
        <Card>
          <Row>
            <Col span={3}>
              <Avatar src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg" size={74} />
            </Col>
            <Col span={16}>
              <Typography.Title level={4}>{currentUser.firstName + " " + currentUser.lastName}</Typography.Title>
              <Typography.Text strong type="secondary" style={{ fontSize: 16 }}>
                {currentUser.type}
              </Typography.Text>
              <Space>
                <Typography.Text strong>
                  <BsFillGeoAltFill />
                  {currentUser.address.city}
                </Typography.Text>
              </Space>
            </Col>
            <Col span={2}>
              <Statistic title="Followers" value={"24.1K"} />
            </Col>
            <Col span={2}>
              <Statistic title="Following" value={"1.3K"} />
            </Col>
          </Row>
          <Row>
            <Col span={20}>
              <Space>
                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane tab="Overview" key="1"></Tabs.TabPane>
                  <Tabs.TabPane tab="Activities" key="2"></Tabs.TabPane>
                  <Tabs.TabPane tab="Projects" key="3"></Tabs.TabPane>
                  <Tabs.TabPane tab="Documents" key="4"></Tabs.TabPane>
                </Tabs>
              </Space>
            </Col>
            <Col span={4}>
              <Button type="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="div">
        <Card title="Complete Your Profile">
          <Progress percent={30} />
        </Card>
      </div>
      <div className="div">
        <Card title="Info">
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Name : </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.firstName + " " + currentUser.lastName}</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}> User Id : </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary"> {currentUser.id} </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Email Address : </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary"> {currentUser.email} </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Contact Number : </Typography.Title>
            </Col>

            <Typography.Text type="secondary">{currentUser.phoneNumber}</Typography.Text>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Address : </Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Country : </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.address.country}</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>ZipCode: </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.address.zipCode}</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Line1: </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.address.line1}</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>City: </Typography.Title>
            </Col>
            <Typography.Text type="secondary">{currentUser.address.city}</Typography.Text>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>State: </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.address.state}</Typography.Text>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Typography.Title level={5}>Team: </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.team}</Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Typography.Title level={5}>User Type : </Typography.Title>
            </Col>
            <Col span={6}>
              <Typography.Text type="secondary">{currentUser.type}</Typography.Text>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="div">
        <Card title="Portfolio">
          <Space>
            <GithubOutlined className="userIcon" />
            <LinkedinOutlined className="LinkedinOutlined" />
            <InstagramOutlined className="InstagramOutlined" />
            <FacebookOutlined className="FacebookOutlined" />
            <TwitterOutlined className="TwitterOutlined" />
            <DribbbleOutlined className="DribbbleOutlined" />
          </Space>
        </Card>
      </div>
      <div className="div">
        <Card title="Skills">
          <Space>
            <Tag>
              <Typography.Text strong>HTML</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>CSS</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>JAVASCRIPT</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>REACT JS</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>PHP</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>PYTHON</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>NODE JS</Typography.Text>
            </Tag>
            <Tag>
              <Typography.Text strong>TYPESCRIPT</Typography.Text>
            </Tag>
          </Space>
        </Card>
      </div>
      <div className="div">
        <Card title="Suggestions">
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Esther James"
              description="Frontend Developer"
            />
            <Button className="bt">
              <UserAddOutlined />
            </Button>
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Jacqueline Steve"
              description="UI/UX Designer"
            />
            <Button className="bt">
              <UserAddOutlined />
            </Button>
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="George Whalen"
              description="Backend Developer"
            />
            <Button className="bt">
              <UserAddOutlined />
            </Button>
          </List.Item>
        </Card>
      </div>
      <div className="div">
        <Card title="Popular Posts">
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} icon={<UserOutlined />} />}
              title="Design your apps in your own way"
              description="15 Dec 2021"
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} icon={<UserOutlined />} />}
              title="Smartest Applications for Business"
              description="28 Nov 2021"
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={64} icon={<UserOutlined />} />}
              title="How to get creative in your work"
              description="21 Nov 2021"
            />
          </List.Item>
        </Card>
      </div>
      <div className="div">
        <Card title="About">
          <Typography.Text type="secondary" strong>
            Hi I&rsquo;m Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English
            person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what
            Occidental is European languages are members of the same family. You aiways want to make sure that your
            fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play
            around with the fonts that you already have in the software you&rsquo;re working with reputable font
            websites. This may be the most commonly encountered tip I received from the designers I spoke with. They
            highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.
          </Typography.Text>
          <Row>
            <Col span={12}>
              <Card bordered={false}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Typography.Text strong type="secondary">
                    Designation :
                  </Typography.Text>
                </Space>
                <Typography.Text strong> Lead Designer / Developer</Typography.Text>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Space>
                  <Avatar size="small" icon={<DribbbleOutlined />} />
                  <Typography.Text strong type="secondary">
                    Website :
                  </Typography.Text>
                </Space>
                <Typography.Text strong> www.velzon.com</Typography.Text>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="div">
        <Card
          title="Recent Activity"
          extra={
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Today" key="1"></Tabs.TabPane>
              <Tabs.TabPane tab="Weekly" key="2"></Tabs.TabPane>
              <Tabs.TabPane tab="Monthly" key="3"></Tabs.TabPane>
            </Tabs>
          }
        >
          <Timeline>
            <Timeline.Item dot={<Avatar src="https://joeschmoe.io/api/v1/random" />}>
              <Typography.Text strong>Jacqueline Steve</Typography.Text>
              <Collapse defaultActiveKey={["1"]} bordered={false}>
                <Panel header="We has changed 2 attributes on 05:16PM" key="1">
                  <Typography.Text strong type="secondary">
                    In an awareness campaign, it is vital for people to begin put 2 and 2 together and begin to
                    recognize your cause. Too much or too little spacing, as in the example below, can make things
                    unpleasant for the reader. The goal is to make your text as comfortable to read as possible. A
                    wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which
                    I enjoy with my whole heart.
                  </Typography.Text>
                </Panel>
              </Collapse>
            </Timeline.Item>
            <Timeline.Item dot={<Avatar>M</Avatar>}>
              <Typography.Text strong>Megan Elmore</Typography.Text>
              <Collapse defaultActiveKey={["1"]} bordered={false}>
                <Panel header="We has changed 2 attributes on 05:16PM" key="1">
                  <Row>
                    <Col span={8}>
                      <Card>
                        <List.Item.Meta
                          avatar={<PictureOutlined />}
                          title="Busines Template - Ui/UX design"
                          description="685 KB"
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <List.Item.Meta
                          avatar={<FileZipOutlined />}
                          title="Bank Management System - PSD"
                          description="8.78 MB"
                        />
                      </Card>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Timeline.Item>
            <Timeline.Item dot={<Avatar src="https://joeschmoe.io/api/v1/random" />} color="red">
              <Typography.Text strong> New ticket received</Typography.Text>
              <Space>
                <Typography.Text strong type="secondary">
                  User <Typography.Link>Erica 245 </Typography.Link> submitted a ticket - 02:33PM
                </Typography.Text>
              </Space>
            </Timeline.Item>
            <Timeline.Item dot={<Avatar size="small" icon={<UserOutlined />} />}>
              <Typography.Text strong>Nancy Martino</Typography.Text>
              <Collapse defaultActiveKey={["1"]} bordered={false}>
                <Panel header="Commented on 12:57PM" key="1">
                  <Typography.Text strong type="secondary" italic>
                    <Space>
                      A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring
                      which I enjoy with my whole heart. Each design is a new, unique piece of art birthed into this
                      world, and while you have the opportunity to be creative and make your own style choices.
                    </Space>
                  </Typography.Text>
                </Panel>
              </Collapse>
            </Timeline.Item>
            <Timeline.Item dot={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
              <Typography.Text strong>Lewis Arnold</Typography.Text>
              <Collapse defaultActiveKey={["1"]} bordered={false}>
                <Panel header="Commented on 12:57PM" key="1">
                  <Typography.Text strong type="secondary">
                    <Space>
                      Every team project can have a velzon. Use the velzon to share information with your team to
                      understand and contribute to your project.
                    </Space>
                  </Typography.Text>
                </Panel>
              </Collapse>
            </Timeline.Item>
          </Timeline>
          <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar className="avtar">K</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar className="avtar1" icon={<UserOutlined />} />
            </Tooltip>
            <Avatar className="avtar2" icon={<AntDesignOutlined />} />
          </Avatar.Group>
        </Card>
      </div>
      <div className="div">
        <Card title="Projects">
          <Row>
            <Col span={8}>
              <Card className="card">
                <Space>
                  {" "}
                  <Typography.Title level={5}>
                    {" "}
                    MS App <Tag color="processing">In processing</Tag>{" "}
                  </Typography.Title>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Last Update:
                  </Typography.Text>
                  <Typography.Text strong> 4 hr Ago</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Members:{" "}
                  </Typography.Text>
                  <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar className="avtar">M</Avatar>

                    <Avatar className="avtar2" icon={<AntDesignOutlined />} />
                  </Avatar.Group>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="card">
                <Space>
                  {" "}
                  <Typography.Title level={5}>
                    {" "}
                    Toshal OMS <Tag color="warning"> Not Started</Tag>
                  </Typography.Title>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Last Update:
                  </Typography.Text>
                  <Typography.Text strong> 6 hr Ago</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Members:{" "}
                  </Typography.Text>
                  <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar className="avtar">M</Avatar>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar className="avtar1" icon={<UserOutlined />} />
                    </Tooltip>
                    <Avatar className="avtartwo" icon={<AntDesignOutlined />} />
                  </Avatar.Group>
                </Space>
              </Card>
            </Col>
            <Col span={8}>
              <Card className="card">
                <Space>
                  <Typography.Title level={5}>
                    {" "}
                    BJP APP <Tag color="success">Completed</Tag>
                  </Typography.Title>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Last Update:
                  </Typography.Text>
                  <Typography.Text strong> 2 hr Ago</Typography.Text>
                </Space>
                <Space>
                  <Typography.Text strong type="secondary">
                    Members:{" "}
                  </Typography.Text>
                  <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar className="avtar">M</Avatar>
                  </Avatar.Group>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};
export default UserDetails;
