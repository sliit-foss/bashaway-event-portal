import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import FOG from 'vanta/dist/vanta.fog.min'
import { Loader } from '../common'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children, title, skipAuthGuard }) => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [vantaEffect, setVantaEffect] = useState(0)

  const myRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  useEffect(() => {
    document.getElementById('vanta-placeholder').style.display = 'none'
    document.getElementById('vanta-placeholder').style.backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))'
    document.title = title || 'Bashaway'
  }, [])

  useEffect(() => {
    if (!vantaEffect) {
      document.getElementById('vanta-placeholder').style.display = 'block'
      setVantaEffect(
        FOG({
          el: myRef.current,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x0,
          midtoneColor: 0xc0c0c,
          lowlightColor: 0x414141,
          baseColor: 0x90909,
          blurFactor: 0.37,
        }),
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  useEffect(() => {
    const whitelistedPaths = ['login', 'register', 'forgot-password', 'reset-password']
    if (!skipAuthGuard && !localStorage.getItem('token') && !whitelistedPaths.includes(window.location.pathname.split('/')[1])) {
      navigate('/login')
    }
  }, [])

  return (
    <motion.main className="bg-black font-inter overflow-x-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.3 }}>
      <Navbar />
      <div className="w-screen min-h-screen relative z-[5]">{children}</div>
      <Footer />
      <ToastContainer />
      <Loader />
      <div id="vanta-placeholder" ref={myRef} className="w-full h-full bg-black fixed top-0 right-0" />
    </motion.main>
  )
}

export default Layout
