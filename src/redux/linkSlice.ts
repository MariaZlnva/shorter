import { createSlice } from "@reduxjs/toolkit";
import { createShortLink, getStatistics } from "./linkActions";
import { IDataLink } from "./types";

interface ILinkSlice {
  listLink: IDataLink;
  statistics: IDataLink[];
  isLoading: boolean;
  isErrorCreate: boolean;
  isErrorGetStatistics: boolean;
  messageErrorCreate: string;
}

const initialState: ILinkSlice = {
  listLink: null,
  statistics: [],
  isLoading: false,
  isErrorCreate: false,
  isErrorGetStatistics: false,
  messageErrorCreate: "",
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    deleteMessageErrorCreate: (state) => {
      state.messageErrorCreate = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createShortLink.pending, (action) => {
      console.log(action);
    });
    builder.addCase(createShortLink.fulfilled, (state, action) => {
      console.log(action);
      state.listLink = action.payload;
    });
    builder.addCase(createShortLink.rejected, (state, action) => {
      console.log(action); //payload: ''
      state.isErrorCreate = true;
      state.messageErrorCreate = String(action.payload);
    });

    builder.addCase(getStatistics.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      console.log(action);
      state.statistics = action.payload;
      state.isLoading = false;
      state.isErrorGetStatistics = false;
    });
    builder.addCase(getStatistics.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isErrorGetStatistics = true;
    });
  },
});

export const { deleteMessageErrorCreate } = linkSlice.actions;
export default linkSlice.reducer;
