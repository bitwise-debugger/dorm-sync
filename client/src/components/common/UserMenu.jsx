import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown, Settings } from 'lucide-react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const UserMenu = ({ userName = "Mithun Ray", userRole = "Student" }) => {
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* The Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex  items-center gap-3 p-0.5 pr-4 rounded-full
                    bg-white dark:bg-slate-900
                    border border-slate-50 dark:border-slate-800/50
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] 
                    dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]
                    hover:shadow-xl 
                
                    transition-all duration-300 ease-out 
                    group cursor-pointer outline-none

                `}
            >
                <Avatar name={userName} width={54} height={54} className="shadow-none border-none hover:translate-y-0" />

                <div className="hidden sm:block text-left mr-10">
                    <p className="text-md font-semibold text-slate-800 dark:text-white leading-tight">
                        {userName}
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-400 capitalize tracking-wider font-normal">
                        {userRole}
                    </p>
                </div>

                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 py-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800 mb-1 sm:hidden">
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{userName}</p>
                        <p className="text-xs text-slate-500 uppercase">{userRole}</p>
                    </div>

                    <Link to={'/misc/profile'} className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500 transition-colors">
                        <User size={18} strokeWidth={1.5} />
                        <span className="text-sm font-medium">Profile</span>
                    </Link>

                    <Link to={'/misc/settings'} className="flex items-center gap-3 w-full px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500 transition-colors">
                        <Settings size={18} strokeWidth={1.5} />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

                    <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <LogOut size={18} strokeWidth={1.5} />
                        <span className="text-sm font-bold">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;