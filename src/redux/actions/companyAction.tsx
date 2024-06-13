import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ICompany } from "../../types/iCompany";
import { API_URL } from "../../util/secrets";

export const createCompany = createAsyncThunk("company/create", async (company: ICompany) => {
  await axios.post(API_URL + "/company/add", company);
  const { data } = await axios.get(API_URL + "/company");
  return data;
});

export const readCompany = createAsyncThunk("company/read", async () => {
  const { data } = await axios.get(API_URL + "/company");
  return data;
});

export const updateCompany = createAsyncThunk("company/update", async (company: ICompany) => {
  await axios.put(API_URL + `/company/update?id=${company._id}`, company);
  const { data } = await axios.get(API_URL + "/company");
  return data;
});

export const deleteCompany = createAsyncThunk("company/delete", async (company: ICompany) => {
  await axios.delete(API_URL + `/company/delete?id=${company._id}`);
  const { data } = await axios.get(API_URL + "/company");
  return data;
});
