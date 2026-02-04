let mongoose  = require("mongoose")

 async function Dbconnect(){
   await  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB connected Successfully")
    })
 } 

 module.exports = Dbconnect