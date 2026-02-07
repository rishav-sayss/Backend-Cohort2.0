let mongoose = require("mongoose")

let note = new mongoose.Schema({
    title: String,
    description: String
})

 let Note = mongoose.model("Note", note)

module.exports =  Note