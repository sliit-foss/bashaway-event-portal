import { ToastContainer } from 'react-toastify'
import Footer from './footer'
import Navbar from './navbar'

const Layout = ({ children, title }) => {
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
      </main>
    </>
  )
}

export default Layout
