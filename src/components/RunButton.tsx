/**
 * RunButtonProps
 *
 * Props for the RunButton component.
 *
 * @property {() => void} onClick - Callback fired when the button is clicked
 * @property {boolean} loading - Indicates whether the app is loading dependencies; disables button if true
 */

/**
 * RunButton Component
 *
 * Renders a button that triggers Python code execution.
 * Displays a play icon SVG and disables itself when loading.
 *
 * Accessibility & UX:
 * - Disabled while loading to prevent multiple runs
 * - Clear visual icon for action
 * - Accompanied by a localized label and Python logo
 */
interface RunButtonProps {
  onClick: () => void
  loading: boolean
}

export default function RunButton({ onClick, loading }: RunButtonProps) {
  return (
    <div className="container controls-container">
      {/* 
        The main action button:
        - Triggers onClick callback when pressed
        - Disabled during loading
        - Contains a visually descriptive SVG play icon
      */}
      <button onClick={onClick} disabled={loading} className="run-button">
        <svg
          className="run-button-icon"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.6935 15.8458L15.4137 13.059C16.1954 12.5974 16.1954 11.4026 15.4137 10.941L10.6935 8.15419C9.93371 7.70561 9 8.28947 9 9.21316V14.7868C9 15.7105 9.93371 16.2944 10.6935 15.8458Z"
            fill="var(--fresh-green)"
          />
        </svg>
      </button>

      {/* Label explaining the button's purpose, including a Python logo */}
      👈&nbsp;виконати &nbsp;
      <img src="python-logo.png" alt="python-logo" />
      &nbsp;Пайтон код
    </div>
  )
}
