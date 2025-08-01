// src/lib/runPythonCode.ts

function exposeJsPrompt() {
  (window as any).js_prompt = (promptText: string) => {
    const result = window.prompt(promptText)
    return result === null ? '' : result
  }
}

async function overridePythonInput(pyodide: any): Promise<void> {
  await pyodide.runPythonAsync(`
import js
def input(prompt=''):
    return js.js_prompt(prompt)
  `)
}

interface RunPythonCodeParams {
  editorRef: React.RefObject<any>
  pyodideRef: React.RefObject<any>
  outputRef: React.RefObject<HTMLTextAreaElement>
}

export async function runPythonCode({ editorRef, pyodideRef, outputRef }: RunPythonCodeParams): Promise<void> {
  if (!editorRef.current || !pyodideRef.current) {
    console.warn('Editor or Pyodide not ready')
    return
  }

  const pyodide = pyodideRef.current
  const code = editorRef.current.getValue()
  const outputBuffer: string[] = []

  pyodide.setStdout({ batched: (text: string) => outputBuffer.push(text) })
  pyodide.setStderr({ batched: (text: string) => outputBuffer.push(`❌ ${text}`) })

  exposeJsPrompt()

  try {
    await overridePythonInput(pyodide)
    await pyodide.runPythonAsync(code)
  } catch (e: any) {
    outputBuffer.push(`🚨 Error: ${e.message}`)
  }

  if (outputRef.current) {
    outputRef.current.value = outputBuffer.join('\n')
  }
}
