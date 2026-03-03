
let mongoose = require("mongoose")

async function DBconnected() {
    await mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB is connected Succesfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })
}

module.exports = DBconnected