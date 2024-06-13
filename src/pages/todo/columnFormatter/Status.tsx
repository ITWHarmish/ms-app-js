import { Dropdown, MenuProps, Tag } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { updateTodo } from "../../../redux/actions/todoAction";
import { TASK_STATUS } from "../../../util/constants";

dayjs.extend(localizedFormat);

const StatusColumnFormatter = (text, record, dispatch) => {
  let tag = { name: "", color: "" };

  TASK_STATUS.forEach((status) => {
    if (status.value === record.status) {
      tag = { name: status.label, color: status.color };
    }
  });

  const items: MenuProps["items"] = [];

  TASK_STATUS.map((item) =>
    items.push({
      key: item.value,
      label: item.label,
      onClick: (select) => {
        dispatch(updateTodo({ ...record, status: select.key }));
      },
    }),
  );

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Tag
          color={tag.color}
          style={{
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
