import { Calendar, Spin, Typography } from "antd";
import dayjs from "dayjs";

import PageHeader from "../../components/pageHeader/PageHeader";
import { useAuthValue } from "../../context/AuthContext";
import { getTimelogHours } from "../../services/timelog.crud";

import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const TimelogSummary = () => {
  const { currentUser } = useAuthValue();

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const getListData = async (value: Dayjs) => {
    const data = await getTimelogHours(currentUser.uid, dayjs(value).format("YYYY/MM/DD"));
    return data;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return listData !== undefined ? <Typography></Typography> : <Spin />;
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <PageHeader title="Timelog Summary" />
      {currentUser ? <Calendar cellRender={cellRender} /> : <Spin />}
    </>
  );
};

export default TimelogSummary;
