let mongose = require("mongoose")

let blacklistschema = mongose.Schema({
    token: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongose.model("blacklist", blacklistschema)