// src/components/PythonOutput.jsx

/**
 * PythonOutput Component
 *
 * Displays the output (or errors) from the Python code execution.
 * It's a read-only textarea filled with standard output from Pyodide.
 *
 * @param {Object} props
 * @param {React.RefObject} props.outputRef - Ref to the textarea so parent can write output to it
 */
export default function PythonOutput({ outputRef }) {
  return (
    <fieldset className="container box-container output-container">
      <legend>Вивід:</legend>

      {/* This textarea shows the Python output; it’s read-only (disabled) */}
      <textarea
        ref={outputRef} // Ref passed from parent to write program output here
        style={{ width: '100%', height: '41vh' }}
        className="box output-box"
        rows="20"
        disabled // Prevent user editing
      />
    </fieldset>
  )
}
