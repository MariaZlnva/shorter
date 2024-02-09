import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IInput, IToken } from "./types";

const BASE_URL = "https://front-test.hex.team/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password }: IInput) => {
    console.log(username, password);
    // try {
    const config = {
      headers: { Authorization: "Basic dGVzdDp0M3N0SDN4" },
      "Content-Type": "application/json",
    };
    await axios.post(
      `${BASE_URL}/register?username=${username}&password=${password}`,
      { username, password },
      config
    );
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }: IInput, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: "Basic dGVzdDp0M3N0SDN4" },
        "Content-Type": "application/json",
      };
      const { data } = await axios.post<IToken>(
        `${BASE_URL}/login`,
        { username, password },
        config
      );
      localStorage.setItem("access_token", data.access_token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
