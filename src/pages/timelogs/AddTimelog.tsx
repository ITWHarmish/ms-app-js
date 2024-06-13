import { Button, Cascader, Checkbox, Col, Form, Input, Row, Select, Space, Spin, TimePicker } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DefaultOptionType } from "rc-cascader";
import { useEffect } from "react";

import { CloseOutlined, SaveOutlined } from "@ant-design/icons";

import SelectSearch from "../../components/custom/SelectSearch";
import { useAuthValue } from "../../context/AuthContext";
import { createTimelog, updateTimelog } from "../../redux/actions/timelogAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITask } from "../../types/iTask";
import { ITimelog } from "../../types/iTimelog";
import { TIMELOG_CATEGORY } from "../../util/constants";
import { TASK_STATUS_VALUE } from "../../util/enums";

dayjs.extend(localizedFormat);

type AddTimelogProps = {
  date: Date;
  record?: any;
  setSelectRecord?: any;
};

const AddTimelog = ({ date, record, setSelectRecord }: AddTimelogProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthValue();

  const [form] = Form.useForm();

  const projectState = useAppSelector((state: any) => state.project);
  const tasks = useAppSelector((state: any) => state.task.task);

  // const [isToday, setIsToday] = useState<boolean>();

  const category: any = [
    { value: TIMELOG_CATEGORY.CODING, label: "Coding" },
    { value: TIMELOG_CATEGORY.MANAGEMENT, label: "Management" },
    { value: TIMELOG_CATEGORY.REVIEW, label: "Review" },
    { value: TIMELOG_CATEGORY.LEARNING, label: "Learning" },
    { value: TIMELOG_CATEGORY.TRAINING, label: "Training" },
    { value: TIMELOG_CATEGORY.INTERVIEW, label: "Interview" },
  ];

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        time: [dayjs(record.startTime), dayjs(record.endTime)],
        category: record.category,
        project: record.project && [record.project._id, record.task_id],
        description: record.description,
        billable: record.billable,
      });
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    const timesheet: ITimelog = {
      userId: currentUser.uid,
      date: dayjs(date).format(),
      startTime: dayjs(values.time[0]).format(),
      endTime: dayjs(values.time[1]).format(),
      category: values.category,
      description: values.description,
      billable: values.billable,
    };
    if (values.project) {
      timesheet.project = values.project[0];
      timesheet.task_id = values.project[1];
    }
    record ? dispatch(updateTimelog({ ...timesheet, _id: record._id })) : dispatch(createTimelog(timesheet));
    form.resetFields();
    setSelectRecord(undefined);
  };

  // useEffect(() => {
  //   setIsToday(dayjs(date).format("L") !== dayjs().format("L"));
  // }, [date]);

  const options = projectState.project.map((project: any) => ({
    value: project._id,
    label: project.name,
    children: tasks
      .filter(
        (task: ITask) =>
          task.status != TASK_STATUS_VALUE.CANCELED &&
          task.status != TASK_STATUS_VALUE.DONE &&
          task.project === project._id,
      )
      .map((task: ITask) => ({ value: task.tid, label: task.tid + " " + task.title })),
  }));

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

  return (
    <>
      {projectState.isLoading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
          <Row gutter={8}>
            <Col md={2}>
              <Form.Item name="billable" valuePropName="checked">
                <Checkbox>Billable</Checkbox>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item name="time" rules={[{ required: true, message: "Required" }]}>
                <TimePicker.RangePicker use12Hours format="HH:mm" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col md={3}>
              <Form.Item name="category" rules={[{ required: true, message: "Required" }]}>
                <SelectSearch placeholder="Category">
                  {category
                    .sort((a: any, b: any) => a.label.localeCompare(b.label))
                    .map((c: { value: string; label: string }, i: number) => (
                      <Select.Option key={i} value={c.value}>
                        {c.label}
                      </Select.Option>
                    ))}
                </SelectSearch>
              </Form.Item>
            </Col>
            <Col md={4}>
              <Form.Item name="project">
                <Cascader options={options} placeholder="Project" showSearch={{ filter }} />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item name="description" rules={[{ required: true, message: "Required" }]}>
                <Input type="text" placeholder="Description" />
              </Form.Item>
            </Col>
            <Col md={2}>
              {record ? (
                <Space>
                  <Button type="primary" shape="circle" icon={<SaveOutlined />} htmlType="submit" />
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setSelectRecord(undefined);
                      form.resetFields();
                    }}
                  />
                </Space>
              ) : (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default AddTimelog;
