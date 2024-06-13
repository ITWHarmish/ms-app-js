import "./calender.scss";

import { Avatar, Button, Calendar, Card, Col, message, Modal, Row, Tag, Tooltip, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";

import { useAuthValue } from "../../context/AuthContext";
import { API_URL } from "../../util/secrets";
import PageHeader from "../pageHeader/PageHeader";
import calendar from "./calendar.png";
import EventForm from "./EventForm";
import googleMeetImg from "./meetImg.jpg";
import organizer from "./organizer.png";
import userIcone from "./people.png";

const GCalender = () => {
  const { currentUser } = useAuthValue();

  const [data, setData] = useState<any>();
  const [userAccess, setUserAccess] = useState<boolean>(false);
  const [modelWithData, setModelWithData] = useState<any>();
  const [createEvent, setCreateEvent] = useState<boolean>(false);

  const events = data?.filter((val) => val?.status !== "cancelled" && val?.start?.dateTime > dayjs().format());
  const eventsData = events?.sort((a, b) => dayjs(a?.start?.dateTime).valueOf() - dayjs(b?.start?.dateTime).valueOf());

  useEffect(() => {
    axios
      .get(API_URL + "/calander-events/" + currentUser.uid)
      .then((response) => {
        setData(response.data.items);
        setUserAccess(true);
      })
      .catch((error) => {
        console.log(error.stack);
        if (error.stack.includes("401")) {
          setUserAccess(false);
          message.warning("Connect your google account");
        }
      });
  }, [currentUser.uid]);

  const dateCellRender = (value) => {
    const calendarDate = value.format("DD/MM/YYYY");
    const listData = data?.filter((date) => dayjs(date?.start?.dateTime).format("DD/MM/YYYY") === calendarDate && date);
    return listData?.map((event) =>
      event.status !== "cancelled" ? (
        <li key={event.content} onClick={() => setModelWithData(event)}>
          <Tooltip placement="topLeft" arrow autoAdjustOverflow title={event?.summary}>
            <Tag color="processing" className="summaryStyle">
              <CaretRightOutlined />
              {event?.summary}
            </Tag>
          </Tooltip>
        </li>
      ) : (
        <></>
      ),
    );
  };

  return (
    <>
      <PageHeader title="Calendar" />
      <Card bodyStyle={{ padding: 0, border: "none" }}>
        <Row>
          <Col span={6} style={{ padding: 10 }}>
            <Card bodyStyle={{ padding: 11 }} className="cardStyle">
              <Button type="primary" className="createEventBtn" onClick={() => setCreateEvent(true)}>
                <PlusOutlined />
                Create New Events
              </Button>
            </Card>
            <Typography className="eventTitle">Upcoming Events</Typography>
            <Typography className="eventTitleStyle">{"Don't miss scheduled events"}</Typography>
            {eventsData?.length > 0 ? (
              <div className="upCommingMainDiv">
                {eventsData?.map((data, index) => {
                  return (
                    <Card key={index} bodyStyle={{ padding: 11, marginBottom: 10 }} className="cardStyle">
                      <Row align="middle">
                        <Col span={3}>
                          <Avatar icon={dayjs(data?.start?.dateTime).format("DD")} className="innerAvatarStyle" />
                        </Col>
                        <Col span={16} className="typographyStyle">
                          <Typography className="summaryTypographyStyle">{data?.summary}</Typography>
                          <Typography className="statusTypographyStyle">{data?.status}</Typography>
                        </Col>
                        <Col span={5}>
                          <Typography className="dateTimeTypographyStyle">
                            {dayjs(data?.start?.dateTime).format("hh:mm A")}
                          </Typography>
                        </Col>
                      </Row>
                    </Card>
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
          </Col>
          <Col span={18}>
            <Calendar cellRender={dateCellRender} className="calendarStyle" />
          </Col>
        </Row>
      </Card>
      <Modal
        width={400}
        title={modelWithData?.summary}
        footer={null}
        open={modelWithData}
        onCancel={() => setModelWithData(undefined)}
      >
        <Row>
          <Col span={2} className="calendarIcone">
            <img src={calendar} alt="calendar" className="iconeImg" />
          </Col>
          <Col span={21} offset={1} className="calendarIcone">
            {dayjs(modelWithData?.start?.dateTime).format("dddd, DD MMMM - hh:mma") +
              " To " +
              dayjs(modelWithData?.end?.dateTime).format("hh:mma")}
          </Col>
          {modelWithData?.hangoutLink && (
            <>
              <Col span={2} className="imgColStyle">
                <img src={googleMeetImg} alt="Goole Meet" className="iconeImg" />
              </Col>
              <Col span={21} offset={1} className="imgColStyle">
                <Link type="primary" to={modelWithData?.hangoutLink} target="_blank" className="linkStyleBtn">
                  Join With Google Meet
                </Link>
                <p className="linkStyle">{modelWithData?.hangoutLink}</p>
              </Col>
            </>
          )}
          {modelWithData?.attendees && (
            <>
              <Col span={2} className="userIconeStyle">
                <img src={userIcone} alt="userIcone" className="iconeImg" />
              </Col>
              <Col span={21} offset={1} className="guestStyle">
                <h4>{modelWithData?.attendees?.length} guests</h4>
              </Col>
              <Col span={21} offset={3} className="guestsEmailStyle">
                {modelWithData?.attendees.map((data, index) => {
                  return (
                    <ul key={index} className="innerEmailStyle">
                      <li>{data?.email}</li>
                    </ul>
                  );
                })}
              </Col>
            </>
          )}
          <Col span={2} className="organizerImg">
            <img src={organizer} alt="organizer" className="iconeImg" />
          </Col>
          <Col span={21} offset={1}>
            <h5>
              {modelWithData?.organizer?.email}(<span className="organizerStyle">organizer</span>)
            </h5>
          </Col>
        </Row>
      </Modal>
      <Modal
        width={500}
        title={"Create New Event"}
        footer={null}
        open={createEvent}
        onCancel={() => setCreateEvent(false)}
      >
        <EventForm />
      </Modal>
    </>
  );
};

export default GCalender;
