import { createSlice } from "@reduxjs/toolkit";

import { reportTimelogs } from "../actions/reportTimelogAction";

const reportTimelogSlice = createSlice({
  name: "report",
  initialState: {
    timelog: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reportTimelogs.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(reportTimelogs.fulfilled, (state, action) => {
        state.timelog = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(reportTimelogs.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default reportTimelogSlice.reducer;
