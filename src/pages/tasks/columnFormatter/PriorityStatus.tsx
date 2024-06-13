import { Dropdown, MenuProps, Tag } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { updateTask } from "../../../redux/actions/taskAction";
import { PRIORITY_STATUS } from "../../../util/constants";

dayjs.extend(localizedFormat);

const PriorityStatus = (text, record, dispatch) => {
  let tag = { name: "", color: "" };

  PRIORITY_STATUS.forEach((status) => {
    if (status.value === record.priority) {
      tag = { name: status.label, color: status.color };
    }
  });

  const items: MenuProps["items"] = [];

  PRIORITY_STATUS.map((item) =>
    items.push({
      key: item.value,
      label: item.label,
      // onClick: (select) => {
      //   dispatch(updateTask({ id: record._id, task: { status: select.key, startDate: dayjs().format() } }));
      // },
    }),
  );

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Tag
          color={tag.color}
          style={{
            width: "50%",
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

export default PriorityStatus;
