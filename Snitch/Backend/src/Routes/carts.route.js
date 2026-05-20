import express from  "express"
import { authmiddelewere } from "../middelwere/Auth.middelwere.js"
import { validateAddToCart , validateIncrementCartItemQuantity } from "../validator/cart.validater.js"
import { addtocart, getcart ,incrementCartItemQuantity , decrementCartItemQuantity, removeCartItem ,createOrderController } from "../controller/cart.controller.js"
const router = express.Router()


router.post("/add/:productId/:variantId",authmiddelewere ,validateAddToCart ,addtocart )

router.get("/",authmiddelewere ,getcart )

/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Increment item quantity in cart by one
 * @access Private
 * @argument productId - ID of the product to update
 * @argument variantId - ID of the variant to update
 */
router.patch("/quantity/increment/:productId/:variantId", authmiddelewere, validateIncrementCartItemQuantity, incrementCartItemQuantity)

router.patch("/quantity/decrement/:productId/:variantId", authmiddelewere, validateIncrementCartItemQuantity,  decrementCartItemQuantity)

router.delete("/remove/:itemId", authmiddelewere, removeCartItem)

/**
 * @route POST /api/cart/payment/create/order
 */
router.post("/payment/create/order", authmiddelewere, createOrderController)

export default router
