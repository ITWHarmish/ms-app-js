import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITrainingList } from "../../types/iTrainingList";
import { API_URL } from "../../util/secrets";

export const createTrainingList = createAsyncThunk("training/create", async (training: ITrainingList) => {
  await axios.post(API_URL + "/training/add", training);
  const { data } = await axios.get(API_URL + "/training");
  return data;
});

export const readTrainingList = createAsyncThunk("training/read", async () => {
  const { data } = await axios.get(API_URL + "/training");
  return data;
});

export const updateTrainingList = createAsyncThunk("training/update", async (training: ITrainingList) => {
  await axios.put(API_URL + `/training/update?id=${training._id}`, training);
  const { data } = await axios.get(API_URL + "/training");
  return data;
});

export const deleteTrainingList = createAsyncThunk("training/delete", async (training: ITrainingList) => {
  await axios.delete(API_URL + `/training/delete?id=${training._id}`);
  const { data } = await axios.get(API_URL + "/training");
  return data;
});