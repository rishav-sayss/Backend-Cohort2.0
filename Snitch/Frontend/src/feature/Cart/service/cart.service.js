import axios from "axios"

const cartApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/cart",
    withCredentials: true
})


export const addItem = async ({ productId, variantId }) => {
    console.log( productId, variantId )
    if (!productId) {
        throw new Error("productId is required");
    }

    if (!variantId) {
        throw new Error("variantId is required to add item to cart");
    }

    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, {
        quantity: 1
    })

    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("/");
    return response.data;
}
