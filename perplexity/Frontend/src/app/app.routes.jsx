import { createBrowserRouter } from "react-router-dom"
import Login from "../feature/auth/pages/Login"
import Register from "../feature/auth/pages/Register"
import Protected from "../feature/auth/component/protected"
import HomePage from "../pages/HomePage"
import Chat from "../feature/auth/pages/Chat"

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
            <Chat/>
        </Protected>
    },

])
