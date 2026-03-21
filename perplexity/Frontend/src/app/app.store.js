import { configureStore } from "@reduxjs/toolkit";

import authreducer from "../feature/auth/auth.slice"


export let store = configureStore({
    reducer:{
        auth:authreducer
    }
})