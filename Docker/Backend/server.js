 import express from "express"

let app = express()

app.get("/" ,(req,res)=>{
    res.status(200).json({
        message:"hello world"
    })
})

app.get("/api/data",(req,res)=>{
    const data = {
        id:1,
        name:"sampel data",
        description:"this is a simple data response"
    };
    res.status(200).json({
        data
    })
})

app.get("/api/health",(req,res)=>{
    const data = {
        id:1,
        name:"health  data",
        description:"this is the health Department"
    };
    res.status(200).json({
        data
    })
})


let PORT = 3000

app.listen(PORT,()=>{
    console.log("server is Runnnig prt 3000")
})