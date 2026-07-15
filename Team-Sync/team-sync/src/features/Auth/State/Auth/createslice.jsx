
import { createSlice } from "@reduxjs/toolkit";


const AuthSlice = createSlice({

    name:"Auth",

    initialState: {
         Employes: null,
        isLoading: false
    },

    reducers:{

        addUser: (state , action) => {

            state.Employes = action.payload
            state.isLoading = false

        },

        removeUser: (state , action) => {

            state.Employes = action.payload
            state.isLoading =  false

        }

    }

})


export const {addUser , removeUser}    = AuthSlice.actions
export default  AuthSlice.reducer