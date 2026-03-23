import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import { useEffect } from "react"
import { useauth } from "../feature/auth/hooks/useauth"

function App() {
  
  let auth = useauth()
  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
