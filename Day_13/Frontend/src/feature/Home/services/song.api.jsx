
import axios from "axios"
let api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export let getsong = async ({ mood }) => {
    let response = await api.get("/api/song?mood=" + mood)
     console.log(response.data.song)
    return response.data
}