import express from "express";

import User from "../models/User.js";
import protect from "../middlewares/auth.js";
const router = express.Router();
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email })
            .select('_id name')
            .lean();

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name
        });

    } catch (error) {
        console.error('Get User By Email Error:', error);

        return res.status(500).json({
            message: 'Failed to fetch user',
            error: error.message
        });
    }
});

router.post("/", (req, res) => {
    const { email } = req.body;
    console.log(email);
    res.json({ email });
});


export default router;
