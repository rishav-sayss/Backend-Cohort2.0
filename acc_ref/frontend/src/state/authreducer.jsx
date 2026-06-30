import { createSlice } from "@reduxjs/toolkit";

export let Authslice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isLoading: true,
  
},

    reducers:{

        adduser: ( state ,action )  =>{
            state.user = action.payload
            state.isLoading = false
        },

        Removeuser: (state) =>{
            state.user = null,
            state.isLoading  =  false
        }

    }

});

export  let  {  adduser , Removeuser }   = Authslice.actions