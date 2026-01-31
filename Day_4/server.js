let app = require("./src/App")

let posts = []

app.post("/post", (req, res) => {
    posts.push(req.body)
    res.send("post is created")
})
app.get("/get", (req, res) => {
    res.send(posts)
})

app.delete("/delete/:num", (req, res) => {
      delete posts[req.params.num]
        res.send("note is deleted")
})

app.patch("/patch/:up",(req,res)=>{
    posts[req.params.up].title = req.body.title
    posts[req.params.up].discription = req.body.discription
    res.send("post is updated") 
})
app.listen(3000, () => {
    console.log("server is started at 3000 Port")
})

