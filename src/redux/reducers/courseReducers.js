import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
  SINGLE_COURSE_FAIL,
} from "../constants/courseConstants";

export const getCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { ...state, loading: true };
    case COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload.data };
    case COURSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case SINGLE_COURSE_REQUEST:
      return { ...state, loading: true };
    case SINGLE_COURSE_SUCCESS:
      return { loading: false, course: action.payload.data };
    case SINGLE_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
