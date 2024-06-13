import { createSlice } from "@reduxjs/toolkit";

import * as TeamActions from "../actions/teamAction";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TeamActions.readTeam.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(TeamActions.readTeam.fulfilled, (state, action) => {
        state.team = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(TeamActions.readTeam.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default teamSlice.reducer;
