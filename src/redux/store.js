import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
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
import { myCoursesReducer, orderPayReducer } from "./reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  locationList: persistReducer(persistConfig, locationListReducer),
  register: persistReducer(persistConfig, registerReducer),
  userRegistration: persistReducer(persistConfig, userRegisterReducer),
  userLogin: persistReducer(persistConfig, userLoginReducer),
  userVerification: persistReducer(persistConfig, userVerificationReducer),
  profile: persistReducer(persistConfig, userDetailsReducer),
  courseList: persistReducer(persistConfig, getCoursesReducer),
  singleCourse: persistReducer(persistConfig, getSingleCourseReducer),
  cart: persistReducer(persistConfig, cartReducer),
  order: persistReducer(persistConfig, orderPayReducer),
  myCourses: persistReducer(persistConfig, myCoursesReducer),
});

// const basicItemsFromStorage = AsyncStorage.getItem("basicInfo")
//   ? AsyncStorage.getItem("basicInfo")
//   : [];
// const eduItemsFromStorage = AsyncStorage.getItem("educationInfo")
//   ? AsyncStorage.getItem("educationInfo")
//   : [];

// const userInfoFromStorage = AsyncStorage.getItem("userInfo")
//   ? AsyncStorage.getItem("userInfo")
//   : null;
// const cartItemsFromStorage = AsyncStorage.getItem("cartItems")
//   ? AsyncStorage.getItem("cartItems")
//   : [];

const initialState = {
  // register: {
  //   basicInfo: [],
  //   educationInfo: [],
  // },
  // userLogin: { userInfo: [] },
  // cart: { cartItems: [] },
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
