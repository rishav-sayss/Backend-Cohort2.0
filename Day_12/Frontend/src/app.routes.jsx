import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import FeedPage from "./Features/Post/Pages/FeedPage"
import CreatPost from "./Features/Post/Pages/CreatPost"


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <FeedPage />
    },
    {
        path: "/Create-post",
        element: <CreatPost />
    }
])