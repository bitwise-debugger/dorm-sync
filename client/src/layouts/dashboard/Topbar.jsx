import React, { useState, useRef, useEffect } from 'react';
import { Bell, MoreVertical, X, Settings, User, LogOut } from 'lucide-react';
import ThemeButton from '../../components/common/ThemeButton';
import IconButton from '../../components/common/IconButton';
import UserMenu from '../../components/common/UserMenu';
import NotificationDropdown from './NotificationDropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import moment from 'moment';

const Topbar = () => {
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    // Refs for detecting clicks outside
    const notifRef = useRef(null);
    const menuRef = useRef(null);

    // Single useEffect to handle both dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close notifications if clicking outside
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
            // Close mobile menu if clicking outside
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-20 poppins sm:h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-2 sm:px-6 flex items-center justify-between transition-all poppins">

            {/* Left: Branding (Visible below 'md' breakpoint) */}
            <div className="flex items-center gap-2 md:hidden animate-in fade-in duration-500">
                <img src="/favicon.svg" alt="DS" className="w-8 h-8 object-contain" />

                <div className="flex flex-col">
                    <h1 className="font-black text-lg tracking-tighter leading-none text-slate-800 dark:text-white uppercase">
                        DORM<span className="text-orange-500">SYNC</span>
                    </h1>
                    <span className="text-[10px] font-bold text-orange-500/80 uppercase tracking-[1.2px] mt-1 poppins">
                        Student Dashboard
                    </span>
                </div>
            </div>

            {/* Left: Dashboard Title (Visible above 'md') */}
            <div className="hidden md:flex flex-col justify-center">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
                    Student Dashboard
                </h2>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                    {moment(moment.now()).format('LLL')}
                </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Notification Bell with Outside Click Logic */}
                <div className="relative" ref={notifRef}>
                    <IconButton
                        icon={Bell}
                        badgeCount={2}
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                    />
                    <NotificationDropdown
                        isOpen={isNotifOpen}
                        onClose={() => setIsNotifOpen(false)}
                    />
                </div>

                {/* Desktop Actions: Hidden below 'md' */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeButton />
                    <UserMenu/>
                </div>

                {/* Mobile More Menu Toggle with Outside Click Logic */}
                <div className="relative lg:hidden" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                    >
                        {isMenuOpen ? <X size={24} /> : <MoreVertical size={24} />}
                    </button>

                    {/* Mobile "More" Dropdown Overlay */}
                    {isMenuOpen && (
                        <div className="absolute top-17 sm:top-19 right-0 w-[calc(100vw-2rem)] min-w-[280px] max-w-[470px] p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Preferences</span>
                                    <ThemeButton />
                                </div>

                                <div className="space-y-1">
                                    <Link to={'/misc/profile'} className="flex items-center gap-3 w-full p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                        <User size={20} />
                                        <span className="font-semibold text-sm">Profile</span>
                                    </Link>
                                    <Link to={'/misc/settings'} className="flex items-center gap-3 w-full p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                        <Settings size={20} />
                                        <span className="font-semibold text-sm">Settings</span>
                                    </Link>
                                    <button onClick={logout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                                        <LogOut size={20} />
                                        <span className="font-semibold text-sm">Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;