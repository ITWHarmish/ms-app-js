import { CALENDAR_LIST, CALENDAR_FAIL, IS_FETCH_CALENDAR } from "../constants/calendarConstant";

const initialState = {
  calendar: [],
  isLoading: false,
};


export const calendarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CALENDAR_LIST:
      return { success: true, calendar: action.payload };
    case CALENDAR_FAIL:
      return { success: false, calendar: action.paylaod };
    case IS_FETCH_CALENDAR:
      return { ...state, isLoading: action.payload };
    
    default:
      return state;
  }
};

