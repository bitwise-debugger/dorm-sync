import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'
import { AuthContextProvider } from './auth/AuthContext.jsx'
import { ThemeContextProvider } from './theme/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast'
import { MealContextProvider } from './contexts/MealContext.jsx'
import { AttendanceContextProvider } from './contexts/AttendanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider >
        <MealContextProvider>
          <AttendanceContextProvider>


            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                // Professional styling to match DormSync
                duration: 3000,
                style: {
                  background: '#1e293b', // slate-800
                  color: '#fff',
                  borderRadius: '12px',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px'
                },
                success: {
                  iconTheme: {
                    primary: '#f97316', // orange-500
                    secondary: '#fff',
                  },
                },
              }}
            />
            <App />
          </AttendanceContextProvider>
        </MealContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>

  </StrictMode>,
)
