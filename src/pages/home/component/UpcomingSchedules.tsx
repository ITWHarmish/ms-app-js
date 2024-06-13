import "dayjs/locale/zh-cn";

import { Avatar, Calendar, Card, Col, message, Row, Select, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { useAuthValue } from "../../../context/AuthContext";
import { API_URL } from "../../../util/secrets";

const UpcomingSchedules = () => {
  const { currentUser } = useAuthValue();

  const [data, setData] = useState<any>();

  useEffect(() => {
    axios
      .get(API_URL + "/calander-events/" + currentUser.uid)
      .then((response) => {
        setData(response.data.items);
      })
      .catch((error) => {
        console.log(error.stack);
        if (error.stack.includes("401")) {
          message.warning("Connect your google account");
        }
      });
  }, [currentUser.uid]);

  const events = data?.filter((val) => val?.status !== "cancelled" && val?.start?.dateTime > dayjs().format());
  const eventsData = events?.sort((a, b) => dayjs(a?.start?.dateTime).valueOf() - dayjs(b?.start?.dateTime).valueOf());

  const handleHeader = ({ value, onChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current = current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>,
      );
    }

    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }

    return (
      <div style={{ padding: 8 }}>
        <Row>
          <Col span={14}>
            <div style={{ fontWeight: 600 }}>Upcoming Schedules</div>
          </Col>
          <Col span={5}>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={month}
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
          <Col span={5}>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              value={year}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            >
              {options}
            </Select>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <Card size="small">
        <Calendar fullscreen={false} headerRender={handleHeader} />
        <div style={{ marginLeft: 7, fontSize: 13, fontWeight: 600, color: "#41435b" }}>EVENTS:</div>
        {eventsData ? (
          <div style={{ maxHeight: 180, overflow: "auto" }}>
            {eventsData?.map((data, index) => {
              return (
                <Row key={index} style={{ padding: "3px 5px" }}>
                  <Col span={2} style={{ paddingTop: 5 }}>
                    <Avatar icon={dayjs(data?.start?.dateTime).format("DD")} style={{ backgroundColor: "#5f6bef" }} />
                  </Col>
                  <Col span={19} style={{ paddingLeft: 7 }}>
                    <Typography style={{ fontWeight: 600, fontSize: 12, color: "#41435b" }}>{data?.summary}</Typography>
                    <Typography style={{ fontSize: 11, color: "#888993" }}>{data?.status}</Typography>
                  </Col>
                  <Col span={3}>
                    <Typography style={{ fontSize: 11, color: "#888993" }}>
                      {dayjs(data?.start?.dateTime).format("hh:mm A")}
                    </Typography>
                  </Col>
                </Row>
              );
            })}
          </div>
        ) : (
          <Row justify="center" align="middle">
            <Col>
              <Typography.Paragraph>No events found !!!</Typography.Paragraph>
            </Col>
          </Row>
        )}
      </Card>
    </>
  );
};
export default UpcomingSchedules;
