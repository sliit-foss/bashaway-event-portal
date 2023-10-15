import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoader: false,
  showIdentificationForm: false
};

export const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.showLoader = action.payload;
    },
    toggleIdentificationForm(state, action) {
      state.showIdentificationForm = action.payload;
    }
  }
});

export const { toggleLoader, toggleIdentificationForm } = slice.actions;

export default slice.reducer;
