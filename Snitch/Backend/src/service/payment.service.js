import Razorpay from "razorpay"
import { config } from "../config/config.js"

const razorpay = new Razorpay({
    key_id: config.testapikey,
    key_secret: config.testsecretkey
})


export const createOrder = async ({ amount, currency = "INR" }) => {
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
    }

    const order = await razorpay.orders.create(options)

    return order
}