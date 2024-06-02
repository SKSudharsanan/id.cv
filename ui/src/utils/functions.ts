/* eslint-disable no-fallthrough */
import { APP_USER, APP_MY_DATA } from "./constants";

// Storage operations
export const useStorage = {
  set: (key: string, data: any) => {
    let stringifiedData = JSON.stringify(data);
    sessionStorage.setItem(key, stringifiedData);
  },

  get: (key: string) => {
    const data: any = JSON.parse(sessionStorage.getItem(key)!);

    if (!data) {
      return null;
    }
    return data;
  },

  remove: (key: string) => {
    sessionStorage.removeItem(key);
  },

  clear: () => {
    sessionStorage.clear();
  },
};

export const getUserDetails = () => {
  const user = useStorage.get(APP_USER);

  return user ? user : null;
};

export const logoutUser = () => {
  useStorage.remove(APP_USER);
  useStorage.remove(APP_MY_DATA);
  window.location.reload();
};

export const getRequestError = (error: any) => {
  const { response } = error;
  console.log(response, "response");
  
  if (response && typeof response.data === "string") {
    return response.data;
  } else if (response && response.data.error) {
    return response.data.error;
  }
  return "There might be a problem with your internet connection. Please check and try again.";
};

export const socialOnClick = (social: { name: string; handle: string }) => {
  switch(social.name) {
    case "whatsapp":
      window.open(`https://api.whatsapp.com/send?phone=${social.handle}&text=Hello! I'm a website visitor.`);
      break
    case "twitter":
      window.open(`https://x.com/${social.handle}`);
      break
    case "instagram":
      window.open(`https://www.instagram.com/${social.handle}`);
      break
    case "facebook":
      window.open(`https://facebook.com/${social.handle}`);
      break
    case "tiktok":
      window.open(`https://www.tiktok.com/${social.handle}`);
      break
    default:
      return;
  }
};

export const firstLetter = (letter: string) => {
  var str = letter;
  var res = str?.substring(0, 1);
  return res;
};
