require("dotenv").config()
let App = require("./src/App")
let DBConnected = require("./src/Db/Database")

DBConnected()

App.listen(process.env.PORT, () => {
    console.log(`Server is running At Port ${process.env.PORT} `)
})