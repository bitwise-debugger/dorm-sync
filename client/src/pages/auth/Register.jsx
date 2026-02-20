import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Building2, UserCheck, MessageCircle } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 poppins overflow-x-hidden">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
                    <img src="/favicon.svg" alt="DormSync" className="w-10 h-10 object-contain" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                    DORM<span className="text-orange-500">SYNC</span>
                </h1>
            </div>

            {/* Information Card */}
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 text-center animate-in zoom-in-95 duration-500">
                
                <div className="mx-auto w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert size={40} className="text-orange-600" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
                    Managed Access Only
                </h2>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                    To maintain hostel security and verified residency, users cannot register themselves on <span className="font-bold text-orange-500">DormSync</span>. 
                </p>

                {/* Steps to get access */}
                <div className="space-y-4 mb-8 text-left">
                    <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <Building2 size={20} className="text-slate-400 shrink-0 mt-1" />
                        <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Visit Admin Office</p>
                            <p className="text-[11px] text-slate-500">Contact the UOG Hostel Administration office for account creation.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <UserCheck size={20} className="text-slate-400 shrink-0 mt-1" />
                        <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Provide Verification</p>
                            <p className="text-[11px] text-slate-500">Bring your official University ID and Hostel Allotment letter.</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button 
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Return to Login
                    </button>
                    
                    <button className="w-full py-4 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <MessageCircle size={18} /> Contact Support
                    </button>
                </div>
            </div>

            {/* Footer Note */}
            <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest text-center max-w-xs leading-loose">
                Authorized by University of Gujrat <br /> Hostel Management System
            </p>
        </div>
    );
};

export default Register;