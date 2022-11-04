import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SAVE_BASIC_INFO,
  USER_SAVE_EDUCATION_INFO,
  USER_CHECK_FAIL,
  USER_CHECK_REQUEST,
  USER_CHECK_RESET,
  USER_CHECK_SUCCESS,
} from "../constants/registerConstants";

export const registerReducer = (
  state = { basicInfo: [], educationInfo: [], passwordInfo: [] },
  action
) => {
  switch (action.type) {
    case USER_SAVE_BASIC_INFO:
      return {
        ...state,
        basicInfo: action.payload,
      };
    case USER_SAVE_EDUCATION_INFO:
      return {
        ...state,
        educationInfo: action.payload,
      };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        success: true,
        registration: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_REQUEST:
      return {
        loading: true,
      };
    case USER_CHECK_SUCCESS:
      return {
        loading: false,
        success: true,
        cname: action.payload.username,
        cemail: action.payload.email,
        cmobile: action.payload.mobile,
      };
    case USER_CHECK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_CHECK_RESET:
      return {};
    default:
      return state;
  }
};
