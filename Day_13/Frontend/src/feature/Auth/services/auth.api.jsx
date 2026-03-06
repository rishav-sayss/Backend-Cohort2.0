import axios from "axios"

let api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export let login = async ({ username, email, password }) => {
    let response = await api.post("/api/auth/login", { username, email, password })
    return response.data
}

export let register = async ({ username, email, password }) => {
    let response = await api.post("/api/auth/register", { username, email, password })
    return response.data
}

export let getme = async () => {
    let response = await api.get("/api/auth/getme")
    return response.data
}

export let Logout = async () => {
    let response = await api.get("/api/auth/logout")
    return response.data
}

