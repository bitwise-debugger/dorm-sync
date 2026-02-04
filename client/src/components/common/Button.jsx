import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", ...props }) => {
  const variants = {
    // Solid, vibrant gradient for main actions
    primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-400/20",
    
    // Smooth emerald for success/manager actions
    secondary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 border border-emerald-400/20",
    
    // Clean, thin border for secondary choices
    outline: "bg-transparent border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
    
    // Ghost variant for "Cancel" or "Forgot Password"
    ghost: "bg-transparent text-slate-500 hover:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-500/10"
  };

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`
        w-full py-3 px-6 rounded-xl font-semibold 
        text-[15px] tracking-tight
        transition-all duration-200 
        active:scale-[0.97] disabled:opacity-50 
        flex items-center justify-center gap-2
        cursor-pointer
        ${variants[variant]} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;