let userdata = require("../Modals/post.model")
let Imagekit = require("@imagekit/nodejs")
let {toFile} = require("@imagekit/nodejs") 

let imagekit = new Imagekit({
    privateKey: process.env.PRIVATE_IMAGE_KIT
})
 


let postcontroller = async (req, res) => {
    console.log(req.body, req.file)

    let file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test"
    })
    res.send({
        message: "post create",
        file
    })
}

module.exports = postcontroller