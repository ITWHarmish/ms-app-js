import { Card, Col, Row, Space, Tooltip, Typography } from "antd";

import BasicColumnChart from "../../../components/charts/BasicColumn";

const ReportLayout = ({ userData, hoursData }) => {
  return (
    <>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <BasicColumnChart
            title="Total vs Billable"
            subtitle="Team Divya"
            data={[
              { name: "Total", data: hoursData.map((item) => parseFloat(item.hours.total.total)) },
              { name: "Billable", data: hoursData.map((item) => parseFloat(item.hours.total.billable)) },
            ]}
            categories={hoursData.map((item) => item.name)}
            xTitle="Projects"
            yTitle="Hours"
          />
        </Col>
        <Col span={12}>
          <BasicColumnChart
            title="Project Wise Billable"
            subtitle="Team Divya"
            data={[
              {
                name: "OMS",
                data: userData.map((item) => parseInt(item.project["OMS"]) || 0),
              },
              {
                name: "AdConnector",
                data: userData.map((item) => parseInt(item.project["AdConnector"]) || 0),
              },
            ]}
            categories={hoursData.map((item) => item.name)}
            xTitle="Projects"
            yTitle="Hours"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        {hoursData.map((data) => (
          <Col key={data.id} span={12}>
            <Card title={data.name} bordered={false} style={{ marginBottom: 16 }}>
              <Row>
                <Col span={12}>
                  <Space direction="vertical" size={8}>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Typography.Text strong>Total</Typography.Text>
                      </Col>
                      <Col span={12}>
                        <Typography.Text strong>{parseFloat(data.hours.total.total).toFixed(2)}</Typography.Text>
                      </Col>
                    </Row>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Typography>Billable</Typography>
                        <Typography>Coding</Typography>
                        <Typography>Interview</Typography>
                        <Typography>Training</Typography>
                        <Typography>Management</Typography>
                        <Typography>Review</Typography>
                        <Typography>Learning</Typography>
                      </Col>
                      <Col span={12}>
                        <Typography>{parseFloat(data.hours.total.billable).toFixed(2)}</Typography>
                        <Typography>{parseFloat(data.hours.total.coding).toFixed(2)}</Typography>
                        <Typography>{parseFloat(data.hours.total.interview).toFixed(2)}</Typography>
                        <Typography>{parseFloat(data.hours.total.training).toFixed(2)}</Typography>
                        <Typography>
                          <Tooltip
                            title={
                              <>
                                <div>Project: {data.hours.total.projectManagement}</div>
                                <div>Other: {data.hours.total.otherManagement}</div>
                              </>
                            }
                          >
                            {parseFloat(data.hours.total.management).toFixed(2)}
                          </Tooltip>
                        </Typography>
                        <Typography>{parseFloat(data.hours.total.review).toFixed(2)}</Typography>
                        <Typography>{parseFloat(data.hours.total.learning).toFixed(2)}</Typography>
                      </Col>
                    </Row>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" size={8}>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Typography.Text strong>Total</Typography.Text>
                      </Col>
                      <Col span={12}>
                        <Typography.Text strong>{data.hours.total.projectTotal}</Typography.Text>
                      </Col>
                    </Row>
                    {data.hours.project.map((hour) => (
                      <Row key={hour.project.id} gutter={8}>
                        <Col span={12}>
                          <Typography>{hour.project.name}</Typography>
                        </Col>
                        <Col span={12}>
                          <Typography>{hour.total}</Typography>
                        </Col>
                      </Row>
                    ))}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ReportLayout;
