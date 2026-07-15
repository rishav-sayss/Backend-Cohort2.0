import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.jsx'
import { AppRoutes } from './app/routes/approutes.jsx'
import "./App.css"
createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
     <AppRoutes/>
  </Provider>
    
  
)
