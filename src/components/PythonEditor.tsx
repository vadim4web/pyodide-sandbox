import { RefObject } from 'react'

/**
 * PythonEditor Component
 *
 * This component renders the code editor container for writing Python code.
 * The actual editor is created dynamically (Monaco) and attached to the DOM node via replRef.
 */
interface PythonEditorProps {
  replRef: RefObject<HTMLDivElement>
}

export default function PythonEditor({ replRef }: PythonEditorProps) {
  return (
    <fieldset className="container box-container input-container">
      <legend>
        <img src="python-logo.png" alt="python-logo" />
        &nbsp;Пайтон код:
      </legend>

      <div
        ref={replRef}
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
