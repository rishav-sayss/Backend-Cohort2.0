import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import './Features/Shared/global.scss'
import { Authprovider } from './Features/Auth/auth.context'
const App = () => {
  return (
    <div>
      <Authprovider>
        <RouterProvider router={router} />
      </Authprovider>
    </div>
  )
}

export default App
