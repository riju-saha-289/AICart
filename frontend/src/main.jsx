import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'; //
import { ContextProvider } from './context/Context.jsx';


import { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter> 
     {/* <UserContext> */}
      <ContextProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </ContextProvider>
      {/* </UserContext> */}
    </BrowserRouter>

);