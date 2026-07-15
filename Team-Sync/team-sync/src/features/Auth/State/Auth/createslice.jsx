
import { createSlice } from "@reduxjs/toolkit";
import { currentLoggedinUser, loginemploye } from "./AuthAction";


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
    },

    extraReducers: (builder) =>{

        builder.addCase(loginemploye.pending, (state) => {
            state.isLoading = true
        }).addCase(loginemploye.fulfilled , (state ,action) =>{
            // console.log("LOGIN PAYLOAD:", action.payload);
            state.Employes  = action.payload,
            state.isLoading = false
        }).addCase(loginemploye.rejected , (state) => {
            state.isLoading = false
        }).addCase(currentLoggedinUser.pending, (state) => {
            state.isLoading = true
        }).addCase(currentLoggedinUser.fulfilled , (state ,  action) =>{
            state.Employes  = action.payload,
            state.isLoading = false
        }).addCase(currentLoggedinUser.rejected , (state) => {
            state.isLoading = false
        })
    }

})


export const {addUser , removeUser}    = AuthSlice.actions
export default  AuthSlice.reducer