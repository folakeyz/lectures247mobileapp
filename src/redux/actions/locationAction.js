import axios from "axios";
import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
} from "../constants/locationConstants";
import { BASE_URL } from "../config";

export const listlocations = () => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/location?limit=500`);

    dispatch({
      type: LOCATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_LIST_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message,
    });
  }
};
