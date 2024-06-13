import { createSlice } from "@reduxjs/toolkit";

import * as ProjectActions from "../actions/projectAction";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProjectActions.createProject.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(ProjectActions.createProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(ProjectActions.createProject.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(ProjectActions.readProject.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(ProjectActions.readProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(ProjectActions.readProject.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(ProjectActions.updateProject.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(ProjectActions.updateProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(ProjectActions.updateProject.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(ProjectActions.deleteProject.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(ProjectActions.deleteProject.fulfilled, (state, action) => {
        state.project = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(ProjectActions.deleteProject.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default projectSlice.reducer;