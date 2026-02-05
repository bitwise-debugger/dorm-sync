import React, { useState, useEffect } from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';

const MealTimerCard = () => {
    const [timerData, setTimerData] = useState({ label: '', time: '', subText: '' });

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();

            // Meal Schedules in minutes from midnight
            const schedule = [
                { name: 'Breakfast', start: 435, end: 540 }, // 07:15 - 09:00
                { name: 'Lunch', start: 690, end: 780 },     // 11:30 - 13:00
                { name: 'Dinner', start: 1080, end: 1200 },  // 18:00 - 20:00
            ];

            const formatCountdown = (targetMinutes) => {
                const diff = targetMinutes - currentTime;
                const h = Math.floor(diff / 60);
                const m = diff % 60;
                return `${h > 0 ? h + 'h ' : ''}${m}m`;
            };

            let currentMeal = schedule.find(m => currentTime >= m.start && currentTime <= m.end);

            if (currentMeal) {
                // A meal is currently happening
                const timeLeft = currentMeal.end - currentTime;
                setTimerData({
                    label: `${currentMeal.name} Active`,
                    time: "Started",
                    subText: timeLeft <= 15 ? "Ending soon" : "Serving now"
                });
            } else {
                // Find next meal
                let nextMeal = schedule.find(m => m.start > currentTime);

                // If no more meals today, next is tomorrow's breakfast
                if (!nextMeal) {
                    setTimerData({
                        label: "Next: Breakfast",
                        time: `In ${formatCountdown(1440 + 435)}`, // Minutes until tomorrow 7:15
                        subText: "Tomorrow"
                    });
                } else {
                    setTimerData({
                        label: `Next: ${nextMeal.name}`,
                        time: `In ${formatCountdown(nextMeal.start)}`,
                        subText: "Upcoming"
                    });
                }
            }
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-6">
                <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 shrink-0">
                    <Clock size={32} strokeWidth={2.5} />
                </div>
                <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-1">
                        {timerData.label}
                    </p>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">
                        {timerData.time}
                    </h3>
                    <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">
                        {timerData.subText}
                    </p>
                </div>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-300">
                <ArrowUpRight size={20} />
            </div>
        </div>
    );
};

export default MealTimerCard;