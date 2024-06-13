import { Button, Checkbox, Col, Drawer, Row, Space, Table, Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useRef, useState } from "react";

import { useAuthValue } from "../../context/AuthContext";
import { exportAsImage } from "../../util/exportAsImage";
import CalculateTime from "./CalculateTime";

dayjs.extend(localizedFormat);

const SendTimlelog = ({ date, timelog }: any) => {
  const exportRef: any = useRef();

  const { currentUser } = useAuthValue();

  const [visible, setVisible] = useState<boolean>(false);
  const [isToday, setIsToday] = useState<boolean>();

  const columns: any = [
    {
      title: "Billable",
      align: "center",
      width: 80,
      render: (_: any, record: any) => <Checkbox checked={record.billable} disabled={isToday} />,
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
      width: 200,
      render: (_: any, record: any) => (record.project ? record.project.name : "-"),
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
  ];

  useEffect(() => {
    setIsToday(dayjs(date).format("L") !== dayjs().format("L"));
  }, [date]);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Send Timelog
      </Button>
      <Drawer
        title={"Share timelog"}
        placement="right"
        size={"large"}
        width={1100}
        onClose={() => setVisible(false)}
        className="screenshot-drawer"
        open={visible}
        extra={
          <Space>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() =>
                exportAsImage(
                  exportRef.current,
                  `${dayjs(date).format("YYYY-MM-DD")} Timelog ${currentUser.firstName} ${currentUser.lastName}`,
                )
              }
            >
              Download Timelog
            </Button>
          </Space>
        }
      >
        <div ref={exportRef}>
          <Space direction="vertical" size={16}>
            <Table
              size="small"
              dataSource={timelog}
              columns={columns}
              rowClassName="screenshot-row"
              rowKey={(record: any) => record._id as string}
              pagination={false}
            />
            <Row style={{ justifyContent: "flex-end" }}>
              <Col md={6} span={24}>
                <CalculateTime />
              </Col>
            </Row>
          </Space>
        </div>
      </Drawer>
    </>
  );
};

export default SendTimlelog;
