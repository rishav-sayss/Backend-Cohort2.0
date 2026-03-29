import { configureStore } from "@reduxjs/toolkit";

import authreducer from "../feature/auth/auth.slice"
import chatReducer from "../feature/chats/chats.slice"

export let store = configureStore({
    reducer:{
        auth:authreducer,
        chat:chatReducer
    }
})