import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, questionApi, settingApi, submissionApi, userApi } from "./api";
import { default as rootReducer } from "./reducers";

export function makeStore() {
  return configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: combineReducers({
      ...rootReducer,
      [authApi.reducerPath]: authApi.reducer,
      [questionApi.reducerPath]: questionApi.reducer,
      [settingApi.reducerPath]: settingApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer,
      [userApi.reducerPath]: userApi.reducer
    }),
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(questionApi.middleware)
        .concat(settingApi.middleware)
        .concat(submissionApi.middleware)
        .concat(userApi.middleware);
      return middleware;
    }
  });
}

export const store = makeStore();

export default { store };
