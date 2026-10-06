import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Mount root React application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
