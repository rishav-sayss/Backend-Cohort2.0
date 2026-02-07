require("dotenv").config();
let App = require("./src/App")
let DbConnect = require("./src/Database/Database")
DbConnect()

App.listen(3000, () => {
    console.log("Port is started at 3000")
})


