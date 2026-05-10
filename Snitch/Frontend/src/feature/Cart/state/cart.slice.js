import {createSlice} from "@reduxjs/toolkit"

const cartslice = createSlice({
    name: "cart",
    initialState: {
        items:[],
    },
    reducers :{
        setitems: (state,action) =>{
            state.items = action.payload
        },
        additem: (state,action) => {
            state.items.push(action.payload)
        }
    }
})

export const {setiteams, additem } = cartslice.actions

export default cartslice.reducer