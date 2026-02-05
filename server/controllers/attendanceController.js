import Attendance from '../models/Attendance.js';
import mongoose from 'mongoose';

export const markAttendance = async (req, res) => {
    try {
        const { studentId, managerId, mealId, markedTime } = req.body;
        console.log(studentId, managerId, mealId, markedTime);

        // 1. Basic validation
        if (!studentId || !managerId || !mealId) {
            return res.status(400).json({
                message: 'studentId, managerId and mealId are required'
            });
        }
        console.log("Going Next!!");
        // 2. Validate ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(studentId) ||
            !mongoose.Types.ObjectId.isValid(managerId) ||
            !mongoose.Types.ObjectId.isValid(mealId)
        ) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // 3. Normalize date (important for attendance systems)
        const date = markedTime ? new Date(markedTime) : new Date();
        date.setHours(0, 0, 0, 0);

        // 4. Prevent duplicate attendance
        const alreadyMarked = await Attendance.findOne({
            student: studentId,
            meal: mealId,
            date
        });

        if (alreadyMarked) {
            return res.status(409).json({
                message: 'Attendance already marked for this student and meal'
            });
        }

        // 5. Create attendance
        const attendance = await Attendance.create({
            student: studentId,
            manager: managerId,
            meal: mealId,
            date
        });
        await attendance.populate('student', 'id name')
        return res.status(201).json({
            message: 'Attendance marked successfully',
            attendance
        });

    } catch (error) {
        console.error('Attendance Error:', error);
        return res.status(500).json({
            message: 'Failed to mark attendance',
            error: error.message
        });
    }
};
