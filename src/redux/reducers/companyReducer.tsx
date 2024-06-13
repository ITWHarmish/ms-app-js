import { createSlice } from "@reduxjs/toolkit";

import * as CompanyActions from "../actions/companyAction";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CompanyActions.createCompany.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(CompanyActions.createCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(CompanyActions.createCompany.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(CompanyActions.readCompany.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(CompanyActions.readCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(CompanyActions.readCompany.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(CompanyActions.updateCompany.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(CompanyActions.updateCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(CompanyActions.updateCompany.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(CompanyActions.deleteCompany.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(CompanyActions.deleteCompany.fulfilled, (state, action) => {
        state.company = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(CompanyActions.deleteCompany.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default companySlice.reducer;
