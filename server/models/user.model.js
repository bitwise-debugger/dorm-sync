import mongoose from 'mongoose'
const { Schema } = mongoose;

import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        phone: {
            type: Number,
            minlength: 11,
        },
        role: {
            type: String,
            enum: ["student", "manager", "admin"],
            default: "student",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);


export default User;
