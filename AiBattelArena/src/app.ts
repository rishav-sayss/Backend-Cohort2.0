import express from "express"

let app = express()

app.get( "/health",(req,res)=>{

    res.status(200).json({
        status:'okk'
    })
    
})
export default app



