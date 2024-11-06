import express from "express";
import { fetchBlinks } from "../controllers/choice.controller";

const router = express.Router();

router.get("/", fetchBlinks);

export default router;
