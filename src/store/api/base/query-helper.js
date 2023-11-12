import { createSelector } from "@reduxjs/toolkit";

export const selectEntityById = (api, endpoint, id) =>
  createSelector(
    (store) => store[api].queries,
    (queries) =>
      Object.values(queries)
        .filter((q) => q.endpointName === endpoint)
        ?.sort((a, b) => b?.fulfilledTimeStamp - a.fulfilledTimeStamp)?.[0]
        ?.data?.data?.docs?.filter((q) => q?._id === id)?.[0]
  );

export const updateEntityStateById = (store, api, apiName, endpoints, id, payload) => {
  Object.values(store.getState()[apiName].queries).forEach(({ endpointName, originalArgs, data }) => {
    if (endpointName === endpoints[0]) {
      store.dispatch(
        api.util.upsertQueryData(endpoints[0], originalArgs, {
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
    } else if (endpointName === endpoints[1] && originalArgs === id) {
      store.dispatch(
        api.util.upsertQueryData(endpoints[1], originalArgs, {
          ...data,
          data: { ...data.data, ...payload }
        })
      );
    }
  });
};
