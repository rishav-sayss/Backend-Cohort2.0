let { register, login, getme, logout } = require("../Controller/auth.controller")
let express = require("express")
const authMiddleware = require("../Middleware/auth.middleware")

let authRoute = express.Router()

authRoute.post("/register", register)
authRoute.post("/login", authMiddleware, login)
authRoute.get("/getme", authMiddleware, getme)
authRoute.post("/logout", authMiddleware, logout)

module.exports = authRoute