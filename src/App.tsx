// src/App.tsx
import { useEffect, useRef, useState } from 'react'
import { initEditor } from './lib/editorSetup'
import { runPythonCode } from './lib/runPythonCode'

import PythonEditor from './components/PythonEditor'
import RunButton from './components/RunButton'
import PythonOutput from './components/PythonOutput'

import type { MutableRefObject } from 'react'

/**
 * Main Application Component
 *
 * - Initializes the Monaco editor and Pyodide
 * - Handles running user-entered Python code
 * - Renders the UI components
 */
export default function App() {
  // Refs to hold DOM nodes and runtime instances
  const replRef = useRef<HTMLDivElement | null>(null)
  const outputRef = useRef<HTMLTextAreaElement | null>(null)
  const editorRef = useRef<any>(null) // Monaco editor type could be more specific
  const pyodideRef = useRef<any>(null) // Pyodide type could be improved with @types/pyodide

  // Track if the editor is still loading
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let disposed = false
    const disposedFlag = () => disposed

    // Initialize Monaco + Pyodide editor setup
    initEditor({
      editorRef,
      pyodideRef,
      replRef,
      setLoading,
      disposedFlag
    })

    return () => {
      // Cleanup when component unmounts
      disposed = true
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [])

  // Called when the "Run" button is clicked
  const handleRun = () => {
    runPythonCode({ editorRef, pyodideRef, outputRef })
  }

  return (
    <>
      <PythonEditor replRef={replRef} />
      <RunButton onClick={handleRun} loading={loading} />
      <PythonOutput outputRef={outputRef} />
    </>
  )
}
