import { Space, Spin } from "antd";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { useAuthValue } from "../context/AuthContext";

const Login = lazy(() => import("../pages/login/Login"));
const Dashboard = lazy(() => import("../pages/home/Dashboard"));
const User = lazy(() => import("../pages/user/User"));
const Holiday = lazy(() => import("../pages/holiday/Holiday"));
const Todo = lazy(() => import("../pages/todo/Todo"));
const Calendar = lazy(() => import("../pages/calendar/Calendar"));
const Company = lazy(() => import("../pages/company/Company"));
const Timelog = lazy(() => import("../pages/timelogs/Timelog"));
const TimelogSummary = lazy(() => import("../pages/timelogs/TimelogSummary"));
const ReportDaily = lazy(() => import("../pages/report/ReportDaily"));
const ReportWeekly = lazy(() => import("../pages/report/ReportWeekly"));
const ReportMonthly = lazy(() => import("../pages/report/ReportMonthly"));
const ReportProject = lazy(() => import("../pages/report/ReportProject"));
const Events = lazy(() => import("../pages/events"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const ProjectDetails = lazy(() => import("../pages/projects/ProjectDetails"));
const AddProject = lazy(() => import("../pages/projects/AddProject"));
const Task = lazy(() => import("../pages/tasks/Task"));
const KanbanBoard = lazy(() => import("../pages/tasks/KanbanBoard"));
const TaskDetails = lazy(() => import("../pages/tasks/TaskDetails"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const EditProfile = lazy(() => import("../pages/profile/EditProfile"));
const LeaveStatus = lazy(() => import("../pages/leave/LeaveStatus"));
const Training = lazy(() => import("../pages/Trainings/TrainingList"));
const Trainer = lazy(() => import("../pages/Trainings/Trainer"));
const TrainingType = lazy(() => import("../pages/Trainings/TrainingType"));

const routes = [
  { path: "/", component: <Dashboard /> },
  { path: "/user", component: <User /> },
  { path: "/holiday", component: <Holiday /> },
  { path: "/calendar", component: <Calendar /> },
  { path: "/company", component: <Company /> },
  { path: "/project", component: <Projects /> },
  { path: "/project/:projectId", component: <ProjectDetails /> },
  { path: "/project-create", component: <AddProject /> },
  { path: "/project-edit/:projectId", component: <AddProject /> },
  { path: "/task", component: <Task /> },
  { path: "/task-board", component: <KanbanBoard /> },
  { path: "/task/:taskId", component: <TaskDetails /> },
  { path: "/timelog", component: <Timelog /> },
  { path: "/report/summary", component: <TimelogSummary /> },
  { path: "/report/daily", component: <ReportDaily /> },
  { path: "/report/weekly", component: <ReportWeekly /> },
  { path: "/report/monthly", component: <ReportMonthly /> },
  { path: "/report/project", component: <ReportProject /> },
  { path: "/events", component: <Events /> },
  { path: "/profile", component: <Profile /> },
  { path: "/profile-edit", component: <EditProfile /> },
  { path: "/todo", component: <Todo /> },
  { path: "/leave", component: <LeaveStatus /> },
  { path: "/training/training-list", component: <Training /> },
  { path: "/training/trainer", component: <Trainer /> },
  { path: "/training/Training-type", component: <TrainingType /> },
];

const FallbackComponent = () => {
  return (
    <AppLayout>
      <Space style={{ width: "100%", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </Space>
    </AppLayout>
  );
};

const PageRoutes = () => {
  const { currentUser } = useAuthValue();

  return (
    <Suspense fallback={<FallbackComponent />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={currentUser ? <AppLayout>{route.component}</AppLayout> : <FallbackComponent />}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
