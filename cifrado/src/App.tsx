import { useState, type JSX } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CipherForm from "./components/CipherForm";

function App(): JSX.Element {
  return (
    <div>
      <CipherForm />
    </div>
  );
}

export default App;