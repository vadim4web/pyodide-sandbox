import { buildWorkerDefinition } from 'monaco-editor-workers'
import * as monaco from 'monaco-editor'
import type { RefObject } from 'react'
import type { editor } from 'monaco-types'

import { DEFAULT_SRC } from '../constants/defaultSrc'

/**
 * Fetch the initial Python code to populate the editor.
 *
 * Looks for a `src` query parameter in the current URL,
 * falls back to DEFAULT_SRC if not present.
 * Returns a fallback snippet if fetching fails.
 *
 * @returns {Promise<string>} - The Python source code as string.
 */
async function fetchPythonCode(): Promise<string> {
  const url = new URL(window.location.href)
  const src = url.searchParams.get('src') || DEFAULT_SRC

  try {
    const res = await fetch(src)
    return await res.text()
  } catch (err) {
    console.error('Failed to load code:', err)
    // Return fallback code on fetch failure to keep the editor functional
    return "# Failed to load code.\nprint('Hello from fallback!')"
  }
}

/**
 * Parameters required to initialize the editor environment.
 */
export interface InitEditorParams {
  editorRef: RefObject<editor.IStandaloneCodeEditor | null> // Monaco editor instance ref
  pyodideRef: RefObject<any>                               // Pyodide runtime ref
  replRef: RefObject<HTMLDivElement | null>                // Container ref for the editor DOM node
  setLoading: (loading: boolean) => void                    // Setter for loading state
  disposedFlag: () => boolean                               // Flag to check if component is unmounted
}

/**
 * Initializes the Monaco editor with Python support and loads Pyodide runtime.
 *
 * Steps:
 * 1. Prevents re-initialization if editor already exists.
 * 2. Loads Pyodide runtime and stores ref.
 * 3. Fetches initial Python source code.
 * 4. Registers Monaco Web Worker using CDN.
 * 5. Creates Monaco editor inside the specified container.
 * 6. Sets loading state to false after setup completes.
 *
 * @param {InitEditorParams} params - Initialization parameters and refs.
 */
export async function initEditor({
  editorRef,
  pyodideRef,
  replRef,
  setLoading,
  disposedFlag
}: InitEditorParams): Promise<void> {
  if (editorRef.current) {
    console.log('Editor already initialized')
    return
  }

  // Load Pyodide Python runtime asynchronously and store it
  const pyodide = await (window as any).loadPyodide()
  pyodideRef.current = pyodide

  // Fetch the initial Python code to prefill the editor
  const code = await fetchPythonCode()

  // Define and register Monaco editor workers (handles language features, diagnostics, etc.)
  buildWorkerDefinition(
    'https://cdn.jsdelivr.net/npm/monaco-editor-workers@0.45.0/dist/workers',
    import.meta.url,
    true
  )

  // Abort initialization if component has been unmounted
  if (disposedFlag()) return

  // Create the Monaco editor instance in the container DOM node with Python language
  editorRef.current = monaco.editor.create(replRef.current!, {
    value: code,
    language: 'python',
    theme: 'vs',
    automaticLayout: true, // Auto resize editor on container changes
  })

  // Indicate editor has finished loading
  setLoading(false)
}
