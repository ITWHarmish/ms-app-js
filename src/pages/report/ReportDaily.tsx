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

const ReportDaily = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const monthlyData = useAppSelector((state: any) => state.reportTimelogState.timelog);

  const [filter, setFilter] = useState({
    startDate: dayjs().format(DATE_FORMAT_API),
    endDate: dayjs().add(1, "days").format(DATE_FORMAT_API),
  });

  const handleDatePickerChange: DatePickerProps["onChange"] = (values: any) => {
    setFilter({
      startDate: dayjs(values).format(DATE_FORMAT_API),
      endDate: dayjs(values).add(1, "days").format(DATE_FORMAT_API),
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
        title={`Daily Report of ${filter.startDate}`}
        right={
          <Form name="basic" form={form} autoComplete="off" layout="horizontal" style={{ display: "flex" }}>
            <Form.Item name="date" label="Date" style={{ marginRight: 8 }}>
              <DatePicker
                defaultValue={dayjs()}
                onChange={handleDatePickerChange}
                format={DATE_FORMAT_API}
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
export default ReportDaily;
