let mongoose = require("mongoose")

 async function ConnectedToDB() {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Db is Connected Successfully")
        })
        .catch(() => {
            console.log("DB is Not Connected")
        })
}

module.exports = ConnectedToDB