let mongoose = require("mongoose")

let notschema = new mongoose.Schema({
    title: String,
    description:String
})

let notmodel = mongoose.model("notmodal",notschema)

module.exports = notmodel