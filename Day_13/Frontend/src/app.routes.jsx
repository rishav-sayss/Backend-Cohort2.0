import { createBrowserRouter } from "react-router"
import Register from "./feature/Auth/pages/Register"
import Login from "./feature/Auth/pages/Login"
import Protected from "./feature/Auth/component/Protected"
import Home from "./feature/Home/pages/Home"

export let routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }

])
