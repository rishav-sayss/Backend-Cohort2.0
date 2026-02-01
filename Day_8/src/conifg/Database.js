let mongoose = require("mongoose")

 function connecttoDB(){
    mongoose.connect("mongodb+srv://RishabhShrivas:dmS1lWCD2pzMkm1G@cluster0.n1okebc.mongodb.net/Day_8")
    .then(()=>{
        console.log("DB connected Successfully")
    })
 }

 module.exports = connecttoDB