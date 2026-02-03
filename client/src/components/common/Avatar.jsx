import React from 'react';

const Avatar = ({ 
    src, 
    name = "User", 
    width = 56, // Default 56px (w-14)
    height = 56, // Default 56px (h-14)
    className = "", 
    ...props 
}) => {
    // Extract initials for the fallback (e.g., "Mohsin Ray" -> "MR")
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`
                relative flex items-center justify-center rounded-full 
                bg-white dark:bg-slate-900 overflow-hidden shrink-0
                
                /* Depth & Structure matching IconButton */
                border border-slate-50 dark:border-slate-800/50
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] 
                dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]

                /* Interaction */
                hover:shadow-xl hover:-translate-y-0.5
                transition-all duration-300 ease-out 
                cursor-pointer
                ${className}
            `}
            {...props}
        >
            {src ? (
                <img 
                    src={src} 
                    alt={name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            ) : (
                <div 
                    className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900"
                >
                    <span 
                        style={{ fontSize: `${Math.min(width, height) / 2.5}px` }}
                        className="font-bold text-orange-600 dark:text-orange-500 tracking-tight"
                    >
                        {initials}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Avatar;