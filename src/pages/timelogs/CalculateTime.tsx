import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { useAuthValue } from "../../context/AuthContext";
import { useAppSelector } from "../../redux/hooks";
import { TIMELOG_CATEGORY } from "../../util/constants";

interface CardProps {
  type?: string;
}

const CalculateTime = ({ type = "normal" }: CardProps) => {
  const [showCard, setshowCard] = useState<boolean>(true);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [codingHours, setCodingHours] = useState<number>(0);
  const [managementHours, setManagementHours] = useState<number>(0);
  const [reviewHours, setReviewHours] = useState<number>(0);
  const [learningHours, setLearningHours] = useState<number>(0);
  const [trainingHours, setTrainingHours] = useState<number>(0);
  const [interviewHours, setInterviewHours] = useState<number>(0);
  const [billableHours, setBillableHours] = useState<number>(0);

  const { currentUser } = useAuthValue();
  const { timelog } = useAppSelector((state: any) => state.timelog);

  useEffect(() => {
    if (timelog) {
      const codingHoursArray: Array<number> = [];
      const managementHoursArray: Array<number> = [];
      const reviewHoursArray: Array<number> = [];
      const learningHoursArray: Array<number> = [];
      const trainingHoursArray: Array<number> = [];
      const interviewHoursArray: Array<number> = [];
      const billableHoursArray: Array<number> = [];

      timelog.filter((record: any) => {
        const startTime = new Date(record.startTime).getTime();
        const endTime = new Date(record.endTime).getTime();
        const hours = (Math.abs(endTime - startTime) / (1000 * 60 * 60)) % 24;

        record.billable && billableHoursArray.push(parseFloat(hours.toFixed(2)));

        switch (record.category) {
          case TIMELOG_CATEGORY.CODING:
            return codingHoursArray.push(parseFloat(hours.toFixed(2)));
          case TIMELOG_CATEGORY.MANAGEMENT:
            return managementHoursArray.push(parseFloat(hours.toFixed(2)));
          case TIMELOG_CATEGORY.REVIEW:
            return reviewHoursArray.push(parseFloat(hours.toFixed(2)));
          case TIMELOG_CATEGORY.LEARNING:
            return learningHoursArray.push(parseFloat(hours.toFixed(2)));
          case TIMELOG_CATEGORY.TRAINING:
            return trainingHoursArray.push(parseFloat(hours.toFixed(2)));
          case TIMELOG_CATEGORY.INTERVIEW:
            return interviewHoursArray.push(parseFloat(hours.toFixed(2)));
          default:
            return null;
        }
      });

      const sumArray = (array: Array<number>) => {
        return array.reduce((partialSum, a) => partialSum + a, 0);
      };

      setCodingHours(parseFloat(sumArray(codingHoursArray).toFixed(2)));
      setBillableHours(parseFloat(sumArray(billableHoursArray).toFixed(2)));
      setManagementHours(parseFloat(sumArray(managementHoursArray).toFixed(2)));
      setReviewHours(parseFloat(sumArray(reviewHoursArray).toFixed(2)));
      setLearningHours(parseFloat(sumArray(learningHoursArray).toFixed(2)));
      setTrainingHours(parseFloat(sumArray(trainingHoursArray).toFixed(2)));
      setInterviewHours(parseFloat(sumArray(interviewHoursArray).toFixed(2)));
      setTotalHours(codingHours + managementHours + reviewHours + learningHours + trainingHours + interviewHours);
    }
  }, [codingHours, learningHours, managementHours, reviewHours, timelog, trainingHours, interviewHours]);

  const SetRow = ({ label, value, textStyle }: any) => {
    return (
      <Row gutter={16}>
        <Col md={12} span={18}>
          <Typography.Text style={textStyle}>{label}</Typography.Text>
        </Col>
        <Col md={12} span={6}>
          <Typography.Text style={textStyle}>{value}</Typography.Text>
        </Col>
      </Row>
    );
  };

  return (
    <Card
      size="small"
      title={
        <SetRow
          label={currentUser && currentUser.firstName + " " + currentUser.lastName}
          value={"Work Duration"}
          textStyle={{ fontWeight: "bold" }}
        />
      }
      className={type === "toggle" && `calculate-hours-card ${showCard ? "show-card" : ""}`}
    >
      {type === "toggle" && (
        <Button
          type="primary"
          icon={showCard ? <RightOutlined /> : <LeftOutlined />}
          className="arrow-toggle"
          onClick={() => setshowCard(!showCard)}
        />
      )}
      <SetRow label={"Total"} value={totalHours} textStyle={{ fontWeight: "bold" }} />
      <SetRow label={"Billable"} value={billableHours} textStyle={{ fontWeight: "bold" }} />
      <SetRow label={"Coding"} value={codingHours} />
      <SetRow label={"Management"} value={managementHours} />
      <SetRow label={"Review"} value={reviewHours} />
      <SetRow label={"Training"} value={trainingHours} />
      <SetRow label={"Interview"} value={interviewHours} />
      <SetRow label={"Learning"} value={learningHours} />
    </Card>
  );
};

export default CalculateTime;
