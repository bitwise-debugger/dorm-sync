import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const localUser = localStorage.getItem('dormsyncuser');
        if (localUser) return JSON.parse(localUser);
        else return null;
    });

    useEffect(() => {
        console.log("AuthContextProvider Mounted!!");
    }, []);
    useEffect(() => {
        console.log("User State Changed ", user);
        setAuthLoading(false);
    }, [user]);


    function logout() {
        setAuthLoading(true);
        setTimeout(() => {
            localStorage.removeItem('dormsyncuser');
            localStorage.removeItem('dormsynctoken');
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

