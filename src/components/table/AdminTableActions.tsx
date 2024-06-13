import { Button, Modal, Space, Tooltip } from "antd";

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { useAuthValue } from "../../context/AuthContext";

const AdminTableActions = ({ type = "icon", handleEdit, handleDelete }) => {
  const { isExecutor } = useAuthValue();

  return (
    <Space style={{ justifyContent: "center" }}>
      {type === "icon" && (
        <>
          <Tooltip title="Edit">
            <Button size="small" shape="circle" icon={<EditOutlined />} disabled={isExecutor} onClick={handleEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={isExecutor}
              onClick={() => {
                Modal.confirm({
                  title: "You are about to delete this record!",
                  icon: <ExclamationCircleFilled />,
                  content: "This action is irreversible",
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",
                  onOk() {
                    handleDelete();
                  },
                });
              }}
            />
          </Tooltip>
        </>
      )}
      {type === "button" && (
        <>
          <Button icon={<EditOutlined />} disabled={isExecutor} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            disabled={isExecutor}
            onClick={() => {
              Modal.confirm({
                title: "You are about to delete this record!",
                icon: <ExclamationCircleFilled />,
                content: "This action is irreversible",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                  handleDelete();
                },
              });
            }}
          >
            Delete
          </Button>
        </>
      )}
    </Space>
  );
};

export default AdminTableActions;
