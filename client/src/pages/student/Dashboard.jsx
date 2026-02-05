import React from 'react';
import {
  Utensils, Clock, Calendar,
  PieChart, ArrowUpRight
} from 'lucide-react';
import { useEffect } from 'react';
import MealTimerCard from './components/MealTimerCard';

const Dashboard = () => {
  useEffect(() => {


  }, []);
  return (
    <div className="space-y-10 poppins animate-in fade-in duration-700 pb-20 overflow-x-hidden px-1 sm:px-0">

      {/* Top Row: Exactly Two Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Card 1: Mess Status */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center gap-6">
            <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 shrink-0">
              <Utensils size={32} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-1">Mess Status</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">Open</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full ring-1 ring-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-tighter uppercase">Serving Now</span>
          </div>
        </div>

        {/* Card 2: Next Meal Timing */}
        <MealTimerCard />
      </div>

      {/* Analytics & Menu Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Attendance Visualizer */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Monthly Attendance</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Visualization for February 2026</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400">
              <PieChart size={24} />
            </div>
          </div>

          <div className="h-72 w-full bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] flex items-end justify-around px-8 pb-6 relative overflow-hidden group">
            {/* Hardcoded visual peaks */}
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="w-3 h-[180px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mon</span>
            </div>
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="w-3 h-[120px] bg-orange-500/40 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tue</span>
            </div>
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="w-3 h-[210px] bg-orange-500 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wed</span>
            </div>
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="w-3 h-[90px] bg-orange-500/40 rounded-full" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thu</span>
            </div>
          </div>
        </div>

        {/* Today's Menu */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Today's Menu</h3>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
              <Utensils size={24} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 text-slate-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Breakfast</span>
                <span className="text-[11px] font-black">07:00 AM</span>
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">Omelette + Paratha</p>
            </div>

            <div className="p-6 rounded-3xl bg-orange-500 text-white shadow-2xl shadow-orange-500/30 scale-105">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-[2px] text-orange-100">Lunch</span>
                <span className="text-[11px] font-black">01:30 PM</span>
              </div>
              <p className="text-base font-bold text-white">Chicken Biryani</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 text-slate-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Dinner</span>
                <span className="text-[11px] font-black">08:00 PM</span>
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">Daal Mash + Roti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;