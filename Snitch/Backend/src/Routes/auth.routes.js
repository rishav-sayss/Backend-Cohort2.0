import { Router } from "express"
import { register, login, googleCallback } from "../controller/auth.controller.js"
import { Registervalidator, Loginvalodator } from "../validator/auth.validatior.js"
let router = Router()
router.post("/register", Registervalidator, register)
router.post("/login", Loginvalodator, login)
import passport from "passport";

// /api/auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:5173/login"
    }),
    googleCallback
)

export default router