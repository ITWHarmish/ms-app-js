import { Col, Row, Space } from "antd";

import AssignedTaskWidget from "./component/AssignedTaskWidget";
import DayPlanning from "./component/DayPlanning";
import HolidayWidget from "./component/HolidayWidget";
import UpcomingSchedules from "./component/UpcomingSchedules";

const Dashboard = () => {
  return (
    <Space direction="vertical" size={16}>
      <Row gutter={16}>
        <Col md={16} span={24}>
          <Space direction="vertical" size={16}>
            <DayPlanning />
            <AssignedTaskWidget />
          </Space>
        </Col>
        <Col md={8} span={24}>
          <Space direction="vertical" size={16}>
            <UpcomingSchedules />
            <HolidayWidget />
          </Space>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;
