import productmodel from "../models/product.model.js";

export const stockofvariants = async (productId, variantId) => {
    const product = await productmodel.findById(productId);

    if (!product) return null;

    const variant = product.variants.find(
        (item) => item._id.toString() === variantId
    );

    if (!variant) return null;

    return variant.stock;
};
