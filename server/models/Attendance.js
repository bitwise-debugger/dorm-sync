import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: () => new Date.setHours(0, 0, 0, 0) },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
}, { timestamps: true });
const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;

// const STUDENT_ID = '69844f30965730dedd34f68f';

// const seedDatabase = async () => {
//   try {

//     // 1. Optional: Clear existing records for this student
//     await Attendance.deleteMany({ student: STUDENT_ID });

//     // 2. Generate 15 random dates
//     const attendanceRecords = [];
//     const usedDates = new Set();

//     while (attendanceRecords.length < 15) {
//       // Generate a random date within the last 30 days
//       const daysAgo = Math.floor(Math.random() * 30);
//       const date = new Date();
//       date.setDate(date.getDate() - daysAgo);
//       date.setHours(0, 0, 0, 0); // Normalize to start of day

//       const dateString = date.toISOString();

//       // Ensure we don't add the same day twice
//       if (!usedDates.has(dateString)) {
//         usedDates.add(dateString);
//         attendanceRecords.push({
//           student: STUDENT_ID,
//           date: date,
//         });
//       }
//     }

//     // 3. Insert into Database
//     await Attendance.insertMany(attendanceRecords);
//     console.log(`Successfully seeded ${attendanceRecords.length} records for student ${STUDENT_ID}`);

//     process.exit();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedDatabase();