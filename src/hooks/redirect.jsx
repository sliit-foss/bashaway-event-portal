import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const protectedRoutes = ["question", "leaderboard"];
const closedRoutes = [];

const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // TODO: finalize event start time
    const dateCheck = Date.now() < new Date(2022, 9, 1, 9, 0, 0).getTime();
    if (dateCheck && protectedRoutes.includes(window.location.pathname.split("/")[1])) {
      navigate("/404");
    } else if (closedRoutes.includes(window.location.pathname.split("/")[1])) {
      navigate("/");
    }
  }, [location]);
};

export default useRedirect;
