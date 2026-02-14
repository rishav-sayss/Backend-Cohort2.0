let express = require("express")
let postcontroller = require("../Controler/post.controller")
let postroute = express.Router()
let multer = require("multer")
let upload = multer({storage: multer.memoryStorage() })

postroute.post("/", upload.single("chacha"), postcontroller)

module.exports = postroute