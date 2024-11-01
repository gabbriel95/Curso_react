import { Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = [
  {
    index: true,
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/auth/login"} />,
  },
];
