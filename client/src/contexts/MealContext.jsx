import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api';
import { showToast } from '../pages/utlility/CustomToast';
const MealContext = createContext();


export function MealContextProvider({ children }) {
    const [currentMeal, setCurrentMeal] = useState();
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        console.log('MealContextProvider Mounted!!');
        api.get('/meals').then((response) => {
            setMeals(response.data);
            console.log(response.data);
        }).catch((error) => {
            showToast('error', 'Meals Error', 'Error while fetching meals!');
        })

    }, []);

    const value = { currentMeal, meals };
    return (
        <MealContext.Provider value={value} >
            {children}
        </MealContext.Provider>)
}

export function useMeal() {
    return useContext(MealContext);
}