import  Express  from "express";
import { testmcpcontroller } from "../controllers/testMcp.controller.ts";

const router  = Express.Router()

router.get("/test-mcp", testmcpcontroller);

export default router