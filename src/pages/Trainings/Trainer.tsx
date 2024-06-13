import { Avatar, Button, Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";

import PageHeader from "../../components/pageHeader/PageHeader";
import TableActions from "../../components/table/TableActions";
import ActiveInActive from "./columnFormatter/ActiveInActive";

const dataSource = [
  {
    id: "1",
    name: "John Doe",
    contact_number: "9876543210",
    email: "johndoe@example.com",
    description: "Lorem ipsum dollar",
    status: "0",
  },
  {
    id: "2",
    name: "Mike Litorus",
    contact_number: "9876543120",
    email: "mikelitorus@example.com",
    description: "Lorem ipsum dollar",
    status: "1",
  },
];

const TrainingList = () => {
  const columns: ColumnsType<any> = [
    {
      title: "#",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: 10,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "Task",
      width: 150,
      render: (text) => {
        return (
          <Space>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="small" />
            {text}
          </Space>
        );
      },
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "assignedTo",
      sorter: (a, b) => a.contact_number - b.contact_number,
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
      width: 100,
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
        title="Trainers"
        right={
          <Space direction="horizontal">
            <Input.Search placeholder="Search..." allowClear onChange={(e) => e} />
            <Button type="primary" onClick={() => ""}>
              <PlusOutlined />
              Add New
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
export default TrainingList;
