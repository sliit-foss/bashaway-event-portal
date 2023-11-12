import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery, { selectEntityById, updateEntityStateById } from "./base";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery,
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ filters, sorts, page }) => `/api/events?${filters}&${sorts}&page=${page}&limit=6`
    }),
    getEventById: builder.query({
      query: (id) => `/api/events/${id}`
    })
  })
});

export const selectEventById = (id) => selectEntityById("eventApi", "getEvents", id);

export const updateEventStateById = (store, id, payload) =>
  updateEntityStateById(store, eventApi, "eventApi", ["getEvents", "getEventById"], id, payload);

export const { useGetEventsQuery, useLazyGetEventsQuery, useGetEventByIdQuery } = eventApi;
