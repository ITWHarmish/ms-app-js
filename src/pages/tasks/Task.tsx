import { Button, Input, Select, Space, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";

import SelectSearch from "../../components/custom/SelectSearch";
import PageHeader from "../../components/pageHeader/PageHeader";
import AdminTableActions from "../../components/table/AdminTableActions";
import { useAuthValue } from "../../context/AuthContext";
import { deleteTask } from "../../redux/actions/taskAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITask } from "../../types/iTask";
import { TASK_LABEL, TASK_PRIORITIES, TASK_STATUS } from "../../util/constants";
import { TASK_STATUS_VALUE } from "../../util/enums";
import { socket } from "../../util/lib";
import { API_URL } from "../../util/secrets";
import Assignee from "./columnFormatter/Assignee";
import DeveloperColumnFormatter from "./columnFormatter/Developer";
import DueDate from "./columnFormatter/DueDate";
import StartDate from "./columnFormatter/StartDate";
import StatusColumnFormatter from "./columnFormatter/Status";
import AddNewTaskModal from "./components/AddNewTaskModal";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Task = () => {
  const dispatch = useAppDispatch();

  const { currentUser, isExecutor } = useAuthValue();

  const project = useAppSelector((state) => state.project.project);
  const users = useAppSelector((state) => state.userState.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectRecord, setSelectRecord] = useState<ITask>();
  const [dataSources, setDataSources] = useState<ITask[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [filter, setFilter] = useState({
    search: "",
    assignee: isExecutor ? currentUser.uid : null,
    project: null,
    status: [
      TASK_STATUS_VALUE.BACKLOG,
      TASK_STATUS_VALUE.IN_PROGRESS,
      TASK_STATUS_VALUE.IN_REVIEW,
      TASK_STATUS_VALUE.ON_HOLD,
      TASK_STATUS_VALUE.TODO,
    ],
  });

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/task-paginated?${qs.stringify({ ...getRandomuserParams(tableParams), filter })}`)
      .then((response) => {
        setDataSources(response.data.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.total,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams), filter]);

  useEffect(() => {
    socket.on("task-change", () => fetchData());
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<ITask>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataSources([]);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "tid",
      width: 150,
    },
    {
      title: "Task",
      dataIndex: "title",
      key: "Task",
      render: (text, record) => {
        return (
          <Space>
            <Tag color={TASK_LABEL.find((label) => label.value === record.label).color}>{record.label}</Tag>
            <Typography.Link href={`/task/${record.tid}`}>{text}</Typography.Link>
            {record.priority && (
              <Tooltip title={TASK_PRIORITIES.find((p) => p.value === record.priority).label}>
                <Typography style={{ color: TASK_PRIORITIES.find((p) => p.value === record.priority).color }}>
                  {TASK_PRIORITIES.find((p) => p.value === record.priority).icon}
                </Typography>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
    {
      title: "Assignee",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text, record) => Assignee(text, record, users, dispatch),
      width: 130,
    },
    {
      title: "Start date",
      dataIndex: "createdAt",
      width: 100,
      render: (text) => StartDate(text),
    },
    {
      title: "Due date",
      dataIndex: "dueDate",
      width: 100,
      render: (text, record) => DueDate(text, record, isExecutor, dispatch),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => StatusColumnFormatter(text, record, currentUser, dispatch),
      width: 100,
    },
    {
      title: "Developer",
      dataIndex: "developer",
      key: "developer",
      render: (text, record) => DeveloperColumnFormatter(text, record, users, dispatch),
      width: 130,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text, record) => (
        <AdminTableActions
          handleEdit={() => {
            setSelectRecord(record);
            setIsModalOpen(true);
          }}
          handleDelete={() => {
            dispatch(deleteTask({ id: record._id }));
          }}
        />
      ),
      align: "center",
      width: 100,
    },
  ];

  return (
    <>
      <PageHeader
        title="Tasks"
        right={
          <Space direction="horizontal">
            <Input.Search
              placeholder="Search Task..."
              allowClear
              style={{ minWidth: 250 }}
              onSearch={(value) => setFilter({ ...filter, search: value })}
            />
            <SelectSearch
              style={{ minWidth: 150 }}
              placeholder="Assign to"
              onChange={(value: string) => setFilter({ ...filter, assignee: value })}
              value={filter.assignee}
            >
              {users.map((c) => (
                <Select.Option value={c.id} key={c.id}>
                  {c.firstName + " " + c.lastName}
                </Select.Option>
              ))}
            </SelectSearch>
            <SelectSearch
              style={{ minWidth: 150 }}
              placeholder="Project"
              onChange={(value: string) => setFilter({ ...filter, project: value })}
              value={filter.project}
            >
              {project.map((c) => (
                <Select.Option value={c._id} key={c._id}>
                  {c.name}
                </Select.Option>
              ))}
            </SelectSearch>
            <SelectSearch
              mode="multiple"
              style={{ minWidth: 150 }}
              placeholder="Task Status"
              onChange={(value: TASK_STATUS_VALUE[]) => setFilter({ ...filter, status: value })}
              value={filter.status}
            >
              {TASK_STATUS.map((c) => (
                <Select.Option value={c.value} key={c.value}>
                  {c.label}
                </Select.Option>
              ))}
            </SelectSearch>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              + Create Task
            </Button>
          </Space>
        }
      />
      <Table
        size="small"
        loading={loading}
        columns={columns}
        dataSource={dataSources}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
        rowKey={(record) => record._id as string}
      />
      <AddNewTaskModal
        selectRecord={selectRecord}
        setSelectRecord={(value) => setSelectRecord(value)}
        isModalOpen={isModalOpen}
        setIsModalOpen={(value: boolean) => setIsModalOpen(value)}
      />
    </>
  );
};
export default Task;
