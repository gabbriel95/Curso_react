import { CheckingAuth } from "../ui/components/CheckingAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
  const status = useCheckAuth();

  console.log(status);

  if (status === "checking") {
    return [
      {
        path: "*",
        element: <CheckingAuth />,
      },
    ];
  }

  if (status === "not-authenticated") {
    return [
      {
        path: "*",
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "/auth/*",
        children: AuthRoutes,
      },
    ];
  }

  if (status === "authenticated") {
    return [
      {
        path: "/",
        children: JournalRoutes,
      },
    ];
  } else {
    return [
      {
        path: "/auth/*",
        children: AuthRoutes,
      },
    ];
  }
};
