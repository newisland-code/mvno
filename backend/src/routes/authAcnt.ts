import express from "express";
import { authAcnt } from "../controllers/authAcntController";

const router = express.Router();

// PA03-01: アカウント認証
router.post("/", authAcnt);

export default router;
