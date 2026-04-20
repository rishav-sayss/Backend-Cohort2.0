import { createBrowserRouter } from "react-router"
import Ragister from "../feature/Auth/pages/Register"
import Login from "../feature/Auth/pages/Login"
import CreateProduct from "../feature/Product/Pages/CreateProduct"


export let routes = createBrowserRouter([
    {
        path: "/",
        element: <h1 className=" text-white" >hello world </h1>
    },
    {
        path: "/register",
        element: <Ragister />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/seller/creatproduct",
        element:<CreateProduct/>
    }
])