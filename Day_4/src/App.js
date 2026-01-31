let express = require("express")

let app = express()  // server ko creat krna 

app.use(express.json())  // server ko config krna 

module.exports = app  //  