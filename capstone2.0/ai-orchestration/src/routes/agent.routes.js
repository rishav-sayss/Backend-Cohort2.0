import { Router } from "express";
import agent from "../agent/code.agent.js";

const agentRouter = Router();

agentRouter.post("/invoke", async (req, res) => {
  try {
    const { message, projectId } = req.body;
    
    // Set response timeout to prevent 504
    res.setTimeout(50000); 
    
    const response = await agent.invoke(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        context: {
          projectId,
        },
      },
    );
    res.json({ response });
  } catch (error) {
    console.error("error invoking agent:", error);
    res.status(500).json({ error: "Failed to invoke agent: " + error.message });
  }
});

export default agentRouter;
