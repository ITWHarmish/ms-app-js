import { Dropdown, MenuProps, Tag, message } from "antd";

import { updateProject } from "../../../redux/actions/projectAction";
import { PROJECT_STATUS } from "../../../util/constants";

const StatusColumnFormatter = (text, record, dispatch) => {
  let tag = { name: "", color: "" };

  PROJECT_STATUS.forEach((status) => {
    if (status.value === record.status) {
      tag = { name: status.label, color: status.color };
    }
  });

  const items: MenuProps["items"] = [];

  PROJECT_STATUS.map((item) =>
    items.push({
      key: item.value,
      label: item.label,
      onClick: (select) => {
        dispatch(updateProject({ ...record, status: select.key }));
        message.success("Project updated successfully!");
      },
    }),
  );

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Tag
          color={tag.color}
          style={{
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {tag.name}
        </Tag>
      </Dropdown>
    </>
  );
};

export default StatusColumnFormatter;
