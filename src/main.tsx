// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const pyodideScript = document.createElement('script')
pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js'
pyodideScript.onload = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
document.body.appendChild(pyodideScript)