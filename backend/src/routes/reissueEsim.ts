import express from "express";
import { reissueEsim } from "../controllers/reissueEsimController";

const router = express.Router();

// PA05-42: eSIM再発行
router.post("/", reissueEsim);

export default router;
