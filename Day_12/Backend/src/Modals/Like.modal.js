
let mongoose = require("mongoose")

let LikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required for creating a like"]
    },
    user: {
        type: String,
        required: [true, "username is required for creating a like"]
    }
},{timestamps:true})

LikeSchema.index({post:1,user:1},{unique:true})

let userLike = mongoose.model("like", LikeSchema)

module.exports = userLike