import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import {Provider} from "react-redux"
import { Store } from './App/store.jsx'
createRoot(document.getElementById('root')).render(
   
    <Provider  store={Store} >
         <AppRoutes/>
    </Provider>
 

)
