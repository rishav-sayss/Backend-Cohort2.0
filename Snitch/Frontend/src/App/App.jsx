import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./app.routes"
import { useAuth } from '../feature/Auth/Hooks/auth.hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setloading } from '../feature/Auth/state/auth.slice'
function App() {

  let { handelgetme } = useAuth()
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)
  // console.log(user)
  
  useEffect(() => {
     const hasSessionLogin = sessionStorage.getItem("snitch_logged_in") === "true";
     if (hasSessionLogin) {
      handelgetme();
     } else {
      dispatch(setloading(false));
     }
  },[dispatch, handelgetme])

  return (
    <RouterProvider router={routes} />

  )
}

export default App
