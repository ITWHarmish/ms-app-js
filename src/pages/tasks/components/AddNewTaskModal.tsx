import { Button, Modal } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import { createTask, updateTask } from "../../../redux/actions/taskAction";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ITask } from "../../../types/iTask";
import AddNewTask from "./AddNewTask";

dayjs.extend(localizedFormat);

const AddNewTaskModal = ({ selectRecord, setSelectRecord, isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();

  const taskError = useAppSelector((state) => state.task.hasError);
  const taskLoading = useAppSelector((state) => state.task.isLoading);

  const [form, setForm] = useState<any>();
  const [ckData, setCKData] = useState<any>();

  useEffect(() => {
    if (selectRecord) {
      form?.setFieldsValue({
        project: selectRecord.project,
        title: selectRecord.title,
        assignedTo: selectRecord.assignedTo,
        dueDate: dayjs(selectRecord.dueDate),
        status: selectRecord.status,
        priority: selectRecord.priority,
        label: selectRecord.label,
      });
      setCKData(selectRecord.description);
    }
  }, [selectRecord, form]);

  const handleFinish = (values: any) => {
    const task: ITask = {
      project: values.project,
      title: values.title,
      description: values.description,
      assignedTo: values.assignedTo,
      dueDate: dayjs(values.dueDate).format(),
      status: values.status,
      priority: values.priority,
      label: values.label,
    };
    selectRecord ? dispatch(updateTask({ id: selectRecord._id, task: task })) : dispatch(createTask({ task: task }));
    if (!taskError) {
      form.resetFields();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectRecord(undefined);
    setCKData(undefined);
  };

  return (
    <Modal
      title={selectRecord ? "Update Task" : "Add Task"}
      open={isModalOpen}
      onCancel={handleCancel}
      closable
      centered
      width="50%"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()} loading={taskLoading}>
          {selectRecord ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <AddNewTask setForm={(form) => setForm(form)} handleFinish={handleFinish} ckData={ckData} />
    </Modal>
  );
};

export default AddNewTaskModal;
