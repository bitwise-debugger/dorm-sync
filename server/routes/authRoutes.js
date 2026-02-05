import express from "express";
import {
    register,
    login,
    me,
} from "../controllers/authController.js";
import User from "../models/User.js";
import protect from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', protect, me)


export default router;
