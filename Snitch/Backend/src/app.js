import express from "express"
import Authrouter from "./Routes/auth.routes.js"
import cookieparser from "cookie-parser"
let app = express()
app.use(express.json())
app.use(cookieparser())
app.use("/api/auth", Authrouter)

export default app

