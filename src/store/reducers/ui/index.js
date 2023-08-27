import { combineReducers } from "@reduxjs/toolkit";
import global from "./global";
import profile from "./profile";

export default combineReducers({
  global,
  profile
});
