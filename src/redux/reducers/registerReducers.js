import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SAVE_BASIC_INFO,
  USER_SAVE_EDUCATION_INFO,
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
