import { message } from "antd";

import { createSlice } from "@reduxjs/toolkit";

import * as TaskActions from "../actions/taskAction";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    task: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TaskActions.readTask.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TaskActions.readTask.fulfilled, (state, action) => {
        state.task = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TaskActions.readTask.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
        message.error("Something went wrong while fetching tasks!");
      });
  },
});

export default taskSlice.reducer;
