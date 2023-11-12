import { createApi } from "@reduxjs/toolkit/query/react";
import { createSelector } from "@reduxjs/toolkit";
import baseQuery from "./base";

export const challengeApi = createApi({
  reducerPath: "challengeApi",
  baseQuery,
  endpoints: (builder) => ({
    getChallenges: builder.query({
      query: ({ filters, sorts, page }) => `/api/challenges?${filters}&${sorts}&page=${page}&limit=6`
    }),
    getChallengeById: builder.query({
      query: (id) => `/api/challenges/${id}`
    })
  })
});

export const selectChallengeById = (id) =>
  createSelector(
    ({ challengeApi }) => challengeApi.queries,
    (queries) =>
      Object.values(queries)
        .filter((q) => q.endpointName === "getChallenges")
        ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
        ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
  );

export const updateChallengeStateById = (store, id, payload) => {
  Object.values(store.getState().challengeApi.queries).forEach(({ endpointName, originalArgs, data }) => {
    if (endpointName === "geChallenges") {
      store.dispatch(
        challengeApi.util.upsertQueryData("geChallenges", originalArgs, {
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
    } else if (endpointName === "getChallengeById" && originalArgs === id) {
      store.dispatch(
        challengeApi.util.upsertQueryData("getChallengeById", originalArgs, {
          ...data,
          data: { ...data.data, ...payload }
        })
      );
    }
  });
};

export const { useGetChallengesQuery, useLazyGetChallengesQuery, useGetChallengeByIdQuery } = challengeApi;
