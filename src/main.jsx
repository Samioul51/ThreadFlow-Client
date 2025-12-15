import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Providers/AuthProvider/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import AnimatedCursor from './Components/AnimatedCursor/AnimatedCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AnimatedCursor />
      <RouterProvider router={router}>

      </RouterProvider>
    </AuthProvider>
    <Toaster />
    
  </StrictMode>,
)
