import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axiosinstance } from "../../../../config/axios.instance";

export let loginemploye = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
           let response = await Axiosinstance.post("/auth/login",credentials)
            console.log(response.data)
           return  response.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(error?.message || 'Login failed');
        }
    }
);

export let  registeremploye = createAsyncThunk(
    "auth/login",
    async (credentials, thunkApi) => {
        try {
           let response = await Axiosinstance.post("/auth/register",credentials)
            console.log(response.data)
           return  response.data.data
        } catch (error) {
            return thunkApi.rejectWithValue(error?.message || 'register failed');
        }
    }
);

export const currentLoggedinUser = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const response = await Axiosinstance.get("/auth/me");
      return response.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

