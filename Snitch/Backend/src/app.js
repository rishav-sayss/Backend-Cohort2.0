import express from "express"
import Authrouter from "./Routes/auth.routes.js"
import cookieparser from "cookie-parser"
import productRouter from "./Routes/product.route.js"
import cors from "cors"

let app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}))
app.use("/api/auth", Authrouter)
app.use("/api/product", productRouter)

export default app

