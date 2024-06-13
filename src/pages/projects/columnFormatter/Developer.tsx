import { Dropdown, MenuProps, Typography, Tag, message } from "antd";

import { updateProject } from "../../../redux/actions/projectAction";

const DeveloperColumnFormatter = (_text, record, users, dispatch) => {
  const items: MenuProps["items"] = [];

  if (users) {
    users.map((item) =>
      items.push({
        key: item.id,
        label: item.firstName + " " + item.lastName,
        onClick: async (select) => {
          const selectedDevelopers = [...record.developers, select.key];
          dispatch(updateProject({ ...record, developers: selectedDevelopers }));
          message.success("Project updated successfully!");
        },
      }),
    );

    const developer = users?.filter((user) => record?.developers?.includes(user?.id));

    return (
      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            style={{
              display: "flex",
              gap: "3px",
              margin: "auto",
            }}
          >
            {developer?.length > 0 ? (
              developer.map((dev) => <Tag key={dev.id}>{dev.firstName + " " + dev.lastName}</Tag>)
            ) : record.developers?.length > 0 ? (
              record.developers.map((dev) => <Tag key={dev.id}>{dev}</Tag>)
            ) : (
              <Typography.Text type="secondary">Developer</Typography.Text>
            )}
          </div>
        </Dropdown>
      </>
    );
  }
};

export default DeveloperColumnFormatter;
