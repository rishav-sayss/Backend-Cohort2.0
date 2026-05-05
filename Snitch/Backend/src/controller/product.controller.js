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

    const productId = req.params.productId;

    const product = await productmodel.findOne({
        _id: productId,
        seller: req.user._id
    });

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    const files = req.files;
    console.log(file)
    const images = [];
    if (files || files.length !== 0) {
        (await Promise.all(files.map(async (file) => {
            const image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image
        }))).map(image => images.push(image))
    }

    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    console.log(price)

    product.variants.push({
        images,
        price: {
            amount: Number(price) || product.price.amount,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message: "Product variant added successfully",
        success: true,
        product
    })

}

 
