import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery,
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ filters, sorts, page }) => `/api/questions?${filters}&${sorts}&page=${page}&limit=6`
    }),
    getQuestionById: builder.query({
      query: (id) => `/api/questions/${id}`
    })
  })
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery, useGetQuestionByIdQuery } = questionApi;
