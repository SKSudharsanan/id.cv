import { createSlice } from "@reduxjs/toolkit";

type Props = {
  alert: {
    show: boolean;
    type: string;
    message: string;
    close: boolean;
  };
  isSidebarOpen: boolean;
};
export const initialState: Props = {
  alert: {
    show: false,
    type: "",
    message: "",
    close: true,
  },
  isSidebarOpen: true,
};

// Slice
const slice = createSlice({
  name: "components",
  initialState,
  reducers: {
    IsShowingAlert: (state, { payload }) => {
      state.alert = { ...payload, close: true };
    },
    setIsSidebarOpen: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
  },
});
export default slice.reducer;

// Actions
const { IsShowingAlert, setIsSidebarOpen } = slice.actions;

export const setAlert =
  (show: any, type: any, message: any) => (dispatch: any) => {
    dispatch(
      IsShowingAlert({
        show,
        type,
        message,
      })
    );
  };

export const closeAlert = () => (dispatch: any) => {
  dispatch(IsShowingAlert({}));
};

export const toggleSidebarAction = (value: boolean) => (dispatch: any) => {
  dispatch(setIsSidebarOpen(value));
};
