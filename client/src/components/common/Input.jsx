import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, className = "", ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className={`space-y-1.5 w-full ${className}`}>
            {label && (
                <label className="text-[13px] font-medium ml-0.5 text-slate-600 dark:text-slate-400">
                    {label}
                </label>
            )}
            <div className="relative group">
                <input
                    {...props}
                    type={isPassword ? (showPassword ? "text" : "password") : type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-0 outline-none transition-all duration-200 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors p-1"
                    >
                        {showPassword ? (
                            <EyeOff size={18} strokeWidth={2} />
                        ) : (
                            <Eye size={18} strokeWidth={2} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;