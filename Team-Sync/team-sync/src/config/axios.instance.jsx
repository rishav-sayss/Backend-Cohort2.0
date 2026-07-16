import axios from "axios"

export  const Axiosinstance = axios.create({
    
    baseURL: "/api",
    withCredentials: true

})