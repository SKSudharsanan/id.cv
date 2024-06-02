import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import componentsSlice from "./components/components-slice";
import authSlice from "./auth/auth-slice";
import dataSlice from "./data/data-slice";

const reducer = combineReducers({
  // add all reducers here
  componentsSlice,
  authSlice,
  dataSlice,
});

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production" ? true : false,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
