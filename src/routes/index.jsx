import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import QuestionView from '../pages/questionView'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import ChangePassword from '../pages/changePassword'
import Profile from '../pages/profile'
import NotFound from '../pages/404'
import { useAuth, useRedirect } from '../hooks'

const AnimatedRoutes = () => {
  useAuth()
  useRedirect()

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/question/:id" element={<QuestionView />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
