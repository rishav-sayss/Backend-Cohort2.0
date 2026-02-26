import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.routes'
import './Features/Shared/global.scss'
import { Authprovider } from './Features/Auth/Auth.context'
import { PostContextProvider } from './Features/Post/post.context'
const App = () => {
  return (
    <div>
      <Authprovider>
        <PostContextProvider>
          <RouterProvider router={router} />
        </PostContextProvider>
      </Authprovider>
    </div>
  )
}

export default App
