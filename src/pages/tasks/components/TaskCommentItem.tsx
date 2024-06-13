import { Avatar, Divider, Space, Typography } from "antd";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { IUser } from "../../../types/iUser";
import { createMarkup } from "../../../util/common";
import { DATE_FORMAT } from "../../../util/constants";

dayjs.extend(localizedFormat);

const TaskCommentItem = ({ item }) => {
  const [user, setUser] = useState<IUser>();

  const users = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    const u = users.find((user) => user.id === item.by);
    setUser(u);
  }, [users, item]);

  return (
    <Space align="start">
      <Avatar src={user?.profileImage} />
      <Space direction="vertical">
        <Space>
          <Typography.Text strong>{user?.firstName + " " + user?.lastName}</Typography.Text>
          {item.at && <Typography.Text type="secondary">{dayjs(item.at).format(DATE_FORMAT)}</Typography.Text>}
        </Space>
        <div dangerouslySetInnerHTML={createMarkup(item.comment)}></div>
      </Space>
      <Divider />
    </Space>
  );
};

export default TaskCommentItem;
