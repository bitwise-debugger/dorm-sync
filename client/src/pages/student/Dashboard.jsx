import React from 'react';
import {
  Utensils, Calendar, Clock, TrendingUp,
  ChevronRight, Bell, CheckCircle2, AlertCircle,
  Wallet, PieChart
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

const Dashboard = () => {
  const {user} = useAuth();
  // Data grounded in your student profile and hostel context
  const stats = [
    { label: 'Mess Status', value: 'Closed', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50', isLive: true },
    { label: 'Monthly Attendance', value: '24 / 30', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50'},
    { label: 'Current Bill', value: 'PKR 4,200', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  const todayMenu = [
    { meal: 'Breakfast', menu: 'Omelette + Paratha + Tea', time: '07:00 AM' },
    { meal: 'Lunch', menu: 'Chicken Biryani + Raita', time: '01:30 PM', active: true },
    { meal: 'Dinner', menu: 'Daal Mash + Roti', time: '08:00 PM' },
  ];

  return (
    <div className="space-y-10 poppins animate-in fade-in duration-700 pb-12">

      {/* High-Elevation Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none flex items-center justify-between transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} dark:bg-slate-800`}>
                <stat.icon size={28} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-none">{stat.value}</h3>
              </div>
            </div>
            {stat.isLive && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full ring-1 ring-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-tighter">LIVE</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Attendance Visualizer (Academix Style) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Attendance Analytics</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Daily presence overview for February 2026</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400">
              <PieChart size={24} />
            </div>
          </div>

          <div className="h-72 w-full bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] flex items-end justify-around px-8 pb-6 relative overflow-hidden group">
            {/* Visualizing smooth peaks like your reference */}
            {[45, 85, 55, 95, 70, 90, 60].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-4 z-10">
                <div style={{ height: `${h}%` }} className="w-2 sm:w-3 bg-orange-500/20 rounded-full relative overflow-hidden group/bar cursor-pointer">
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-full h-full scale-y-0 group-hover/bar:scale-y-100 transition-transform duration-500 origin-bottom" />
                  <div className="absolute bottom-0 w-full bg-orange-500/40 rounded-full h-1/2 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-slate-400">DAY {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Menu Card */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Today's Meal</h3>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
              <Utensils size={24} />
            </div>
          </div>

          <div className="space-y-6">
            {todayMenu.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl transition-all duration-300 ${item.active
                  ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/30 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-[2px] ${item.active ? 'text-orange-100' : 'text-slate-400'}`}>
                    {item.meal}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} strokeWidth={3} />
                    <span className="text-[11px] font-black">{item.time}</span>
                  </div>
                </div>
                <p className={`text-base font-bold ${item.active ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {item.menu}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 
      // Quick Updates Footer Section
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-slate-800 dark:text-white">Important Notices</h3>
          <button className="text-xs font-black text-orange-600 bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">
            HISTORY
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl">
            <div className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl">
              <AlertCircle size={24} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Gate Pass Required</p>
                <p className="text-xs text-slate-500 font-medium">Updated security protocols for weekend leave.</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl">
            <div className="p-3 bg-orange-500/10 text-orange-600 rounded-2xl">
              <Bell size={24} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">Mess Survey 2026</p>
                <p className="text-xs text-slate-500 font-medium">Share your feedback on the new UOG menu.</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;