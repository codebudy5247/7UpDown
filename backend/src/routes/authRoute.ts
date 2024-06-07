import express from "express";
import { register, login, me } from "../controller/auth";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get([authMiddleware], me);

export default router;
