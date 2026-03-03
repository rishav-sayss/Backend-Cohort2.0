import axios from "axios"

let api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})


export async function Follow(postId) {
    let respose = await api.post("/api/post/follow/" + postId)
    return respose.data
}


export async function Follow(postId) {
    let respose = await api.post("/api/post/unfollow/" + postId)
    return respose.data
}

