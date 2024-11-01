import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import "./styles.css";
import { AppTheme } from "./theme";

const router = createBrowserRouter(AppRouter);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppTheme>
      <RouterProvider router={router} />
    </AppTheme>
  </React.StrictMode>
);
