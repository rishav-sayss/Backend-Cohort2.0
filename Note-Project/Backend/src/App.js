let express = require("express")
let Note = require("./Models/Data.model")
let cors = require("cors")
let app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
    let data = req.body
    let response = await Note.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "post is created",
        response
    })

})


app.get("/api/notes", async (req, res) => {

    let  data = await Note.find()
    res.status(200).json({
        message: " fetch the all data",
         data
    })
})

app.delete("/api/notes/:id", async (req, res) => { 
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Note deleted successfully",
    data: deletedNote
  });
});

app.patch("/api/notes/:id",async (req,res)=>{
    let {title,description}  = req.body
    let data = await Note.findByIdAndUpdate(req.params.id,{title,description})

    res.status(200).json({
        message:"note updated",
        Data:data
    })
})


module.exports = app