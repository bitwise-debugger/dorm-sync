import express from "express";
import Attendance from "../models/Attendance.js";
import { markAttendance } from "../controllers/attendanceController.js";
const router = express.Router();

router.get("/", (req, res) => {

});
router.get('/:id', (req, res) => {

})
router.post('/', markAttendance);



export default router;
