let express = require("express")
let noteModel = require("./Models/notes.model")
let App = express();

App.use(express.json())
/**
 * - POST /notes
 * - req.body => {title,description}
 */
App.post("/notes", async (req, res) => {

    const { title, description, age } = req.body

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})


/**
 * - GET /notes
 * - fetch all the notes Data
 */
App.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

App.delete("/notes/:id", async (req, res) => {
    let id = req.params.id
    const notes = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

module.exports = App


