require("dotenv").config()
let DBConnected = require("./src/DBConnected/Database")
DBConnected()

//server is statrted
let App = require("./src/App")
App.listen(process.env.PORT, () => {
    console.log(`Port is started At ${process.env.PORT}`)
})