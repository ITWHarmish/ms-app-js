import { Dropdown, MenuProps, Tag } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { updateTask } from "../../../redux/actions/taskAction";
import { TASK_STATUS } from "../../../util/constants";

dayjs.extend(localizedFormat);

const StatusColumnFormatter = (text, record, user, dispatch) => {
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
        const payload: any = { status: select.key, startDate: dayjs().format() };
        if (!record.developer) {
          payload.developer = user.uid;
        }
        dispatch(updateTask({ id: record._id, task: payload }));
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
