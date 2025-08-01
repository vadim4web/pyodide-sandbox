// src/components/PythonEditor.jsx

/**
 * PythonEditor Component
 *
 * This component renders the code editor container for writing Python code.
 * The actual editor is created dynamically (Monaco) and attached to the DOM node via `replRef`.
 *
 * @param {Object} props
 * @param {React.RefObject} props.replRef - Ref to a div where Monaco will render the editor
 */
export default function PythonEditor({ replRef }) {
  return (
    <fieldset className="container box-container input-container">
      <legend>
        <img src="python-logo.png" alt="python-logo" />
        &nbsp;Пайтон код:
      </legend>

      {/* This <div> will be filled with the Monaco editor */}
      <div
        ref={replRef} // Ref passed from parent to gain access to the DOM node
        style={{
          width: '100%',
          height: '41vh',
          border: '1px solid var(--border-gray)'
        }}
        className="box input-box"
        role="region"
        aria-label="Python code editor"
      />
    </fieldset>
  )
}
