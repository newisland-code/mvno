import express from "express";
import { suspendLine } from "../controllers/suspendLineController";

const router = express.Router();

// PA07-01: 回線一時中断
router.post("/", suspendLine);

export default router;
