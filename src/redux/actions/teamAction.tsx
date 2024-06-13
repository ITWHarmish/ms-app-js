import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITeam } from "../../types/iTeam";
import { API_URL } from "../../util/secrets";

export const readTeam = createAsyncThunk("team/read", async () => {
  const { data } = await axios.get(API_URL + "/team");
  return data;
});

export const createTeam = createAsyncThunk("/team/add", async (team: ITeam) => {
  await axios.post(API_URL + "/team/add", team);
  const { data } = await axios.get(API_URL + "/team");
  return data;
});
