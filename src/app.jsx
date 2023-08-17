import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer, Header, Loader, Toaster, TooltipProvider } from "@/components";
import { store } from "@/store";
import { default as AnimatedRoutes } from "./routes";

const App = () => {
  const location = useLocation();
  return (
    <Provider store={store}>
      <TooltipProvider>
        <main className="w-full flex flex-col items-center min-h-screen mx-auto relative z-50">
          <Header />
          <motion.div
            key={location.pathname}
            className="w-full relative z-[5] font-inter overflow-x-hidden pt-[calc(70px+64px)] xs:pt-[calc(90px+96px)] pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedRoutes />
          </motion.div>
          <Footer />
          <Loader />
          <Toaster />
        </main>
      </TooltipProvider>
    </Provider>
  );
};

export default App;
