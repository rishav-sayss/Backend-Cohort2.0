import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import { useEffect } from "react"
import { useauth } from "../feature/auth/hooks/useauth"
import { ThemeProvider } from "../feature/shared/context/ThemeContext"

function App() {
  
  let auth = useauth()
  useEffect(() => {
    auth.handleGetMe()
  }, [])

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
