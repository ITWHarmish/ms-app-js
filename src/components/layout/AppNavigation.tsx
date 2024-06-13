import { Menu, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import {
  ApartmentOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  FundProjectionScreenOutlined,
  PieChartOutlined,
  ProjectOutlined,
  SendOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { useAuthValue } from "../../context/AuthContext";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AppNavigation = () => {
  const { isExecutor } = useAuthValue();

  const items: MenuItem[] = [
    getItem(<Link to="/">Dashboard</Link>, "dashboard", <PieChartOutlined />),
    getItem(<Link to="/timelog">Timelog</Link>, "timelog", <FieldTimeOutlined />),
    getItem(<Link to="/task">Tasks</Link>, "task", <UnorderedListOutlined />),
    // getItem("Plan", "tasks", <UnorderedListOutlined />, [
    //   getItem(<Link to="/todo">To Do</Link>, "todo"),
    //   getItem(<Link to="/task">Tasks</Link>, "listView"),
    //   getItem(<Link to="/task-board">Task Board</Link>, "kanbanBoard"),
    // ]),
    // getItem(<Link to="/calendar">Calendar</Link>, "calendar", <CalendarOutlined />),
    // getItem(<Link to="/leave">Leaves</Link>, "leave", <SendOutlined />),
    // getItem("Training", "training", <ApartmentOutlined />, [
    //   getItem(<Link to="/training/training-list">Training List</Link>, "training-list"),
    //   getItem(<Link to="/training/trainer">Trainers</Link>, "trainer"),
    //   getItem(<Link to="/training/training-type">Training Type</Link>, "training-type"),
    // ]),
    getItem(<Link to="/report/project">Report</Link>, "reports::project", <BookOutlined />),
    getItem(<Link to="/events">Events</Link>, "reports::event", <BookOutlined />),
    // getItem("Reports", "reports", <BookOutlined />, [
    // getItem(<Link to="/report/summary">Timelog Summary</Link>, "reports::summary"),
    // getItem(<Link to="/report/daily">Report Daily</Link>, "reports::daily"),
    // getItem(<Link to="/report/weekly">Report Weekly</Link>, "reports::Weekly"),
    // getItem(<Link to="/report/monthly">Report Monthly</Link>, "reports::monthly"),
    // getItem(<Link to="/report/project">Project Report</Link>, "reports::project"),
    // ]),
    // getItem(<Link to="/profile">Profile</Link>, "profile", <UserOutlined />),
    !isExecutor
      ? getItem("Settings", "settings", <SettingOutlined />, [
          getItem(<Link to="/project">Projects</Link>, "project", <FundProjectionScreenOutlined />),
          getItem(<Link to="/company">Company List</Link>, "company", <DesktopOutlined />),
          getItem(<Link to="/user">Users</Link>, "user", <ProjectOutlined />),
          getItem(<Link to="/holiday">Holidays</Link>, "holiday", <ProjectOutlined />),
        ])
      : null,
    // getItem(<Typography.Link onClick={() => signOut(auth)}>Logout</Typography.Link>, "logout", <LogoutOutlined />),
  ];

  return (
    <Menu
      defaultSelectedKeys={["1"]}
      items={items}
      mode="horizontal"
      style={{ backgroundColor: "white", borderColor: "white" }}
    />
  );
};

export default AppNavigation;
