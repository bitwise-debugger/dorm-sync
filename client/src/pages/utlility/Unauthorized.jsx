import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home, Lock } from 'lucide-react';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 poppins overflow-x-hidden">
            
            {/* Branding Section */}
            <div className="flex items-center gap-3 mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-md border border-slate-100 dark:border-slate-800">
                    <img src="/favicon.svg" alt="DormSync" className="w-10 h-10 object-contain" />
                </div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">
                    DORM<span className="text-orange-500">SYNC</span>
                </h1>
            </div>

            {/* Error Card */}
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-300/50 dark:shadow-none p-8 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
                
                {/* Visual Security Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-500" />
                
                <div className="mx-auto w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldX size={44} className="text-orange-600" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-3">
                    Access Denied
                </h2>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                    You do not have the required permissions to view this section of the <span className="font-bold text-orange-500">DormSync</span> portal. 
                </p>

                {/* Restricted Message */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-start gap-4 text-left mb-8">
                    <Lock size={20} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Restricted Area</p>
                        <p className="text-[11px] text-slate-500 mt-1">If you believe this is an error, please contact the University of Gujrat Hostel IT Support.</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>
                    
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-600 text-white font-bold text-sm rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                    >
                        <Home size={18} /> Home
                    </button>
                </div>
            </div>

            {/* Footer Institutional Tag */}
            <div className="mt-10 flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                    University of Gujrat
                </span>
                <p className="text-[10px] text-slate-400 font-medium">Hostel Management Security System</p>
            </div>
        </div>
    );
};

export default Unauthorized;