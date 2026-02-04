require("dotenv").config()
let app = require("./src/app")
let Dbconnect = require("./src/database/database")
//server ko creat ko krna 
// databse se connect krna 
Dbconnect()
app.listen(3000,()=>{
    console.log("serever is Stated at Port 3000")
})