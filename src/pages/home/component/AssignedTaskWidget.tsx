import { Card, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import { useAuthValue } from "../../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TASK_PRIORITIES } from "../../../util/constants";
import { TASK_STATUS_VALUE } from "../../../util/enums";
import StatusColumnFormatter from "../../tasks/columnFormatter/Status";

const AssignedTaskWidget = () => {
  const dispatch = useAppDispatch();

  const { currentUser } = useAuthValue();

  const taskList = useAppSelector((state) => state.task.task);
  const taskLoading = useAppSelector((state) => state.task.isLoading);

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
            <Typography.Link href={`/task/${record.tid}`}>{text}</Typography.Link>
            {record.priority && (
              <Tag
                color={TASK_PRIORITIES.find((p) => p.value === record.priority).color}
                style={{ width: "100%", textAlign: "center" }}
              >
                {TASK_PRIORITIES.find((p) => p.value === record.priority).label}
              </Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (text, record) => StatusColumnFormatter(text, record, currentUser, dispatch),
      width: 100,
    },
  ];
  const dataSources = taskList
    .filter(
      (task) =>
        task.assignedTo === currentUser.uid &&
        task.status != TASK_STATUS_VALUE.CANCELED &&
        task.status != TASK_STATUS_VALUE.DONE,
    )
    .sort((a, b) => {
      let x = a.status.toLowerCase();
      let y = b.status.toLowerCase();
      if (x < y) return 1;
      if (x > y) return -1;
      return 0;
    });

  return (
    <Card title="My Open Tasks">
      <Table
        columns={columns}
        dataSource={dataSources}
        loading={taskLoading}
        size="small"
        rowKey={(record) => record._id as string}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10"],
        }}
      />
    </Card>
  );
};

export default AssignedTaskWidget;
