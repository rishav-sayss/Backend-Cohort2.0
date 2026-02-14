let mongoose = require("mongoose")


let postschema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    image_url: {
        type: String,
        required: [true, "imgUrl is required for creating an post"]
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating an post"]
    }
})

let postmodal = mongoose.model("posts", postschema)

module.exports = postmodal