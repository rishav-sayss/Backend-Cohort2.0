import express from "express"

const app  = express()

let PORT = 3000 || 3000

 app.get("/" ,(req,res)=>{
    res.status(200).json({
        message:"hello world"
    })
})

app.get("/api/data",(req,res)=>{
    const data = {
        id:1,
        description:"this is a simple data response"
    };
    res.status(200).json({
        data
    })
})

app.listen(PORT,()=>{
    console.log("server is started at Port 3000")
})