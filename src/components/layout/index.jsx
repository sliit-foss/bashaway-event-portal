import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import FOG from 'vanta/dist/vanta.fog.min'
import { Loader } from '../common'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children, title }) => {
  const navigate = useNavigate()

  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)

  useEffect(() => {
    document.getElementById('vanta-placeholder').style.display = 'none'
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
    if (!localStorage.getItem('token') && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <head>
        <title>{title || 'App | Todo'}</title>
        <meta name="description" content="Simple TODO app to manage your day to day tasks" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <main className="bg-black font-inter overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
        <Loader />
        <div id="vanta-placeholder" ref={myRef} className="w-full h-full bg-black fixed top-0 right-0" />
      </main>
    </>
  )
}

export default Layout
