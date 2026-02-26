let mongoose = require("mongoose")

let userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User name already exist"],
        required: [true, " user name required"]
    },
    email: {
        type: String,
        unique: [true, "User Email already exist "],
        required: true
    },
    password: {
        type: String,
        unique: [true, "User name already exist "],
        required: true,
        select:false
    },
    bio:String,
    profile:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
    },
    

})


let usermodal = mongoose.model("user",userschema)

module.exports =  usermodal