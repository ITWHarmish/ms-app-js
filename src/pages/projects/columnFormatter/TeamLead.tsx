import { Dropdown, MenuProps, Typography, message } from "antd";

import { updateProject } from "../../../redux/actions/projectAction";

const TeamLead = (text, record, users, dispatch) => {
  const items: MenuProps["items"] = [];

  if (users) {
    users.map((item) =>
      items.push({
        key: item.id,
        label: item.firstName + " " + item.lastName,
        onClick: (select) => {
          dispatch(updateProject({ ...record, leader: select.key }));
          message.success("Project updated successfully!");
        },
      }),
    );

    const teamLeader = users.find((user) => user.id === record.leader);

    return (
      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            {teamLeader ? (
              teamLeader.firstName + " " + teamLeader.lastName
            ) : record.leader?.length > 0 ? (
              record.leader
            ) : (
              <Typography.Text type="secondary">Leader</Typography.Text>
            )}
          </Typography.Text>
        </Dropdown>
      </>
    );
  }
};

export default TeamLead;
