import { createSlice } from "@reduxjs/toolkit";

import { getAllUsers } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
