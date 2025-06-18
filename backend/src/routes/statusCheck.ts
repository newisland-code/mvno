import express from "express";
import { statusCheck } from "../controllers/statusCheckController";

const router = express.Router();
router.get("/", statusCheck);

export default router;
