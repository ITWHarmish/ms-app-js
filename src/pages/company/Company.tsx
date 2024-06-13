import { Avatar, Button, Form, Modal, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import PageHeader from "../../components/pageHeader/PageHeader";
import { deleteCompany, readCompany } from "../../redux/actions/companyAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AddCompany from "./AddCompany";
import AdminTableActions from "../../components/table/AdminTableActions";

const Company = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectRecord, setSelectRecord] = useState<any>();
  const { isLoading, company } = useAppSelector((state: any) => state.company);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns: any = [
    {
      title: "Company Name",
      dataIndex: "name",
      render: (text: any) => (
        <>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Typography.Text style={{ marginLeft: 5 }}>{text}</Typography.Text>
        </>
      ),
    },

    {
      title: "Owner",
      dataIndex: "owner",
    },
    {
      title: "Industry Type",
      dataIndex: "industryType",
    },
    {
      title: "Email",
      dataIndex: ["contact"],
      render: (_, record: any) => record?.contact?.email,
    },

    {
      title: "location",
      dataIndex: "location",
      width: "9%",
    },
    {
      title: "Website",
      dataIndex: "webiste",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 100,
      render: (_text: any, record: any) => (
        <AdminTableActions
          handleEdit={() => {
            setSelectRecord(record);
            setIsModalOpen(true);
          }}
          handleDelete={() => {
            dispatch(deleteCompany(record));
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(readCompany());
  }, [dispatch]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectRecord(undefined);
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        title="Company"
        right={
          <Button type="primary" onClick={showModal}>
            + Create Company
          </Button>
        }
      />
      <Table
        columns={columns}
        dataSource={company}
        size="small"
        loading={isLoading}
        rowKey={(record: any) => record._id as string}
      />
      <Modal
        title="Add Company"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        closable
        width={"45%"}
        footer={
          <div style={{ marginRight: "20px" }}>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              {selectRecord ? "Update" : "Create"}
            </Button>
          </div>
        }
      >
        <AddCompany
          handleCancel={handleCancel}
          record={selectRecord}
          setSelectRecord={(value: any) => setSelectRecord(value)}
          form={form}
        />
      </Modal>
    </>
  );
};
export default Company;
