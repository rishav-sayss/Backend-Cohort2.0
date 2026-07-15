import axios from "axios"

export  const Axiosinstance = axios.create({
    
    baseURL: "https://api.team-sync.space/api",
    withCredentials: true

})