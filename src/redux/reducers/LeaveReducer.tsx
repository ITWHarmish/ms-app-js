import { createSlice } from "@reduxjs/toolkit";

import * as LeaveActions from "../actions/leaveAction";

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    leave: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LeaveActions.createLeave.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(LeaveActions.createLeave.fulfilled, (state, action) => {
        state.leave = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(LeaveActions.createLeave.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(LeaveActions.readLeave.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(LeaveActions.readLeave.fulfilled, (state, action) => {
        state.leave = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(LeaveActions.readLeave.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(LeaveActions.updateLeave.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(LeaveActions.updateLeave.fulfilled, (state, action) => {
        state.leave = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(LeaveActions.updateLeave.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(LeaveActions.deleteLeave.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(LeaveActions.deleteLeave.fulfilled, (state, action) => {
        state.leave = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(LeaveActions.deleteLeave.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default leaveSlice.reducer;