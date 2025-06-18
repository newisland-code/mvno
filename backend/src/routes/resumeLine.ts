import express from "express";
import { resumeLine } from "../controllers/resumeLineController";

const router = express.Router();

// PA07-02: 回線再開
router.post("/", resumeLine);

export default router;
