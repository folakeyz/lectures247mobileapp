import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  LIST_MYCOURSES_SUCCESS,
  LIST_MYCOURSES_RESET,
  LIST_MYCOURSES_REQUEST,
  LIST_MYCOURSES_FAIL,
} from "../constants/orderConstants";

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case LIST_MYCOURSES_REQUEST:
      return {
        loading: true,
      };
    case LIST_MYCOURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload.data,
      };
    case LIST_MYCOURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_MYCOURSES_RESET:
      return { courses: [] };
    default:
      return state;
  }
};
