import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../util/secrets";

interface iReportTimelogPayload {
  startDate: string;
  endDate: string;
}

export const reportTimelogs = createAsyncThunk("report/timelog", async (payload: iReportTimelogPayload) => {
  const response = await axios.get(`${API_URL}/report`, { params: payload });
  return response.data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
});
