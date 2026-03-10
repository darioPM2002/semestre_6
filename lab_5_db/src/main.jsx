import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Usuarios } from './usuarios.jsx'
import { UsuariosManual } from './login_manual.jsx'
import { UsuariosIA } from './login_IA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UsuariosIA />
   <UsuariosManual />
   <Usuarios />
  </StrictMode>,
)
