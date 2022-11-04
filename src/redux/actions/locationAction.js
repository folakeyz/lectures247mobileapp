import axios from "axios";
import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
} from "../constants/locationConstants";

const BASE_URL = "https://lectures247.herokuapp.com";
export const listlocations = () => async (dispatch) => {
  try {
    dispatch({ type: LOCATION_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/location`);

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
