import { combineReducers } from "@reduxjs/toolkit";
import event from "./event";
import global from "./global";
import profile from "./profile";

export default combineReducers({
  event,
  global,
  profile
});
