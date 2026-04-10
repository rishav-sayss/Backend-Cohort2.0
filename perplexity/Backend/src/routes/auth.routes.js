let express = require("express")
let validation = require("../validators/auth.validate")
let authmiddelwere = require("../middelere/auth.middelwere")
let { login, register, verifyEmail, getme, logout } = require("../controllers/auth.controller")

let authrouter = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authrouter.post("/register", validation.registerValidator, register)
/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */
authrouter.post("/login", validation.loginValidator, login)
/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
 */
authrouter.get("/get-me", authmiddelwere, getme)

/**
 * @route POST /api/auth/logout
 * @desc Simply Logout the user by clearing token
 * @access Private
 */
authrouter.post('/logout', authmiddelwere, logout)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authrouter.get("/verify-email", verifyEmail)
module.exports = authrouter