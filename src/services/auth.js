import { axiosInstance, apiRequest } from './core/axios'

export const login = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/login`, data))
}

export const forgotPassword = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/auth/forgot_password`, data))
}
