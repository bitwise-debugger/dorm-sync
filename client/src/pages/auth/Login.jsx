import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Login = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        identifier: '', // This will be the Username or ID
        password: '',
        rememberMe: false
    });

    // Unified change handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // The data is ready for your role-based logic here
        console.log("Form Data Submitted:", formData);
        
        // TODO: Implement your custom Auth logic to distinguish 
        // between Admin, Manager, and Student based on formData.identifier
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white sm:bg-gray-50 dark:bg-slate-950 p-4 font-sans text-slate-900 dark:text-slate-100">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-none sm:shadow-2xl shadow-slate-200/50 dark:shadow-none border-none sm:border border-slate-100 dark:border-slate-800 p-8 md:p-10 transition-all duration-300 hover:shadow-orange-100/20">

                {/* Branding Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-30 h-30 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-3 border-slate-50 dark:border-slate-700">
                        <img
                            src="/logo/logo.svg"
                            alt="DormSync Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                        Dorm<span className="text-orange-500">Sync</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm text-center">
                        Synchronizing the hostel life
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input 
                        label="Username or ID" 
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="e.g. 21014119-000" 
                        required
                    />
                    
                    <Input 
                        label="Password" 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••" 
                        required
                    />

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500" 
                            />
                            <span className="text-xs text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                                Remember me
                            </span>
                        </label>
                        <a href="#" className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                            Forgot Password?
                        </a>
                    </div>
                    
                    <Button type="submit">Sign In</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;