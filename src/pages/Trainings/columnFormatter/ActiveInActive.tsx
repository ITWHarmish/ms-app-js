import { Dropdown, MenuProps, Tag } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { ActiveInActiveStatus } from "../../../util/constants";

dayjs.extend(localizedFormat);

const ActiveInActive = (_text, record) => {
  let tag = { name: "", color: "" };

  ActiveInActiveStatus.forEach((status) => {
    if (status.value === record.status) {
      tag = { name: status.label, color: status.color };
    }
  });

  const items: MenuProps["items"] = [];

  ActiveInActiveStatus.map((item) =>
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

export default ActiveInActive;
