//server ko start krna 
let app = require("./src/app")

//server ko DB se connect krna 
let mongoose = require("mongoose")

function connecttoDB() {
    mongoose.connect("mongodb+srv://RishabhShrivas:dmS1lWCD2pzMkm1G@cluster0.n1okebc.mongodb.net/Day_5")
        .then(() => {
            console.log("DB is connected Succesfully")
        })
}

connecttoDB()

app.listen(3000, () => {
    console.log("server is connect on port 3000")
})