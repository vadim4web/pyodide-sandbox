/**
 * Expose a global JS function that wraps `window.prompt`
 * to allow Python code to call it via Pyodide's JS interop.
 *
 * Returns empty string if prompt is canceled.
 */
function exposeJsPrompt() {
  (window as any).js_prompt = (promptText: string) => {
    const result = window.prompt(promptText)
    return result === null ? '' : result
  }
}

/**
 * Override Python's built-in `input()` function
 * to delegate input requests to the JS prompt exposed above.
 *
 * This allows Python code running in Pyodide to prompt
 * the user via browser dialogs.
 *
 * @param pyodide - The Pyodide runtime instance
 */
async function overridePythonInput(pyodide: any): Promise<void> {
  await pyodide.runPythonAsync(`
import js
def input(prompt=''):
    return js.js_prompt(prompt)
  `)
}

/**
 * Parameters for running Python code.
 */
interface RunPythonCodeParams {
  editorRef: React.RefObject<any>                 // Reference to Monaco editor instance
  pyodideRef: React.RefObject<any>                // Reference to Pyodide runtime instance
  outputRef: React.RefObject<HTMLTextAreaElement | null>  // Reference to output textarea DOM node
}

/**
 * Executes Python code entered in the editor within Pyodide,
 * captures and displays stdout and stderr output in the output textarea.
 *
 * It sets up stdout/stderr handlers to buffer output text,
 * overrides Python's `input()` to use browser prompts,
 * and handles runtime errors gracefully.
 *
 * @param params - Object containing refs for editor, Pyodide, and output DOM nodes.
 */
export async function runPythonCode({
  editorRef,
  pyodideRef,
  outputRef
}: RunPythonCodeParams): Promise<void> {
  // Validate that editor and Pyodide runtime are ready before running code
  if (!editorRef.current || !pyodideRef.current) {
    console.warn('Editor or Pyodide not ready')
    return
  }

  const pyodide = pyodideRef.current
  const code = editorRef.current.getValue() // Retrieve user code from Monaco editor
  const outputBuffer: string[] = []         // Buffer to accumulate stdout/stderr

  // Redirect Pyodide stdout to buffer (batched to reduce overhead)
  pyodide.setStdout({
    batched: (text: string) => outputBuffer.push(text)
  })

  // Redirect Pyodide stderr to buffer, prefix errors with ❌ for clarity
  pyodide.setStderr({
    batched: (text: string) => outputBuffer.push(`❌ ${text}`)
  })

  // Expose JS prompt function so Python input() can call browser prompt()
  exposeJsPrompt()

  try {
    // Override Python input() function to call JS prompt
    await overridePythonInput(pyodide)

    // Run the Python code asynchronously in Pyodide environment
    await pyodide.runPythonAsync(code)
  } catch (e: any) {
    // Append runtime errors to output buffer with clear 🚨 prefix
    outputBuffer.push(`🚨 Error: ${e.message}`)
  }

  // Update the output textarea with all captured output (stdout, stderr, errors)
  if (outputRef.current) {
    outputRef.current.value = outputBuffer.join('\n')
  }
}
