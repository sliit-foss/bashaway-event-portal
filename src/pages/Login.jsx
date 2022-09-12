import { login } from '../services/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../components/common'
import Layout from '../components/layout'

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login({
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      if (res.success) {
        localStorage.setItem('token', res.data.data.access_token)
        navigate('/')
      }
    })
  }

  return (
    <Layout title="Login | Bashaway">
      <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start lg:items-center pt-14">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 flex justify-center items-center">
            <img src="assets/Login.svg" className="w-9/12" />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <div>
              <form className="flex flex-col items-end" onSubmit={handleLogin}>
                <Input placeholder="Email" type="email" name="email" className="p-4" required />
                <Input placeholder="Password" type="password" name="password" className="my-8 p-3" required />
                <Link to="/forgotPassword" className="text-white font-bold text-sm sm:text-base mt-4">
                  Forgot Password?
                </Link>
                <Button className="w-[130px] h-10 sm:w-[165px] sm:h-11 mt-10 text-black">Login</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
