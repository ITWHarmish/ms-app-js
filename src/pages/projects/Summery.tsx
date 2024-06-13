import { Col, DatePicker, Form, Row, Select, Space, Table, Tabs, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { listAllTimelogs } from "../../redux/actions/timelogAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DATE_FORMAT_SHORT } from "../../util/constants";

const { Title } = Typography;
dayjs.extend(localizedFormat);
export const Summery = ({ projectData }: any) => {

  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [projectTimelogs, setProjectTimelogs] = useState<Array<any>>();
  const [projectTasks, setProjectTasks] = useState<Array<any>>();
  const [dev, setDev] = useState<any>();
  const [totalHours, setTotalHours] = useState<number>(null);
  const [filter, setFilter] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const projectState = useAppSelector((state: any) => state.project);
  const taskList = useAppSelector((state) => state.task.task);
  const { timelog, isLoading } = useAppSelector((state: any) => state.timelog);
  const users = useAppSelector((state) => state.userState.user);

  const handleDatePickerChange: any = (values: any) => {
    setFilter({
      startDate: dayjs(values[0]).format("YYYY-MM-DD"),
      endDate: dayjs(values[1]).format("YYYY-MM-DD"),
    });
  };

  useEffect(() => {
    dispatch(listAllTimelogs({ startDate: filter.startDate, endDate: filter.endDate }));
  }, [dispatch, filter]);

  useEffect(() => {
    if (timelog && timelog.length > 0) {
      if (dev) {
        const filtered = timelog.filter((data: any) => data.project && data.project.name === projectData.name);
        const finalFilter = filtered.filter((data: any) => data.userId === dev);
        setProjectTimelogs(finalFilter.length > 0 ? finalFilter : filtered);
      }
      else {
        const filtered = timelog.filter((data: any) => data.project && data.project.name === projectData.name);
        setProjectTimelogs(filtered);
      }
    }
    if (taskList) {
      const filtered = taskList.filter((data: any) => data.project === projectData._id);
      setProjectTasks(filtered);
    }
  }, [timelog, taskList, dev, projectData]);

  useEffect(() => {
    if (projectTimelogs && projectTimelogs.length > 0) {
      const totalTime = projectTimelogs.reduce((acc, item) => {
        const startDate: any = new Date(item.startTime).getTime();
        const endDate: any = new Date(item.endTime).getTime();
        const hours = (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24;
        return acc + hours;
      }, 0);
      setTotalHours(totalTime);
    }
  }, [projectTimelogs]);

  let project: any = null;
  if (projectId) {
    project = projectState.project.find((project: any) => project._id === projectId);
  }
  let tag = { name: "", color: "" };
  switch (project.status) {
    case "1":
      tag = {
        name: "In Progress",
        color: "processing",
      };
      break;
    case "2":
      tag = {
        name: "Completed",
        color: "success",
      };
      break;
    case "3":
      tag = {
        name: "On Hold",
        color: "warning",
      };
      break;
    default:
      tag = {
        name: "Not Started",
        color: "default",
      };
      break;
  }

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      width: "15%",
      render: (_: any, record: any) => {
        const user = users.find((user: any) => user.id === record.userId);
        return user.firstName + " " + user.lastName;
      },
    },
    {
      title: "Date",
      width: "13%",
      render: (_: any, record: any) => {
        const date = new Date(record.date).toISOString().split("T")[0];
        return date;
      },
    },
    {
      title: "Start Time",
      width: "12%",
      render: (_: any, record: any) => dayjs(record.startTime).format("LT"),
    },
    {
      title: "End Time",
      width: "10%",
      render: (_: any, record: any) => dayjs(record.endTime).format("LT"),
    },
    {
      title: "Hours",
      width: "10%",
      render: (_: any, record: any) => {
        const startDate: any = new Date(record.startTime).getTime();
        const endDate: any = new Date(record.endTime).getTime();
        const hours = (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24;
        return hours.toFixed(2);
      },
    },
    {
      title: "Category",
      width: "10%",
      render: (_: any, record: any) => <Typography className="text-capitalize">{record.category}</Typography>,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
  ];

  const taskColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "tid",
      width: "10%",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "Task",
      width: "30%"
    },
    {
      title: "Assignee",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text: any) => {
        const user = users.find((user: any) => user.id === text);
        return user ? user.firstName + " " + user.lastName :
          <Typography.Text type="secondary">Assignee</Typography.Text>;
      },
      width: "15%",
    },
    {
      title: "Start date",
      dataIndex: "createdAt",
      width: "10%",
      render: (text) => dayjs(text).format(DATE_FORMAT_SHORT),
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      width: "10%",
      render: (text) => dayjs(text).format(DATE_FORMAT_SHORT),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Developer",
      dataIndex: "developer",
      key: "developer",
      render: (text: any) => {
        const user = users.find((user: any) => user.id === text);
        return user ? user.firstName + " " + user.lastName :
          <Typography.Text type="secondary">Developer</Typography.Text>;
      },
      width: "15%",
    }
  ];

  return (
    <>
      <Space direction="vertical" size={16}>
        <Row gutter={24}>
          <Col md={24}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="OverView" key="1">
                <Title level={3}> Summery</Title>
                <p dangerouslySetInnerHTML={{ __html: project.description }} />

                <Row gutter={24}>
                  <Col md={6}>Created Date:</Col>
                  <Col md={6}>Due Date:</Col>
                  <Col md={6}>Priority:</Col>
                  <Col md={6}>Status:</Col>
                </Row>
                <Row gutter={24} style={{ marginTop: 5 }}>
                  <Col md={6}>{dayjs(project.createdAt).format("DD-MM-YYYY")}</Col>
                  <Col md={6}>{project.deadline ? dayjs(project.deadline).format("DD-MM-YYYY") : "-"}</Col>
                  <Col md={6}>
                    <Tag color="#f50">{project.priority}</Tag>
                  </Col>
                  <Col md={6}>
                    <Tag color={tag.color}>{tag.name}</Tag>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Task" key="2">
                {projectTasks && projectTasks.length > 0 ?
                  <Table
                    size="small"
                    dataSource={projectTasks}
                    columns={taskColumns}
                    rowClassName="editable-row"
                    rowKey={(record: any) => record._id as string}
                    pagination={false}
                    loading={isLoading}
                  />
                  :
                  <Space>
                    <span>Task not found!</span>
                  </Space>
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab="Timelog" key="3">
                {projectTimelogs && projectTimelogs.length > 0 ?
                  <Space direction="vertical" size='large'>
                    <Space size='large'>
                      <Form name="basic" form={form} autoComplete="off" layout="horizontal" style={{ display: "flex" }}>
                        <Form.Item name="month" style={{ marginRight: 8 }} initialValue={[dayjs().startOf("month"), dayjs()]}>
                          <DatePicker.RangePicker onChange={handleDatePickerChange} allowClear={false} />
                        </Form.Item>
                      </Form>
                      <Select
                        showSearch
                        placeholder="Select Type"
                        style={{ width: 150 }}
                        onChange={(value: any) => setDev(value)}
                        allowClear
                      >
                        {users && users.map((u: any) => (
                          <Select.Option key={u.id} value={u.id}>
                            {u.firstName + " " + u.lastName}
                          </Select.Option>
                        ))}
                      </Select>
                      <Space>
                        <Typography.Text strong>Total Hours:</Typography.Text>
                        <Typography.Text >{totalHours && totalHours.toFixed(2)}</Typography.Text>
                      </Space>
                    </Space>
                    <Table
                      size="small"
                      dataSource={projectTimelogs}
                      columns={columns}
                      rowClassName="editable-row"
                      rowKey={(record: any) => record._id as string}
                      pagination={{
                        defaultPageSize: 20,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "30", "50", "100"],
                      }}
                      loading={isLoading}
                    />
                  </Space>
                  :
                  <Space>
                    <span>No time entries have been logged against this task - Log time on this task</span>
                  </Space>
                }
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Space>
    </>
  );
};
