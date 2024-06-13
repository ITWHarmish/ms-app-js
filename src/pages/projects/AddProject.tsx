import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useFormik } from "formik";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { PlusOutlined } from "@ant-design/icons";

import Editor from "../../components/Editor/Editor";
import Error from "../../components/error/Error";
import PageHeader from "../../components/pageHeader/PageHeader";
import { createProject, readProject, updateProject } from "../../redux/actions/projectAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IProject } from "../../types/iProject";
import { DATE_FORMAT, PROJECT_STATUS } from "../../util/constants";

const { Option } = Select;

dayjs.extend(localizedFormat);

const AddProject = () => {
  const formRef: any = createRef();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userState.user);

  const [skills, setSkills] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");

  const inputRef = useRef<any>(null);
  const editInputRef = useRef<any>(null);

  useEffect(() => {
    dispatch(readProject());
  }, [dispatch]);

  const projectState = useAppSelector((state: any) => state.project);

  let project: any = null;

  if (projectId) {
    project = projectState.project.find((project: any) => project._id === projectId);
  }

  const initialValues: IProject = {
    pid: project && project.pid ? project.pid : "",
    name: project && project.name ? project.name : "",
    company: project && project.company ? project.company : "",
    description: project && project.description ? project.description : "",
    status: project && project.status ? project.status : 0,
    leader: project && project.leader ? project.leader : "",
    developers: project && project.developers ? project.developers : [],
    category: project && project.category ? project.category : "",
    skills: project && project.skills ? project.skills : [],
    priority: project && project.priority ? project.priority : "",
    deadline: project && project.deadline ? project.deadline : new Date(),
  };

  const validationSchema = Yup.object().shape({
    pid: Yup.string().required("Project Prefix is required"),
    name: Yup.string().required("Project name is required"),
    company: Yup.string().required("Company name is required"),
  });

  const AddProjectForm = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (value: any) => {
      project ? dispatch(updateProject({ ...value, _id: project._id })) : dispatch(createProject(value));
      AddProjectForm.setSubmitting(false);
      AddProjectForm.resetForm();
      setSkills([]);
      navigate("/project", { replace: true });
    },
  });

  useEffect(() => {
    if (project) {
      setSkills(project.skills);
    }
  }, [project]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newskills = skills.filter((tag) => tag !== removedTag);

    setSkills(newskills);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && skills.indexOf(inputValue) === -1) {
      setSkills([...skills, inputValue]);
    }
    AddProjectForm.setFieldValue("skills", skills);
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newskills = [...skills];
    newskills[editInputIndex] = editInputValue;
    setSkills(newskills);
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <>
      <PageHeader title="Add New Project" />
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={AddProjectForm.handleSubmit}
        autoComplete="off"
        ref={formRef}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col md={16} span={24}>
            <Card>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Project Prefix">
                    <Input
                      type="text"
                      name="pid"
                      value={AddProjectForm.values.pid}
                      onChange={AddProjectForm.handleChange}
                    />
                    {AddProjectForm.errors.pid && <Error message={AddProjectForm.errors.pid as string} />}
                  </Form.Item>
                </Col>
                <Col md={16} span={16}>
                  <Form.Item label="Project Title">
                    <Input
                      type="text"
                      name="name"
                      value={AddProjectForm.values.name}
                      onChange={AddProjectForm.handleChange}
                    />
                    {AddProjectForm.errors.name && <Error message={AddProjectForm.errors.name as string} />}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Choose a company">
                <Input
                  type="text"
                  name="company"
                  value={AddProjectForm.values.company}
                  onChange={AddProjectForm.handleChange}
                />
                {AddProjectForm.errors.company && <Error message={AddProjectForm.errors.company as string} />}
              </Form.Item>
              <Form.Item label="Add a Description">
                <Editor
                  data={AddProjectForm.values.description}
                  handleChange={(data: string) => {
                    AddProjectForm.setFieldValue("description", data);
                  }}
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Priority">
                    <Form.Item label="priority" noStyle initialValue={AddProjectForm.initialValues.priority}>
                      <Select
                        value={AddProjectForm.values.priority}
                        onChange={(value) => AddProjectForm.setFieldValue("priority", value)}
                      >
                        <Option value="High" key={"high"}>
                          High
                        </Option>
                        <Option value="Medium" key={"medium"}>
                          Medium
                        </Option>
                        <Option value="Low" key={"low"}>
                          Low
                        </Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Status">
                    <Form.Item name="status" noStyle initialValue={AddProjectForm.initialValues.status}>
                      <Select
                        value={AddProjectForm.values.status}
                        onChange={(value) => AddProjectForm.setFieldValue("status", value)}
                      >
                        {PROJECT_STATUS.map((status, index) => (
                          <Option value={status.value} key={index}>
                            {status.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {AddProjectForm.errors.status && <Error message={AddProjectForm.errors.status as string} />}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Deadline">
                    <Form.Item name="deadline" noStyle initialValue={dayjs(AddProjectForm.values.deadline)}>
                      <DatePicker
                        onChange={(date, dateString) => {
                          AddProjectForm.setFieldValue("deadline", dateString);
                        }}
                        value={dayjs(AddProjectForm.values.deadline)}
                        style={{ width: "100%" }}
                        format={DATE_FORMAT}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={8} span={24}>
            <Card title="Skills" bordered={false} style={{ marginBottom: 16 }}>
              <Form.Item label="Category">
                <Form.Item name="category" noStyle initialValue={AddProjectForm.initialValues.category}>
                  <Select
                    value={AddProjectForm.values.category}
                    onChange={(value) => AddProjectForm.setFieldValue("category", value)}
                  >
                    <Option value="Designing" key={"designing"}>
                      Designing
                    </Option>
                    <Option value="Development" key={"development"}>
                      Development
                    </Option>
                  </Select>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Skills">
                {skills.map((tag, index) => {
                  if (editInputIndex === index) {
                    return (
                      <Input
                        ref={editInputRef}
                        key={tag}
                        size="small"
                        className="tag-input"
                        value={editInputValue}
                        onChange={handleEditInputChange}
                        onBlur={handleEditInputConfirm}
                        onPressEnter={handleEditInputConfirm}
                      />
                    );
                  }

                  const isLongTag: any = tag.length > 20;

                  const tagElem = (
                    <Tag className="edit-tag" key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
                      <span
                        onDoubleClick={(e) => {
                          if (index !== 0) {
                            setEditInputIndex(index);
                            setEditInputValue(tag);
                            e.preventDefault();
                          }
                        }}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </span>
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
                {inputVisible && (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
              </Form.Item>
            </Card>
            <Card title="Members" bordered={false}>
              <Form.Item label="Team lead">
                <Select
                  value={AddProjectForm.values.leader}
                  onChange={(value) => AddProjectForm.setFieldValue("leader", value)}
                >
                  {users &&
                    users.map((user: any, index) => (
                      <Option value={user.id} key={index}>
                        {`${user.firstName} ${user.lastName}`}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="Team Members" initialValue={AddProjectForm.initialValues.developers}>
                <Select
                  mode="multiple"
                  allowClear
                  value={AddProjectForm.values.developers}
                  onChange={(value) => AddProjectForm.setFieldValue("developers", value)}
                >
                  {users &&
                    users.map((user: any, index) => (
                      <Option value={user.id} key={index}>
                        {`${user.firstName} ${user.lastName}`}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>
        <Space style={{ marginTop: 16 }}>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={AddProjectForm.isSubmitting}>
              {project ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default AddProject;
