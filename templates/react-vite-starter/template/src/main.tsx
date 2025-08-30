import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// #if tailwind
import "./styles/index.css";
// #endif

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
