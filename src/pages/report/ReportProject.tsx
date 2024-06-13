import React from "react";
import { useState, useEffect } from "react";
import { Col, DatePicker, Form, Row, Table, Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PageHeader from "../../components/pageHeader/PageHeader";
import { reportTimelogs } from "../../redux/actions/reportTimelogAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DATE_FORMAT_API } from "../../util/constants";

dayjs.extend(localizedFormat);

const ReportProject = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { Column } = Table;

  const [dataSources, setDataSources] = useState<any>();
  const [projectRecord, setProjectRecord] = useState<any>();
  const [memberHours, setMemberHours] = useState<any>();
  const [projectHours, setProjectHours] = useState<any>();

  const monthlyData = useAppSelector((state: any) => state.reportTimelogState.timelog);
  const projectData = useAppSelector((state: any) => state.project.project);

  const totalresult = memberHours && memberHours.length > 0 && memberHours.reduce((acc: any, curr: any) => {
    const totalSum = curr.reduce((a: any, b: any) => a + parseFloat(b.total), 0);
    return acc + totalSum;
  }, 0);

  const result = memberHours && memberHours.length > 0 && memberHours.map((item: any) => {
    const totalSum = item.reduce((acc: any, curr: any) => acc + parseFloat(curr.total), 0);
    return totalSum;
  });

  const totals = projectHours && projectHours.length > 0 && projectHours.reduce((acc: any, curr: any) => {
    if (acc[curr.name]) {
      acc[curr.name] += parseFloat(curr.total);
    } else {
      acc[curr.name] = parseFloat(curr.total);
    }
    return acc;
  }, {});

  const membersNumbers = projectHours && projectHours.length > 0 && projectHours.reduce((acc: any, child: any) => {
    if (!acc[child.name]) {
      acc[child.name] = 0;
    }
    acc[child.name]++;
    return acc;
  }, {});

  const [filter, setFilter] = useState({
    startDate: dayjs().subtract(7, "days").format(DATE_FORMAT_API),
    endDate: dayjs().format(DATE_FORMAT_API),
  });

  const handleDatePickerChange: any = (values: any) => {
    setFilter({
      startDate: dayjs(values[0]).format(DATE_FORMAT_API),
      endDate: dayjs(values[1]).format(DATE_FORMAT_API),
    });
  };

  useEffect(() => {
    dispatch(reportTimelogs({ startDate: filter.startDate, endDate: filter.endDate }));
  }, [dispatch, filter]);

  useEffect(() => {
    const userData = [];
    const membersHour = [];
    const projectsHour = [];
    monthlyData.map((item: any) => {
      membersHour.push(item.hours.project);
      const uData = { name: item.name, project: {}, ...item.hours.total };
      item.hours.project.map((hour: any) => {
        projectsHour.push({ id: hour.project.id, name: hour.project.name, total: hour.total });
        uData.project[hour.project.name] = hour.total;
      });
      userData.push(uData);
      return uData;
    });
    setDataSources(userData);
    setMemberHours(membersHour);
    setProjectHours(projectsHour);

    const pData = [];
    projectData.map((item: any) => {
      if (item.status != 3) {
        pData.push({ projectname: item.name });
        setProjectRecord(pData);
      }
    });
  }, [monthlyData, projectData]);

  const footerData = (() => {
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} align="center">
            <Typography.Text strong>Total</Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1} align="center">
            <Typography.Text strong>{totalresult && totalresult.toFixed(2)}</Typography.Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2} align="center">
            <Typography.Text strong>{projectHours && projectHours.length}</Typography.Text>
          </Table.Summary.Cell>
          {result && result.map((item: any) => (
            <>
              <Table.Summary.Cell index={3} align="center" colSpan={1}>
                <Typography.Text strong>{item && item.toFixed(2)}</Typography.Text>
              </Table.Summary.Cell>
            </>
          ))}
        </Table.Summary.Row>
      </Table.Summary >
    );
  });

  return (
    <>
      <PageHeader
        title={`Project Report of ${filter.startDate} to ${filter.endDate}`}
        right={
          <Form name="basic" form={form} autoComplete="off" layout="horizontal" style={{ display: "flex" }}>
            <Form.Item name="month" style={{ marginRight: 8 }} initialValue={[dayjs().subtract(7, "days"), dayjs()]}>
              <DatePicker.RangePicker onChange={handleDatePickerChange} allowClear={false} />
            </Form.Item>
          </Form>
        }
      />
      <Row gutter={16}>
        <Col span={24}>
          <Table dataSource={projectRecord} scroll={{ x: 1200 }} pagination={false} bordered summary={footerData} size="small">
            <Column
              title="Project Name"
              dataIndex="projectname"
              key="projectname"
              width={155}
              fixed="left"
            />
            <Column
              title="Total"
              dataIndex="projectname"
              key="total"
              width={100}
              fixed="left"
              align="center"
              render={(record) => (
                <>
                  {totals && record in totals ? totals[record].toFixed(2) : 0}
                </>
              )}
            />
            <Column
              title="Members"
              dataIndex="projectname"
              key="members"
              width={100}
              fixed="left"
              align="center"
              render={(record) => (
                <>
                  {membersNumbers && record in membersNumbers ? membersNumbers[record] : 0}
                </>
              )}
            />
            {dataSources && dataSources.map((item: any) => (
              <Column
                title={item.name}
                dataIndex="projectname"
                key={item.name}
                width={145}
                align="center"
                render={(record) => (
                  <>
                    {record in item.project ? item.project[record] : 0}
                  </>
                )}
              />
            ))}
          </Table>
        </Col>
      </Row >
    </>
  );
};

export default ReportProject;