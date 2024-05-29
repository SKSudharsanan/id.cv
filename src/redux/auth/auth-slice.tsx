import { createSlice } from "@reduxjs/toolkit";
// import { API_URLS, getRequest } from "../../api";

import { setAlert } from "../components/components-slice";

import {
  useStorage,
  getUserDetails,
  getRequestError,
  logoutUser,
} from "../../utils/functions";
import { APP_USER } from "../../utils/constants";
import { dummyUserData } from "../../utils/mockdata";

type Props = {
  isFetchingAuthDetails: boolean;
  user: {} | any;
};
export const initialState: Props = {
  isFetchingAuthDetails: false,
  user: getUserDetails(),
};

// Slice
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetchingAuthDetails: (state, { payload }) => {
      state.isFetchingAuthDetails = payload;
    },
    setUserDetails: (state, { payload }) => {
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
const { setIsFetchingAuthDetails, setUserDetails, logoutSuccess } =
  slice.actions;

export const createUserAction = (data: any) => async (dispatch: any) => {
  try {
    setTimeout(() => {
      dispatch(setUserDetails(dummyUserData));
    }, 2000);

    return { success: true };
  } catch (err) {
    const errorMessage = getRequestError(err);
    dispatch(setAlert(true, "error", errorMessage));
  }
};

export const getUserDataAction = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setIsFetchingAuthDetails(true));

    // const res = await getRequest({
    //   url: `${API_URLS?.dummy}/${data}`,
    //   params: null,
    // });
    setTimeout(() => {
      dispatch(setUserDetails(dummyUserData));
    }, 2000);

    return { success: true };
  } catch (err) {
    const errorMessage = getRequestError(err);
    dispatch(setAlert(true, "error", errorMessage));

    dispatch(setIsFetchingAuthDetails(false));
  }
};

export const logoutUserAction = () => async (dispatch: any) => {
  try {
    // await getRequest({
    //   url: API_URLS?.logoutUser,
    //   params: null,
    // });

    dispatch(logoutSuccess());
  } catch (error) {
    const message = getRequestError(error);
    console.log(message);
  }
};
