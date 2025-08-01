// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/**
 * Dynamically load the Pyodide script from CDN.
 * Once loaded, initialize and render the React application.
 *
 * This ensures Pyodide runtime is ready before App mounts,
 * preventing any runtime errors related to Pyodide availability.
 */
const pyodideScript = document.createElement('script')
pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.28.0/full/pyodide.js'

/**
 * On Pyodide script load completion,
 * create React root and render the App component inside StrictMode.
 */
pyodideScript.onload = () => {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

// Append the Pyodide script to document body to start loading.
document.body.appendChild(pyodideScript)
