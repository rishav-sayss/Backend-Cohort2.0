let express = require("express")
let { postcontroller, getpostcontroller,getpostdetailscontroller } = require("../Controler/post.controller")
let postroute = express.Router()
let multer = require("multer")
let upload = multer({storage: multer.memoryStorage() })
let identifieruser = require("../Middelwere/auth.middelwere")
/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postroute.post("/",identifieruser ,upload.single("chacha"), postcontroller)
/**
 * GET /api/posts/ [protected]
 */
postroute.get("/", identifieruser  ,getpostcontroller)

/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postroute.get("/:postId",identifieruser ,getpostdetailscontroller)

module.exports = postroute