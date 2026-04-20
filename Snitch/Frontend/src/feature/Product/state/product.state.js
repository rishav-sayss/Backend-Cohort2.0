import {createSlice} from "@reduxjs/toolkit"
import { act } from "react"



let productslice = createSlice({
    name:"product",
    
    initialState:{
        sellerproducts:[],
        products:[]
    },
    reducers:{
        setsellerproduct: (state,action)=>{
            state.sellerproducts =  action.payload
        },
        setproducts: (state,action)=>{
            state.products = action.payload
        }
    }
})

export let {setsellerproduct,setproducts} = productslice.actions

export default productslice.reducer