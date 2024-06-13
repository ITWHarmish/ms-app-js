import { Spin } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import BasicColumnChart from "../../../components/charts/BasicColumn";
import { useAppSelector } from "../../../redux/hooks";
import { getTotalHours } from "../../../services/timelog.crud";

dayjs.extend(localizedFormat);

const AvailableTotalHours = () => {
  const users = useAppSelector((state) => state.userState.user);

  const [category] = useState<any>([]);
  const [totalHours] = useState<any>([]);
  const [billable] = useState<any>([]);
  const [render, setRender] = useState(false);

  const startDate = dayjs().startOf("month").format();
  const endDate = dayjs().endOf("month").format();

  const series: Array<object> = [
    { name: "Billable Hours", data: billable },
    { name: "Total Hours", data: totalHours },
  ];

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 2000);
  });

  useEffect(() => {
    users.forEach(async (u: any) => {
      const hours = await getTotalHours(u.id, startDate, endDate);
      category.push(u.firstName);
      totalHours.push(parseFloat(hours.total));
      billable.push(hours.billable);
    });
  }, []);

  return (
    <>
      {render ? (
        <BasicColumnChart
          title={`Total v/s Billable for ${dayjs().format("MMMM")}`}
          subtitle="Team Webstar"
          categories={category}
          data={series}
          yTitle={"Hours"}
        />
      ) : (
        <Spin />
      )}
    </>
  );
};

export default AvailableTotalHours;
