import { useState } from 'react'
import FaceExpression from './feature/Expression/component/FaceExpression'
import "./feature/Shared/styles/global.scss"
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { AuthContextProvider } from './feature/Auth/auth.context'
import { SongContextProvider } from './feature/Home/song.context'
function App() {
  return (
    <AuthContextProvider>
      <SongContextProvider>
        <RouterProvider router={routes} />
      </SongContextProvider>

    </AuthContextProvider>
  )
}

export default App
