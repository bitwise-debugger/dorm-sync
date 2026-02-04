import React from 'react'
import { useAuth } from './AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../pages/utlility/Loading';

export default function RequireAuth() {
    const { user, authLoading } = useAuth();
    const navigate = useNavigate();
    if (authLoading) {
        return <Loading />;
    }

    if (!user) {
        console.log("AuthUser = Null -> Redirect to Login!");
        navigate('/auth/login');
    }
    else {
        return <Outlet />;
    }


}
