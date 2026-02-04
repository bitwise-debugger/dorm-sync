import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState({ id: 1, name: 'developer', role: 'admin' });
    // const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("AuthContextProvider Mounted!!");

        setTimeout(() => {
            setAuthLoading(false);
        }, 1000);
    }, []);

    const value = { user, authLoading };
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

