import axios from "axios";
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  SINGLE_COURSE_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
} from "../constants/courseConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://lectures247.herokuapp.com";
export const getCourseDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = JSON.parse(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/students/videos/`,
      config
    );

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};

export const getSingleCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SINGLE_COURSE_REQUEST });

    // const {
    //   userLogin: { userInfo },
    // } = getState();
    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = JSON.parse(userInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/students/videos/${id}`,
      config
    );

    dispatch({
      type: SINGLE_COURSE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_COURSE_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
