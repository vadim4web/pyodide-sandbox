import { RefObject } from 'react'

/**
 * PythonOutputProps
 *
 * Props for the PythonOutput component.
 *
 * @property {RefObject<HTMLTextAreaElement | null>} outputRef - Ref to the textarea DOM node where output will be displayed
 */

/**
 * PythonOutput Component
 *
 * Renders a read-only textarea to display the standard output
 * or errors produced by the Python code execution.
 *
 * Accessibility & UX:
 * - Disabled to prevent user edits
 * - Styled to visually match the input editor height and width
 */
interface PythonOutputProps {
  outputRef: RefObject<HTMLTextAreaElement | null>
}

export default function PythonOutput({ outputRef }: PythonOutputProps) {
  return (
    <fieldset className="container box-container output-container">
      <legend>Вивід:</legend>

      {/* 
        Read-only textarea showing output from Python execution.
        - Disabled to block user input
        - Ref allows parent component to write program output here
        - Fixed height & width for consistent layout with editor
      */}
      <textarea
        ref={outputRef}
        className="box output-box"
        rows={20}
        disabled
        style={{ width: '100%', height: '41vh' }}
      />
    </fieldset>
  )
}
