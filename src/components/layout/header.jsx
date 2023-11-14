import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full min-h-[70px] xs:min-h-[90px] backdrop-blur-md fixed z-[200] transition-all duration-long border-b h-[70px] xs:h-[90px] bg-white/80">
      <div className="w-full max-w-body mx-auto flex justify-center py-3.5 xs:py-6 px-8 lg:px-24">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Home"
          className="text-4xl font-semibold tracking-tight"
        >
          techevents.<span className="font-light text-gray-300">lk</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
