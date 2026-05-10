import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/Auth/state/auth.slice"
import  productReducer from "../feature/Product/state/product.state"
import cartreducer from "../feature/Cart/state/cart.slice"
export let store = configureStore({
    reducer:{
        auth:authReducer,
        product: productReducer,
        cart: cartreducer
    }
})