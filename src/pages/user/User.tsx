import { Button, Spin, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/pageHeader/PageHeader";
import { useAppSelector } from "../../redux/hooks";
import AddUser from "./AddUser";

const User = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const users = useAppSelector((state) => state.userState.user);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      render: (text: any, record: any) => (
        <Link to={`/user/${record.id}`}>
          <span className="text-capitalize">
            {record.firstName} {record.lastName}
          </span>
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Team",
      render: (text: any, record: any) => <span className="text-capitalize">{record.team}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text: any) => <span className="text-capitalize">{text.label}</span>,
    },
  ];

  return (
    <>
      <PageHeader
        title="All Registered Users"
        right={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Add New User
          </Button>
        }
      />
      <AddUser visible={modalVisible} setModalVisible={(visible: boolean) => setModalVisible(visible)} />
      <div>
        {users ? (
          <Table size="small" columns={columns} dataSource={users} rowKey={(record: any) => record.id} />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </>
  );
};

export default User;
