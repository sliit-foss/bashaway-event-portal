import axios from "axios";

export const login = async (data) => {
  return await axios.post(`${import.meta.env.VITE_BASHAWAY_BE_URL}/api/auth/login`, data).then(res => res.data).catch((error) => {
    alert(error.response.data.message);
  })
};

