import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = ({ children, role = 'student', userName = 'User' }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar - Hidden on mobile, you'd add a toggle later */}
      <div className="hidden lg:block fixed h-full inset-y-0 left-0">
        <Sidebar role={role} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 px-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white capitalize">
            {role} Panel
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{userName}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center border border-orange-200 dark:border-orange-500/30 overflow-hidden">
                <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                  {userName.substring(0, 2).toUpperCase()}
                </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;