import productmodel from "../models/product.model.js"
import { uploadfile } from "../service/storage.service.js"

export const createProduct = async (req, res) => {

    let { title, description, priceAmount, priceCurrency,

    } = req.body

    // console.log(req.files);

    let seller = req.user

    let images = await Promise.all(
        req.files.map(async (file) => {
            // console.log(file.buffer, file.originalname)
            let result =  await uploadfile({
                buffer: file.buffer,
                fileName: file.originalname // ✅ correct
            });

            return result.url
        })
    );

    let product = await productmodel.create({
        title,
        description,
        price: {
            amount: Number(priceAmount),
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
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