import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  LIST_MYCOURSES_FAIL,
  LIST_MYCOURSES_REQUEST,
  LIST_MYCOURSES_RESET,
  LIST_MYCOURSES_SUCCESS,
} from "../constants/orderConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";

export const payOrder =
  ({ orderItems, totalPrice, paymentResult }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      const userInfo = await AsyncStorage.getItem("userInfo");
      const token = JSON.parse(userInfo);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/students/order`,
        { orderItems, totalPrice, paymentResult },
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

export const getMyCourses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MYCOURSES_REQUEST,
    });

    //   const {
    //     userLogin: { userInfo },
    //   } = getState();

    const userInfo = await AsyncStorage.getItem("userInfo");
    const token = JSON.parse(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/v1/students/order`,
      config
    );

    dispatch({
      type: LIST_MYCOURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LIST_MYCOURSES_FAIL,
      payload: message,
    });
  }
};
