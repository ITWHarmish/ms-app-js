import { createSlice } from "@reduxjs/toolkit";

import * as TrainingListActions from "../actions/trainingListAction";

const trainingListSlice = createSlice({
  name: "trainingList",
  initialState: {
    trainingList: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TrainingListActions.createTrainingList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TrainingListActions.createTrainingList.fulfilled, (state, action) => {
        state.trainingList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TrainingListActions.createTrainingList.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TrainingListActions.readTrainingList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TrainingListActions.readTrainingList.fulfilled, (state, action) => {
        state.trainingList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TrainingListActions.readTrainingList.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TrainingListActions.updateTrainingList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TrainingListActions.updateTrainingList.fulfilled, (state, action) => {
        state.trainingList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TrainingListActions.updateTrainingList.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TrainingListActions.deleteTrainingList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TrainingListActions.deleteTrainingList.fulfilled, (state, action) => {
        state.trainingList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TrainingListActions.deleteTrainingList.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default trainingListSlice.reducer;