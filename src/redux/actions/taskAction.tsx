import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITask, ITaskCommentPayload, ITaskHistory } from "../../types/iTask";
import { API_URL } from "../../util/secrets";

export const readTask = createAsyncThunk("task/read", async () => {
  const { data } = await axios.get(`${API_URL}/task`);
  return data;
});

export const createTask = createAsyncThunk("task/add", async (payload: { task: ITask }, { dispatch }) => {
  await axios.post(`${API_URL}/task/add`, payload.task);
  return true;
});

export const updateTask = createAsyncThunk("task/update", async (payload: { id: string; task: ITask }, { dispatch }) => {
  await axios.put(`${API_URL}/task/update?id=${payload.id}`, payload.task);
  return true;
});

export const deleteTask = createAsyncThunk("task/delete", async (payload: { id: string }, { dispatch }) => {
  await axios.delete(`${API_URL}/task/delete?id=${payload.id}`);
  return true;
});

export const createTaskComment = createAsyncThunk("task/comment/add", async (payload: ITaskCommentPayload, { dispatch }) => {
  await axios.post(`${API_URL}/task/comment/add?id=${payload.id}`, { comment: payload.comment, by: payload.by });
  return true;
});

export const updateTaskComment = createAsyncThunk("task/comment/update", async (payload: { id: string; task: ITask }, { dispatch }) => {
  await axios.put(`${API_URL}/task/comment/update/${payload.id}`, payload.task);
  return true;
});

export const deleteTaskComment = createAsyncThunk("task/comment/delete", async (payload: { id: string }, { dispatch }) => {
  await axios.delete(`${API_URL}/task/comment/delete/${payload.id}`);
  return true;
});

export const createHistory = createAsyncThunk("task/history", async (payload: { id: string; history: ITaskHistory }, { dispatch }) => {
  await axios.post(`${API_URL}/task/history/add?id=${payload.id}`, payload.history);
  const { data } = await axios.get(`${API_URL}/task`);
  return data;
});
