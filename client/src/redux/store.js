import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialLoginState = localStorage.getItem("isLogin") === "true";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: initialLoginState, // Load from localStorage
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem("isLogin", "true"); // Store in localStorage
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("isLogin"); // Remove on logout
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
