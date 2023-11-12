import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSurveyForm: false
};

export const slice = createSlice({
  name: "event",
  initialState,
  reducers: {
    toggleSurveyForm(state, action) {
      state.showSurveyForm = action.payload;
    }
  }
});

export const { toggleSurveyForm } = slice.actions;

export default slice.reducer;
