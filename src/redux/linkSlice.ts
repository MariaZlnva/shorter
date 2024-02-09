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
  listLink: {
    counter: null,
    id: null,
    short: "",
    target: "",
  },
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
    deleteListLink: (state) => {
      state.listLink = {
        counter: null,
        id: null,
        short: "",
        target: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createShortLink.pending, () => {});
    builder.addCase(createShortLink.fulfilled, (state, action) => {
      if (action.payload?.id) state.listLink = action.payload;
    });
    builder.addCase(createShortLink.rejected, (state, action) => {
      state.isErrorCreate = true;
      state.messageErrorCreate = String(action.payload);
    });

    builder.addCase(getStatistics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
      state.isLoading = false;
      state.isErrorGetStatistics = false;
    });
    builder.addCase(getStatistics.rejected, (state) => {
      state.isLoading = false;
      state.isErrorGetStatistics = true;
    });
  },
});

export const { deleteMessageErrorCreate, deleteListLink } = linkSlice.actions;
export default linkSlice.reducer;
