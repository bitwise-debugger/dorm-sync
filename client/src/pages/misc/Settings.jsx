import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, Lock, Bell, Shield, 
    Moon, Smartphone, ChevronRight, ArrowLeft 
} from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();

    const settingsGroups = [
        {
            title: "Account Preferences",
            items: [
                { 
                    id: 'profile', 
                    name: "Profile Information", 
                    desc: "Name, phone number, and residency details", 
                    icon: User, 
                    color: "text-blue-500", 
                    bg: "bg-blue-50 dark:bg-blue-500/10",
                    path: "/student/profile" 
                },
                { 
                    id: 'password', 
                    name: "Password & Security", 
                    desc: "Update your password and secure your account", 
                    icon: Lock, 
                    color: "text-orange-500", 
                    bg: "bg-orange-50 dark:bg-orange-500/10",
                    path: "/student/profile" // You can pass state to open the Password tab directly
                },
            ]
        },
        {
            title: "System Settings",
            items: [
                { 
                    id: 'notifications', 
                    name: "Notifications", 
                    desc: "Manage mess alerts and attendance reminders", 
                    icon: Bell, 
                    color: "text-purple-500", 
                    bg: "bg-purple-50 dark:bg-purple-500/10" 
                },
                { 
                    id: 'appearance', 
                    name: "Appearance", 
                    desc: "Customize your theme and display language", 
                    icon: Moon, 
                    color: "text-slate-500", 
                    bg: "bg-slate-100 dark:bg-slate-800" 
                }
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto pt-6 sm:pt-10 px-4 sm:px-6 lg:px-10 pb-20 poppins animate-in fade-in duration-500">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 hover:text-orange-500 transition-colors cursor-pointer"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Settings</h1>
                    <p className="text-sm text-slate-500">Manage your DormSync account and application preferences.</p>
                </div>
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
                {settingsGroups.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[2px] px-2">
                            {group.title}
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-3">
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => item.path && navigate(item.path)}
                                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md transition-all cursor-pointer group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                                            <item.icon size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white text-[15px]">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Support Info */}
            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-slate-400 border border-slate-100 dark:border-slate-700">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-white">DormSync for Mobile</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Access your hostel dashboard, mark attendance, and get live mess updates on the go. Available for University of Gujrat students.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;