import express from "express";
import { inquiryStatus } from "../controllers/inquiryStatusController";

const router = express.Router();

// PA08-01: 開通状況照会
router.post("/", inquiryStatus);

export default router;
