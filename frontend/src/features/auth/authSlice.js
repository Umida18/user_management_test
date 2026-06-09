import { createSlice } from "@reduxjs/toolkit";
import {
  getToken,
  parseToken,
  removeToken,
  setToken,
} from "../../utils/tokenStorage";

const token = getToken();
const user = token ? parseToken(token) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
    isAuthenticated: !!token,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      setToken(token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      removeToken();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
