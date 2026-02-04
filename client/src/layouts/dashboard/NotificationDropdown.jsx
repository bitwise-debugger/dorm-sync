import React from 'react';
import { Bell, Check, Clock, Trash2 } from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
    // Mock data for your hostel context
    const notifications = [
        { id: 1, title: 'Mess Update', message: 'Lunch menu updated: Chicken Biryani today!', time: '2 mins ago', unread: true },
        { id: 2, title: 'Attendance Alert', message: 'You were marked present for Dinner yesterday.', time: '5 hours ago', unread: true },
        { id: 3, title: 'Fee Reminder', message: 'Hostel mess bill for January is now available.', time: '1 day ago', unread: false },
    ];

    if (!isOpen) return null;

    return (
        <div className="absolute right-[-55px]  mt-5 md:mt-7 w-75 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 poppins">
            
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                    <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">2 NEW</span>
                </div>
                <button className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer">
                    Mark all as read
                </button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map((notif) => (
                        <div 
                            key={notif.id} 
                            className={`px-5 py-4 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group relative`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm font-bold ${notif.unread ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                    {notif.title}
                                </h4>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                                    <Clock size={10} /> {notif.time}
                                </span>
                            </div>
                            <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
                                {notif.message}
                            </p>
                            
                            {/* Blue dot for unread */}
                            {notif.unread && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="py-10 flex flex-col items-center justify-center text-slate-400">
                        <Bell size={40} strokeWidth={1} className="mb-2 opacity-20" />
                        <p className="text-sm font-medium">No new notifications</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-800/30">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">
                    View all notifications
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;