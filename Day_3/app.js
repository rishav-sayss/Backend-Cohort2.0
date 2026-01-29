let express = require("express")
let app = express()

app.use(express.json())
let  notes = []
app.post("/post", (req, res) => {
    // console.log(req.body)
     notes.push(req.body)
    res.send("Note Created")
})
app.get("/get", (req, res) => {
    res.send(notes)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})