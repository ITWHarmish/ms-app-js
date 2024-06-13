import { combineReducers } from "redux";
import thunk from "redux-thunk";

import { configureStore } from "@reduxjs/toolkit";

import { calendarReducer } from "./reducers/calendarReducer";
import companyReducer from "./reducers/companyReducer";
import holidayReducer from "./reducers/holidayReducer";
import leaveReducer from "./reducers/LeaveReducer";
import projectReducer from "./reducers/projectReducer";
import reportTimelogReducer from "./reducers/reportTimelogReducer";
import taskReducer from "./reducers/taskReducer";
import timelogReducer from "./reducers/timelogReducer";
import todoReducer from "./reducers/todoReducer";
import trainingListReducer from "./reducers/TrainingListReducer";
import userReducer from "./reducers/userReducer";
import blogsReducer from "./reducers/blogReducer";
import teamsReducer from "./reducers/teamReducer";

const combinedReducer = combineReducers({
  calendar: calendarReducer,
  company: companyReducer,
  holiday: holidayReducer,
  leave: leaveReducer,
  reportTimelogState: reportTimelogReducer,
  project: projectReducer,
  task: taskReducer,
  timelog: timelogReducer,
  todo: todoReducer,
  trainingList: trainingListReducer,
  userState: userReducer,
  blogs: blogsReducer,
  teams: teamsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logoutUser") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunk),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
