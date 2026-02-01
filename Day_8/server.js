//server ko start krna 
//server ko database se connect krna

let App = require("./src/App")
let DBConnect =  require("./src/conifg/Database")

DBConnect()


App.listen(3000,()=>{
    console.log("Server is started At Port 3000")
})

