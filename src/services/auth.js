import axios from "axios";
import.meta.env.LOGIN_URI

export const login =async (data) => {
  // const url = import.meta.env.LOGIN_URI
  // console.log(url);
  const response =  await axios.post( "http://localhost:3001/api/auth/login" , data)
  return response
};

