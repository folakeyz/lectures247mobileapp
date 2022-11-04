import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { locationListReducer } from "./reducers/locationReducers";
import {
  userLoginReducer,
  userVerificationReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import {
  getCoursesReducer,
  getSingleCourseReducer,
} from "./reducers/courseReducers";
import {
  registerReducer,
  userRegisterReducer,
} from "./reducers/registerReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  locationList: locationListReducer,
  register: registerReducer,
  userRegistration: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerification: userVerificationReducer,
  profile: userDetailsReducer,
  courseList: getCoursesReducer,
  singleCourse: getSingleCourseReducer,
  cart: cartReducer,
});

const basicItemsFromStorage = AsyncStorage.getItem("basicInfo")
  ? AsyncStorage.getItem("basicInfo")
  : [];
const eduItemsFromStorage = AsyncStorage.getItem("educationInfo")
  ? AsyncStorage.getItem("educationInfo")
  : [];

const userInfoFromStorage = AsyncStorage.getItem("userInfo")
  ? AsyncStorage.getItem("userInfo")
  : null;
const cartItemsFromStorage = AsyncStorage.getItem("cartItems")
  ? AsyncStorage.getItem("cartItems")
  : [];

const initialState = {
  register: {
    basicInfo: basicItemsFromStorage,
    educationInfo: eduItemsFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
