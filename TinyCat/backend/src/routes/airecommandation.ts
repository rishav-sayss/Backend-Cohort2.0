import express from "express";
import { aiRecommendController } from "../controllers/ai.recommand.ts";

const router = express.Router();

router.post("/recommendByAi", aiRecommendController);

export default router;