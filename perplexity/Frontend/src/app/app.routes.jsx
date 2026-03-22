import { createBrowserRouter } from "react-router-dom"
import Login from "../feature/auth/pages/Login"
import Register from "../feature/auth/pages/Register"
import Protected from "../feature/auth/component/protected"
import Homepage from "../feature/auth/pages/homepage"
import HomePage from "../pages/HomePage"

export let router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Protected>
            <Homepage />
        </Protected>
    }
])
