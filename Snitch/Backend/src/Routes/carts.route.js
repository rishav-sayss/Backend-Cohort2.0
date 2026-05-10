import express from  "express"
import { authmiddelewere } from "../middelwere/Auth.middelwere.js"
import { validateAddToCart } from "../validator/cart.validater.js"
import { addtocart, getcart } from "../controller/cart.controller.js"
const router = express.Router()


router.post("/add/:productId/:variantId",authmiddelewere ,validateAddToCart ,addtocart )

router.get("/",authmiddelewere ,getcart )

export default router