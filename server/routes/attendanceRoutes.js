import express from "express";
import Attendance from "../models/Attendance.js";
import { markAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

// 1. Get student attendance for the CURRENT month
router.get("/student-attendance/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const now = new Date();
        
        // Start of current month (e.g., Feb 1st, 2026, 00:00:00)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        // Start of next month (e.g., March 1st, 2026, 00:00:00)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const attendances = await Attendance.find({
            student: studentId,
            date: {
                $gte: startOfMonth,
                $lt: endOfMonth
            }
        })
        .populate('meal')
        .populate('manager', 'name email'); // Only populate needed fields

        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: "Error fetching current month attendance", error: error.message });
    }
});

// 2. Get student attendance for a SPECIFIC month/year (For history/bills)
// URL Example: /attendance/student-attendance/ID/history?month=0&year=2026 (Month is 0-indexed)
router.get("/student-attendance/:studentId/history", async (req, res) => {
    try {
        const { studentId } = req.params;
        const month = parseInt(req.query.month); // 0 = Jan, 1 = Feb...
        const year = parseInt(req.query.year);

        if (isNaN(month) || isNaN(year)) {
            return res.status(400).json({ message: "Invalid month or year provided" });
        }

        const startOfSelectedMonth = new Date(year, month, 1);
        const endOfSelectedMonth = new Date(year, month + 1, 1);

        const attendances = await Attendance.find({
            student: studentId,
            date: {
                $gte: startOfSelectedMonth,
                $lt: endOfSelectedMonth
            }
        })
        .populate('meal')
        .populate('manager', 'name');

        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
});

// Manager view (can stay as is or be month-filtered if logs get too long)
router.get("/manager-attendance/:managerId", async (req, res) => {
    const managerId = req.params.managerId;
    const attendances = await Attendance.find({ manager: managerId })
        .populate('student', 'id name')
        .sort({ createdAt: -1 }); // Show newest first
    res.json(attendances);
});

router.post('/', markAttendance);

export default router;