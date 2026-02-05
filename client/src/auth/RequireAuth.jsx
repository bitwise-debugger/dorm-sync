import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Unauthorized from "../pages/utlility/Unauthorized";
import Loading from "./../pages/utlility/Loading";

export default function RequireAuth({ allowedRoles = [] }) {
    const { user, authLoading } = useAuth();
    // console.log(user);

    if (authLoading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Unauthorized />;
    }

    return <Outlet />;
}
