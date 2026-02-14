let mongoose = require("mongoose")

async function DBConnected() {
  await  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected Successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })
}


module.exports = DBConnected