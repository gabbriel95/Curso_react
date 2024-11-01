import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = [
  {
    path: "/auth/*",
    children: AuthRoutes,
  },
  {
    path: "/",
    children: JournalRoutes,
  },
];
