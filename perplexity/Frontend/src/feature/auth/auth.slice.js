import { createSlice } from "@reduxjs/toolkit";


let authslice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers: {
        setuser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export let { setuser, setLoading, setError } = authslice.actions
export default authslice.reducer