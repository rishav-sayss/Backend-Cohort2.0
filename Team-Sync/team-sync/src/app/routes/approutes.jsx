import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayoute from "../AppLayouts/AuthLayoute";
import Login from "../../features/Auth/UI/pages/Login";
import Register from "../../features/Auth/UI/pages/register";
import Deshboard from "../AppLayouts/Deshboard";
import Home from "../../features/Auth/deshboard/ui/Home";
import { useEffect } from "react";
import { currentLoggedinUser } from "../../features/Auth/State/Auth/AuthAction";
import { useDispatch } from "react-redux";

export const AppRoutes = () => {

  let dispatch  =  useDispatch()

  useEffect(() => {
    (()=>{  
      dispatch(currentLoggedinUser());
    }
    )();
  }, [])

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
