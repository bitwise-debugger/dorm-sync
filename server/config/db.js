import mongoose from 'mongoose';
export async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("DB connection failed");
        process.exit(1);
    }
}