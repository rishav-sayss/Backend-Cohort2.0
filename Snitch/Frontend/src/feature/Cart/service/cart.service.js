import axios from "axios"

const cartApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/cart",
    withCredentials: true
})

export const addItem = async ({ productId, variantId }) => {
    const response = await cartApiInstance.post(`/add/${productId}/${variantId}`, {
        quantity: 1
    })
   
    return response.data
}


export const getCart = async () => {
    const response = await cartApiInstance.get("/");
    return response.data;
}

export const updateItemQuantity = async ({ itemId, quantity }) => {
    const response = await cartApiInstance.put(`/update/${itemId}`, { quantity });
    return response.data;
}

export const removeItem = async ({ itemId }) => {
    const response = await cartApiInstance.delete(`/remove/${itemId}`);
    return response.data;
}
