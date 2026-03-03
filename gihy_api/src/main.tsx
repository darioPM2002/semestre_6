import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ExpertApp } from './ExpertApp'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExpertApp />
  </StrictMode>,
)
