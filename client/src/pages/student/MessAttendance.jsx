import React, { useEffect, useState } from 'react';
import { 
    Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
    CheckCircle2, Clock, Wallet, Coffee, Sun, Moon, Loader2
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../auth/AuthContext';
import { showToast } from '../utlility/CustomToast'; 

export default function MessAttendance() {
    const { user } = useAuth();
    const [attendanceRecord, setAttendanceRecord] = useState([]);
    const [recordLoading, setRecordLoading] = useState(true);
    
    // Tracking the current view month and year
    const [viewDate, setViewDate] = useState(new Date());

    const fetchAttendance = async (date) => {
        setRecordLoading(true);
        const month = date.getMonth();
        const year = date.getFullYear();
        
        try {
            // hitting the history route with query params
            const response = await api.get(`/attendance/student-attendance/${user.id}/history?month=${month}&year=${year}`);
            setAttendanceRecord(response.data);
        } catch (error) {
            showToast('error', 'Sync Failed', 'Could not fetch records for this month');
        } finally {
            setRecordLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance(viewDate);
    }, [viewDate, user.id]);

    // Calendar Helpers
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
    const days = Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => i + 1);

    const changeMonth = (offset) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const getAttendanceForDate = (day) => {
        return attendanceRecord.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.getDate() === day;
        });
    };

    const mealConfig = {
        Breakfast: { icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500' },
        Lunch: { icon: Sun, color: 'text-blue-500', bg: 'bg-blue-500' },
        Dinner: { icon: Moon, color: 'text-purple-500', bg: 'bg-purple-500' }
    };

    const totalMonthlyBill = attendanceRecord.reduce((acc, curr) => acc + (curr.meal?.mealPrice || 0), 0);

    return (
        <div className="space-y-8 poppins animate-in fade-in duration-700 pb-20 overflow-x-hidden">
            
            {/* Header: Month Navigator */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Mess Attendance</h1>
                    <p className="text-sm font-medium text-slate-500">View and verify your monthly consumption logs.</p>
                </div>
                
                <div className="flex items-center bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800">
                    <button onClick={() => changeMonth(-1)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                        <ChevronLeft size={24} />
                    </button>
                    <div className="px-6 text-center min-w-[160px]">
                        {/* <span className="block text-[10px] font-black text-orange-500 uppercase tracking-[2px]">Viewing Month</span> */}
                        <span className="text-sm font-black text-slate-800 dark:text-white uppercase">
                            {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <button onClick={() => changeMonth(1)} className="p-2 text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-2">
                
                {/* Main Calendar View */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative">
                    {recordLoading && (
                        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] z-20 flex items-center justify-center rounded-[2.5rem]">
                            <Loader2 className="text-orange-500 animate-spin" size={40} />
                        </div>
                    )}

                    <div className="grid grid-cols-7 gap-3 mb-8">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
                        ))}
                        
                        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
                        
                        {days.map(day => {
                            const dailyMeals = getAttendanceForDate(day);
                            const hasAttended = dailyMeals.length > 0;
                            
                            return (
                                <div key={day} className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all
                                    ${hasAttended ? 'bg-slate-50 dark:bg-slate-800/50 shadow-inner' : 'text-slate-300'}`}>
                                    <span className={`text-xs font-black ${hasAttended ? 'text-slate-800 dark:text-white' : ''}`}>{day}</span>
                                    <div className="flex gap-1">
                                        {dailyMeals.map((record, i) => (
                                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${mealConfig[record.meal?.mealType]?.bg || 'bg-slate-400'}`} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap gap-6 pt-8 border-t border-slate-50 dark:border-slate-800">
                        {Object.entries(mealConfig).map(([type, config]) => (
                            <div key={type} className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${config.bg} shadow-lg shadow-current/20`} />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bill & Logs Sidebar */}
                <div className="space-y-8">
                    
                    {/* Floating Bill Card */}
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/60 relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 text-white opacity-5"><Wallet size={140} /></div>
                        <div className="relative z-10">
                            <h3 className="text-white font-black text-xl mb-6">Monthly Invoice</h3>
                            <div className="p-6 bg-white/5 dark:bg-slate-800/40 rounded-3xl border border-white/5 backdrop-blur-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-1">Total Payable</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-orange-500">PKR {totalMonthlyBill}</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">({attendanceRecord.length} Meals)</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-4 bg-orange-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-500/20 cursor-pointer">
                                Download Bill PDF
                            </button>
                        </div>
                    </div>

                    {/* Quick Logs */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6">Recent Activity</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                            {attendanceRecord.length > 0 ? (
                                [...attendanceRecord].reverse().slice(0, 6).map((record) => {
                                    const Icon = mealConfig[record.meal?.mealType]?.icon || Clock;
                                    return (
                                        <div key={record._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-700 shadow-sm ${mealConfig[record.meal?.mealType]?.color}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-black text-slate-800 dark:text-white">{record.meal?.mealType}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                                        {new Date(record.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} • {record.manager?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-slate-800 dark:text-white">Rs.{record.meal?.mealPrice}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center py-10 text-xs font-bold text-slate-400 italic">No records for this month.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}