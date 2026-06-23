import { Router } from "express";
import agent from "../agent/code.agent.js";

const agentRouter = Router();

agentRouter.post("/invoke", async (req, res) => {

    try {
        const { message} = req.body;
        const response = await agent.invoke({message: [{
            role:"user",
            content:message
        }]})
        res.json({response})
    } catch (error) {
        console.error("error invoking agent:",error)
        res.status(300).json({error:"Failed to invoke agent "})
    }

   
});

export default agentRouter;