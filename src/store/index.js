import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi, challengeApi, eventApi, settingApi, submissionApi, userApi } from "./api";
import { default as rootReducer } from "./reducers";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: combineReducers({
      ...rootReducer,
      [authApi.reducerPath]: authApi.reducer,
      [eventApi.reducerPath]: eventApi.reducer,
      [challengeApi.reducerPath]: challengeApi.reducer,
      [settingApi.reducerPath]: settingApi.reducer,
      [submissionApi.reducerPath]: submissionApi.reducer,
      [userApi.reducerPath]: userApi.reducer
    }),
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(eventApi.middleware)
        .concat(challengeApi.middleware)
        .concat(settingApi.middleware)
        .concat(submissionApi.middleware)
        .concat(userApi.middleware);
      return middleware;
    }
  });
}

export const store = makeStore();

export default { store };
