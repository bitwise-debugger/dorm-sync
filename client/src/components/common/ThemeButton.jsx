import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className={`
                relative flex items-center 
                w-24 h-14 rounded-full p-1.5
                bg-white dark:bg-slate-900 
                
                /* Depth & Structure to match IconButton */
                border border-slate-50 dark:border-slate-800/50
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] 
                dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]

                /* Interaction */
                hover:shadow-xl hover:-translate-y-0.5
                hover:border-slate-200 dark:hover:border-slate-700
                active:scale-95 active:translate-y-0
                
                transition-all duration-300 ease-out 
                group cursor-pointer outline-none
            `}
        >
            {/* Sliding Switcher Handle */}
            <div
                className={`
                    absolute w-11 h-11 rounded-full 
                    bg-slate-50 dark:bg-slate-800 
                    shadow-inner transition-transform duration-300 ease-in-out
                    ${isDark ? 'translate-x-10' : 'translate-x-0'}
                `}
            />

            {/* Icons */}
            <div className="flex justify-around w-full z-10">
                <Sun
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${isDark ? 'text-slate-500' : 'text-orange-500'
                        }`}
                />
                <Moon
                    size={20}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-500'
                        }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;