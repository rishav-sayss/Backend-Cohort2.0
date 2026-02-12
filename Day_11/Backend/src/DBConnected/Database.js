let mongoose = require("mongoose")

async function DBConnected() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB IS Connected Succesfully")
        }).catch((Error) => {
            console.log(Error, "DB is not Coneected")
        })
}

module.exports = DBConnected
 