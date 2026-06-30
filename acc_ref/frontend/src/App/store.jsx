import {configureStore} from "@reduxjs/toolkit"
import { Authslice } from "../state/authreducer"

export  let  Store = configureStore({

    reducer:{
    auth: Authslice.reducer,
    }
})