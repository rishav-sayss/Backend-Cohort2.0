import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/Auth/state/auth.slice"
export let store = configureStore({
    reducer:{
        auth:authReducer
    }
})