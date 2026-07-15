import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayoute from "../AppLayouts/AuthLayoute";
import Login from "../../features/Auth/UI/pages/Login";
import Register from "../../features/Auth/UI/pages/register";
import Deshboard from "../AppLayouts/Deshboard";
import Home from "../../features/Auth/deshboard/ui/Home";

export const AppRoutes = () => {
  const router = createBrowserRouter([ // Data routing 
    {
      path: "/",
      element: <AuthLayoute />,
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
    {
      path: "/Home",
      element: <Deshboard />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
