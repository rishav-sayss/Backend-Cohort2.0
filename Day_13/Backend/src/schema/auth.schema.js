let mongoose = require("mongoose")

let userAuthschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
    },
    email: {
        type: String,
        unquie: [true, "Email should be unquie"],
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false, // password normally fetch nahi hoga 
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
}, { timestamps: true })


module.exports = mongoose.model("userauth", userAuthschema)