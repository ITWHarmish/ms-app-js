import { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import PageHeader from "../../components/pageHeader/PageHeader";
import TableActions from "../../components/table/TableActions";
import { deleteTrainingList, readTrainingList } from "../../redux/actions/trainingListAction";
import { DATE_FORMAT } from "../../util/constants";
import AddNewTrainee from "./AddNewTrainee";
import Assignee from "./columnFormatter/Assignee";

const TrainingList = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { trainingList, isLoading } = useAppSelector((state: any) => state.trainingList);
  const users = useAppSelector((state) => state.userState.user);

  const [newTraineeModel, setNewTraineeModel] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(readTrainingList());
  }, [dispatch]);

  const getDataSources = useCallback(() => {
    return filter
      ? trainingList?.filter((data) => {
        return (
          data?.firstName?.toLowerCase().includes(filter) ||
          data?.lastName?.toLowerCase().includes(filter) ||
          data?.firstName?.includes(filter) ||
          data?.lastName?.includes(filter)
        );
      })
      : trainingList;
  }, [filter, trainingList]);

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (_text, record) => `${record.firstName} ${record.lastName}`,
      width: 130,
    },
    {
      title: "Assigned Staff",
      dataIndex: "mentorName",
      render: (text, record) => Assignee(text, record, users, dispatch),
      key: "mentorName",
      width: 120,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (text) => dayjs(text).format(DATE_FORMAT),
      width: 120,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => dayjs(text).format(DATE_FORMAT),
      width: 120,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
    },
    {
      title: "College",
      dataIndex: "College",
      key: "College",
      width: 120,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <TableActions
          handleEdit={() => {
            setSelectedRecord(record);
          }}
          handleDelete={() => {
            dispatch(deleteTrainingList(record));
          }}
        />
      ),
      align: "center",
      width: 50,
    },
  ];

  const handleOnCancel = () => {
    setNewTraineeModel(false);
    setSelectedRecord(undefined);
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        title="Training"
        right={
          <Space direction="horizontal">
            <Input.Search placeholder="Search..." allowClear onChange={(e) => setFilter(e.target.value)} />
            <Button type="primary" onClick={() => setNewTraineeModel(true)}>
              + Add New
            </Button>
          </Space>
        }
      />
      <Table
        columns={columns}
        dataSource={getDataSources()}
        size="small"
        rowKey={(record) => record._id as string}
        loading={isLoading}
        pagination={{
          defaultPageSize: 20,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
        }}
      />
      <Modal
        title={"Add New Trainee"}
        open={newTraineeModel || selectedRecord}
        onCancel={() => handleOnCancel()}
        footer={false}
      >
        <AddNewTrainee handleOnCancel={handleOnCancel} selectedRecord={selectedRecord} form={form} />
      </Modal>
    </>
  );
};
export default TrainingList;
