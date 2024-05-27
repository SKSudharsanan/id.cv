import { APP_USER } from "./constants";

// Storage operations
export const useStorage = {
  set: (key: string, data: any) => {
    let stringifiedData = JSON.stringify(data);
    localStorage.setItem(key, stringifiedData);
  },

  get: (key: string) => {
    const data: any = JSON.parse(localStorage.getItem(key)!);

    if (!data) {
      return null;
    }
    return data;
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export const getUserDetails = () => {
  const user = useStorage.get(APP_USER);

  return user ? user : null;
};

export const getRequestError = (error: any) => {
  const { response } = error;
  if (response && (response.data.code === 401 || response.status === 401)) {
    if (!response.data.message?.includes("token")) {
      return response.data?.message;
    }
  } else if (response && response.data.errors && response.data.errors[0]) {
    return response.data.errors[0].message;
  } else if (response && response.data.message) {
    return response.data.message;
  } else if (response && response.data.error) {
    return response.data.error;
  }
  return "There might be a problem with your internet connection. Please check and try again.";
};