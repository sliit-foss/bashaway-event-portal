import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddMemberDialog: false
};

export const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleAddMemberDialog(state, action) {
      state.showAddMemberDialog = action.payload;
    }
  }
});

export const { toggleAddMemberDialog } = slice.actions;

export default slice.reducer;
