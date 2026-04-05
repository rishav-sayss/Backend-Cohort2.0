 import express from "express"
 import rungraph from "./ai/graph.ai.js"
const app  = express()

app.get("/", async (requestAnimationFrame,res)=>{
    let result = await rungraph("write the code for Factorial function in js ")
    res.json(result)
})

export default  app