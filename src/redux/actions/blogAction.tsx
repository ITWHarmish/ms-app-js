import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { iBlog } from "../../types/iBlog";
import { API_URL } from "../../util/secrets";

export const allBlogs = createAsyncThunk("blog/all-blogs", async () => {
  const { data } = await axios.get(API_URL + "/blogs");
  return data;
});

export const addBlog = createAsyncThunk("blog-add", async (payload: iBlog) => {
  await axios.post(API_URL + "/blog-add", payload);
  const { data } = await axios.get(API_URL + "/blogs");
  return data;
});

export const updateBlog = createAsyncThunk("blog/update", async (payload: iBlog) => {
  await axios.put(API_URL + `/blog/update?id=${payload.id}`, payload);
  const { data } = await axios.get(API_URL + "/blogs");
  return data;
});

export const deleteBlog = createAsyncThunk("blog/delete", async (id: iBlog) => {
  await axios.delete(API_URL + `/blog/delete?id=${id}`);
  const { data } = await axios.get(API_URL + "/blogs");
  return data;
});
