import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { Navigate } from 'react-router-dom';

export default function HomeRoute() {
    const { user } = useAuth();
    if (user) return <Navigate to={'/' + user.role + '/dashboard'} />
    else return <Navigate to={'/auth/login'} />

}
