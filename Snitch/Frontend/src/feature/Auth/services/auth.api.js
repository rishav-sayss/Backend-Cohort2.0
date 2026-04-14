import axios from "axios"

let authapiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export let register =  async ({ email, contact, password, fullname ,seller }) => {

    let response = await authapiInstance.post("/register", {
        email, contact, password, fullname ,seller
    })
    console.log(response.data)
    return response.data

}

export let login = async ({email,password}) => {
    let responce  = await authapiInstance.post("/login",{email,password})
    return responce.data
}
