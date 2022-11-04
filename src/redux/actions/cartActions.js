import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://lectures247.herokuapp.com";
export const addToCart = (id) => async (dispatch, getState) => {
  //   const {
  //     userLogin: { userInfo },
  //   } = getState();
  const userInfo = await AsyncStorage.getItem("userInfo");
  const token = JSON.parse(userInfo);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  };

  const { data } = await axios.get(
    `${BASE_URL}/api/v1/students/videos/${id}`,
    config
  );

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      course: data.data._id,
      title: data.data.title,
      code: data.data.coursecode,
      image: data.data.thumbnail,
      price: data.data.price,
    },
  });

  await AsyncStorage.setItem("cartItems", JSON.stringify(data.data));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
