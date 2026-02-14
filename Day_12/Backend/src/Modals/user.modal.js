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
        required: true
    },
    bio:String,
    profile:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgsaRe2zqH_BBicvUorUseeTaE4kxPL2FmOQ&s"
    }
    

})


let usermodal = mongoose.model("user",userschema)

module.exports =  usermodal