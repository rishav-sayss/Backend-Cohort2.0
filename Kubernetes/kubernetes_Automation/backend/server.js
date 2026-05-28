import express from "express";
import morgan from "morgan";
let app = express()
app.use(express.json())
app.use(morgan("dev"))

 

app.get("/",(req,res) =>{

    let num = 0;

    for(let i = 1;  i<10000000; i++){
         num+=i
    }

    res.status(201).json(
        {"message":`total sum of the  ${num}`}
    )

})

app.listen(3000,()=>{
    console.log("server is running Port 3000")
})