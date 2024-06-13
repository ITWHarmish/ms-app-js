import "./kanbanBoard.css";

// import { Space, Spin } from "antd";
import PageHeader from "../../components/pageHeader/PageHeader";

// import "smart-webcomponents-react/source/styles/smart.default.css";
// import { Kanban } from "smart-webcomponents-react/kanban";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";

// import { useAuthValue } from "../../context/AuthContext";
// import { deleteTask, updateTask } from "../../redux/actions/taskAction";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { TASK_STATUS } from "../../util/constants";

const KanbanBoard = () => {
  // const { currentUser } = useAuthValue();
  // const dispatch = useAppDispatch();
  // const task = useAppSelector((state) => state.task.task);

  // const [dataSources, setDataSources] = useState([]);
  // console.log("dataSources", dataSources);

  // useEffect(() => {
  //   const data = task.filter((data) => data.assignedTo === currentUser.uid);
  //   const kanbanData = [];
  //   data.map((data) => {
  //     kanbanData.push({ ...data, text: data.task });
  //   });
  //   setDataSources(kanbanData);
  // }, [task]);

  // const handleUpdateTaskStatus = (data) => {
  //   const id = data.detail.oldValue._id;
  //   const status = data.detail.value.status;
  //   id && status ? dispatch(updateTask({ id: id, task: { status: status, startDate: dayjs().format() } })) : "";
  // };

  // const handleDeleteTask = (ev) => {
  //   // dispatch(deleteTask({ id: ev?.detail?.value?._id }));
  // };

  // const columns = [
  //   {
  //     label: "Not Started",
  //     dataField: "0",
  //   },
  //   {
  //     label: "In Progress",
  //     dataField: "1",
  //   },
  //   {
  //     label: "In Review",
  //     dataField: "4",
  //   },
  //   {
  //     label: "On Hold",
  //     dataField: "2",
  //   },
  //   {
  //     label: "Complete",
  //     dataField: "3",
  //   },
  // ];
  // console.log("dataSources", dataSources);

  return (
    <div>
      <PageHeader title="Task Board" />
      {/* {dataSources.length == 0 && (
        <Space style={{ width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
          <Spin size="small" />
        </Space>
      )} */}
      {/* <Kanban
        style={{ width: "100%", height: `${screen.height - 320}px` }}
        columns={columns}
        taskUserIcon={false}
        dataSource={dataSources}
        onChange={(event) => handleUpdateTaskStatus(event)}
        columnFooter={true}
        columnSummary={true}
        disableDialog
        taskActions={isExecutor}
        onTaskRemove={(ev) => handleDeleteTask(ev)}
      ></Kanban> */}
    </div>
  );
};

export default KanbanBoard;
