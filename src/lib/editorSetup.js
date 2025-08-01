// src/lib/editorSetup.js
import { DEFAULT_SRC } from './../constants/defaultSrc'

/**
 * Fetch the initial Python code to load into the editor.
 * It tries to get the URL parameter `src` to load custom scripts,
 * otherwise falls back to the default script URL.
 *
 * @returns {Promise<string>} The Python source code as text.
 */
async function fetchPythonCode() {
  // Get current page URL to check for ?src= parameter
  const url = new URL(window.location.href)
  // Use the src query param or fallback to DEFAULT_SRC
  const src = url.searchParams.get('src') || DEFAULT_SRC

  try {
    // Fetch the script from the URL
    const res = await fetch(src)
    // Return the raw text content of the Python script
    return await res.text()
  } catch (err) {
    // If fetching fails, log error and return fallback Python code
    console.error('Failed to load code:', err)
    return "# Failed to load code.\nprint('Hello from fallback!')"
  }
}

/**
 * Initializes Pyodide and the Monaco code editor inside the React app.
 * This includes loading Pyodide (Python runtime in WebAssembly),
 * fetching initial Python code, setting up Monaco workers,
 * and creating the editor instance.
 *
 * @param {Object} params - The parameters object.
 * @param {React.RefObject} params.editorRef - Ref to hold Monaco editor instance.
 * @param {React.RefObject} params.pyodideRef - Ref to hold Pyodide instance.
 * @param {React.RefObject} params.replRef - Ref to the container DOM node for editor.
 * @param {Function} params.setLoading - React state setter for loading indicator.
 * @param {Function} params.disposedFlag - Function returning boolean to check if component unmounted.
 */
export async function initEditor({
  editorRef,
  pyodideRef,
  replRef,
  setLoading,
  disposedFlag
}) {
  // If editor already initialized, do nothing
  if (editorRef.current) {
    console.log('Editor already initialized')
    return
  }

  // --- Load Pyodide ---
  // Pyodide is a WebAssembly-based Python runtime running in the browser.
  // This call asynchronously loads and initializes Pyodide.
  const pyodide = await window.loadPyodide()
  // Store Pyodide instance in ref for use in other functions
  pyodideRef.current = pyodide

  // --- Fetch initial Python code ---
  const code = await fetchPythonCode()

  // --- Setup Monaco Editor workers ---
  // Monaco uses web workers for language features.
  // This imports a helper to setup those workers from CDN.
  const { buildWorkerDefinition } = await import(
    'https://cdn.jsdelivr.net/npm/monaco-editor-workers@0.45.0/+esm'
  )
  buildWorkerDefinition(
    'https://cdn.jsdelivr.net/npm/monaco-editor-workers@0.45.0/dist/workers',
    import.meta.url,
    true // Use modern workers (false for classic workers like Firefox)
  )

  // --- Load Monaco Editor ---
  const monaco = await import(
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/+esm'
  )

  // If component unmounted while loading, abort
  if (disposedFlag()) return

  // --- Create Monaco editor instance ---
  // Attach editor to replRef DOM node with initial Python code
  editorRef.current = monaco.editor.create(replRef.current, {
    value: code,           // initial content
    language: 'python',    // syntax highlighting for Python
    theme: 'vs',           // light theme 'vs' (Visual Studio)
    automaticLayout: true, // auto resize on container changes
  })

  // Update loading state to indicate editor is ready
  setLoading(false)
}
