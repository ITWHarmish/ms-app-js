import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IApplyLeave } from "../../types/iApplyLeave";
import { API_URL } from "../../util/secrets";

export const createLeave = createAsyncThunk("leave/create", async (leave: IApplyLeave) => {
  await axios.post(API_URL + "/leave/add", leave);
  const { data } = await axios.get(API_URL + `/leave?uid=${leave.userId}`);
  return data;
});

export const readLeave = createAsyncThunk("leave/read", async ({ uid }: { uid: string }) => {
  const { data } = await axios.get(API_URL + `/leave?uid=${uid}`);
  return data;
});

export const updateLeave = createAsyncThunk("leave/update", async (leave: IApplyLeave) => {
  await axios.put(API_URL + `/leave/update?id=${leave._id}`, leave);
  const { data } = await axios.get(API_URL + `/leave?uid=${leave.userId}`);
  return data;
});

export const deleteLeave = createAsyncThunk("leave/delete", async (leave: IApplyLeave) => {
  await axios.delete(API_URL + `/leave/delete?id=${leave._id}`);
  const { data } = await axios.get(API_URL + `/leave?uid=${leave.userId}`);
  return data;
});
