import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/layouts/RootLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ProtectedRoute } from './features/utils/components/ProtectedRoute';
import { AuthRoute } from './features/utils/components/AuthRoute';
import { Profile } from './pages/Profile';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthRoute />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'forgot',
        element: <ForgotPassword />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
