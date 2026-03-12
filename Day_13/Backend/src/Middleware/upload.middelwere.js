let multer = require("multer")

let storage = multer.memoryStorage()

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10  //10MB
    }
})

module.exports = upload