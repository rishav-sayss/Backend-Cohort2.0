
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer  from "../features/Auth/State/Auth/createslice"
import {themeSlice} from "../shared/state/themeslice"
export const store = configureStore({

    reducer:{

        Auth: AuthReducer,
        theme: themeSlice.reducer
    }
})