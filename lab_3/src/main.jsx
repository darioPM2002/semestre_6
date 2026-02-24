import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SimpleForm } from './components/SimpleForm.jsx'
import { SimpleForm1 } from './components/SimpleForm_p.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SimpleForm1></SimpleForm1>
  </StrictMode>,
)
