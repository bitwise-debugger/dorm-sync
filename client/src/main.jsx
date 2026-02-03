import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'
import { AuthContextProvider } from './auth/AuthContext.jsx'
import { ThemeContextProvider } from './theme/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider >
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>

  </StrictMode>,
)
