import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ import BrowserRouter
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the App for routing */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
