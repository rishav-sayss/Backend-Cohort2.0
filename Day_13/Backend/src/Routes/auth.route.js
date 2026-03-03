let { register, login, logout } = require("../Controller/auth.controller")
let express = require("express")
const authMiddleware = require("../Middleware/auth.middleware")

let authRoute = express.Router()

authRoute.post("/register", register)
authRoute.post("/login", authMiddleware, login)
authRoute.post("/logout", logout)

module.exports = authRoute