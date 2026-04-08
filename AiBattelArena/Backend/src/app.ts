import express from 'express';
import runGraph from "./ai/graph.ai.js"
import cors from "cors"

const app = express();
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}))


app.get('/', async (req, res) => {

    const result = await runGraph("Write an code for Factorial function in js")

    res.json(result)
})

app.post("/invoke", async (req, res) => {
  try {
     
    const {problem} = req.body

    const result = await runGraph(problem);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



export default app;