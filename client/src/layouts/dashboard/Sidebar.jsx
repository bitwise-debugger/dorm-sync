import React from 'react';
import { LayoutDashboard, Utensils, ClipboardCheck, FileText, Settings, LogOut, Users } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
    // Define navigation based on roles
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
        <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-all duration-300 overflow-hidden">
            {/* Brand */}
            <div className="px-4 py-6 flex items-center gap-3">
                <img src="/logo/logo-long.svg" alt="DS" className="" />

                {/* <span className="text-xl font-bold dark:text-white">Dorm<span className="text-orange-500">Sync</span></span> */}
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
    ${isActive
                                ? ' dark:bg-orange-500/10 text-orange-600 dark:text-orange-500'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-500'
                            }
  `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    size={20}
                                    strokeWidth={isActive ? 2 : 2}
                                    className={isActive ? 'text-orange-600 dark:text-orange-500' : 'group-hover:text-orange-600 dark:group-hover:text-orange-500'}
                                />
                                <span className={`font-medium text-[15px] ${isActive ? 'text-orange-600 dark:text-orange-500' : ''}`}>
                                    {item.name}
                                </span>

                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-orange-500 rounded-xl transition-colors">
                    <Settings size={20} />
                    <span className="font-medium text-[15px]">Settings</span>
                </button>
                {/* <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium text-[15px]">Logout</span>
                </button> */}
            </div>
        </aside>
    );
};

export default Sidebar;