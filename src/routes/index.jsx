import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useIdentification } from "@/hooks";
import {
  ChallengeDetails,
  ChangePassword,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Profile,
  Register,
  ResetPassword,
  Submissions
} from "@/pages";

const AnimatedRoutes = () => {
  const location = useLocation();
  useIdentification();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />
        <Route path="/challenges/:id/submissions" element={<Submissions />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
