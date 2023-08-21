import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
  backgroundAnimation:
    "backgroundAnimation" in localStorage ? localStorage.getItem("backgroundAnimation") === "true" : true
};

export const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.showLoader = action.payload;
    },
    toggleBackgroundAnimation(state, action) {
      state.backgroundAnimation = action.payload;
    }
  }
});

export const { toggleLoader, toggleBackgroundAnimation } = slice.actions;

export default slice.reducer;
