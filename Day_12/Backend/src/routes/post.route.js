let express = require("express")
let { postcontroller, getpostcontroller, getpostdetailscontroller, likepostcontroller ,getFeedController} = require("../Controler/post.controller")
let postroute = express.Router()
let multer = require("multer")
let upload = multer({ storage: multer.memoryStorage() })
let identifieruser = require("../Middelwere/auth.middelwere")
const { post } = require("./auth.routes")
/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postroute.post("/", identifieruser, upload.single("chacha"), postcontroller)
/**
 * GET /api/posts/ [protected]
 */
postroute.get("/", identifieruser, getpostcontroller)

/**
 * GET /api/posts/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postroute.get("/details/:postId", identifieruser, getpostdetailscontroller)

/**
 *  * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */
postroute.post("/like/:postId", identifieruser, likepostcontroller)

 /**
  * @route /api/auth/feed
  * @description get all the post created in db
  * @access private
  */

 postroute.get("/feed",identifieruser,getFeedController)

module.exports = postroute