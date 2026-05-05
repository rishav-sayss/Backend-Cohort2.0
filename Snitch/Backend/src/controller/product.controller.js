import productmodel from "../models/product.model.js"
import { uploadFile } from "../service/storage.service.js"


export const createProduct = async (req, res) => {

    let { title, description, priceAmount, priceCurrency,

    } = req.body

 
    let seller = req.user
    
    let images = await Promise.all(
        req.files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
        })
    );

    let product = await productmodel.create({
        title,
        description,
        seller: seller._id || seller.id,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
    })

    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product
    })

}


export let getsellerproduct = async (req, res) => {

    let seller = req.user

    let products = await productmodel.find({ seller: seller.id })

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })


}

export let getAllproduct = async (req,res) => {

    let products = await productmodel.find()
    
    return res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })

}

export async function getProductDetails(req, res) {
    const { id } = req.params;

    const product = await productmodel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product details fetched successfully",
        success: true,
        product
    })
}

export async function addProductVariant(req, res) {
    const { productId } = req.params;
    const { priceAmount, priceCurrency, stock, attributes, images } = req.body;

    const product = await productmodel.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (String(product.seller) !== String(req.user._id || req.user.id)) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to edit this product"
        });
    }

    const normalizedAttributes =
        attributes && typeof attributes === "object" ? attributes : {};
    const normalizedImages = Array.isArray(images)
        ? images
            .filter((img) => img && typeof img.url === "string" && img.url.trim())
            .map((img) => ({ url: img.url.trim() }))
        : [];

    const variant = {
        stock: Number(stock) || 0,
        attributes: normalizedAttributes,
        price: {
            amount: Number(priceAmount),
            currency: priceCurrency || "INR"
        },
        images: normalizedImages
    };

    product.variants.push(variant);
    await product.save();

    return res.status(201).json({
        success: true,
        message: "Variant created successfully",
        variants: product.variants,
        product
    });
}

export async function updateVariantStock(req, res) {
    const { productId, variantId } = req.params;
    const { stock } = req.body;

    const product = await productmodel.findById(productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    if (String(product.seller) !== String(req.user._id || req.user.id)) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to edit this product"
        });
    }

    const variant = product.variants.id(variantId);

    if (!variant) {
        return res.status(404).json({
            success: false,
            message: "Variant not found"
        });
    }

    variant.stock = Number(stock) || 0;
    await product.save();

    return res.status(200).json({
        success: true,
        message: "Variant stock updated successfully",
        variant,
        variants: product.variants,
        product
    });
}
