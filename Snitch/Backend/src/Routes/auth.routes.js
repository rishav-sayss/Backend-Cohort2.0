import { Router } from "express"
import { register, login, googleCallback ,getme} from "../controller/auth.controller.js"
import { Registervalidator, Loginvalidator } from "../validator/auth.validatior.js"
import {authmiddelewere} from "../middelwere/Auth.middelwere.js"
import passport from "passport";
import { config } from "../config/config.js";
let router = Router()

router.post("/register", Registervalidator, register)
router.post("/login", Loginvalidator, login)
/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get("/me",authmiddelewere,getme)

// /api/auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }),
    googleCallback
)
 

export default router
