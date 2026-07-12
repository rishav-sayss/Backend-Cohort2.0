import dotenv from "dotenv"
dotenv.config()
import app from "./app.ts"
import { connectDB } from "./Config/DB.ts"


connectDB()

let PORT = process.env.PORT ||  3000
 
app.listen(PORT, ()=>{
    console.log(`server is runnig port  ${PORT} `)
})