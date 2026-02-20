import React from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import toast from 'react-hot-toast';
const CustomToast = ({ t, type, title, message }) => {
    const icons = {
        success: {
            icon: CheckCircle2,
            color: 'text-green-500',
            accent: 'bg-green-500'
        },
        error: {
            icon: AlertCircle,
            color: 'text-orange-500',
            accent: 'bg-orange-500'
        },
        info: {
            icon: Info,
            color: 'text-blue-500',
            accent: 'bg-blue-500'
        },
    };

    const { icon: Icon, color, accent } = icons[type] || icons.success;

    return (
        <div
            className={`${t.visible ? 'animate-in fade-in slide-in-from-top-4' : 'animate-out fade-out slide-out-to-top-2'
                } max-w-sm w-full bg-white dark:bg-slate-900 shadow-2xl shadow-slate-300/50 dark:shadow-none rounded-xl pointer-events-auto flex overflow-hidden poppins relative`}
        >
            {/* Subtle Left Accent Strip */}
            <div className={`w-1.5 ${accent} shrink-0`} />

            <div className="flex-1 p-4 flex items-start gap-3">
                <div className={`${color} mt-0.5`}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">
                        {title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight">
                        {message}
                    </p>
                </div>

                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                    <X size={16} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

export const showToast = (type, title, message) => {
    toast.custom((t) => (
        <CustomToast t={t} type={type} title={title} message={message} />
    ), {
        duration: 4000,
        position: 'top-center',
    });
};