import { authkey } from "@/constants/authkey";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../../utils/localStorage";
import { decodedToken } from "../../../utils/jwt";

export const storeUserInfo = (token: string) => {
  setToLocalStorage(authkey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authkey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authkey);
};
