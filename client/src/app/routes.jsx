import { createBrowserRouter, Navigate } from "react-router-dom";

import StudentDashboard from "../pages/student/Dashboard";
import ManagerDashboard from "../pages/manager/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

import NotFound from "../pages/utlility/NotFound";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import RequireAuth from "../auth/RequireAuth";
import Profile from "../pages/misc/Profile";
import Settings from "../pages/misc/Settings";
import HomeRoute from "../pages/utlility/HomeRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeRoute />
    },
    // Auth routes
    {
        path: "/auth",
        children: [
            { index: true, element: <Navigate to="/auth/login" replace /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "*", element: <NotFound /> },
        ],
    },

    // Student routes (protected)
    {
        path: "/student",
        element: <RequireAuth allowedRoles={["student"]} />,
        children: [
            {
                element: <DashboardLayout />, children: [
                    { index: true, element: <Navigate to="/student/dashboard" replace /> },
                    { path: "dashboard", element: <StudentDashboard /> },
                    { path: "*", element: <NotFound /> },
                ]
            },
        ],
    },

    // Manager routes (protected)
    {
        path: "/manager",
        element: <RequireAuth allowedRoles={["manager"]} />,
        children: [
            {
                element: <DashboardLayout />, children: [
                    { index: true, element: <Navigate to="/manager/dashboard" replace /> },
                    { path: "dashboard", element: <ManagerDashboard /> },
                    { path: "*", element: <NotFound /> },
                ]
            },
        ],
    },

    // Admin routes (protected)
    {
        path: "/admin",
        element: <RequireAuth allowedRoles={["admin"]} />,
        children: [
            {
                element: <DashboardLayout />, children: [
                    { index: true, element: <Navigate to="/admin/dashboard" replace /> },
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "*", element: <NotFound /> },
                ]
            },
        ],
    },

    // Misc pages (profile, settings) accessible by any logged-in user
    {
        path: "/misc",
        element: <RequireAuth />, // no allowedRoles = any authenticated user
        children: [
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> },
            { path: "*", element: <NotFound /> },
        ],
    },

    // Catch-all 404
    { path: "*", element: <NotFound /> },
]);

export default router;
