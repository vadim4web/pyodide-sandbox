import { RefObject } from 'react'

/**
 * PythonEditorProps
 *
 * Props for PythonEditor component.
 *
 * @property {RefObject<HTMLDivElement | null>} replRef - Ref to the container div where Monaco editor will be mounted
 */
interface PythonEditorProps {
  replRef: RefObject<HTMLDivElement | null>
}

/**
 * PythonEditor Component
 *
 * Renders the container for the Python code editor.
 * The actual Monaco editor instance will be dynamically created
 * and attached to the div referenced by `replRef`.
 *
 * Accessibility:
 * - Uses `role="region"` and `aria-label` to describe the code editor area.
 */
export default function PythonEditor({ replRef }: PythonEditorProps) {
  return (
    <fieldset className="container box-container input-container">
      <legend>
        <img src="python-logo.png" alt="Python Logo" />
        &nbsp;Пайтон код:
      </legend>

      {/* 
        Container div for the Monaco editor. 
        Styling ensures full width, fixed height, and border to visually separate editor area. 
      */}
      <div
        ref={replRef}
        className="box input-box"
        role="region"
        aria-label="Python code editor"
        style={{
          width: '100%',
          height: '41vh',
          border: '1px solid var(--border-gray)',
        }}
      />
    </fieldset>
  )
}
