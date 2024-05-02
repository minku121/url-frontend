
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from './provider/AuthProvider.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(

 <AuthProvider>
   <Toaster/>
    <App />
  
 </AuthProvider>

 

)
