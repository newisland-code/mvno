import express from "express";
import { terminateLine } from "../controllers/terminateLineController";

const router = express.Router();

// PA07-03: 契約解除
router.post("/", terminateLine);

export default router;
