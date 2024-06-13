import { Card, Checkbox, Col, Row, Space, Spin, Tabs, Tag, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { LeftCircleOutlined } from "@ant-design/icons";

import PageHeader from "../../components/pageHeader/PageHeader";
import AdminTableActions from "../../components/table/AdminTableActions";
import { useAuthValue } from "../../context/AuthContext";
import { deleteTask } from "../../redux/actions/taskAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TASK_LABEL, TASK_PRIORITIES } from "../../util/constants";
import { API_URL } from "../../util/secrets";
import Assignee from "./columnFormatter/Assignee";
import DeveloperColumnFormatter from "./columnFormatter/Developer";
import DueDate from "./columnFormatter/DueDate";
import StatusColumnFormatter from "./columnFormatter/Status";
import AddNewTaskModal from "./components/AddNewTaskModal";
import TaskCommentAddForm from "./components/TaskCommentAddForm";
import TaskCommentItem from "./components/TaskCommentItem";
import { TaskTimelog } from "./components/TaskTimelog";

dayjs.extend(localizedFormat);

const TaskDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAuthValue();
  const { taskId } = useParams();

  const { project } = useAppSelector((state) => state.project);
  const users = useAppSelector((state) => state.userState.user);

  const [taskDetail, setTaskDetail] = useState<any>();
  const [updateTaskModal, setUpdateTaskModal] = useState(false);

  const fetchTask = () => {
    axios.get(`${API_URL}/task?tid=${taskId}`).then((response) => {
      setTaskDetail(response.data);
    });
  };

  useEffect(() => {
    fetchTask();
  }, [taskId, updateTaskModal]);

  return (
    <>
      <PageHeader
        title={
          <Space>
            <Link to="/task">
              <LeftCircleOutlined />
            </Link>
            Task Details
          </Space>
        }
        right={
          <AdminTableActions
            type="button"
            handleEdit={() => setUpdateTaskModal(true)}
            handleDelete={() => {
              dispatch(deleteTask({ id: taskDetail._id }));
              navigate("/task", { replace: true });
            }}
          />
        }
      />
      {!taskDetail ? (
        <Spin />
      ) : (
        <>
          <Row gutter={16}>
            <Col span={6}>
              <Card size="small">
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>ID</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Typography.Paragraph>{taskDetail.tid}</Typography.Paragraph>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Status</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Space>{StatusColumnFormatter("", taskDetail, currentUser, dispatch)}</Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Developer</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Space>
                      {DeveloperColumnFormatter(taskDetail.developer, taskDetail, users, dispatch)}
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Project</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    {project.map(
                      (item: any) =>
                        taskDetail.project === item._id && (
                          <Typography.Paragraph key={item._id}>{item.name}</Typography.Paragraph>
                        ),
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Priority</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Space>
                      {taskDetail.priority && (
                        <Tag
                          color={TASK_PRIORITIES.find((p) => p.value === taskDetail.priority).color}
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          {TASK_PRIORITIES.find((p) => p.value === taskDetail.priority).label}
                        </Tag>
                      )}
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Label</Typography.Paragraph>
                  </Col>
                  <Col span={16}>
                    <Tag color={TASK_LABEL.find((label) => label.value === taskDetail.label).color}>
                      {TASK_LABEL.find((label) => label.value === taskDetail.label).label}
                    </Tag>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Due Date</Typography.Paragraph>
                  </Col>
                  <Col span={16}>{DueDate("", taskDetail, users, dispatch)}</Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Typography.Paragraph strong>Assigned To</Typography.Paragraph>
                  </Col>
                  <Col span={16}>{Assignee("", taskDetail, users, dispatch)}</Col>
                </Row>
              </Card>
            </Col>
            <Col md={18}>
              <Space direction="vertical" size={16}>
                <Card title={taskDetail.title} style={{ height: taskDetail.description ? "100%" : 277 }}>
                  {taskDetail.description && <div dangerouslySetInnerHTML={{ __html: taskDetail.description }} />}
                </Card>
              </Space>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Col md={24}>
              <Card>
                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: "-16px" }}
                  items={[
                    {
                      key: "comments",
                      label: "Comments",
                      children: (
                        <>
                          {taskDetail.comments?.map((item) => (
                            <TaskCommentItem key={item._id} item={item} />
                          ))}
                          <TaskCommentAddForm taskId={taskDetail._id} />
                        </>
                      ),
                    },
                    // {
                    //   key: "2",
                    //   label: "History",
                    //   children: "Content of Tab Pane 2",
                    // },
                    {
                      key: "timelog",
                      label: "Timelog",
                      children: <TaskTimelog timelog={taskDetail.timelog} />,
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
      <AddNewTaskModal
        selectRecord={taskDetail}
        setSelectRecord={(value) => setTaskDetail(value)}
        isModalOpen={updateTaskModal}
        setIsModalOpen={(value: boolean) => setUpdateTaskModal(value)}
      />
    </>
  );
};

export default TaskDetails;
