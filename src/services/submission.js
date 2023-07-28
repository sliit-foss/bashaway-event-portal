import { apiRequest, axiosInstance } from "./core/axios";

export const addSubmission = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/submissions`, data), showLoader);
};

export const getMySubmissions = async (filterQuery, sortQuery, page, showLoader) => {
  return await apiRequest(
    () => axiosInstance.get(`/api/submissions?${filterQuery}&${sortQuery}&page=${page}&limit=10`),
    showLoader
  );
};
