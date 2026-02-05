import React, { useState, useEffect, useMemo } from 'react';
import {
    Fingerprint, Clock, CheckCircle2, ShieldCheck,
    ShieldAlert, Coffee, Sun, Moon, Zap, ZapOff,
    ArrowRight, UserCheck, Loader2
} from 'lucide-react';


import api from '../../services/api';
import { showToast } from '../utlility/CustomToast';
import { useAuth } from '../../auth/AuthContext';
import { useMeal } from '../../contexts/MealContext';

const MarkAttendance = () => {
    const { user } = useAuth();
    const { meals } = useMeal();

    // --- STATE ---
    const [query, setQuery] = useState('23021519-058');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isTimeRestricted, setIsTimeRestricted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [recentAttendance, setRecentAttendance] = useState([]);


    useEffect(() => {
        api.get('/attendance/' + user.id).then((response) => {
            console.log(response.data);
            setRecentAttendance(response.data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {

        })
    }, []);
    useEffect(() => {
        console.log("recent attendance changed", recentAttendance);

    }, [recentAttendance]);

    // --- 1. LOGIC: FIND CURRENT ACTIVE MEAL ---
    const activeMeal = useMemo(() => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDayName = days[currentTime.getDay()];

        // Helper to convert "HH:mm" or ISO string to minutes from midnight
        const getMinutes = (timeInput) => {
            const date = new Date(timeInput);
            return date.getHours() * 60 + date.getMinutes();
        };

        const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        // Find meal matching Day and Time range
        return meals?.find(meal => {
            if (meal.mealDay !== currentDayName || !meal.isOn) return false;

            const start = getMinutes(meal.mealStartTime);
            const end = getMinutes(meal.mealEndTime);
            return nowMinutes >= start && nowMinutes <= end;
        });
    }, [meals, currentTime]);

    const canMark = !isTimeRestricted || activeMeal;

    // --- 2. UPDATE CLOCK ---
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // --- 3. HANDLE SUBMIT ---
    const handleMarkAttendance = async (e) => {
        if (e) e.preventDefault();
        if (!query || !canMark) return;

        setLoading(true);
        try {
            const email = query + '@uog.edu.pk';
            const response_ = await api.get('/users/' + email);
            const studentDocument = response_.data;
            console.log('studentDocument', studentDocument);

            const response = await api.post('/attendance', {
                studentId: studentDocument.id,
                managerId: user.id,
                // Using activeMeal ID if restricted, otherwise fallback to your dummy for dev
                mealId: activeMeal ? activeMeal._id : '6984d6e064fb1547d7552bcb',
            });


            showToast('success', 'Attendance Marked', `Student verified for ${activeMeal?.mealType || 'Meal'}`);

            // Update local recent list
            setRecentAttendance(prev => [{ ...response.data.attendance }, ...prev].slice(0, 10));

            // setQuery('');
        } catch (error) {
            showToast('error', 'Failed', error.response?.data?.message || 'Server Error');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="space-y-6 poppins animate-in fade-in duration-700">

            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl ${activeMeal ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Clock size={24} className={activeMeal ? 'animate-pulse' : ''} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight">
                            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {activeMeal ? `LIVE: ${activeMeal.mealDay} ${activeMeal.mealType}` : 'OFFLINE: SYSTEM LOCKED'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setIsTimeRestricted(!isTimeRestricted)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] tracking-widest transition-all cursor-pointer border-2
            ${isTimeRestricted ? 'border-slate-100 text-slate-400' : 'border-orange-500 bg-orange-50 text-orange-600 shadow-lg'}`}
                >
                    {isTimeRestricted ? <ZapOff size={14} /> : <Zap size={14} />}
                    {isTimeRestricted ? 'TIME RESTRICTION: ON' : 'DEV MODE: BYPASS ACTIVE'}
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

                {/* LEFT: ATTENDANCE INPUT & MEAL INFO */}
                <div className="xl:col-span-7 space-y-6">
                    <div className={`bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl transition-all border-b-[12px] 
            ${canMark ? 'border-orange-600 shadow-orange-500/10' : 'border-slate-200 grayscale shadow-none'}`}>

                        <div className="text-center space-y-8">
                            <div className={`w-20 h-20 mx-auto rounded-[1.75rem] flex items-center justify-center transition-all duration-500
                ${canMark ? 'bg-orange-600 text-white shadow-xl rotate-3' : 'bg-slate-200 text-slate-400'}`}>
                                <Fingerprint size={44} />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-800 dark:text-white">Mark Attendance</h1>
                                {activeMeal ? (
                                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                                        {activeMeal.mealContains.map((item, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto italic">
                                        Waiting for scheduled meal time...
                                    </p>
                                )}
                            </div>

                            <form onSubmit={handleMarkAttendance} className="space-y-4">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={!canMark || loading}
                                    placeholder={canMark ? "Enter Student ID..." : "SYSTEM LOCKED"}
                                    className={`w-full p-6 rounded-[2rem] text-center text-xl font-black transition-all border-4 outline-none
                    ${canMark
                                            ? 'border-slate-50 focus:border-orange-600 bg-slate-50 focus:bg-white text-slate-800 dark:text-white dark:bg-slate-800'
                                            : 'bg-slate-100 border-transparent cursor-not-allowed'}`}
                                />

                                <button
                                    type="submit"
                                    disabled={!canMark || query.length < 12 || loading}
                                    className={`w-full flex items-center justify-center gap-3 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[2px] transition-all cursor-pointer
                    ${(canMark && query.length >= 12)
                                            ? 'bg-slate-900 text-white shadow-2xl hover:bg-black hover:-translate-y-1'
                                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><CheckCircle2 size={18} /> Confirm Entry</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* RIGHT: LIVE LOGS */}
                <div className="xl:col-span-5 space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-[640px] overflow-hidden">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
                            <div className="flex items-center gap-2">
                                <UserCheck size={20} className="text-orange-500" />
                                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Recent Attendees</h3>
                            </div>
                            <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-lg animate-pulse">LIVE FEED</div>
                        </div>

                        {/* Scrollable Area */}
                        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
                            {recentAttendance.length > 0 ? (
                                // Grouping Logic: We reduce the flat array into a grouped object by date
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
                                    <div key={date} className="space-y-3">
                                        {/* Date Separator */}
                                        <div className="sticky top-0 z-10 py-1 bg-white dark:bg-slate-900 flex items-center gap-3">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] whitespace-nowrap">{date}</span>
                                            <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800"></div>
                                        </div>

                                        {/* Logs for this specific day */}
                                        {logs.map((log) => (
                                            <div key={log._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-green-500 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                        <CheckCircle2 size={22} />
                                                    </div>
                                                    <div>
                                                        {/* Pulled from student.name as requested */}
                                                        <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 uppercase leading-tight">
                                                            {log.student?.name || 'Unknown Student'}
                                                        </p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                                                            {log.mealId?.mealType || 'Meal'} • {log.studentId}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tabular-nums">
                                                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-3">
                                    <Fingerprint size={48} />
                                    <p className="text-[10px] font-black uppercase tracking-[3px]">Waiting for scans</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 rounded-b-[2.5rem]">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></div>
                                    <span>Operator: {user?.name || 'Manager'}</span>
                                </div>
                                <span className="text-slate-800 dark:text-white font-black italic">#{user?.id?.slice(-4)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;