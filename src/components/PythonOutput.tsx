import { RefObject } from 'react'

/**
 * PythonOutput Component
 *
 * Displays the output (or errors) from the Python code execution.
 * It's a read-only textarea filled with standard output from Pyodide.
 */
interface PythonOutputProps {
  outputRef: RefObject<HTMLTextAreaElement>
}

export default function PythonOutput({ outputRef }: PythonOutputProps) {
  return (
    <fieldset className="container box-container output-container">
      <legend>Вивід:</legend>
      <textarea
        ref={outputRef}
        style={{ width: '100%', height: '41vh' }}
        className="box output-box"
        rows={20}
        disabled
      />
    </fieldset>
  )
}
