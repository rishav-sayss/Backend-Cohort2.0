import { Router } from "express";
import {
    createProduct,
    getsellerproduct,
    getAllproduct,
    getProductDetails,
    addProductVariant,
    updateVariantStock
} from "../controller/product.controller.js"
import { authenticateSeller } from "../middelwere/Auth.middelwere.js"
import { createProductValidator } from "../validator/product.validater.js";
let productRoute = Router()
import multer from "multer"

let upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
productRoute.post("/createProduct", authenticateSeller, upload.array("images", 7), createProductValidator, createProduct)

/** 
 * @route GET /api/products/seller
 * @description Get all products of the authenticated seller
 * @access Private (Seller only)
 */
productRoute.get("/getproducts", authenticateSeller, getsellerproduct)

/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
productRoute.get("/",getAllproduct)


/**
 * @route GET /api/products/detail/:id
 * @description Get product details by ID
 * @access Public
 */
productRoute.get("/detail/:id", getProductDetails)
productRoute.post("/:productId/variants", authenticateSeller, addProductVariant)
productRoute.patch("/:productId/variants/:variantId/stock", authenticateSeller, updateVariantStock)

export default productRoute
