let express = require("express")
let userRoute = express.Router()
let useridentify = require("../Middelwere/auth.middelwere")
let usercontroller = require("../Controler/user.controller")

userRoute.post("/follow/:username", useridentify, usercontroller.follow)
userRoute.post("/unfollow/:username", useridentify, usercontroller.unfollow)

module.exports = userRoute