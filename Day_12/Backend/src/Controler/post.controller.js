let userdata = require("../Modals/post.model")
let postdata = require("../Modals/post.model")
let likedata = require("../Modals/Like.modal")
let Imagekit = require("@imagekit/nodejs")
let { toFile } = require("@imagekit/nodejs")

let imagekit = new Imagekit({
    privateKey: process.env.PRIVATE_IMAGE_KIT
})



let postcontroller = async (req, res) => {

    // upload the file on the imagekit and it give the image _URL
    let file = await imagekit.files.upload({
        file: await toFile(req.file.buffer, "file"),
        fileName: "love",
        folder: "cohort-2-insta-clone-posts"
    })

    //create the poser in the DB
    let post = await userdata.create({
        caption: req.body.caption,
        image_url: file.url,
        user: req.user.id
    })


    res.status(201).json({
        message: "post created successfully.",
        post
    })
}

let getpostcontroller = async (req, res) => {

    let userId = req.user.id

    let posts = await userdata.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Posts fetched successfully.",
            posts
        })
}

let getpostdetailscontroller = async (req, res) => {

    let userId = req.user.id
    let postId = req.params.postId

    let post = await userdata.findById(postId)
    // console.log(post)
    if (!post) {
        return res.status(404).json({
            message: " Post Not Found"
        })
    }

    let isvaliduser = post.user.toString() === userId

    if (!isvaliduser) {
        return res.status(403).json({
            message: "Forbiden Content"
        })
    }

    res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })

}

let likepostcontroller = async (req, res) => {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postdata.findById(postId)
    console.log(post)
    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likedata.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })


}

module.exports = { postcontroller, getpostcontroller, getpostdetailscontroller, likepostcontroller }