import axios from "axios"
import {setproducts} from "../state/product.state"

let productApiInstance  = axios.create({
    baseURL: "http://localhost:3000/api/product",
    withCredentials:true
})

 

export let CreatProduct = async (formdata)=>{

    let response = await productApiInstance.post("/createProduct",formdata)
    console.log(response.data)
    return response.data

}

export let getsellerproduct = async ()=>{
    
    let response = await productApiInstance.get("/getproducts")
    return response.data

}

export let getAllproduct = async ()=>{

    let response = await productApiInstance.get("/")
    return response.data

}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/detail/${productId}`)
    return response.data
}