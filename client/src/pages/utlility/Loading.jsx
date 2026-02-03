import React from 'react';

const Loading = ({ message = "Synchronizing..." }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-all duration-300">

            {/* Animation Container */}
            <div className="relative flex items-center justify-center">

                {/* Outer Ring - High contrast in Dark Mode */}
                <div className="w-20 h-20 rounded-full border-[3px] border-slate-200/30 dark:border-slate-700/50 border-t-orange-500 animate-spin" />

                {/* Inner Ring - Emerald Accent */}
                <div className="absolute w-12 h-12 rounded-full border-[3px] border-slate-200/30 dark:border-slate-700/50 border-b-emerald-500 animate-[spin_1.5s_linear_infinite_reverse]" />

                {/* Center Logo/Icon Placeholder with Glow */}
                <div className="absolute flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(249,163,114,0.8)]" />
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                    Dorm<span className="text-orange-500">Sync</span>
                </h1>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 tracking-widest uppercase animate-pulse">
                    {message}
                </p>
            </div>

            {/* Decorative Background Blobs - Increased opacity for Dark Mode visibility */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/20 dark:bg-orange-500/10 blur-[100px] -z-10 rounded-full" />
        </div>
    );
};

export default Loading;