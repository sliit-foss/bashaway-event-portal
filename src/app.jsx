import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/store";
import { default as AnimatedRoutes } from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <div className="bg-black">
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </Provider>
  );
};

export default App;
