// src/lib/editorSetup.ts
import { DEFAULT_SRC } from '../constants/defaultSrc'

/**
 * Fetch the initial Python code to load into the editor.
 */
async function fetchPythonCode(): Promise<string> {
  const url = new URL(window.location.href)
  const src = url.searchParams.get('src') || DEFAULT_SRC

  try {
    const res = await fetch(src)
    return await res.text()
  } catch (err) {
    console.error('Failed to load code:', err)
    return "# Failed to load code.\nprint('Hello from fallback!')"
  }
}

interface InitEditorParams {
  editorRef: React.RefObject<any>
  pyodideRef: React.RefObject<any>
  replRef: React.RefObject<HTMLDivElement>
  setLoading: (val: boolean) => void
  disposedFlag: () => boolean
}

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

  const pyodide = await (window as any).loadPyodide()
  pyodideRef.current = pyodide

  const code = await fetchPythonCode()

  const { buildWorkerDefinition } = await import(
    'https://cdn.jsdelivr.net/npm/monaco-editor-workers@0.45.0/+esm'
  )
  buildWorkerDefinition(
    'https://cdn.jsdelivr.net/npm/monaco-editor-workers@0.45.0/dist/workers',
    import.meta.url,
    true
  )

  const monaco = await import(
    'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/+esm'
  )

  if (disposedFlag()) return

  editorRef.current = monaco.editor.create(replRef.current!, {
    value: code,
    language: 'python',
    theme: 'vs',
    automaticLayout: true
  })

  setLoading(false)
}
