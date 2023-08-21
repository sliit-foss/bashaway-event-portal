import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery,
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => `/api/settings`
    })
  })
});

export const { useGetSettingsQuery } = settingApi;
