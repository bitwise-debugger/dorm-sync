import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import Avatar from '../../components/common/Avatar';

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');
    const [showPassword, setShowPassword] = useState(false);

    // Profile Data (In a real app, these would be managed via State/API)
    const personalInfo = {
        name: "Mohsin Raza",
        email: "23021519-058",
        phone: "+92 334 2100786",
    };

    const academicInfo = {
        officialEmail: "23021519-058@uog.edu.pk",
        role: "Student (University of Gujrat)"
    };

    return (
        <div className="max-w-6xl mx-auto pt-6 px-4 sm:px-6 lg:px-10 pb-20 poppins animate-in fade-in duration-500 overflow-x-hidden">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-orange-500 transition-colors cursor-pointer"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
            </div>

            {/* Functional Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-8">
                {['Profile', 'Password'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-bold transition-all cursor-pointer relative
                            ${activeTab === tab 
                                ? 'text-orange-600' 
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT: PROFILE */}
            {activeTab === 'Profile' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Public Profile</h2>
                        <p className="text-sm text-slate-500">Manage your identity within the DormSync portal.</p>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                        <Avatar name={personalInfo.name} width={100} height={100} className="rounded-2xl border-2 border-slate-100 dark:border-slate-800" />
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Profile Picture</h3>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-all cursor-pointer shadow-sm flex items-center gap-2">
                                    <Upload size={14} /> Update Photo
                                </button>
                                <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                                <input type="text" defaultValue={personalInfo.name} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                                <input type="text" defaultValue={personalInfo.phone} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm font-medium" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 flex items-center gap-2">Official ID <ShieldCheck size={14} /></label>
                                <div className="px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-slate-500 text-sm font-bold select-none">{personalInfo.email}</div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 flex items-center gap-2">Official Email <ShieldCheck size={14} /></label>
                                <div className="px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-slate-500 text-sm font-bold select-none">{academicInfo.officialEmail}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: PASSWORD */}
            {activeTab === 'Password' && (
                <div className="max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Security</h2>
                        <p className="text-sm text-slate-500">Change your password to keep your account secure.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-orange-500 text-sm" />
                        </div>
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">New Password</label>
                            <input type={showPassword ? "text" : "password"} placeholder="Enter new password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:border-orange-500 text-sm" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 rounded-xl">
                            <p className="text-xs text-orange-700 dark:text-orange-400 leading-relaxed">
                                <span className="font-bold">Password requirement:</span> Ensure it's at least 8 characters including a number and a special character.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Shared Action Footer */}
            <div className="flex items-center gap-4 pt-8 border-t border-slate-100 dark:border-slate-800 mt-10">
                <button className="px-8 py-3 bg-orange-600 text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition-all cursor-pointer shadow-lg shadow-orange-500/20">
                    Save Changes
                </button>
                <button className="px-8 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Profile;