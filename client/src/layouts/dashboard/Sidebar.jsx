import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Utensils, ClipboardCheck, FileText, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('dormsyncsidebar');
        return savedState ? JSON.parse(savedState) : false;
    });

    useEffect(() => {
        localStorage.setItem('dormsyncsidebar', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    const menuConfig = {
        student: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
            { name: 'Mess Status', icon: Utensils, path: '/student/mess' },
            { name: 'Attendance', icon: ClipboardCheck, path: '/student/attendance' },
            { name: 'Bills', icon: FileText, path: '/student/bills' },
        ],
        manager: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/manager/dashboard' },
            { name: 'Mark Attendance', icon: ClipboardCheck, path: '/manager/attendance' },
            { name: 'Live Mess', icon: Utensils, path: '/manager/mess' },
        ],
        admin: [
            { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
            { name: 'Student Records', icon: Users, path: '/admin/students' },
            { name: 'Analytics', icon: FileText, path: '/admin/analytics' },
        ]
    };

    const navItems = menuConfig[role] || [];

    return (
        <>
            {/* DESKTOP SIDEBAR */}
            <aside className={`
                hidden md:flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 
                transition-all duration-300 ease-in-out sticky top-0 z-50 inset-y-0 left-0
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}>
                {/* Brand & Toggle Area */}
                <div className={`px-4 h-24 flex items-center transition-all duration-300 relative  ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed ? (
                        <div className='flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500'>
                            <div className="shrink-0">
                                <img src="/favicon.svg" alt="DormSync" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className='font-black text-xl tracking-tight leading-none text-slate-800 dark:text-white poppins'>
                                    DORM<span className='text-orange-500'>SYNC</span>
                                </h3>
                                <span className="text-[10px] font-bold text-slate-400 tracking-[1px] uppercase mt-1 poppins">
                                    UOG Hostels
                                </span>
                            </div>
                        </div>
                    ) : (
                        <img src="/favicon.svg" alt="DS" className="h-10 w-10 object-contain transition-all duration-300" />
                    )}

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`
                            flex items-center justify-center transition-all duration-300 rounded-xl cursor-pointer
                            text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10
                            ${isCollapsed
                                ? 'absolute -right-3 top-9 w-6 h-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md z-50 rounded-full'
                                : 'w-10 h-10 border border-transparent'}
                        `}
                    >
                        {isCollapsed ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={22} strokeWidth={2} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1">
                    <span className={`ms-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest poppins ${isCollapsed ? 'hidden' : 'block mb-2'}`}>
                        Menu
                    </span>
                    <div className='px-3 space-y-2 mt-3'>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative poppins
                                    ${isActive
                                        ? 'bg-orange-500/[0.03] text-orange-600 dark:text-orange-500'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && !isCollapsed && (
                                            <div className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full" />
                                        )}
                                        <item.icon size={22} className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-orange-600' : ''}`} />
                                        {!isCollapsed && <span className="font-semibold text-[15px] tracking-tight">{item.name}</span>}
                                        {isCollapsed && (
                                            <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl poppins">
                                                {item.name}
                                            </div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Bottom Settings */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-orange-500 transition-all rounded-xl poppins justify-center sm:justify-start">
                        <Settings size={22} />
                        {!isCollapsed && <span className="font-medium text-[15px]">Settings</span>}
                    </NavLink>
                </div>
            </aside>

            {/* MOBILE BOTTOM DOCK - Fixed visibility issue */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-3 z-[100] flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `
                            flex flex-col items-center gap-1 transition-all duration-200 poppins
                            ${isActive ? 'text-orange-600 dark:text-orange-500' : 'text-slate-400 dark:text-slate-500'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-orange-500/[0.03]' : ''}`}>
                                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter">
                                    {item.name.split(' ')[0]}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default Sidebar;