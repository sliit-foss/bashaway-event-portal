import axios from 'axios'
import { toast } from 'react-toastify'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASHAWAY_BE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const apiRequest = async (request) => {
  return await request()
    .then((res) => ({
      success: true,
      data: res.data,
    }))
    .catch((error) => {
      const message = error.response.data.message
      toast.error(message)
      return {
        success: false,
        message: message,
      }
    })
}
