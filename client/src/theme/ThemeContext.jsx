import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext();


export function ThemeContextProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('dormsynctheme');
        const root = window.document.documentElement;

        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    useEffect(() => {
        console.log('ThemeContextProvider Mounted!!');
    }, []);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.remove('dark');
            localStorage.setItem('dormsynctheme', 'light');
            setIsDark(false);
        } else {
            root.classList.add('dark');
            localStorage.setItem('dormsynctheme', 'dark');
            setIsDark(true);
        }
    };

    const value = { isDark, toggleTheme };
    return (
        <ThemeContext.Provider value={value} >
            {children}
        </ThemeContext.Provider>)
}

export function useTheme() {
    return useContext(ThemeContext);
}