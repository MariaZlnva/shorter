import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IDataLink, ILink } from "./types";

const BASE_URL = "https://front-test.hex.team/api";

export const createShortLink = createAsyncThunk(
  "link/createShortLink",
  async ({ link }: ILink, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        "Content-Type": "application/json",
      };
      const response = await axios.post<IDataLink>(
        `${BASE_URL}/squeeze?link=${link}`,
        { link },
        config
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error && error.response && error.response.data.detail) {
          return rejectWithValue(error.response.data.detail);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  }
);

export const getStatistics = createAsyncThunk(
  "auth/getStatistics",
  async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      "Content-Type": "application/json",
    };
    const { data } = await axios.get<IDataLink[]>(
      `${BASE_URL}/statistics`,
      config
    );
    return data;
  }
);
