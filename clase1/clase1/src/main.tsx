import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./clases/strings.ts"
import "./clases/array.ts"
import "./clases/objetos.ts"
import "./clases/funciones.ts"
import "./clases/arrays.ts"
import "./clases/import.ts"
import "./listado_bancos.tsx"
import "./hola_mundo.tsx"
import ListaBancos from './listado_bancos.tsx'
import HolaMuno from './hola_mundo.tsx'
import MiVariable from './variable.tsx'
import BancoComponente from './banco_componentes.tsx'
import HolaMundo from './hola_mundo_chat.tsx'
import VariableComponente from './varibale_chat.tsx'
import BancoComponentechat from './banco_compoonente_chat.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ListaBancos></ListaBancos>
    <HolaMuno></HolaMuno>
    <MiVariable></MiVariable>
    <BancoComponente></BancoComponente>
  </StrictMode>,
)
