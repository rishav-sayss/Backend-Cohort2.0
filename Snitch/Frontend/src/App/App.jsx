import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { routes } from "./app.routes"
import { useAuth } from '../feature/Auth/Hooks/auth.hooks'
import { useSelector } from 'react-redux'
function App() {

  let { handelgetme } = useAuth()

  const user = useSelector(state => state.auth.user)
  // console.log(user)
  
  useEffect(() => {
     handelgetme()
  },[])

  return (
    <RouterProvider router={routes} />

  )
}

export default App
