import { createSlice } from "@reduxjs/toolkit";

import * as TodoActions from "../actions/todoAction";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TodoActions.createTodo.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TodoActions.createTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TodoActions.createTodo.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TodoActions.readTodo.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TodoActions.readTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TodoActions.readTodo.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TodoActions.updateTodo.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TodoActions.updateTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TodoActions.updateTodo.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(TodoActions.deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TodoActions.deleteTodo.fulfilled, (state, action) => {
        state.todo = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TodoActions.deleteTodo.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
