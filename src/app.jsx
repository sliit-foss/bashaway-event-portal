import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/store";
import { default as AnimatedRoutes } from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-black">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
