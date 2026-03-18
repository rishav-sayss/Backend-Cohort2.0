let express = require("express")
let validation = require("../validators/auth.validate")
let authmiddelwere = require("../middelere/auth.middelwere")
let { login, register, verifyEmail, getme } = require("../controllers/auth.controller")

let authrouter = express.Router()

authrouter.post("/register", validation.registerValidator, register)
authrouter.post("/login", validation.loginValidator, login)
authrouter.get("/verify-email", verifyEmail)
authrouter.get("/get-me",authmiddelwere, getme)

module.exports = authrouter