import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();


export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({ id: 1, name: 'mohsin', role: 'admin' });

    useEffect(() => {
        console.log("AuthContextProvider Mounted!!");
    }, []);

    const value = { user };
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

