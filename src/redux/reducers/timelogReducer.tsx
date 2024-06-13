import { createSlice } from "@reduxjs/toolkit";

import * as TimelogActions from "../actions/timelogAction";

const timelogSlice = createSlice({
  name: "timelog",
  initialState: {
    timelog: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TimelogActions.listAllTimelogs.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TimelogActions.listAllTimelogs.fulfilled, (state, action) => {
        state.timelog = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TimelogActions.listAllTimelogs.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TimelogActions.readTimelog.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TimelogActions.readTimelog.fulfilled, (state, action) => {
        state.timelog = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TimelogActions.readTimelog.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default timelogSlice.reducer;
