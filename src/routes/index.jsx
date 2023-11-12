import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  ChallengeDetails,
  Challenges,
  ChangePassword,
  EventDetails,
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
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:event_id" element={<EventDetails />} />
        <Route path="/:event_id/challenges" element={<Challenges />} />
        <Route path="/:event_id/challenges/:challenge_id" element={<ChallengeDetails />} />
        <Route path="/:event_id/challenges/:challenge_id/submissions" element={<Submissions />} />
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
