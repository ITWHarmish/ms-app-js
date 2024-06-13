import { Button, DatePicker, DatePickerProps, Form, Modal, Space, Spin, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import PageHeader from "../../components/pageHeader/PageHeader";
import AdminTableActions from "../../components/table/AdminTableActions";
import { deleteHoliday } from "../../redux/actions/holidayAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IHoliday } from "../../types/iHoliday";
import { AddHoliday } from "./AddHoliday";

const Holiday = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { holiday, isLoading } = useAppSelector((state: any) => state.holiday);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectRecord, setSelectRecord] = useState<any>();
  const [dataSources, setDataSources] = useState<IHoliday[]>();
  const [filter, setFilter] = useState({ search: "", year: dayjs().format("YYYY") });

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const searchFilter = filter.search
      ? holiday.filter((data) => data.task.toLowerCase().includes(filter.search) || data.task.includes(filter.search))
      : holiday;

    const yearFilter = searchFilter?.length > 0 ? searchFilter.filter((data) => data.year === filter.year) : [];

    setDataSources(yearFilter);
  }, [holiday, filter]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectRecord(null);
  };

  const onChange: DatePickerProps["onChange"] = (values: any) => {
    setFilter({ ...filter, year: dayjs(values).format("YYYY") });
  };

  const columns: any = [
    {
      title: "Title ",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "Date ",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (record: any) => dayjs(record).format("DD MMM YYYY"),
    },
    {
      title: "Day ",
      dataIndex: "date",
      key: "day",
      width: 100,
      render: (record: any) => <Typography.Text>{dayjs(record).format("dddd")}</Typography.Text>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: " 10%",
      align: "center",
      render: (_: any, record: any) => (
        <AdminTableActions
          handleEdit={() => {
            setSelectRecord(record);
            setIsModalOpen(true);
          }}
          handleDelete={() => {
            dispatch(deleteHoliday(record));
          }}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={`Holiday Year ${filter.year}`}
        right={
          <Space>
            <Form name="Year" form={form} autoComplete="off" layout="horizontal">
              <Form.Item name="Year" label="Year" style={{ marginRight: 8 }} initialValue={dayjs()}>
                <DatePicker onChange={onChange} picker="year" allowClear={false} />
              </Form.Item>
            </Form>
            <Button type="primary" onClick={showModal}>
              + Add Holidays
            </Button>
          </Space>
        }
      />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          style={{ margin: 10 }}
          columns={columns}
          dataSource={dataSources}
          pagination={false}
          size="small"
          rowKey={(record: any) => record._id as string}
        />
      )}

      <Modal
        title={selectRecord ? "Update Holiday" : "Add Holiday"}
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        closable
        width="40%"
        footer={
          <>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              {selectRecord ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <AddHoliday
          handleCancel={handleCancel}
          record={selectRecord}
          setSelectRecord={(value: any) => setSelectRecord(value)}
          form={form}
        />
      </Modal>
    </>
  );
};
export default Holiday;
