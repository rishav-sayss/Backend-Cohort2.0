import axios from "axios"

let productApiInstance  = axios.create({
    baseURL: "http://localhost:3000/api/product",
    withCredentials:true
})

export let CreatProduct = async (formdata)=>{

    let response = await productApiInstance.post("/createProduct",formdata)
    console.log(response.data)
    return response.data

}

export let getproduct = async ()=>{
    
    let response = await productApiInstance.get("/getproducts")
    return response.data

}