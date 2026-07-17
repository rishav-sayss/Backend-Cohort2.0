import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayoute from "../AppLayouts/AuthLayoute";
import Login from "../../features/Auth/UI/pages/Login";
import Register from "../../features/Auth/UI/pages/register";
import Deshboard from "../AppLayouts/Deshboard";
import Home from "../../features/Auth/deshboard/ui/component/Home";
import { useEffect } from "react";
import { currentLoggedinUser } from "../../features/Auth/State/Auth/AuthAction";
import { useDispatch } from "react-redux";
import ProtectedRoute from "../protected/ProtectedRoute";
import PublicRoute from "../protected/PublicRoute";
import { commanRoute } from "./commanRoute";
import RolebasedRoute from "../protected/RolebasedRoute";
import { AdminRoute } from "./adminroute";

export const AppRoutes = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    (() => dispatch(currentLoggedinUser()))();
  }, []);

  const router = createBrowserRouter([
    // Data routing
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayoute />,
          children: [
            {
              path: "/",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <Deshboard />,
          children: [
            ...commanRoute,
            {
              element: <RolebasedRoute allowedRole={"admin"} />,
              children: AdminRoute,
            },
            {
              element: <RolebasedRoute allowedRole={"employee"} />,
              children: AdminRoute,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
