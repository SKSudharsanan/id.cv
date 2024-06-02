import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { setAlert } from "../components/components-slice";

import { useStorage, getRequestError } from "../../utils/functions";
import { APP_MY_DATA } from "../../utils/constants";

type Props = {
  isFetching: boolean;
  isUploading: boolean;
  isGenerating: boolean;
  myData: {} | any;
};
export const initialState: Props = {
  isFetching: true,
  isUploading: false,
  isGenerating: false,
  myData: useStorage.get(APP_MY_DATA),
};

// Slice
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    setIsUploading: (state, { payload }) => {
      state.isUploading = payload;
    },
    setIsGenerating: (state, { payload }) => {
      state.isGenerating = payload;
    },
    generateSuccess: (state, { payload }) => {
      state.myData = payload;
      useStorage.set(APP_MY_DATA, payload);
    },
  },
});
export default slice.reducer;

// Actions
const { setIsFetching, setIsUploading, setIsGenerating, generateSuccess } =
  slice.actions;

export const getResumeDataAction =
  (ensName: string) => async (dispatch: any) => {
    dispatch(setIsFetching(true));

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/${ensName}`
      );

      dispatch(setIsFetching(false));
      console.log("getResumeDataAction: ", response.data);
      // dispatch(generateSuccess(response.data));
    } catch (error) {
      dispatch(setIsFetching(false));
    }
  };

export const postUploadPdfAction = (formData: any) => async (dispatch: any) => {
  dispatch(setIsUploading(true));

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/get_resume_data`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return { success: true, data: response.data.chatId };
  } catch (error) {
    const errorMessage = getRequestError(error);
    dispatch(setAlert(true, "error", errorMessage));

    dispatch(setIsUploading(false));
  }
};

export const getResumeDataByChatIdAction =
  (chatId: number) => async (dispatch: any) => {
    dispatch(setIsUploading(true));

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getResumeData/${chatId}`
      );

      dispatch(setIsUploading(false));
      return {
        success: true,
        data: JSON.stringify(response.data, null, 2),
      };
    } catch (error) {
      const errorMessage = getRequestError(error);
      dispatch(setAlert(true, "error", errorMessage));

      dispatch(setIsUploading(false));
    }
  };

export const postGenerateResumeAction =
  (data: { chatId: number; resumeData: string; theme: string }) =>
  async (dispatch: any) => {
    dispatch(setIsGenerating(true));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate_resume`,
        {
          resumeData: JSON.parse(data.resumeData),
          theme: data.theme,
        }
      );

      const result = {
        ...data,
        contentHash: response.data.contentHash,
      };
      dispatch(generateSuccess(result));
      dispatch(setIsGenerating(false));

      dispatch(
        setAlert(true, "success", "Resume data generated successfully!")
      );
      return { success: true };
    } catch (error) {
      const errorMessage = getRequestError(error);
      dispatch(setAlert(true, "error", errorMessage));

      dispatch(setIsGenerating(false));
    }
  };

export const postUpdateSavedDataAction =
  (data: any) => async (dispatch: any) => {
    dispatch(setIsUploading(true));

    dispatch(generateSuccess(data));
  };
