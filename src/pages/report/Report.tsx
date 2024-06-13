import { useEffect, useState } from "react";
import { Row, Col, DatePicker, Select, Space } from "antd";
import BasicColumn from "../../components/charts/BasicColumn";
import BasicLine from "../../components/charts/BasicLine";

const { Option } = Select;

const Report = () => {
  const [names, setNames] = useState<any>();
  const [dates, setDates] = useState<any>();
  const [data, setData] = useState<any[]>([]);
  const [obj, setObj] = useState<any[]>([]);
  const [type, setType] = useState("week");

  return (
    <div>
      <Space>
        <Select value={type}>
          <Option value="date">Date</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="quarter">Quarter</Option>
          <Option value="year">Year</Option>
        </Select>
        <DatePicker picker={type as unknown as undefined} />
      </Space>
      <Row>
        <Col span={12}>
          <BasicColumn names={names} data={obj} />
        </Col>
        <Col span={12}>
          <BasicLine names={names} data={obj} />
        </Col>
      </Row>
    </div>
  );
};

export default Report;
