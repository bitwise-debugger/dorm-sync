import { createContext, useContext, useEffect, useState } from 'react'
const AttendanceContext = createContext();


export function AttendanceContextProvider({ children }) {
    


    useEffect(() => {
        console.log('AttendanceContextProvider Mounted!!');
    }, []);

    const value = { key: 'value' };
    return (
        <AttendanceContext.Provider value={value} >
            {children}
        </AttendanceContext.Provider>)
}

export function useAttendance() {
    return useContext(AttendanceContext);
}