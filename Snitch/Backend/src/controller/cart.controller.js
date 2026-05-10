import cartmodel from "../models/cart.model.js"
import productmodel from "../models/product.model.js"
import { stockofvariants } from "../dao/product.dao.js"


export const addtocart = async (req,res)=>{

    const {productId,varientId} =  req.params

    const {quantity = 1} = req.body

    const product = await  productmodel.findOne({
        _id:productId,
        "varient._id": varientId
    })

     if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const stock = await stockofvariants( productId ,varientId )

    const cart = ( await cartmodel.findOne({user:req.user._id})) || ( await cartmodel.findOne({user:req.user._id}))


    const isproductalreadyincart = cart.items.some(iteam => iteam.product.tostring() === productId && iteam.varient?.tostring() === varientId)

    if(isproductalreadyincart){

        const quantityincart =  cart.items.find(iteam => iteam.product.tostring() === productId && iteam.varient?.tostring() === varientId)

        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            })

            }

            await cartmodel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

            return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })

    }


    if(quantity > stock){
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }


     cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price
    })

    await cart.save()

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })


}

export const getcart = async (req,res)=>{

    const user = req.user

    const cart = await cartmodel.findOne({user:user._id}).populate("items.product")

     if (!cart) {
        cart = await cartmodel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })

}