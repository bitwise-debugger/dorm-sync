import express from "express";
import Attendance from "../models/Attendance.js";
import { markAttendance } from "../controllers/attendanceController.js";
const router = express.Router();

router.get("/:managerId", async (req, res) => {
    const managerId = req.params.managerId;
    const attendances = await Attendance.find({ manager: managerId }).populate('student', 'id name');
    res.json(attendances);
});
router.get('/:id', (req, res) => {

})
router.post('/', markAttendance);



export default router;
