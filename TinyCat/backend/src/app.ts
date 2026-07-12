
import  express, { type Request, type Response }  from "express"

let app = express()

app.use(express.json())

app.get("/", ( req: Request, res: Response )=>{

    res.send({
    success: true,
    message: "Tiny cats backend running...",
  });

})

export default app

