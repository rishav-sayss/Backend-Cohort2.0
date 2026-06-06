import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import { createPod } from "./kuberntes/pod.js";
import { createService } from "./kuberntes/service.js";
import {v7 as uuid} from "uuid"
let app =  express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/sandbox/health', (req, res) => {
    res.status(200).json({
        message: 'Sandbox API is healthy',
        status: 'ok'
    });
});


 app.post("/api/sandbox/start", async (req, res) => {
    try {
        const sandboxId = uuid();

         await Promise.all([
            createPod(sandboxId),
            createService(sandboxId)
         ])

        res.status(201).json({
          message: "Sandbox envaroment succesfully",
          sandboxId,
          previewUrl: `http://${sandboxId}.preview.localhost`
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000,()=>{
console.log("server is started port 3000")
})

export default app