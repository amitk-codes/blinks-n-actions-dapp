import express from "express";
import { blinkActions, fetchBlinks } from "../controllers/choice.controller";

const router = express.Router();

router.get("/", fetchBlinks);
router.post("/", blinkActions);

export default router;
