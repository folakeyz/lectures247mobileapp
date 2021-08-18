import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SAVE_BASIC_INFO,
  USER_SAVE_EDUCATION_INFO,
} from "../constants/registerConstants";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import { BASE_URL } from "../config";

export const saveBasicInfo = (data) => (dispatch) => {
  dispatch({
    type: USER_SAVE_BASIC_INFO,
    payload: data,
  });
  AsyncStorage.setItem("basicInfo", JSON.stringify(data));
};

export const saveEducationInfo = (data) => (dispatch) => {
  dispatch({
    type: USER_SAVE_EDUCATION_INFO,
    payload: data,
  });
  AsyncStorage.setItem("educationInfo", JSON.stringify(data));
};

export const userRegister = (form) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/auth/students/register`,
      form,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    const token = JSON.stringify(data);
    AsyncStorage.setItem("userInfo", token);
    AsyncStorage.removeItem("educationInfo");
    AsyncStorage.removeItem("basicInfo");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
