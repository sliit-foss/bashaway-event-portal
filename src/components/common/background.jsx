import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { default as FOG } from "vanta/dist/vanta.fog.min";

const Background = () => {
  const { pathname } = useLocation();

  const { backgroundAnimation } = useSelector((state) => state.ui.global);

  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    if (backgroundAnimation) {
      document.getElementById("vanta-placeholder").style.display = "none";
      document.getElementById("vanta-placeholder").style.backgroundImage =
        "radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))";
    }
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
            highlightColor: "#fff",
            midtoneColor: "#ff0000",
            lowlightColor: "#000000",
            baseColor: "#fff",
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

  if (!backgroundAnimation) return <></>;

  return (
    <div id="vanta-placeholder" ref={myRef} className="w-full h-full bg-white fixed top-0 right-0 opacity-[0.1]" />
  );
};

export default Background;
