import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IUser, IUserInfo } from "../lib/types/user";

const getUserInfoFromCookie = () => {
  const userInfoString = Cookies.get("userInfo");

  if (!userInfoString) {
    return null;
  }
  try {
    const userInfo = JSON.parse(userInfoString);

    return userInfo.user;
  } catch (error) {
    console.error("Failed to parse userInfo cookie:", error);
    return null;
  }
};

const initialState: IUserInfo = {
  user: getUserInfoFromCookie(),
  token: "",
  tokenExpiresIn: 0,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<IUserInfo>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tokenExpiresIn = action.payload.tokenExpiresIn;
    },
    userSignup(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    userLogout(state) {
      state.token = "";
      state.tokenExpiresIn = 0;
      state.user = null;
    },
  },
});
export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
