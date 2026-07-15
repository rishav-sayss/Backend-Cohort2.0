
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer  from "../features/Auth/State/Auth/createslice"
export const store = configureStore({

    reducer:{

        Auth: AuthReducer
    }
})