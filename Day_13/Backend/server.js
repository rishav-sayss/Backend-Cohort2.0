require("dotenv").config()
let App = require("./src/App")
let DBconnected  = require("./src/config/DB/Database")
const Port = process.env.PORT || 3000;
DBconnected ()
App.listen(Port, () => {
    console.log(`server is running At PORT ${Port}`)
})


