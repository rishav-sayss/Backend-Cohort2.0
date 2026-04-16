import { Router } from "express";
import { createProduct, getsellerproduct } from "../controller/product.controller.js"
import { authmiddelewere } from "../middelwere/Auth.middelwere.js"
let productRoute = Router()
import multer from "multer"

let upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

productRoute.post("/createProduct", authmiddelewere, upload.array("images", 7), createProduct)
productRoute.get("/getproducts", authmiddelewere, getsellerproduct)

export default productRoute