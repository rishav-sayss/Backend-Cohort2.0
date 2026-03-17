let express = require("express")
let validation = require("../validators/auth.validate")
let { login, register, verifyEmail } = require("../controllers/auth.controller")
let authrouter = express.Router()

authrouter.post("/register", validation.registerValidator, register)
authrouter.post("/login", validation.loginValidator, login)
authrouter.get("/verify-email", verifyEmail)

module.exports = authrouter