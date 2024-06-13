import { createSlice } from "@reduxjs/toolkit";

import * as HolidayActions from "../actions/holidayAction";

const holidaySlice = createSlice({
  name: "holiday",
  initialState: {
    holiday: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HolidayActions.createHoliday.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(HolidayActions.createHoliday.fulfilled, (state, action) => {
        state.holiday = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(HolidayActions.createHoliday.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(HolidayActions.readHoliday.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(HolidayActions.readHoliday.fulfilled, (state, action) => {
        state.holiday = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(HolidayActions.readHoliday.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(HolidayActions.updateHoliday.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(HolidayActions.updateHoliday.fulfilled, (state, action) => {
        state.holiday = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(HolidayActions.updateHoliday.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(HolidayActions.deleteHoliday.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(HolidayActions.deleteHoliday.fulfilled, (state, action) => {
        state.holiday = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(HolidayActions.deleteHoliday.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default holidaySlice.reducer;