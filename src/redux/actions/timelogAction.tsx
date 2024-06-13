import axios from "axios";
import dayjs from "dayjs";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITimelog } from "../../types/iTimelog";
import { API_URL } from "../../util/secrets";

export const listAllTimelogs = createAsyncThunk("timelog/read", async (timelog: { startDate: string; endDate: string }) => {
  const { data } = await axios.get(`${API_URL}/timelog/all?startDate=${timelog.startDate}&endDate=${timelog.endDate}`);
  return data;
});

export const readTimelog = createAsyncThunk("timelog/read/byuser", async (timelog: { userId: string; date: Date }) => {
  const { data } = await axios.get(API_URL + `/timelog?uid=${timelog.userId}&date=${dayjs(timelog.date).unix()}`);
  return data;
});

export const createTimelog = createAsyncThunk("timelog/create", async (timelog: ITimelog, { dispatch }) => {
  await axios.post(API_URL + `/timelog/add?uid=${timelog.userId}`, timelog);
  return true;
});

export const updateTimelog = createAsyncThunk("timelog/update", async (timelog: ITimelog, { dispatch }) => {
  await axios.put(API_URL + `/timelog/update?id=${timelog._id}`, timelog);
  return true;
});

export const deleteTimelog = createAsyncThunk("timelog/delete", async (timelog: ITimelog, { dispatch }) => {
  await axios.delete(API_URL + `/timelog/delete?id=${timelog._id}`);
  return true;
});
