import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { login } from "../services/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const userNameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    await setFormData({
      email: userNameRef.current.value,
      password: passwordRef.current.value,
    });
    setFormErrors(validateInputs(formData));
    setIsSubmit(true);
    try {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        const response =await login(formData);
        localStorage.setItem("access_token" , response.data.data.access_token)
        if(response.status === 500){

        }
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInputs = (data) => {
    const err = {};
    if (!data.email) {
      err.username = "Username field cannot be empty...";
    }
    if (!data.password) {
      err.password = "Password field cannot be empty...";
    }
    return err;
  };

  return (
    <div className="bg-black w-screen h-screen flex flex-row font-inter">
      <div className="flex-1 flex justify-center items-center">
        <img
          src="assets/Login.svg"
          className="bg-black h-[355px] w-[511.39px]"
        />
      </div>
      <div className="flex-1 flex flex-col mt-[110px]">
        <div className="flex justify-center items-center">
          <div className="flex items-end h-full pb-4 mr-4">
            <img src="assets/Circle.svg" className="w-8 h-8" />
            <img src="assets/Line.svg" className="w-12 h-12" />
          </div>

          <div className="flex justify-end ">
            <span className="font-inter font-semibold text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              LET'S GET BASHING
            </span>
          </div>
        </div>

        <div className=" flex flex-col w-4/5 mt-[92px] mr-20">
          <form className=" flex items-end flex-col">
            <input
              ref={userNameRef}
              placeholder="Username"
              type="text"
              className="w-[486px] h-16 bg-transparent border-[1px] rounded-md border-input-border text-gray-100 p-4"
            />
            {formErrors.username && (
              <span className="text-red-600">{formErrors.username}</span>
            )}

            <input
              ref={passwordRef}
              placeholder="Password"
              type="password"
              className="w-[486px] h-16 bg-transparent border-[1px] rounded-md border-input-border my-8 text-gray-100 p-3"
            />
            {formErrors.password && (
              <span className="text-red-600">{formErrors.password}</span>
            )}
            <h1 className="text-white font-inter font-bold text-base mt-4">
              Forgot Password?
            </h1>
            <div
              onClick={handleLogin}
              className="w-[165px] h-11 bg-[#d9d9d9] rounded-md flex items-center justify-center text-base font-normal mt-7 cursor-pointer"
            >
              Login
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
