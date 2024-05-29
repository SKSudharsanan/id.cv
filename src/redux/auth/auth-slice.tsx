import { createSlice } from "@reduxjs/toolkit";

import { setAlert } from "../components/components-slice";

import {
  useStorage,
  getUserDetails,
  getRequestError,
  logoutUser,
} from "../../utils/functions";
import { APP_USER } from "../../utils/constants";

type Props = {
  user: {} | any;
};
export const initialState: Props = {
  user: getUserDetails(),
};

// Slice
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      useStorage.set(APP_USER, payload);
    },
    logoutSuccess: (state) => {
      state.user = null;
      logoutUser();
    },
  },
});
export default slice.reducer;

// Actions
const { loginSuccess, logoutSuccess } = slice.actions;

export const loginUserAction = (data: any) => async (dispatch: any) => {
  try {
    setTimeout(() => {
      dispatch(loginSuccess(data));
    }, 2000);

    return { success: true };
  } catch (err) {
    const errorMessage = getRequestError(err);
    dispatch(setAlert(true, "error", errorMessage));
  }
};

export const logoutUserAction = () => async (dispatch: any) => {
  try {
    dispatch(logoutSuccess());
  } catch (error) {
    const message = getRequestError(error);
    console.log(message);
  }
};
