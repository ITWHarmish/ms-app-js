import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { IProject } from "../../types/iProject";
import { API_URL } from "../../util/secrets";

export const createProject = createAsyncThunk("project/create", async (project: IProject) => {
  await axios.post(API_URL + "/project/add", project);
  const { data } = await axios.get(API_URL + "/project");
  return data;
});

export const readProject = createAsyncThunk("project/read", async () => {
  const { data } = await axios.get(API_URL + "/project");
  return data;
});

export const updateProject = createAsyncThunk("project/update", async (project: IProject) => {
  await axios.put(API_URL + `/project/update?id=${project._id}`, project);
  const { data } = await axios.get(API_URL + "/project");
  return data;
});

export const deleteProject = createAsyncThunk("project/delete", async (project: IProject) => {
  await axios.delete(API_URL + `/project/delete?id=${project._id}`);
  const { data } = await axios.get(API_URL + "/project");
  return data;
});