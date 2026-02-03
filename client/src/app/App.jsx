import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { useAuth } from '../auth/AuthContext';
import ComponentText from './ComponentText';


function App() {
  return (
    <RouterProvider router={router} />
    // <ComponentText />
  )
}

export default App
