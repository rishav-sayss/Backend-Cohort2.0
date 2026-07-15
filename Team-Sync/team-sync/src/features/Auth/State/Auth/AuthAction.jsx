import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axiosinstance } from "../../../../config/axios.instance";

export let loginemploye = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
           let response = await Axiosinstance.post("/auth/login",credentials)
           console.log(response)
           return  response.data
            return credentials;
        } catch (error) {
            return thunkApi.rejectWithValue(error?.message || 'Login failed');
        }
    }
);