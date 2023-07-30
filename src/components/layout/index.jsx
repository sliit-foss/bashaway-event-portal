import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { isEmpty } from "lodash";
import { default as FOG } from "vanta/dist/vanta.fog.min";
import { useEffectOnce } from "@/hooks";
import { getCurrentUser } from "@/services/auth";
import { setUser } from "@/store/user";
import { Loader } from "../common";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children, title }) => {
  const { pathname } = useLocation();

  const { backgroundAnimation } = useSelector((state) => state.ui);

  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(null);

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  useEffectOnce(() => {
    localStorage.getItem("token") &&
      isEmpty(currentUser) &&
      getCurrentUser().then((res) => {
        dispatch(setUser(res.data));
      });
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    if (backgroundAnimation) {
      document.getElementById("vanta-placeholder").style.display = "none";
      document.getElementById("vanta-placeholder").style.backgroundImage =
        "radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))";
    }
    document.title = title || "Bashaway";
  }, []);

  useEffect(() => {
    if (backgroundAnimation) {
      if (!vantaEffect) {
        document.getElementById("vanta-placeholder").style.display = "block";
        setVantaEffect(
          FOG({
            el: myRef.current,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x0,
            midtoneColor: 0xc0c0c,
            lowlightColor: 0x414141,
            baseColor: 0x90909,
            blurFactor: 0.37
          })
        );
      }
      return () => {
        if (vantaEffect) {
          vantaEffect.destroy();
          setVantaEffect(0);
        }
      };
    }
  }, [vantaEffect, backgroundAnimation]);

  return (
    <motion.main
      className="bg-black font-inter overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <div className="w-screen min-h-screen relative z-[5]">{children}</div>
      <Footer />
      <ToastContainer />
      <Loader />
      {backgroundAnimation && (
        <div id="vanta-placeholder" ref={myRef} className="w-full h-full bg-black fixed top-0 right-0" />
      )}
    </motion.main>
  );
};

export default Layout;
