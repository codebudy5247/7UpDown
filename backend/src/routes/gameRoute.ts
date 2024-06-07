import express from "express";
import authMiddleware from "../middleware/auth";
import { rollDice } from "../controller/game";

const router = express.Router();

router.route("/roll-dice").post([authMiddleware], rollDice);

export default router;
