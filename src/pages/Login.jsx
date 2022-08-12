import React, { useRef } from "react";

const Login = () => {
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

        <div className="flex flex-col items-end mt-[92px] mr-20">
            <input placeholder="Username" type="text" className="w-[486px] h-16 bg-transparent border-[1px] rounded-md border-input-border text-gray-100 p-4"/>
            <input placeholder="Password" type="password" className="w-[486px] h-16 bg-transparent border-[1px] rounded-md border-input-border my-8 text-gray-100 p-3"/>
            <h1 className="text-white font-inter font-bold text-base mt-4">Forgot Password?</h1>
            <div className="w-[165px] h-11 bg-[#d9d9d9] rounded-md flex items-center justify-center text-base font-normal mt-7">
              Login
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
