import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { showToast } from '../utlility/CustomToast';
import { useAuth } from '../../auth/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    if (user) navigate('/' + user.role + '/dashboard')
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '', // Backend expects 'email', but we'll map this
        password: '',
        rememberMe: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Note: Your backend expects 'email'. 
            // If your identifier is the email/ID, map it here.
            const response = await axios.post('http://localhost:5000/auth/login', {
                email: formData.identifier,
                password: formData.password
            });

            const { token, role, name } = response.data;

            // 1. Save auth data
            localStorage.setItem('dormsynctoken', token);
            localStorage.setItem('dormsyncuser', JSON.stringify(response.data));
            setUser(response.data);
            showToast('success', 'Login Successful', `Welcome to the portal, ${name}!`);

            // 2. Role-based Redirection
            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'manager') navigate('/manager/dashboard');
            else navigate('/student/dashboard');

        } catch (error) {
            const message = error.response?.data?.message || "Connection failed";
            showToast('error', 'Authentication Failed', message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white sm:bg-gray-50 dark:bg-slate-950 p-4 poppins text-slate-900 dark:text-slate-100">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-none sm:shadow-2xl shadow-slate-200/50 dark:shadow-none border-none sm:border border-slate-100 dark:border-slate-800 p-8 md:p-10">

                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-3 mb-4">
                        <img src="/logo/logo.svg" alt="DormSync" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                        Dorm<span className="text-orange-500">Sync</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 text-center">Synchronizing the hostel life</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Username or ID"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        placeholder="e.g. 23021519-058"
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
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            <span className="text-xs text-slate-500">Remember me</span>
                        </label>
                        <a href="#" className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                            Forgot Password?
                        </a>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;