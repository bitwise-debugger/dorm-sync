import React, { useState, useEffect, useMemo } from 'react';
import {
    Fingerprint, Clock, CheckCircle2, UserCheck, 
    Loader2, Zap, ZapOff, ChevronDown, 
    CalendarDays, Utensils
} from 'lucide-react';

import api from '../../services/api';
import { showToast } from '../utlility/CustomToast';
import { useAuth } from '../../auth/AuthContext';
import { useMeal } from '../../contexts/MealContext';

const MarkAttendance = () => {
    const { user } = useAuth();
    const { meals } = useMeal();

    // --- STATE ---
    const [query, setQuery] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDevMode, setIsDevMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recentAttendance, setRecentAttendance] = useState([]);

    // --- DEVELOPER OVERRIDE STATE ---
    const [manualMealId, setManualMealId] = useState('');

    // --- FETCH RECENT LOGS ---
    useEffect(() => {
        api.get('/attendance/manager-attendance/' + user.id)
            .then((res) => setRecentAttendance(res.data))
            .catch((err) => console.log(err));
    }, [user.id]);

    // --- LOGIC: FIND CURRENT OR OVERRIDDEN ACTIVE MEAL ---
    const activeMeal = useMemo(() => {
        // 1. If Dev Mode is ON and a meal is manually selected, return that meal
        if (isDevMode && manualMealId) {
            return meals?.find(m => m._id === manualMealId);
        }

        // 2. Otherwise, use Real-Time Clock Logic
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDayName = days[currentTime.getDay()];
        const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        const getMinutes = (timeInput) => {
            const date = new Date(timeInput);
            return date.getHours() * 60 + date.getMinutes();
        };

        return meals?.find(meal => {
            if (meal.mealDay !== currentDayName || !meal.isOn) return false;
            const start = getMinutes(meal.mealStartTime);
            const end = getMinutes(meal.mealEndTime);
            return nowMinutes >= start && nowMinutes <= end;
        });
    }, [meals, currentTime, isDevMode, manualMealId]);

    // --- UPDATE CLOCK ---
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // --- HANDLE SUBMIT ---
    const handleMarkAttendance = async (e) => {
        if (e) e.preventDefault();
        if (!query || !activeMeal) {
            showToast('error', 'Action Blocked', 'No active meal session selected');
            return;
        }

        setLoading(true);
        try {
            const email = query.includes('@') ? query : `${query}@uog.edu.pk`;
            const userRes = await api.get('/users/' + email);
            const student = userRes.data;

            const response = await api.post('/attendance', {
                studentId: student.id,
                managerId: user.id,
                mealId: activeMeal._id,
            });

            showToast('success', 'Entry Recorded', `${student.name} verified for ${activeMeal.mealType}`);
            
            // Add to live feed
            setRecentAttendance(prev => [response.data.attendance, ...prev].slice(0, 15));
            setQuery('');
        } catch (error) {
            showToast('error', 'Verification Failed', error.response?.data?.message || 'Server Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 poppins animate-in fade-in duration-700 max-w-[1600px] mx-auto">

            {/* TOP BAR: SYSTEM STATUS & DEV OVERRIDE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${activeMeal ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-400'}`}>
                        <Clock size={24} className={activeMeal ? 'animate-pulse' : ''} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <CalendarDays size={10} /> {new Date().toLocaleDateString('en-GB', { weekday: 'long' })}
                        </p>
                    </div>
                </div>

                {/* DEVELOPER OVERRIDE PANEL */}
                <div className="lg:col-span-8 bg-slate-900 dark:bg-orange-950/10 p-4 rounded-[2.5rem] flex flex-wrap items-center gap-4 border border-orange-500/20 shadow-inner">
                    <button
                        onClick={() => setIsDevMode(!isDevMode)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest transition-all border-2
                        ${isDevMode ? 'bg-orange-600 border-orange-400 text-white' : 'border-slate-700 text-slate-500 hover:text-white'}`}
                    >
                        {isDevMode ? <Zap size={14} /> : <ZapOff size={14} />}
                        {isDevMode ? 'DEV MODE: ENABLED' : 'DEV MODE: DISABLED'}
                    </button>

                    {isDevMode && (
                        <div className="flex-1 flex items-center gap-3 animate-in zoom-in-95 duration-300">
                            <div className="relative flex-1">
                                <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500/50" size={16} />
                                <select 
                                    value={manualMealId}
                                    onChange={(e) => setManualMealId(e.target.value)}
                                    className="w-full pl-12 pr-10 py-3 bg-slate-800 border-none rounded-xl text-white text-[11px] font-bold appearance-none outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="">-- Select Mock Meal Session --</option>
                                    {meals?.map((m) => (
                                        <option key={m._id} value={m._id}>
                                            {m.mealDay} - {m.mealType} ({m.isOn ? 'ON' : 'OFF'})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

                {/* LEFT: ENTRY INTERFACE */}
                <div className="xl:col-span-7 space-y-6">
                    <div className={`bg-white dark:bg-slate-900 rounded-[4rem] p-12 shadow-2xl transition-all border-b-[12px] 
                    ${activeMeal ? 'border-orange-600 shadow-orange-500/10' : 'border-slate-200 grayscale'}`}>

                        <div className="text-center space-y-8">
                            <div className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center transition-all duration-700
                            ${activeMeal ? 'bg-orange-600 text-white shadow-2xl rotate-3 scale-110' : 'bg-slate-200 text-slate-400'}`}>
                                <Fingerprint size={50} />
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                                    {isDevMode ? "Mock Attendance" : "Mark Attendance"}
                                </h1>
                                {activeMeal ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-600 rounded-full text-[11px] font-black tracking-widest uppercase">
                                                {activeMeal.mealType} SESSION
                                            </span>
                                            <span className="text-slate-300">|</span>
                                            <span className="text-sm font-bold text-slate-500">{activeMeal.mealDay}</span>
                                        </div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {activeMeal.mealContains.map((item, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic flex items-center justify-center gap-2">
                                            <ZapOff size={14} /> System Idle: No Active Session
                                        </p>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleMarkAttendance} className="space-y-4 max-w-md mx-auto pt-4">
                                <input
                                    type="text"
                                    value={query}
                                    autoFocus
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={!activeMeal || loading}
                                    placeholder={activeMeal ? "Enter Student ID (e.g. 23021...)" : "SELECT MEAL ABOVE"}
                                    className={`w-full p-6 rounded-[2.5rem] text-center text-2xl font-black transition-all border-4 outline-none
                                    ${activeMeal
                                        ? 'border-slate-50 focus:border-orange-600 bg-slate-50 focus:bg-white text-slate-800 dark:text-white dark:bg-slate-800'
                                        : 'bg-slate-100 border-transparent cursor-not-allowed opacity-50'}`}
                                />

                                <button
                                    type="submit"
                                    disabled={!activeMeal || query.length < 5 || loading}
                                    className={`w-full flex items-center justify-center gap-3 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[3px] transition-all
                                    ${(activeMeal && query.length >= 5)
                                        ? 'bg-slate-900 text-white shadow-2xl hover:bg-black hover:-translate-y-1 cursor-pointer'
                                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={24} /> : <><CheckCircle2 size={22} /> Confirm Attendance</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* RIGHT: LIVE LOGS (STAY UNCHANGED) */}
                <div className="xl:col-span-5">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-[740px] overflow-hidden">
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <UserCheck size={24} className="text-orange-500" />
                                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-[2px]">Live Logs</h3>
                            </div>
                            <div className="px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-full animate-pulse">ACTIVE FEED</div>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                            {recentAttendance.length > 0 ? (
                                Object.entries(
                                    recentAttendance.reduce((groups, log) => {
                                        const date = new Date(log.createdAt).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        });
                                        if (!groups[date]) groups[date] = [];
                                        groups[date].push(log);
                                        return groups;
                                    }, {})
                                ).map(([date, logs]) => (
                                    <div key={date} className="space-y-4">
                                        <div className="sticky top-0 z-10 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center gap-4">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">{date}</span>
                                            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                                        </div>

                                        {logs.map((log) => (
                                            <div key={log._id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-transparent hover:border-orange-500/20 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-green-500 shadow-sm">
                                                        <CheckCircle2 size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight leading-none mb-1">
                                                            {log.student?.name || 'Guest Student'}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400">
                                                            {log.mealId?.mealType || 'System Entry'} • {log.studentId}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-[11px] font-black text-slate-400 uppercase tabular-nums">
                                                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-10">
                                    <Fingerprint size={80} />
                                    <p className="text-[12px] font-black uppercase tracking-[5px] mt-4">Empty Feed</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;