import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import csv from 'csv-parser';
import User from '../models/user.model.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/dormsync';

const seedDatabase = async () => {
    try {
        // await mongoose.connect(MONGO_URI);
        // console.log("MongoDB COnnected!");
        

        const students = [];
        const salt = await bcrypt.genSalt(10);
        const defaultPassword = await bcrypt.hash("password123", salt);

        // We use mapHeaders to normalize the keys
        fs.createReadStream('data/Data.csv')
            .pipe(csv({
                mapHeaders: ({ header }) => header.trim().toLowerCase().replace('.', '')
            }))
            .on('data', (row) => {
                // Now 'Roll No.' becomes 'roll no' and 'Name' becomes 'name'
                const rollNo = row['roll no'];
                const studentName = row['name'];

                if (rollNo && studentName) {
                    students.push({
                        name: studentName.trim(),
                        email: `${rollNo.replace(/\s+/g, '')}@uog.edu.pk`,
                        password: defaultPassword,
                        phone: 12345678901,
                        role: 'student',
                        isActive: true
                    });
                }
            })
            .on('end', async () => {
                if (students.length === 0) {
                    console.log("⚠️ No students found. Check if your CSV headers match 'Roll No.' and 'Name'.");
                    process.exit();
                }

                try {
                    console.log(`📦 Attempting to insert ${students.length} records...`);
                    await User.insertMany(students);
                    console.log("✅ Database successfully seeded!");
                } catch (err) {
                    console.error("❌ Insertion Error:", err.message);
                } finally {
                    mongoose.connection.close();
                    process.exit();
                }
            });

    } catch (error) {
        console.error("❌ Connection error:", error);
    }
};

seedDatabase();


const Data = {};
export default Data;