import { API_URL } from "../util/secrets";
import axios from "axios";

export const getTotalHours = async (userId: string, startDate: string, endDate: string) => {
  const response = await axios.get(API_URL + "/timelog/totalhours/" + userId, {
    params: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  return response.data;
};

export const getTimelogHours = async (userId: string, value: string) => {
  const response = await axios.get(API_URL + "/timelog/timeloghours/" + userId, {
    params: {
      date: value,
    },
  });
  return response.data;
};
