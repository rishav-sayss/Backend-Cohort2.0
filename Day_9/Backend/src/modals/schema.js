let mongoose = require("mongoose")

let notes = new mongoose.Schema({
        title:String,
        description:String
})

let newnotes = mongoose.model("note",notes)

module.exports = newnotes