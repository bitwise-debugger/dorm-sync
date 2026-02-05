import express from "express";
import { getAllMeals } from "../controllers/mealController.js";


const router = express.Router();

router.get("/", getAllMeals);
router.get('/:id', (req, res) => {

})


export default router;
