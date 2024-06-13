import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect } from "react";

import SelectSearch from "../../../components/custom/SelectSearch";
import Editor from "../../../components/Editor/Editor";
import { useAppSelector } from "../../../redux/hooks";
import { DATE_FORMAT, TASK_LABEL, TASK_PRIORITIES, TASK_STATUS } from "../../../util/constants";
import { TASK_STATUS_VALUE } from "../../../util/enums";

dayjs.extend(localizedFormat);

const AddNewTask = ({ setForm, handleFinish, ckData }) => {
  const [form] = Form.useForm();

  const { project } = useAppSelector((state) => state.project);
  const users = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    setForm(form);
  }, []);

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleFinish}
      autoComplete="off"
      form={form}
      initialValues={{ status: TASK_STATUS[0].value }}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: "This field is required" }]}>
        <Input type="text" id="task" name="title" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Editor
          data={ckData}
          handleChange={(data: string) => {
            form.setFieldValue("description", data);
          }}
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="project" label="Project" rules={[{ required: true, message: "This field is required" }]}>
            <SelectSearch>
              {project &&
                project.map((project: any) => (
                  <Select.Option key={project._id} value={project._id}>
                    {project.name}
                  </Select.Option>
                ))}
            </SelectSearch>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="assignedTo" label="Assign To">
            <SelectSearch>
              {users &&
                users.map((user: any, index) => (
                  <Select.Option value={user.id} key={index}>
                    {`${user.firstName} ${user.lastName}`}
                  </Select.Option>
                ))}
            </SelectSearch>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="dueDate" label="Due Date">
            <DatePicker placeholder=" " style={{ width: "100%" }} format={DATE_FORMAT} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: "This field is required" }]}>
            <SelectSearch>
              {TASK_STATUS.map(
                (c) =>
                  c.value != TASK_STATUS_VALUE.DONE && (
                    <Select.Option value={c.value} key={c.value}>
                      {c.label}
                    </Select.Option>
                  ),
              )}
            </SelectSearch>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="priority" label="Priority" rules={[{ required: true, message: "This field is required" }]}>
            <Select>
              {TASK_PRIORITIES.map((priority) => (
                <Select.Option value={priority.value} key={priority.value}>
                  {priority.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="label" label="Label" rules={[{ required: true, message: "This field is required" }]}>
            <Select>
              {TASK_LABEL.map((label) => (
                <Select.Option value={label.value} key={label.value}>
                  {label.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewTask;
