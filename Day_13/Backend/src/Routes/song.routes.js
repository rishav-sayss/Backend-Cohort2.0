let express = require("express")
let upload = require("../Middleware/upload.middelwere")
let songController = require("../Controller/song.controller")
let router = express.Router()

router.post("/", upload.single("song"), songController.uploadsong)
router.get("/", songController.getSong)
module.exports = router