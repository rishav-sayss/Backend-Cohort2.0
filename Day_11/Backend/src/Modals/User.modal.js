let mongoose = require("mongoose")

let userschema = mongoose.Schema({
        name:String,
        email:{
        type:String,
        unique:true
        },
        password:String
    })

module.exports = mongoose.model("Users",userschema)