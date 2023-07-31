import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { put } = mutationHelper;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ id, data }) => put(`/api/users/${id}`, data)
    }),
    changePassword: builder.mutation({
      query: (data) => put(`/api/users/change_password`, data)
    })
  })
});

export const { useUpdateProfileMutation, useChangePasswordMutation } = userApi;
