import { login } from '../services/auth'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault()
    await login({
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      localStorage.setItem('token', res.data.access_token)
    })
  }

  return (
    <div className="bg-black w-screen h-screen flex flex-col font-inter pt-14">
      <div className="flex justify-center sm:justify-end sm:mr-8 items-center">
        <div className="flex items-end h-full pb-4 mr-1 sm:mr-4">
          <img src="assets/Circle.svg" className="w-5 h-5 sm:w-8 sm:h-8" />
          <img src="assets/Line.svg" className="w-8 h-8 sm:w-12 sm:h-12" />
        </div>

        <div className="flex justify-end ">
          <span className="font-inter font-semibold sm:text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">LET'S GET BASHING</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row w-screen items-center pt-14">
        <img src="assets/Login.svg" className="bg-black h-[355px] sm:w-1/2 absolute sm:sticky opacity-30 z-0 sm:opacity-100" />

        <div className="flex flex-col w-full sm:w-1/2 mt-28 sm:mt-0 z-50">
          <div className=" sm:mr-8">
            <form className="flex items-center sm:items-end flex-col" onSubmit={handleLogin}>
              <input placeholder="Email" type="email" name="email" className="w-11/12 sm:w-10/12  2xl:w-full h-10 sm:h-16 bg-transparent border-[1px] rounded-md border-input-border text-gray-100 p-4" required />
              <input placeholder="Password" type="password" name="password" className="w-11/12 sm:w-10/12 2xl:w-full h-10 sm:h-16 bg-transparent border-[1px] rounded-md border-input-border my-8 text-gray-100 p-3" required />
              <Link to="/forgotPassword" className="text-white font-inter font-bold text-sm sm:text-base mt-4">
                Forgot Password?
              </Link>
              <button type="submit" className="w-[130px] h-8 sm:w-[165px] sm:h-11 bg-[#d9d9d9] rounded-md flex items-center justify-center text-base font-normal mt-7 cursor-pointer">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
