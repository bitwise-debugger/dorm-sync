import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { restrictTo } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get('/', protect, restrictTo('admin'), (req, res) => {
    res.send('Protected Response!');
})

export default router;
