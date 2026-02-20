import React, { useState } from 'react';
import {
    Plus, Edit3, Coffee, Sun, Moon,
    Clock, CheckCircle2, XCircle, Layers,
    Utensils
} from 'lucide-react';
import { useMeal } from '../../contexts/MealContext';

const Meals = () => {
    const { meals: mealsArray } = useMeal();
    const [activeDay, setActiveDay] = useState("Monday");
    const [activeRotation, setActiveRotation] = useState(1);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Helper to format ISO strings correctly
    const formatTime = (isoString) => {
        if (!isoString) return "--:--";
        const date = new Date(isoString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Logic to filter meals based on your specific schedule:
    // Mon-Fri: Breakfast & Dinner | Sat-Sun: Lunch & Dinner
    const filteredMeals = mealsArray?.filter(meal => {
        const dayMatch = meal.mealDay === activeDay;
        const rotationMatch = meal.rotationWeek === activeRotation;

        const isWeekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(activeDay);
        const isValidType = isWeekday
            ? (meal.mealType === 'Breakfast' || meal.mealType === 'Dinner')
            : (meal.mealType === 'Lunch' || meal.mealType === 'Dinner');

        return dayMatch && rotationMatch && isValidType;
    }) || [];

    return (
        <div className="space-y-10 poppins animate-in fade-in duration-700 pb-20 overflow-x-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[1.5rem] border border-slate-200/50 dark:border-slate-800 w-fit">
                    {[1, 2].map((num) => (
                        <button
                            key={num}
                            onClick={() => setActiveRotation(num)}
                            className={`px-8 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2
                        ${activeRotation === num
                                    ? 'bg-white dark:bg-slate-800 text-orange-600 shadow-xl shadow-orange-500/10'
                                    : 'text-slate-400 hover:text-slate-500'}`}
                        >
                            <Layers size={14} /> SEQUENCE {num}
                        </button>
                    ))}
                </div>

                <button className="flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-black rounded-[1.5rem] shadow-2xl shadow-orange-500/30 hover:bg-orange-700 transition-all cursor-pointer shrink-0 border-none outline-none">
                    <Plus size={20} /> Add New Meal
                </button>
            </div>

            {/* Day Selector */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 px-2">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap
              ${activeDay === day
                                ? 'bg-orange-600 text-white shadow-2xl shadow-orange-600/30'
                                : 'bg-white dark:bg-slate-900 text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Dynamic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
                {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                        <div
                            key={meal._id}
                            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none group relative transition-transform hover:-translate-y-1 duration-300"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className={`p-4 rounded-2xl ${meal.mealType === 'Breakfast' ? 'bg-orange-50 text-orange-500' :
                                    meal.mealType === 'Lunch' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                                    } dark:bg-slate-800`}>
                                    {meal.mealType === 'Breakfast' ? <Coffee size={24} /> :
                                        meal.mealType === 'Lunch' ? <Sun size={24} /> : <Moon size={24} />}
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter
                        ${meal.isOn ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                        {meal.isOn ? 'ACTIVE' : 'DISABLED'}
                                    </div>
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                                        <Layers size={10} /> Rotation {meal.rotationWeek}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                    <Clock size={12} /> {formatTime(meal.mealStartTime)} - {formatTime(meal.mealEndTime)}
                                </p>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                                    {meal.mealType}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {meal.mealContains.map((item, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Unit Price</span>
                                    <span className="text-lg font-black text-slate-800 dark:text-white">PKR {meal.mealPrice}</span>
                                </div>
                                <button className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-orange-500 rounded-2xl transition-all cursor-pointer shadow-sm">
                                    <Edit3 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-100/50 border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
                        <Utensils size={40} className="text-slate-200" />
                        <p className="font-bold text-slate-400 italic">No {activeDay} schedule found for Week {activeRotation}.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Meals;