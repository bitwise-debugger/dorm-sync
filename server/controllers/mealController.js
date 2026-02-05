import Meal from "../models/Meal.js";


export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find()
            .sort({ createdAt: -1 }) // latest first
            .lean();                 // faster, plain JS objects

        return res.status(200).json(meals);

    } catch (error) {
        console.error('Get Meals Error:', error);

        return res.status(500).json({
            message: 'Failed to fetch meals',
            error: error.message
        });
    }
};
