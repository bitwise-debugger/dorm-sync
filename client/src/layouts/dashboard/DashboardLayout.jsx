import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import ThemeButton from '../../components/common/ThemeButton';
import IconButton from '../../components/common/IconButton';
import { Bell } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import UserMenu from '../../components/common/UserMenu';
import Topbar from './TopBar';

const DashboardLayout = ({ role = 'student', userName = 'User' }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        console.log("DashboardLayout Mounted!!");

        return () => {
            console.log("DashboardLayout UnMounted!!");
        }
    }, []);
    return (
        // <div className="flex overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
            {/* <div className="sidebar bg-red-100 w-70 h-screen"> */}
            <div className="">
                <Sidebar
                    role={role}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
            </div>
            {/* </div> */}
            {/* <div className={`flex grow flex-col min-h-screen w-full transition-all duration-300 ease-in-out `}> */}
            <div className={`flex grow flex-col overflow-y-auto w-full transition-all duration-300 ease-in-out `}>
            {/* Topbar */}
            <Topbar role={role} />
            {/* Dynamic Page Content */}
            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
            {/* Space for Mobile Dock if you use it */}
            <div className="h-24 sm:hidden" />
        </div>
        </div >
    );
};

export default DashboardLayout;
