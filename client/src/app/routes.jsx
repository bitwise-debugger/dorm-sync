import { createBrowserRouter } from 'react-router-dom';

import StudentDashboard from '../pages/student/Dashboard';
import ManagerDashboard from '../pages/manager/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

import NotFound from '../pages/utlility/NotFound';


const router = createBrowserRouter([
    {
        path: '/auth', children: [
            { index: true, element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
            { path: '*', element: <NotFound /> }
        ]
    },
    {
        path: '/student',
        children: [
            { path: 'dashboard', element: <StudentDashboard /> },
            { path: '*', element: <NotFound /> }
        ]
    },
    {
        path: '/manager',
        children: [
            { path: 'dashboard', element: <ManagerDashboard /> },
            { path: '*', element: <NotFound /> }
        ]
    },
    {
        path: '/admin',
        children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: '*', element: <NotFound /> }
        ]
    },
    { path: '*', element: <NotFound /> }
])


export default router;