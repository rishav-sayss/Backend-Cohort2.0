import { createBrowserRouter } from "react-router"
import Register from "./feature/Auth/pages/Register"
import Login from "./feature/Auth/pages/Login"
import Protected from "./feature/Auth/component/Protected"

export let routes = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1>Home</h1></Protected>
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
