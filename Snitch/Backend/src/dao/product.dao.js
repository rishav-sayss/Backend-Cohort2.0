import productmodel from "../models/product.model.js";

export const stockofvariants = async (productId , varientId) =>{

    const product = await productmodel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    const stock =  product.variants.find( variant => variant._id.tostring() === varientId).stock

    return stock

}