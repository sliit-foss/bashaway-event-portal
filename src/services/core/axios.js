import axios from 'axios'
import { toast } from 'react-toastify'
import store from '../../store'
import { toggleLoader } from '../../store/ui'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASHAWAY_BE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const apiRequest = async (request, showLoader = true) => {
  store.dispatch(toggleLoader(showLoader))
  const response = await request()
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
  store.dispatch(toggleLoader(false))
  return response
}
