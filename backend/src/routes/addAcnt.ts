import express from "express";
import { addAcnt } from "../controllers/addAcntController";

const router = express.Router();
router.post("/addAcnt", addAcnt);

export default router;
