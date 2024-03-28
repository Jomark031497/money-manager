import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RootLayout } from "./components/layouts/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { ForgotPassword } from "./pages/auth/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
