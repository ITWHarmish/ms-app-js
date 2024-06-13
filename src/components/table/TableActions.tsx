import { Button, Modal, Space, Tooltip } from "antd";

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";

const TableActions = ({ type = "icon", handleEdit, handleDelete }) => {
  return (
    <Space style={{ justifyContent: "center" }}>
      {type === "icon" && (
        <>
          <Tooltip title="Edit">
            <Button size="small" shape="circle" icon={<EditOutlined />} onClick={handleEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              size="small"
              shape="circle"
              icon={<DeleteOutlined />}
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
          <Button icon={<EditOutlined />} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
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

export default TableActions;
