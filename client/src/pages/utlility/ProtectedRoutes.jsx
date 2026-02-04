import React from 'react'
import { useAuth } from '../../auth/AuthContext';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';

export default function ProtectedRoutes({ children }) {
    const { user } = useAuth();
    const { pathname } = useLocation();
    if (pathname.startsWith('/student') && user.role == 'student') {
        return children
    } else if (pathname.startsWith('/manager') && user.role == 'manager') {
        return children
    } else if (pathname.startsWith('/admin') && user.role == 'admin') {
        return children
    } else return <NotFound />
}
