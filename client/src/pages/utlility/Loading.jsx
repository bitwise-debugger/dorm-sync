import React from 'react';

const Loading = ({ message = "Synchronizing..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-300">
      
      {/* Animation Container */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring - Rotating */}
        <div className="w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-orange-500 animate-spin" />
        
        {/* Inner Ring - Counter Rotating */}
        <div className="absolute w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800 border-b-emerald-500 animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Center Logo/Icon Placeholder */}
        <div className="absolute">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
          Dorm<span className="text-orange-500">Sync</span>
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 animate-pulse">
          {message}
        </p>
      </div>

      {/* Decorative Background Blobs - matching your theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/5 blur-[80px] -z-10 rounded-full" />
    </div>
  );
};

export default Loading;