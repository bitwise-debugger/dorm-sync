import fs from 'fs';
import csv from 'csv-parser';
import User from '../models/User.js';
import Room from '../models/Room.js';

const seedDatabase = async () => {
    try {
        // Clear existing data for a clean start
        await User.deleteMany({});
        await Room.deleteMany({});
        console.log("🗑️ Database cleared.");

        const rows = [];

        // 1. Read the CSV file
        await new Promise((resolve, reject) => {
            fs.createReadStream('./data/Data.csv')
                .pipe(csv({
                    mapHeaders: ({ header }) => header.trim()
                }))
                .on('data', (data) => rows.push(data))
                .on('end', resolve)
                .on('error', reject);
        });

        // 2. Group data by Room Number
        const roomsMap = {};
        rows.forEach(row => {
            const roomNum = row['Room #'];
            if (!roomNum) return; // Skip empty rows
            if (!roomsMap[roomNum]) roomsMap[roomNum] = [];
            roomsMap[roomNum].push(row);
        });

        console.log(`🏠 Processing ${Object.keys(roomsMap).length} rooms...`);

        for (const roomNumber in roomsMap) {
            const studentsInRoom = roomsMap[roomNumber];

            // 3. Create the Room with capacity equal to the student count
            const room = await Room.create({
                number: roomNumber,
                capacity: studentsInRoom.length, // Dynamic capacity
                occupants: []
            });

            const userPromises = studentsInRoom.map(studentData => {
                const rollNo = studentData['Roll No.'] || studentData['Roll No'];
                const name = studentData['Name'];

                return User.create({
                    name: name.trim(),
                    email: `${rollNo.trim().replace(/\s+/g, '')}@uog.edu.pk`,
                    password: "password123", // Will be hashed by userSchema.pre('save')
                    role: 'student',
                    room: room._id,
                    phone: "03000000000"
                });
            });

            // 4. Wait for all users in this room to be created
            const createdUsers = await Promise.all(userPromises);

            // 5. Link User IDs back to the Room
            room.occupants = createdUsers.map(u => u._id);
            await room.save();
        }

        console.log("✅ Seeding complete! All users hashed and linked to rooms.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
};
seedDatabase();
const Data = { key: 'value' };
export default Data;

