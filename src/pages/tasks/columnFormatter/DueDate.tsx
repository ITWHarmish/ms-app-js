import { DatePicker, Dropdown, MenuProps, Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { updateTask } from "../../../redux/actions/taskAction";
import { DATE_FORMAT_SHORT } from "../../../util/constants";

dayjs.extend(localizedFormat);

const DueDate = (text, record, isExecutor, dispatch) => {
  const onChanges = (dayjs, dateStrings) => {
    dispatch(updateTask({ id: record._id, task: { dueDate: dateStrings } }));
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <DatePicker
          defaultOpen
          onChange={onChanges}
          style={{
            visibility: "hidden",
            height: 0,
            width: 0,
            padding: 0,
            position: "absolute",
            margin: -15,
          }}
        />
      ),
    },
  ];

  const dueDate = dayjs(record.dueDate).format(DATE_FORMAT_SHORT);

  const isBefore = dayjs(record.dueDate).isBefore(dayjs(), "day");

  return (
    <>
      {isExecutor ? (
        <Typography.Text type={isBefore ? "danger" : "warning"}>{dueDate}</Typography.Text>
      ) : (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Typography.Text type={isBefore ? "danger" : "warning"}>{dueDate}</Typography.Text>
        </Dropdown>
      )}
    </>
  );
};

export default DueDate;
