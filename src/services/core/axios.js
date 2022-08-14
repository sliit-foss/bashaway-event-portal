import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.VITE_BASHAWAY_BE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const apiRequest = async (request) => {
  return await request()
    .then((res) => res.data)
    .catch((error) => {
      alert(error.response.data.message)
    })
}
