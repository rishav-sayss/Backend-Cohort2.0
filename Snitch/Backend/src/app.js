import express from "express"
import Authrouter from "./Routes/auth.routes.js"
import cookieparser from "cookie-parser"
import cors from "cors"
let app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", Authrouter)

export default app

