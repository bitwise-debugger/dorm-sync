import React, { useState } from 'react';
import { Bell, MoreVertical, X, Settings, User, LogOut } from 'lucide-react';
import ThemeButton from '../../components/common/ThemeButton';
import IconButton from '../../components/common/IconButton';
import UserMenu from '../../components/common/UserMenu';

const Topbar = ({ userName = "Mithun Ray" }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="h-20 poppins sm:h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between transition-all poppins">

            {/* Left: Branding (Visible below 'md' breakpoint) */}
            <div className="flex items-center gap-2 md:hidden animate-in fade-in duration-500">
                <img src="/favicon.svg" alt="DS" className="w-8 h-8 object-contain" />

                <div className="flex flex-col">
                    <h1 className="font-black text-lg tracking-tighter leading-none text-slate-800 dark:text-white uppercase">
                        DORM<span className="text-orange-500">SYNC</span>
                    </h1>
                    {/* Dynamic Page Title for Mobile Navigation Context */}
                    <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-[1.2px] mt-1 poppins">
                        Student Dashboard
                    </span>
                </div>
            </div>

            {/* Left: Dashboard Title (Visible above 'md') */}
            <div className="hidden md:flex flex-col justify-center">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                    Dashboard
                </h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    Wednesday, 04 February 2026
                </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notification Bell: Always Visible */}
                <IconButton icon={Bell} badgeCount={3} />

                {/* Desktop Actions: Hidden below 'md' */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeButton />
                    <UserMenu userName={userName} />
                </div>

                {/* Mobile More Menu Toggle: Visible below 'md' */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                >
                    {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
                </button>
            </div>

            {/* Mobile "More" Dropdown Overlay */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 mx-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 md:hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Preferences</span>
                            <ThemeButton />
                        </div>

                        <div className="space-y-1">
                            <button className="flex items-center gap-3 w-full p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <User size={20} />
                                <span className="font-semibold text-sm">Profile</span>
                            </button>
                            <button className="flex items-center gap-3 w-full p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                <Settings size={20} />
                                <span className="font-semibold text-sm">Account Settings</span>
                            </button>
                            <button className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                                <LogOut size={20} />
                                <span className="font-semibold text-sm">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Topbar;