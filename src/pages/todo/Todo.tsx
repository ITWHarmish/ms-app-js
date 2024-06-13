import "./Todo.scss";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import PageHeader from "../../components/pageHeader/PageHeader";
import { DATE_FORMAT } from "../../util/constants";
import MyTodo from "./components/MyToDo";

const Todo = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <PageHeader
        title="My Day Planning for"
        left={
          <DatePicker
            defaultValue={dayjs(date)}
            onChange={(dateP: any) => setDate(new Date(dateP.$d))}
            clearIcon={false}
            format={DATE_FORMAT}
            style={{ width: "170px" }}
          />
        }
      />
      <MyTodo date={date} />
    </>
  );
};

export default Todo;
