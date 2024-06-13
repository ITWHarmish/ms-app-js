import { Button, Form, Modal, Table } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import PageHeader from "../../components/pageHeader/PageHeader";
import AdminTableActions from "../../components/table/AdminTableActions";
import { useAuthValue } from "../../context/AuthContext";
import { deleteLeave, readLeave } from "../../redux/actions/leaveAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ApplyLeave from "./ApplyLeave";

dayjs.extend(localizedFormat);

const LeaveStatus = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { currentUser } = useAuthValue();
  const { leave, isLoading } = useAppSelector((state: any) => state.leave);
  const [selectRecord, setSelectRecord] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(readLeave({ uid: currentUser.uid }));
  }, [currentUser.uid, dispatch]);

  const getLeavelist = (leave) => {
    return leave?.map((list: any) => ({
      ...list,
      reason: <div dangerouslySetInnerHTML={{ __html: list.reason }} />,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectRecord(undefined);
  };

  const columns: any = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (item, record, index) => <>{index + 1}</>,
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (record: any) => dayjs(record).format("DD-MM-YYYY"),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (record: any) => dayjs(record).format("DD-MM-YYYY"),
    },
    {
      title: "No Of Days",
      dataIndex: "noOfDays",
      key: "noOfDays",
    },
    {
      title: "Leave Type",
      dataIndex: "leavetype",
      key: "leavetype",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 100,
      render: (text: any, record: any) => (
        <AdminTableActions
          handleEdit={() => {
            setSelectRecord(record);
            setIsModalOpen(true);
          }}
          handleDelete={() => {
            dispatch(deleteLeave(record));
          }}
        />
      ),
    },
  ];

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        title="Leave Status"
        right={
          <Button type="primary" onClick={showModal}>
            Apply For Leave
          </Button>
        }
      />

      <Table
        columns={columns}
        dataSource={getLeavelist(leave)}
        size="small"
        loading={isLoading}
        rowKey={(record: any) => record._id as string}
        pagination={false}
      />

      <Modal
        title={selectRecord ? "Update Leave" : "Apply for Leave"}
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        closable
        width={1100}
        footer={
          <>
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              {selectRecord ? "Update" : "Apply Leave"}
            </Button>
            <Button type="primary" ghost onClick={onReset}>
              Reset
            </Button>
          </>
        }
      >
        <ApplyLeave
          form={form}
          selectRecord={selectRecord}
          setSelectRecord={(value: any) => setSelectRecord(value)}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default LeaveStatus;
