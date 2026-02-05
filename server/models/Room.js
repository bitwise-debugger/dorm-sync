import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // students in this room
}, { timestamps: true });
const Room = mongoose.model('Room', roomSchema);
export default Room;
