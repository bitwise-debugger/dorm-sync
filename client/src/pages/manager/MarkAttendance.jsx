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
    //   const [studentId, setStudentId] = useState("69848986c5f1d4a103639448");
    const [studentId, setStudentId] = useState("23021519-058");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isTimeRestricted, setIsTimeRestricted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [recentAttendance, setRecentAttendance] = useState([]);

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
        if (!studentId || !canMark) return;

        setLoading(true);
        try {
            const email = studentId + '@uog.edu.pk';
            const response_ = await api.get('/users/' + email);
            const studentDocumentID = response_.data.id;
            const response = await api.post('/attendance', {
                studentId: studentDocumentID,
                managerId: user.id,
                // Using activeMeal ID if restricted, otherwise fallback to your dummy for dev
                mealId: activeMeal ? activeMeal._id : '6984d6e064fb1547d7552bcb',
            });

            showToast('success', 'Attendance Marked', `Student verified for ${activeMeal?.mealType || 'Meal'}`);

            // Update local recent list
            setRecentAttendance(prev => [{
                id: response.data._id || Date.now(),
                studentId,
                time: new Date().toLocaleTimeString(),
                mealType: activeMeal?.mealType || 'Manual'
            }, ...prev].slice(0, 10));

            setStudentId('');
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
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    disabled={!canMark || loading}
                                    placeholder={canMark ? "Enter Student ID..." : "SYSTEM LOCKED"}
                                    className={`w-full p-6 rounded-[2rem] text-center text-xl font-black transition-all border-4 outline-none
                    ${canMark
                                            ? 'border-slate-50 focus:border-orange-600 bg-slate-50 focus:bg-white text-slate-800 dark:text-white dark:bg-slate-800'
                                            : 'bg-slate-100 border-transparent cursor-not-allowed'}`}
                                />

                                <button
                                    type="submit"
                                    disabled={!canMark || studentId.length < 3 || loading}
                                    className={`w-full flex items-center justify-center gap-3 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[2px] transition-all cursor-pointer
                    ${(canMark && studentId.length >= 3)
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
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col h-[640px]">
                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <UserCheck size={20} className="text-orange-500" />
                                <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Recent Attendees</h3>
                            </div>
                            <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-lg">LIVE FEED</div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
                            {recentAttendance.length > 0 ? recentAttendance.map((log) => (
                                <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-green-500 shadow-sm">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-800 dark:text-slate-100">{log.studentId}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">{log.mealType} • SUCCESS</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{log.time}</p>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-2">
                                    <Fingerprint size={40} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No scans yet</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 rounded-b-[2.5rem]">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>Logged by: {user?.name || 'Manager'}</span>
                                <span className="text-slate-800 dark:text-white italic">{user?.id?.slice(-4)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendance;