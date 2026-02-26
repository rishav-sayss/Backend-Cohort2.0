import axios from "axios"

let api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function  getfeed() {
    let response =   await api.get("/api/post/feed")
    return response.data
}