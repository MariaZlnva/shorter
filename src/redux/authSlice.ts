import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";

const isToken = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

const initialState = {
  isLoading: false,
  isToken: isToken,
  isLoggedIn: isToken ? true : false,
  isSuccessLogin: false,
  isSuccessRegister: false,
  isErrorRegister: false,
  isErrorLogin: false,
  messageErrorLogin: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    deleteError: (state) => {
      state.isErrorRegister = false;
      state.isErrorLogin = false;
    },
    deleteMessageErrorLogin: (state) => {
      state.isErrorRegister = false;
      state.isErrorLogin = false;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.isToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccessRegister = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.isErrorRegister = true;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccessLogin = true;
      state.isToken = action.payload!.access_token;
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrorLogin = true;
      state.messageErrorLogin = action.payload as string;
    });
  },
});
export const { deleteError, logout, deleteMessageErrorLogin } =
  authSlice.actions;
export default authSlice.reducer;
