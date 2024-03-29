import { createApi } from "@reduxjs/toolkit/query/react";
import { createSelector } from "@reduxjs/toolkit";
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

export const selectQuestionById = (id) =>
  createSelector(
    ({ questionApi }) => questionApi.queries,
    (queries) =>
      Object.values(queries)
        .filter((q) => q.endpointName === "getQuestions")
        ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
        ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
  );

export const updateQuestionStateById = (store, id, payload) => {
  Object.values(store.getState().questionApi.queries).forEach(({ endpointName, originalArgs, data }) => {
    if (endpointName === "getQuestions") {
      store.dispatch(
        questionApi.util.upsertQueryData("getQuestions", originalArgs, {
          ...data,
          data: {
            ...data.data,
            docs: data?.data?.docs?.map((q) => {
              if (q?._id === id) return { ...q, ...payload };
              return q;
            })
          }
        })
      );
    } else if (endpointName === "getQuestionById" && originalArgs === id) {
      store.dispatch(
        questionApi.util.upsertQueryData("getQuestionById", originalArgs, {
          ...data,
          data: { ...data.data, ...payload }
        })
      );
    }
  });
};

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery, useGetQuestionByIdQuery } = questionApi;
