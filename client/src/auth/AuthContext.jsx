import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { showToast } from "../pages/utlility/CustomToast";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        console.log("AuthContextProvider Mounted!!");
        const localUser = localStorage.getItem('dormsynctoken');
        if (localUser) {
            console.log("There's something");
            api.get('/auth/me').then((res) => {
                setUser(res.data);
            }).catch((err) => {
                console.log(err.message);
                showToast('error', "Login Session Ended", "Please login again!");
                localStorage.removeItem('dormsyncuser');
                setUser(null);
            }).finally(() => {
                setAuthLoading(false);
            })
        } else {
            console.log("Nothing!");
        }
    }, []);
    useEffect(() => {
        console.log("User State Changed ", user);
    }, [user]);


    function logout() {
        setAuthLoading(true);
        setTimeout(() => {
            localStorage.removeItem('dormsyncuser');
            setUser(null);
        }, 500);
    }
    const value = { user, authLoading, setUser, setAuthLoading, logout };
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

