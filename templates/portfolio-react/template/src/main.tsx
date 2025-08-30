import React from "react";
import ReactDOM from "react-dom/client";
// #if blog
import { BrowserRouter } from "react-router-dom";
// #endif
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* #if blog */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* #endif */}
    {/* #if !blog */}
    <App />
    {/* #endif */}
  </React.StrictMode>
);
