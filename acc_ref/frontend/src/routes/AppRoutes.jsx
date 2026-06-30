import { createBrowserRouter, RouterProvider } from "react-router";
import PubliceRoute from "./protected/publiceroute";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./protected/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import { useEffect } from "react";
import { axiosInstance } from "../config/Axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { adduser, Removeuser } from "../state/authreducer";

const AppRoutes = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
  
        let res = await axiosInstance.get("/auth/api/me");
        dispatch(adduser(res?.data?.user));
      } catch (error) {
        dispatch(Removeuser());
        console.log("error in me api", error);
      }
    })();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PubliceRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "/login",
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
      element: <ProtectedRoute />, //user nahi aya to ! se usse true karo or / pr bhejo
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
