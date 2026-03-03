let express = require("express")
let userRoute = express.Router()
let useridentify = require("../Middelwere/auth.middelwere")
let usercontroller = require("../Controler/user.controller")
let multer = require("multer")
let upload = multer({ storage: multer.memoryStorage() })
userRoute.post("/follow/:username", useridentify, usercontroller.follow)
userRoute.post("/unfollow/:username", useridentify, usercontroller.unfollow)
userRoute.put("/update", useridentify, upload.single("profile"), usercontroller.updateMyProfile)
userRoute.get("/me", useridentify, usercontroller.getMyProfile)

module.exports = userRoute