import express from "express";
import { cancelEsim } from "../controllers/cancelEsimController";

const router = express.Router();

// PA06-01: eSIMキャンセル
router.post("/", cancelEsim);

export default router;
