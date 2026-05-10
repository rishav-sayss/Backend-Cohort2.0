import axios from "axios"

const cartApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/cart",
    withCredentials: true
})


export const addItem = async ({ productId, variantId }) => {
    console.log(productId, variantId)
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, {
        quantity: 1
    })

    return response.data
}