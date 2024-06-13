import { DatePicker, DatePickerProps, Form } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import PageHeader from "../../components/pageHeader/PageHeader";
import { reportTimelogs } from "../../redux/actions/reportTimelogAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DATE_FORMAT_API } from "../../util/constants";
import ReportLayout from "./components/ReportLayout";

dayjs.extend(localizedFormat);

const customWeekStartEndFormat: DatePickerProps["format"] = (value: any) =>
  `${dayjs(value).startOf("week").format(DATE_FORMAT_API)} ~ ${dayjs(value).endOf("week").format(DATE_FORMAT_API)}`;

const ReportWeekly = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const monthlyData = useAppSelector((state: any) => state.reportTimelogState.timelog);

  const [filter, setFilter] = useState({
    startDate: dayjs().startOf("week").format(DATE_FORMAT_API),
    endDate: dayjs().endOf("week").format(DATE_FORMAT_API),
  });

  const handleDatePickerChange: DatePickerProps["onChange"] = (values: any) => {
    setFilter({
      startDate: dayjs(values).startOf("week").format(DATE_FORMAT_API),
      endDate: dayjs(values).endOf("week").format(DATE_FORMAT_API),
    });
  };

  useEffect(() => {
    dispatch(reportTimelogs({ startDate: filter.startDate, endDate: filter.endDate }));
  }, [dispatch, filter]);

  const userData = [];

  monthlyData.map((item: any) => {
    const uData = { name: item.name, project: {}, ...item.hours.total };
    item.hours.project.map((hour: any) => {
      uData.project[hour.project.name] = hour.total;
    });
    userData.push(uData);
    return uData;
  });

  return (
    <>
      <PageHeader
        title={`Weekly Report of ${filter.startDate} to ${filter.endDate}`}
        right={
          <Form name="basic" form={form} autoComplete="off" layout="horizontal" style={{ display: "flex" }}>
            <Form.Item name="week" label="Week" style={{ marginRight: 8 }}>
              <DatePicker
                defaultValue={dayjs()}
                onChange={handleDatePickerChange}
                format={customWeekStartEndFormat}
                picker="week"
                allowClear={false}
              />
            </Form.Item>
          </Form>
        }
      />
      <ReportLayout userData={userData} hoursData={monthlyData} />
    </>
  );
};
export default ReportWeekly;
