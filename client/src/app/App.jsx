import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { useAuth } from '../auth/AuthContext';


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
