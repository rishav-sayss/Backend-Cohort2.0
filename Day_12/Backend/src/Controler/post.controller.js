let userdata = require("../Modals/post.model")
let Imagekit = require("@imagekit/nodejs")
let { toFile } = require("@imagekit/nodejs")
let JWT = require("jsonwebtoken")

let imagekit = new Imagekit({
    privateKey: process.env.PRIVATE_IMAGE_KIT
})



let postcontroller = async (req, res) => {
    // console.log(req.body, req.file)
    // fetch the token from the user cookies
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user access"
        })
    }

    let decode = null

    try {
        //verify the user token
        decode = JWT.verify(token, process.env.JWT_SECREAT)
        // console.log(decode)
    } catch (error) {
        res.status(401).json({
            message: "Token invalid"
        })
    }

    // upload the file on the imagekit and it give the image _URL
    let file = await imagekit.files.upload({
        file: await toFile(req.file.buffer, "file"),
        fileName: "love",
        folder:"cohort-2-insta-clone-posts"
    })

    //create the poser in the DB
    let post = await userdata.create({
        caption: req.body.caption,
        image_url: file.url,
        user: decode.id
    })


    res.status(201).json({
        message: "post created successfully.",
        post
    })
}

module.exports = postcontroller