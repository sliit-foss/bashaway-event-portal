import { forgotPassword } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault()
    await forgotPassword({
      email: e.target.email.value,
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="bg-black w-screen h-screen flex md:flex-row relative items-center justify-center sm:px-16">
      <img src="./assets/ForgotPassword.svg" alt="Forgot Password" className="absolute opacity-30 z-0 px-2 md:sticky md:h-[500px] md:w-[500px] md:opacity-100 md:flex-1" />
      <div className="flex flex-col font-inter mx-6 z-50 md:flex-1 md:ml-10">
        <span className="text-white font-medium text-3xl tracking-[-0.04em]">Forgot Password?</span>
        <p className="text-white font-light tracking-tight text-lg w-11/12 mt-8 mb-[47px] sm:w-full">Please enter your registration email address. We'll send instructions to help reset your password.</p>
        <form onSubmit={handleForm} className="md:items-end md:flex md:flex-col">
          <input className="bg-transparent border-2 border-input-border rounded-[5px] h-10 w-11/12 sm:w-full sm:h-12 lg:h-16 p-4 text-gray-100" type="email" name="email" placeholder="Email" required />
          <button type="submit" className="bg-[#D9D9D9] w-[130px] h-8 sm:h-11 rounded-[5px] flex justify-center items-center text-base font-normal mt-14">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
