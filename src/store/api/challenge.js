import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { selectEntityById, updateEntityStateById } from "./base";

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

export const selectChallengeById = (id) => selectEntityById("challengeApi", "getChallenges", id);

export const updateChallengeStateById = (store, id, payload) =>
  updateEntityStateById(store, challengeApi, "challengeApi", ["getChallenges", "getChallengeById"], id, payload);

export const { useGetChallengesQuery, useLazyGetChallengesQuery, useGetChallengeByIdQuery } = challengeApi;
