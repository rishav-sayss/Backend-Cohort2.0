import { Router } from "express"
import { register, login } from "../controller/auth.controller.js"
import { Registervalidator, Loginvalodator } from "../validator/auth.validatior.js"
let router = Router()

router.post("/register", Registervalidator, register)
router.post("/login", Loginvalodator, login)

export default router