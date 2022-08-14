import { login } from "../services/auth";

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    await login({
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      localStorage.setItem("token", res.data.access_token);
    })
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
          <form className="flex items-end flex-col" onSubmit={handleLogin}>
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="w-3/4 2xl:w-full h-16 bg-transparent border-[1px] rounded-md border-input-border text-gray-100 p-4"
              required
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="w-3/4 2xl:w-full h-16 bg-transparent border-[1px] rounded-md border-input-border my-8 text-gray-100 p-3"
              required
            />
            <h1 className="text-white font-inter font-bold text-base mt-4">
              Forgot Password?
            </h1>
            <button
              type="submit"
              className="w-[165px] h-11 bg-[#d9d9d9] rounded-md flex items-center justify-center text-base font-normal mt-7 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
