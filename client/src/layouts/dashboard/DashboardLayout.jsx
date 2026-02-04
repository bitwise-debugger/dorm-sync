import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import ThemeButton from '../../components/common/ThemeButton';
import IconButton from '../../components/common/IconButton';
import { Bell } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import UserMenu from '../../components/common/UserMenu';

const DashboardLayout = ({ role = 'student', userName = 'User' }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        console.log("DashboardLayout Mounted!!");

        return () => {
            console.log("DashboardLayout UnMounted!!");
        }
    }, []);
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            {/* <div className="sidebar bg-red-100 w-70 h-screen"> */}
            <div className="">
                <Sidebar
                    role={role}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
            </div>
            {/* </div> */}
            <div className={`flex grow flex-col min-h-screen w-full transition-all duration-300 ease-in-out `}>
                {/* Topbar */}
                <header className="h-23 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 px-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white capitalize flex flex-col justify-start">
                        <span className='text-xl'>Dashboard</span>
                        <span className='text-sm text-gray-500'>23 December 2025</span>
                    </h2>

                    <div className="header-left flex items-center gap-5 ">
                        <ThemeButton />
                        <IconButton icon={Bell} badgeCount={3} />
                        <UserMenu />
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
                {/* Space for Mobile Dock if you use it */}
                <div className="h-24 sm:hidden" />
            </div>
        </div>
    );
};

export default DashboardLayout;
