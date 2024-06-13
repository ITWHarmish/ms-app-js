import axios from "axios";

import { API_URL } from "../../util/secrets";
import { CALENDAR_FAIL, CALENDAR_LIST, IS_FETCH_CALENDAR } from "../constants/calendarConstant";

export const listCalendar = () => async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await axios.get(API_URL + "/calander-events/0uSUEww9C4PzBFEjrAvneDNjN6O2");

    dispatch({
      type: CALENDAR_LIST,
      payload: data.items,
    });
    dispatch(setIsLoading(false));
  } catch (error: any) {
    dispatch({
      type: CALENDAR_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const setIsLoading = (value: boolean) => {
  return {
    type: IS_FETCH_CALENDAR,
    payload: value,
  };
};
