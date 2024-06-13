import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITodo } from "../../types/iTodo";
import { API_URL } from "../../util/secrets";

export const createTodo = createAsyncThunk("todo/create", async (todo: ITodo) => {
  await axios.post(API_URL + "/todo/add", todo);
  const { data } = await axios.get(API_URL + `/todo?uid=${todo.userId}`);
  return data;
});

export const readTodo = createAsyncThunk("todo/read", async ({ uid }: { uid: string }) => {
  const { data } = await axios.get(API_URL + `/todo?uid=${uid}`);
  return data;
});

export const updateTodo = createAsyncThunk("todo/update", async (todo: ITodo) => {
  await axios.put(API_URL + `/todo/update?id=${todo._id}`, todo);
  const { data } = await axios.get(API_URL + `/todo?uid=${todo.userId}`);
  return data;
});

export const deleteTodo = createAsyncThunk("todo/delete", async (todo: ITodo) => {
  await axios.delete(API_URL + `/todo/delete?id=${todo._id}`);
  const { data } = await axios.get(API_URL + `/todo?uid=${todo.userId}`);
  return data;
});
