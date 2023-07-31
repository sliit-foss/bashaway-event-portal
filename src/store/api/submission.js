import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { mutationHelper } from "./base";

const { post } = mutationHelper;

export const submissionApi = createApi({
  reducerPath: "submissionApi",
  baseQuery,
  endpoints: (builder) => ({
    getMySubmissions: builder.query({
      query: ({ filters, sorts, page }) => `/api/submissions?${filters}&${sorts}&page=${page}&limit=10`
    }),
    addSubmission: builder.mutation({
      query: (data) => post(`/api/submissions`, data)
    })
  })
});

export const { useGetMySubmissionsQuery, useAddSubmissionMutation } = submissionApi;
