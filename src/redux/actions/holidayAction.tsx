import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IHoliday } from "../../types/iHoliday";
import { API_URL } from "../../util/secrets";

export const createHoliday = createAsyncThunk("holiday/create", async (holiday: IHoliday) => {
  await axios.post(API_URL + "/holiday/add", holiday);
  const { data } = await axios.get(API_URL + "/holiday");
  return data;
});

export const readHoliday = createAsyncThunk("holiday/read", async () => {
  const { data } = await axios.get(API_URL + "/holiday");
  return data;
});

export const updateHoliday = createAsyncThunk("holiday/update", async (holiday: IHoliday) => {
  await axios.put(API_URL + `/holiday/update?id=${holiday._id}`, holiday);
  const { data } = await axios.get(API_URL + "/holiday");
  return data;
});

export const deleteHoliday = createAsyncThunk("holiday/delete", async (holiday: IHoliday) => {
  await axios.delete(API_URL + `/holiday/delete?id=${holiday._id}`);
  const { data } = await axios.get(API_URL + "/holiday");
  return data;
});
