import { Card, Table, Typography } from "antd";
import dayjs from "dayjs";

import { useAppSelector } from "../../../redux/hooks";

const HolidayWidget = () => {
  const { holiday, isLoading } = useAppSelector((state: any) => state.holiday);

  const columns: any = [
    {
      title: "Title ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date ",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (record: any) => (
        <>
          <Typography.Text>{dayjs(record).format("DD MMM YYYY")}</Typography.Text>
          <Typography.Text>&nbsp;&nbsp;[{dayjs(record).format("dddd")}]</Typography.Text>
        </>
      ),
    },
  ];

  return (
    <Card title="Holidays">
      <Table
        columns={columns}
        dataSource={holiday}
        pagination={false}
        size="small"
        rowKey={(record: any) => record._id as string}
        loading={isLoading}
      />
    </Card>
  );
};

export default HolidayWidget;
