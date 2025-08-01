// src/App.tsx

import { useEffect, useRef, useState } from 'react'
import { initEditor } from './lib/editorSetup'
import { runPythonCode } from './lib/runPythonCode'

// UI components
import PythonEditor from './components/PythonEditor'
import RunButton from './components/RunButton'
import PythonOutput from './components/PythonOutput'

// Monaco type declarations
import type { editor } from 'monaco-types'

/**
 * App Component
 *
 * Entry point of the application. Responsible for:
 * - Initializing the Monaco editor and Pyodide environment
 * - Providing a Python editing and execution interface
 */
export default function App() {
  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * Refs
   * ────────────────────────────────────────────────────────────────────────────────
   */

  // Ref to the <div> that will host the Monaco editor
  const replRef = useRef<HTMLDivElement | null>(null)

  // Ref to the <textarea> where Python output will be written
  const outputRef = useRef<HTMLTextAreaElement | null>(null)

  // Ref to hold the Monaco editor instance
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  // Ref to hold the Pyodide runtime instance
  const pyodideRef = useRef<any>(null)

  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * State
   * ────────────────────────────────────────────────────────────────────────────────
   */

  // Track editor loading state (used to disable UI interactions during setup)
  const [loading, setLoading] = useState(true)

  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * Effects
   * ────────────────────────────────────────────────────────────────────────────────
   */

  useEffect(() => {
    let disposed = false // Flag for component unmount cleanup
    const disposedFlag = () => disposed

    // Initialize Monaco editor and Pyodide
    initEditor({
      editorRef,
      pyodideRef,
      replRef,
      setLoading,
      disposedFlag
    })

    return () => {
      // Clean up editor on unmount
      disposed = true
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [])

  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * Handlers
   * ────────────────────────────────────────────────────────────────────────────────
   */

  // Triggered when the "Run" button is clicked
  const handleRun = () => {
    runPythonCode({ editorRef, pyodideRef, outputRef })
  }

  /**
   * ────────────────────────────────────────────────────────────────────────────────
   * Render
   * ────────────────────────────────────────────────────────────────────────────────
   */

  return (
    <>
      <PythonEditor replRef={replRef} />
      <RunButton onClick={handleRun} loading={loading} />
      <PythonOutput outputRef={outputRef} />
    </>
  )
}
