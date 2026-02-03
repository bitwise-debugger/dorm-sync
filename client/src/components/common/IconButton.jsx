import React from 'react';

const IconButton = ({
    icon: Icon,
    onClick,
    badgeCount = 0,
    className = "",
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={`
                relative flex items-center justify-center 
                w-14 h-14 rounded-full 
                bg-white dark:bg-slate-900
                
                /* Depth & Structure */
                border border-slate-50 dark:border-slate-800/50
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] 
                dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]

                /* Interaction: Elevation & Feedback */
                hover:shadow-xl hover:-translate-y-0.5
                hover:border-slate-200 dark:hover:border-slate-700
                active:scale-90 active:translate-y-0
                
                transition-all duration-300 ease-out 
                group cursor-pointer outline-none
                ${className}
            `}
            {...props}
        >
            {/* The Icon */}
            {Icon && (
                <Icon
                    size={24}
                    className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300"
                    strokeWidth={1.5}
                />
            )}

            {/* Notification Badge - Refined Dot */}
            {badgeCount > 0 && (
                <span className="absolute top-3 right-4 flex h-3 w-3 items-center justify-center">
                    {/* Pulsing effect for the badge dot */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white dark:border-slate-900"></span>
                </span>
            )}
        </button>
    );
};

export default IconButton;