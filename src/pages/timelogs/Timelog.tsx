import "./style.scss";

import { Button, Checkbox, DatePicker, Form, Space, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EyeOutlined } from "@ant-design/icons";

import PageHeader from "../../components/pageHeader/PageHeader";
import TableActions from "../../components/table/TableActions";
import { useAuthValue } from "../../context/AuthContext";
import { deleteTimelog, readTimelog, updateTimelog } from "../../redux/actions/timelogAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DATE_FORMAT } from "../../util/constants";
import { socket } from "../../util/lib";
import AddTimelog from "./AddTimelog";
import CalculateTime from "./CalculateTime";
// import UploadToDrive from "./components/UploadToDrive";
import SendTimlelog from "./SendTimlelog";

dayjs.extend(localizedFormat);

const Timelog = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectRecord, setSelectRecord] = useState<any>();
  // const [isToday, setIsToday] = useState<boolean>();

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAuthValue();
  const { timelog, isLoading } = useAppSelector((state: any) => state.timelog);

  useEffect(() => {
    currentUser && dispatch(readTimelog({ userId: currentUser.uid, date: date }));
  }, [date, currentUser]);

  useEffect(() => {
    socket.on("timelog-change", () => dispatch(readTimelog({ userId: currentUser.uid, date: date })));
  }, []);

  const handleDateChange = (dateP: any) => {
    setDate(new Date(dateP.$d));
  };

  const columns: any = [
    {
      title: "Billable",
      align: "center",
      width: 80,
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.billable}
          onChange={(e) =>
            dispatch(
              updateTimelog({
                ...record,
                userId: currentUser.uid,
                billable: e.target.checked,
              }),
            )
          }
        />
      ),
    },
    {
      title: "Start Time",
      width: 100,
      render: (_: any, record: any) => dayjs(record.startTime).format("LT"),
    },
    {
      title: "End Time",
      width: 100,
      render: (_: any, record: any) => dayjs(record.endTime).format("LT"),
    },
    {
      title: "Hours",
      width: 80,
      render: (_: any, record: any) => {
        const startDate: any = new Date(record.startTime).getTime();
        const endDate: any = new Date(record.endTime).getTime();
        const hours = (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24;
        return hours.toFixed(2);
      },
    },
    {
      title: "Category",
      width: 100,
      render: (_: any, record: any) => <Typography className="text-capitalize">{record.category}</Typography>,
    },
    {
      title: "Project",
      width: 160,
      render: (_: any, record: any) => record.project && record.project.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_: any, record: any) => (
        <>
          {record.task_id && <strong style={{ marginRight: 4 }}>[{record.task_id}]</strong>}
          {record.description}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 120,
      align: "right",
      render: (_: any, record: any) => (
        <Space direction="horizontal" style={{ justifyContent: "flex-end" }}>
          {record.task_id && (
            <Tooltip title="View">
              <Button
                type="default"
                size="small"
                shape="circle"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/task/${record.task_id}`, { replace: true })}
              />
            </Tooltip>
          )}
          <TableActions
            handleEdit={() => setSelectRecord(record)}
            handleDelete={() => {
              dispatch(
                deleteTimelog({
                  ...record,
                  userId: currentUser.uid,
                  date: date,
                }),
              );
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Timelog"
        right={
          <Space>
            <Form.Item initialValue={dayjs(date)}>
              <DatePicker
                defaultValue={dayjs(date)}
                onChange={handleDateChange}
                clearIcon={false}
                format={DATE_FORMAT}
                style={{ width: "170px" }}
              />
            </Form.Item>
            {/* <UploadToDrive uid={currentUser.uid} /> */}
            <SendTimlelog date={dayjs(date)} timelog={timelog} />
          </Space>
        }
      />
      <Space direction="vertical" size={16}>
        <AddTimelog date={date} record={selectRecord} setSelectRecord={(value: any) => setSelectRecord(value)} />
        <Form form={form} component={false}>
          <Table
            size="small"
            dataSource={timelog}
            columns={columns}
            rowClassName="editable-row"
            rowKey={(record: any) => record._id as string}
            pagination={false}
            loading={isLoading}
          />
        </Form>
        <CalculateTime type="toggle" />
      </Space>
    </>
  );
};

export default Timelog;
