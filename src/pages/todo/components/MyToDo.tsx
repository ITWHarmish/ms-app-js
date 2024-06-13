import { Button, Checkbox, Col, Form, Input, Row, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import { CloseOutlined, SaveOutlined } from "@ant-design/icons";

import TableActions from "../../../components/table/TableActions";
import { useAuthValue } from "../../../context/AuthContext";
import { createTodo, deleteTodo, updateTodo } from "../../../redux/actions/todoAction";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ITodo } from "../../../types/iTodo";
import { TASK_STATUS } from "../../../util/constants";
import StatusColumnFormatter from "../columnFormatter/Status";

import type { ColumnsType } from "antd/es/table";

dayjs.extend(localizedFormat);

const MyTodo = ({ date }: { date?: string | Date }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthValue();
  const [form] = useForm();

  const [selectRecord, setSelectRecord] = useState<any>();
  const [selectRowData, setSelectRowData] = useState<any>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const todoState = useAppSelector((state: any) => state.todo.todo);

  const handleDataSource = () => {
    return todoState?.filter((todo) => {
      if (dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD") && todo.status !== "3") {
        return todo;
      } else {
        return dayjs(todo.date).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD") && todo.status === "3";
      }
    });
  };

  const columns: ColumnsType<unknown> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record: ITodo) => (
        <Space>
          <Checkbox
            onChange={(e) =>
              e.target.checked
                ? setSelectRowData((oldArray) => [...oldArray, record])
                : setSelectRowData((oldArray) => oldArray.filter((val) => val._id !== record._id))
            }
          />
          {text}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (text) => dayjs(text).format("ll"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => StatusColumnFormatter(text, record, dispatch),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record: any) => (
        <Space>
          <TableActions
            handleEdit={() => {
              setSelectRecord(record);
            }}
            handleDelete={() => {
              dispatch(deleteTodo(record));
            }}
          />
        </Space>
      ),
      align: "center",
      width: 100,
    },
  ];

  useEffect(() => {
    if (selectRecord) {
      form.setFieldsValue({
        title: selectRecord.title,
      });
    }
  }, [selectRecord, form]);

  const onFinish = (values: any) => {
    if (selectRecord) {
      const updateTodoPayload: ITodo = {
        _id: selectRecord._id,
        userId: currentUser.uid,
        title: values.title,
        status: selectRecord.status,
        date: selectRecord.date,
      };
      dispatch(updateTodo(updateTodoPayload));
    } else {
      const createTodoPayload: ITodo = {
        userId: currentUser.uid,
        title: values.title,
        status: "0",
        date: dayjs(values.date).format("YYYY-MM-DD"),
      };
      dispatch(createTodo(createTodoPayload));
    }
    form.resetFields();
    setSelectRecord(undefined);
  };

  const handleMapData = (date) => selectRowData.filter((item) => date == item.date);

  const getUniqueDate = (array) => {
    const unique = [];
    const distinct = [];
    for (let i = 0; i < array.length; i++) {
      if (!unique[array[i].date]) {
        distinct.push(array[i].date);
        unique[array[i].date] = 1;
      }
    }
    return distinct;
  };

  const getStatus = (status: string) => {
    return TASK_STATUS.find((s) => s.value === status).label;
  };

  const handleCopyData = () => {
    const tempInput: any = document.createElement("textarea");
    tempInput.value = getUniqueDate(selectRowData).map((data) => {
      return `${dayjs(data).format("DD-MM-YYYY")}'s Tasks${"\n\n"}${handleMapData(data).map((item) => {
        return `   • ${item.title} (${getStatus(item.status)})${"\n"}`.replace(",", "");
      })}${"\n"}`.replace(",", "");
    });
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <>
      <Space direction="vertical">
        <Form name="Todo" onFinish={onFinish} autoComplete="off" form={form}>
          <Row gutter={8}>
            <Col style={{ flex: 1 }}>
              <Form.Item name="title" rules={[{ required: true, message: "Required!" }]}>
                <Input placeholder="Add new" type="text" name="title" />
              </Form.Item>
            </Col>
            <Col>
              {selectRecord ? (
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
                <>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  {selectRowData.length > 0 && (
                    <Button type="primary" style={{ marginLeft: 5 }} onClick={handleCopyData}>
                      {isCopied ? "Copied" : "Copy Planning"}
                    </Button>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Form>
        <Table
          size="small"
          columns={columns}
          dataSource={handleDataSource() || []}
          rowKey={(record: any) => record._id as string}
        />
      </Space>
    </>
  );
};

export default MyTodo;
