import axios from "axios"

let api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export let login = async (username, password) => {
    let response = await api.post("/login", { username, password })
    return response.data
}

export let register = async (username, email, password) => {
    let response = await api.post("/register", { username, email, password })
    return response.data
}
