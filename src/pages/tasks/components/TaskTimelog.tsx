import { Checkbox, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";

export const TaskTimelog = ({ timelog }) => {
  const users = useAppSelector((state) => state.userState.user);

  const [taskHours, setTaskHours] = useState<any>({ billable: 0, totalTaskHours: 0 });

  useEffect(() => {
    if (timelog) {
      const billableData = timelog.length > 0 && timelog.filter((data: any) => data.billable);

      if (billableData && billableData.length > 0) {
        const totalhours = billableData.reduce((acc, item) => {
          const startDate: any = new Date(item.startTime).getTime();
          const endDate: any = new Date(item.endTime).getTime();
          const hours = (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24;
          return acc + hours;
        }, 0);
        setTaskHours((prevState) => ({ ...prevState, billable: totalhours.toFixed(2) }));
      } else {
        setTaskHours((prevState) => ({ ...prevState, billable: 0 }));
      }

      if (timelog.length > 0) {
        const totalHours = timelog.reduce((acc, item) => {
          const startDate: any = new Date(item.startTime).getTime();
          const endDate: any = new Date(item.endTime).getTime();
          const hours = (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24;
          return acc + hours;
        }, 0);
        setTaskHours((prevState) => ({ ...prevState, totalTaskHours: totalHours.toFixed(2) }));
      } else {
        setTaskHours((prevState) => ({ ...prevState, totalTaskHours: 0 }));
      }
    }
  }, [timelog]);

  const columns: any = [
    {
      title: "Billable",
      align: "center",
      width: 80,
      render: (_: any, record: any) => <Checkbox checked={record.billable} disabled={true} />,
    },
    {
      title: "Name",
      width: 100,
      render: (_: any, record: any) => {
        const user = users.find((user: any) => user.id === record.userId);
        return user.firstName + " " + user.lastName.charAt(0);
      },
    },
    {
      title: "Date",
      width: 100,
      render: (_: any, record: any) => dayjs(record.date).format("DD-MM-YYYY"),
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
      title: "Description",
      dataIndex: "description",
    },
  ];

  return timelog?.length > 0 ? (
    <Space direction="vertical" size="large">
      <Space size="large">
        <Typography.Title level={5} style={{ margin: 0 }}>
          Filtered Totals:
        </Typography.Title>
        <Space>
          <Typography.Text strong>Total Hours:</Typography.Text>
          <Typography.Text>{taskHours.totalTaskHours}</Typography.Text>
        </Space>
        <Space>
          <Typography.Text strong>Billable:</Typography.Text>
          <Typography.Text>{taskHours.billable}</Typography.Text>
        </Space>
      </Space>
      <Table
        size="small"
        dataSource={timelog}
        columns={columns}
        rowClassName="editable-row"
        rowKey={(record: any) => record._id as string}
        pagination={false}
      />
    </Space>
  ) : (
    <Space>
      <span>No time entries have been logged against this task</span>
    </Space>
  );
};
