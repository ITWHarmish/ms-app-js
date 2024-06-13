import { Dropdown, MenuProps, Typography } from "antd";

import { updateTask } from "../../../redux/actions/taskAction";

const DeveloperColumnFormatter = (text, record, users, dispatch) => {
  const items: MenuProps["items"] = [];

  if (users) {
    users.map((item) =>
      items.push({
        key: item.id,
        label: item.firstName + " " + item.lastName,
        onClick: (select) => {
          dispatch(updateTask({ id: record._id, task: { developer: select.key } }));
        },
      }),
    );

    const developer = users.find((user) => user.id === record.developer);

    return (
      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            {developer ? (
              `${developer?.firstName} ${developer?.lastName}`
            ) : (
              <Typography.Text type="secondary">Developer</Typography.Text>
            )}
          </Typography.Text>
        </Dropdown>
      </>
    );
  }
};

export default DeveloperColumnFormatter;
