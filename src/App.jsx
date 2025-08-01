// src/App.jsx
import { useEffect, useRef, useState } from 'react'
import { initEditor } from './lib/editorSetup'
import { runPythonCode } from './lib/runPythonCode'

import PythonEditor from './components/PythonEditor'
import RunButton from './components/RunButton'
import PythonOutput from './components/PythonOutput'

/**
 * Main React App component for Pyodide Sandbox
 * Responsible for initializing editor and Pyodide,
 * and running Python code on button click.
 */
export default function App() {
  // Refs to access DOM nodes or external libraries across renders
  const replRef = useRef(null)     // Container for Monaco editor
  const outputRef = useRef(null)   // Output textarea element
  const editorRef = useRef(null)   // Monaco editor instance object
  const pyodideRef = useRef(null)  // Pyodide instance object

  // Loading state to disable run button until ready
  const [loading, setLoading] = useState(true)

  // Initialize editor and Pyodide once on component mount
  useEffect(() => {
    let disposed = false

    // Helper function to check if component was unmounted during async calls
    const disposedFlag = () => disposed

    // Initialize editor & pyodide - handles async loading and setup
    initEditor({
      editorRef,
      pyodideRef,
      replRef,
      setLoading,
      disposedFlag
    })

    // Cleanup function called on component unmount
    return () => {
      disposed = true
      // Dispose Monaco editor instance to free resources
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [])

  // Handler to run Python code when user clicks run button
  const handleRun = () => {
    runPythonCode({ editorRef, pyodideRef, outputRef })
  }

  return (
    <>
      {/* Code editor UI */}
      <PythonEditor replRef={replRef} />

      {/* Run button UI with loading state */}
      <RunButton onClick={handleRun} loading={loading} />

      {/* Output textarea UI */}
      <PythonOutput outputRef={outputRef} />
    </>
  )
}
