import axios from "axios"

let authapiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export let register =  async ({ email, contact, password, fullname ,isSeller }) => {

    let response = await authapiInstance.post("/register", {
        email, contact, password, fullname ,isSeller
    })
    console.log(response.data)
    return response.data
}

export let login = async ({email,password}) => {
    let responce  = await authapiInstance.post("/login",{email,password})
    console.log(responce)
    return responce.data
}
