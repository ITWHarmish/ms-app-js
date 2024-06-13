import { createSlice } from "@reduxjs/toolkit";

import * as BlogActions from "../actions/blogAction";

const companySlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(BlogActions.allBlogs.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(BlogActions.allBlogs.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(BlogActions.allBlogs.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default companySlice.reducer;
