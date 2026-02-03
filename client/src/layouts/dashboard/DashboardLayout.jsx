import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import ThemeButton from '../../components/common/ThemeButton';
import IconButton from '../../components/common/IconButton';
import { Bell } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import UserMenu from '../../components/common/UserMenu';

const DashboardLayout = ({ children, role = 'student', userName = 'User' }) => {
    useEffect(() => {
        console.log("DashboardLayout Mounted!!");

        return () => {
            console.log("DashboardLayout UnMounted!!");
        }
    }, []);
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            {/* Sidebar - Hidden on mobile, you'd add a toggle later */}
            <div className="hidden lg:block fixed h-full inset-y-0 left-0">
                <Sidebar role={role} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 flex flex-col">
                {/* Topbar */}
                <header className="h-23 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 px-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white capitalize flex flex-col justify-start">
                        <span className='text-xl'>Dashboard</span>
                        <span className='text-sm text-gray-500'>23 December 2025</span>
                    </h2>

                    <div className="header-left flex items-center gap-5 ">
                        <ThemeButton />
                        < IconButton icon={Bell} badgeCount={3} />
                        <UserMenu />
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