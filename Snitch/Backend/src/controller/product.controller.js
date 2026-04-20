import productmodel from "../models/product.model.js"
import { uploadFile } from "../service/storage.service.js"

export const createProduct = async (req, res) => {

    let { title, description, priceAmount, priceCurrency,

    } = req.body

    // console.log(req.files);
    let seller = req.user
    // console.log("USER 👉", req.user);
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
        seller:seller._id || seller.id,
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

    let products = await productmodel.find({ seller: seller._id })

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })


}