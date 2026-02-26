import axios from "axios"

let api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function  getfeed() {
    let response =   await api.get("/api/post/feed")
    return response.data
}

export async function CreatePost(imagefile,caption){
    let formdata = new FormData()
    formdata.append("chacha",imagefile)
    formdata.append("caption",caption)
    let response =  await api.post("/api/post/",formdata)
    return response.data
}


export async function likepost(postId) {    
   let response =  await api.post("/api/post/like/" + postId)
    return response.data
}

export async function unlikepost(postId) {    
   let response =  await api.post("/api/post/unlike/" + postId)
    return response.data
}