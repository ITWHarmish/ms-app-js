import { Button, Form } from "antd";

import Editor from "../../../components/Editor/Editor";
import { useAuthValue } from "../../../context/AuthContext";
import { createTaskComment } from "../../../redux/actions/taskAction";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ITaskComment } from "../../../types/iTask";

const TaskCommentAddForm = ({ taskId }: { taskId: string }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAuthValue();

  const [form] = Form.useForm();

  const hasError = useAppSelector((state) => state.task.hasError);

  const handleFinish = (values: ITaskComment) => {
    dispatch(createTaskComment({ id: taskId, comment: values.comment, by: currentUser.uid }));
    if (!hasError) form.resetFields();
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} autoComplete="off" form={form}>
      <Form.Item label="Leave a Comment" name="comment" rules={[{ required: true, message: "Please enter comment" }]}>
        <Editor
          handleChange={(data: string) => {
            form.setFieldValue("comment", data);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ float: "right", marginTop: 10 }}>
          Post Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskCommentAddForm;
