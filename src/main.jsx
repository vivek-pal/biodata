import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/tailwind.css";
import "./styles/index.css";
import App from './App.jsx'
import { Toaster as Sonner } from "./components/ui/sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Sonner />
    <App />
  </StrictMode>,
)
