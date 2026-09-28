import React from "react";
import ReactDOM from "react-dom/client";
// Must run before React replaces the pre-rendered copy (see the module).
import "./utils/prerendered";
import App from "./App";
import "./index.css";
import { LocationProvider } from "./components/context/LocationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </React.StrictMode>
);
