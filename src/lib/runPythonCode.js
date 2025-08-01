// src/lib/runPythonCode.js

/**
 * Exposes a global JS function for prompting user input.
 * This bridges the Python `input()` call with the browser prompt dialog.
 */
function exposeJsPrompt() {
  window.js_prompt = (promptText) => {
    // Show browser prompt with the Python prompt text
    const result = window.prompt(promptText)
    // Return empty string if user cancels (null), else return input
    return result === null ? '' : result
  }
}

/**
 * Overrides Python's built-in input() function to use the JS prompt.
 * This runs a Python snippet inside Pyodide to redefine input().
 *
 * @param {Object} pyodide - Pyodide instance
 */
async function overridePythonInput(pyodide) {
  await pyodide.runPythonAsync(`
import js
def input(prompt=''):
    return js.js_prompt(prompt)
  `)
}

/**
 * Runs the Python code currently in the Monaco editor using Pyodide.
 * It redirects Python stdout and stderr to a textarea for display.
 *
 * @param {Object} params - Parameters object.
 * @param {React.RefObject} params.editorRef - Ref to Monaco editor instance.
 * @param {React.RefObject} params.pyodideRef - Ref to Pyodide instance.
 * @param {React.RefObject} params.outputRef - Ref to output textarea.
 */
export async function runPythonCode({ editorRef, pyodideRef, outputRef }) {
  // Check if editor and Pyodide are ready
  if (!editorRef.current || !pyodideRef.current) {
    console.warn('Editor or Pyodide not ready')
    return
  }

  const pyodide = pyodideRef.current
  // Get the current Python code from editor
  const code = editorRef.current.getValue()
  // Buffer to collect output and errors from Python execution
  const outputBuffer = []

  // Redirect standard output to buffer
  pyodide.setStdout({
    batched: (text) => outputBuffer.push(text)
  })

  // Redirect standard error output to buffer with prefix
  pyodide.setStderr({
    batched: (text) => outputBuffer.push(`❌ ${text}`)
  })

  // Setup JS prompt for Python input()
  exposeJsPrompt()

  try {
    // Override input() function inside Python environment
    await overridePythonInput(pyodide)
    // Run the Python code asynchronously
    await pyodide.runPythonAsync(code)
  } catch (e) {
    // If Python code throws an error, add it to output
    outputBuffer.push(`🚨 Error: ${e.message}`)
  }

  // Update the output textarea with the collected output/error text
  outputRef.current.value = outputBuffer.join('\n')
}
