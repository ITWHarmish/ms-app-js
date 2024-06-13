import { Dropdown, MenuProps, Typography } from "antd";
import { updateTrainingList } from "../../../redux/actions/trainingListAction";

const Assignee = (_text, record, users, dispatch) => {
  const items: MenuProps["items"] = [];

  if (users) {
    users.map((item) =>
      items.push({
        key: item.id,
        label: item.firstName + " " + item.lastName,
        onClick: (select) => {
          dispatch(updateTrainingList({ ...record, mentorName: select.key }));
        },
      }),
    );
    const assignee = users.find((user) => user.id === record.mentorName);

    return (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Typography.Text style={{ whiteSpace: "nowrap" }}>
          {assignee ? (
            assignee.firstName + " " + assignee.lastName
          ) : (
            <Typography.Text type="secondary">Assign to</Typography.Text>
          )}
        </Typography.Text>
      </Dropdown>
    );
  }
};

export default Assignee;
