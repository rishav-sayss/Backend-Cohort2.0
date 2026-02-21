let mongoose = require("mongoose")

let FollowSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "Follower is required"]
    },
    followe: {
        type: String,
        required: [true, "Followee is required"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
           values:["pending","accepted","rejected"],
        //    message:"status Can be panding accepted or rejected"
        }
    }

}, { timestamps: true })


FollowSchema.index({ follower: 1, followe: 1 }, { unique: true })

let followmodel = mongoose.model("follows", FollowSchema)
module.exports = followmodel