import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    isOn: { type: Boolean, default: true },
    mealDay: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    mealType: { type: String, required: true, enum: ['Breakfast', 'Lunch', 'Dinner'] },
    mealContains: [{ type: String, required: true }],
    rotationWeek: { type: Number, default: 1 },
    mealPrice: { type: Number, required: true, default: 180 },
    mealStartTime: { type: Date },
    mealEndTime: { type: Date },
}, { timestamps: true });
const Meal = mongoose.model('Meal', mealSchema);
export default Meal;


// const seedMeals = [
//     // --- MONDAY (Breakfast & Dinner) ---
//     { mealDay: 'Monday', mealType: 'Breakfast', rotationWeek: 1, mealContains: ['Paratha', 'Bhurji', 'Dahi'], mealPrice: 150, mealStartTime: new Date('1970-01-01T07:15:00'), mealEndTime: new Date('1970-01-01T09:00:00') },
//     { mealDay: 'Monday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Chicken Pulao'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },
//     { mealDay: 'Monday', mealType: 'Dinner', rotationWeek: 2, mealContains: ['Channe Pulao'], mealPrice: 160, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- TUESDAY (Breakfast & Dinner) ---
//     { mealDay: 'Tuesday', mealType: 'Breakfast', rotationWeek: 1, mealContains: ['Alao Pratha', 'Dahi'], mealPrice: 150, mealStartTime: new Date('1970-01-01T07:15:00'), mealEndTime: new Date('1970-01-01T09:00:00') },
//     { mealDay: 'Tuesday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Haleem'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },
//     { mealDay: 'Tuesday', mealType: 'Dinner', rotationWeek: 2, mealContains: ['Broast', 'Mix Daal'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- WEDNESDAY (Breakfast & Dinner) ---
//     { mealDay: 'Wednesday', mealType: 'Breakfast', rotationWeek: 1, mealContains: ['Pratha', 'White Channe'], mealPrice: 150, mealStartTime: new Date('1970-01-01T07:15:00'), mealEndTime: new Date('1970-01-01T09:00:00') },
//     { mealDay: 'Wednesday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Chicken Beryani'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- THURSDAY (Breakfast & Dinner) ---
//     { mealDay: 'Thursday', mealType: 'Breakfast', rotationWeek: 1, mealContains: ['Aalo Pratha', 'Dahi'], mealPrice: 150, mealStartTime: new Date('1970-01-01T07:15:00'), mealEndTime: new Date('1970-01-01T09:00:00') },
//     { mealDay: 'Thursday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Chicken Karrahi'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- FRIDAY (Breakfast & Dinner) ---
//     { mealDay: 'Friday', mealType: 'Breakfast', rotationWeek: 1, mealContains: ['Pratha', 'Alao Anda'], mealPrice: 150, mealStartTime: new Date('1970-01-01T07:15:00'), mealEndTime: new Date('1970-01-01T09:00:00') },
//     { mealDay: 'Friday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Daal Rice'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },
//     { mealDay: 'Friday', mealType: 'Dinner', rotationWeek: 2, mealContains: ['Shami', 'Raita', 'Dall Channa'], mealPrice: 180, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- SATURDAY (Lunch & Dinner) ---
//     { mealDay: 'Saturday', mealType: 'Lunch', rotationWeek: 1, mealContains: ['Alao Qeema'], mealPrice: 180, mealStartTime: new Date('1970-01-01T11:30:00'), mealEndTime: new Date('1970-01-01T13:00:00') },
//     { mealDay: 'Saturday', mealType: 'Lunch', rotationWeek: 2, mealContains: ['Dall Mash', 'Raita'], mealPrice: 160, mealStartTime: new Date('1970-01-01T11:30:00'), mealEndTime: new Date('1970-01-01T13:00:00') },
//     { mealDay: 'Saturday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Sabzi', 'Sweat Dish'], mealPrice: 160, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') },

//     // --- SUNDAY (Lunch & Dinner) ---
//     { mealDay: 'Sunday', mealType: 'Lunch', rotationWeek: 1, mealContains: ['Chicken Pulao'], mealPrice: 180, mealStartTime: new Date('1970-01-01T11:30:00'), mealEndTime: new Date('1970-01-01T13:00:00') },
//     { mealDay: 'Sunday', mealType: 'Lunch', rotationWeek: 2, mealContains: ['Channe Pulao'], mealPrice: 160, mealStartTime: new Date('1970-01-01T11:30:00'), mealEndTime: new Date('1970-01-01T13:00:00') },
//     { mealDay: 'Sunday', mealType: 'Dinner', rotationWeek: 1, mealContains: ['Alao Chicken'], mealPrice: 170, mealStartTime: new Date('1970-01-01T18:45:00'), mealEndTime: new Date('1970-01-01T20:45:00') }
// ];

// const seedDB = async () => {
//     try {
     


//         // Clear existing data to avoid duplicates
//         await Meal.deleteMany({});
//         console.log("Cleared old meal data...");

//         await Meal.insertMany(seedMeals);
//         console.log("Database Seeded Successfully!");

//         mongoose.connection.close();
//     } catch (error) {
//         console.error("Error seeding database:", error);
//         process.exit(1);
//     }
// };

// seedDB();


