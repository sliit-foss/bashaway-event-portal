const Login = () => {
  return (
    <div className="bg-black w-screen h-screen flex ">
      <div className="flex-1 flex items-center justify-center">
        <img src="./assets/ForgotPassword.svg" />
      </div>
      <div className="flex-1 mt-48 flex flex-col font-inter">
        {/* text-justify? */}
        <span className="text-white font-medium text-[32px] tracking-[-0.04em]">
          Forgot Password?
        </span>
        <p className="text-white font-light text-xl tracking-[-0.04em] w-[479px] mt-8 mb-[47px]">
          Please enter your registration email address. We'll send instructions
          to help reset your password.
        </p>
        <input
          className="bg-transparent border-2 border-input-border rounded-[5px] h-16 w-[486px] p-4 text-gray-100"
          type="email"
          placeholder="Email"
        />
        <div className="bg-[#D9D9D9] w-[165px] h-[42px] rounded-[5px] flex justify-center items-center text-base font-normal mt-14">
          Send
        </div>
      </div>
    </div>
  );
};

export default Login;
