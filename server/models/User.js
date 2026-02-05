import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'manager', 'admin'], default: 'student' },
    phone: { type: String },
    profilePicture: {
        type: String, default: 'https://lh3.googleusercontent.com/a/ACg8ocKfmQg2Lh9O1hOhL5-2074OIJFMvjxBQd8tc9GY5stQKwe3RbUC4g=s83-c-mo'
    },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    messOpen: { type: Boolean, default: false },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password for login
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
