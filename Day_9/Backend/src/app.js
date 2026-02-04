let express = require("express")
// server ko creat krna 

let newnotes = require("./modals/schema")
let cors = require("cors")
let app = express()
//middlewere
app.use(cors())
app.use(express.json())

app.post("/notes", async (req, res) => {
    let { title, description } = req.body
    let note = await newnotes.create({
        title,
        description
    })

    res.status(201).json({
        message: "note created",
        note
    })
})

app.get("/get/notes", async (req, res) => {
    let fetchdata = await newnotes.find()

    res.status(200).json({
        message: "fetch all data",
        fetchdata
    })
})


app.delete("/delete/notes/:id", async (req, res) => {
    let id = req.params.id
    await newnotes.findByIdAndDelete(id)

    res.status(201).json({
        message: "deleted succesfully",
    })
})


app.patch("/update/notes/:id", async (req, res) => {
    let id = req.params.id
    let {title} = req.body
   let data = await newnotes.findByIdAndUpdate(id,{title})

    res.status(201).json({
        message:" updated succesfully",
        data
    })
})

module.exports = app