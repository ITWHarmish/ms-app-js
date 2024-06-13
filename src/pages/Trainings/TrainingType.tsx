import { Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import PageHeader from "../../components/pageHeader/PageHeader";
import TableActions from "../../components/table/TableActions";
import ActiveInActive from "./columnFormatter/ActiveInActive";

const dataSource = [
  {
    id: "1",
    type: "Git Training",
    description: "Lorem ipsum dollar",
    status: "0",
  },
  {
    id: "2",
    type: "Html Training",
    description: "Lorem ipsum dollar",
    status: "1",
  },
  {
    id: "3",
    type: "Node Training",
    description: "Lorem ipsum dollar",
    status: "1",
  },
  {
    id: "4",
    type: "Swift Training",
    description: "Lorem ipsum dollar",
    status: "1",
  },
];

const TrainingType = () => {
  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: 10,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description - b.description,
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => ActiveInActive(text, record),
      sorter: (a, b) => a.status - b.status,
      width: 50,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <TableActions
          handleEdit={() => {
            // setSelectRecord(record);
            // setIsModalOpen(true);
          }}
          handleDelete={() => {
            // dispatch(deleteTask({ id: record._id }));
          }}
        />
      ),
      align: "center",
      width: 70,
    },
  ];

  return (
    <>
      <PageHeader
        title="Training Type"
        right={
          <Space direction="horizontal">
            <Input.Search placeholder="Search..." allowClear onChange={(e) => e} />
            <Button type="primary" onClick={() => ""}>
              <PlusOutlined />
              Add Type
            </Button>
          </Space>
        }
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        size="small"
        rowKey={(record) => record._id as string}
        pagination={{
          defaultPageSize: 20,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
        }}
      />
    </>
  );
};
export default TrainingType;
