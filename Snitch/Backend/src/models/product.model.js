import mongoose from "mongoose"

let productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true
    },

    price: {
        amount: {
            type: Number, required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "JPY", "INR"],
            default: "INR"
        }
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ]

}, { timestampes: true })

let productmodel = mongoose.model("product", productSchema)
export default productmodel