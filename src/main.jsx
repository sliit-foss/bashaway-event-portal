import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { default as App } from "@/app";
import { default as initializeTracing } from "@/services/sentry";
import "@/styles/index.css";

initializeTracing();

const Root = () => {
  let basename = "/";

  const matchPreviewDeployment = window.location.pathname.match(/preview\/pr-\d+/);

  if (matchPreviewDeployment) {
    basename += matchPreviewDeployment[0];
  }

  return (
    <React.StrictMode>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
