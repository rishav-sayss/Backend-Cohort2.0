import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './feature/shared/styles/globals.css'
import { store } from './app/app.store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/app.routes.jsx'
import App from './app/App.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <App />
  </Provider>
)
