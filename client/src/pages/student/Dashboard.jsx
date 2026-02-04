import React from 'react';
import { 
    Utensils, Calendar, Clock, TrendingUp, 
    ChevronRight, Bell, CheckCircle2, AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
    // Context-grounded mock data
    const stats = [
        { label: 'Mess Status', value: 'Open', status: 'active', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
        { label: 'Attendance', value: '92%', status: 'good', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
        { label: 'Total Bills', value: 'PKR 4,200', status: 'pending', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    ];

    const todayMenu = [
        { meal: 'Breakfast', menu: 'Omelette + Paratha + Tea', time: '07:00 AM' },
        { meal: 'Lunch', menu: 'Chicken Biryani + Raita', time: '01:30 PM', active: true },
        { meal: 'Dinner', menu: 'Daal Mash + Roti', time: '08:00 PM' },
    ];

    return (
        <div className="space-y-6 poppins animate-in fade-in duration-500">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</h3>
                            </div>
                        </div>
                        {stat.label === 'Mess Status' && (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold">LIVE</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Middle Content: Attendance Report (Academix Chart Style) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">Monthly Attendance Report</h3>
                            <p className="text-xs text-slate-500">Visualization of your mess presence this month.</p>
                        </div>
                        <select className="text-xs font-bold bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-2 outline-none cursor-pointer">
                            <option>February 2026</option>
                            <option>January 2026</option>
                        </select>
                    </div>
                    
                    {/* Placeholder for Chart - Matches Academix Visuals */}
                    <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 flex items-end justify-around px-4">
                            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-8 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-lg" />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-slate-400 z-10 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm">
                            Attendance Chart Container
                        </span>
                    </div>
                </div>

                {/* Right Column: Today's Menu */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 dark:text-white">Today's Menu</h3>
                        <Utensils size={18} className="text-orange-500" />
                    </div>
                    
                    <div className="space-y-4">
                        {todayMenu.map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border transition-all ${item.active ? 'bg-orange-500/5 border-orange-200 dark:border-orange-500/20' : 'bg-slate-50 dark:bg-slate-800/30 border-transparent'}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.active ? 'text-orange-600' : 'text-slate-400'}`}>
                                        {item.meal}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <Clock size={10} /> {item.time}
                                    </span>
                                </div>
                                <p className={`text-sm font-bold ${item.active ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                    {item.menu}
                                </p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-500/10 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors">
                        View Weekly Schedule
                    </button>
                </div>
            </div>

            {/* Bottom Row: Recent Notifications */}
            <div className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800 dark:text-white">Quick Updates</h3>
                    <button className="text-xs font-bold text-slate-400 hover:text-orange-500 flex items-center gap-1">
                        View All <ChevronRight size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                        <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                            <AlertCircle size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">Gate Pass Reminder</p>
                            <p className="text-xs text-slate-500">Ensure your gate pass is updated for the upcoming weekend leave.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                        <div className="p-2 bg-orange-500/10 text-orange-600 rounded-lg">
                            <Bell size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-white">Mess Survey</p>
                            <p className="text-xs text-slate-500">Please provide feedback on the new breakfast menu by Friday.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;