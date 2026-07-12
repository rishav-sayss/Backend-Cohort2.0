import express from "express";
import { askAiController } from "../controllers/ai.controller.ts";

const router = express.Router();

router.post("/ask", askAiController);

export default router;