// Import React hooks for managing component state and lifecycle
import { useEffect, useRef, useState } from 'react'

// Default Python script to load if none is provided in the URL
const DEFAULT_SRC =
	'https://raw.githubusercontent.com/ekidscoding/python/main/examples/kirilche/4_1.py'

// Main component — everything happens inside this App function
export default function App() {
	// These refs are used to access the DOM elements or hold mutable objects
	const replRef = useRef(null) // Code editor container
	const outputRef = useRef(null) // Textarea for output
	const editorRef = useRef(null) // Monaco editor instance
	const pyodideRef = useRef(null) // Pyodide instance

	// `loading` state indicates whether editor is ready
	const [loading, setLoading] = useState(true)

	// useEffect runs once after component mounts
	useEffect(() => {
		let disposed = false // This will be used to clean up on unmount

		// Async setup function for Pyodide and Monaco
		const init = async () => {
			// If editor already exists, exit early
			if (editorRef.current) {
				console.log('Monaco editor already initialized.')
				return
			}

			// Load Pyodide (Python runtime in the browser)
			const pyodide = await window.loadPyodide({
				stdout: msg => console.log(msg),
				stderr: msg => console.error('Python Error:', msg),
			})
			pyodideRef.current = pyodide

			// Check for ?src=... parameter in URL to load custom Python code
			const url = new URL(window.location.href)
			const src = url.searchParams.get('src') || DEFAULT_SRC

			let fileContent
			try {
				// Try loading external Python file
				const res = await fetch(src)
				fileContent = await res.text()
			} catch (err) {
				// Fallback to simple Python code if loading fails
				console.error('Invalid src URL:', err)
				fileContent = "# Failed to load code.\nprint('Hello from fallback!')"
			}

			// Dynamically import Monaco editor
			const monaco = await import(
				'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/+esm'
			)

			if (disposed) return // If component unmounted, exit

			// Create Monaco editor instance in the `replRef` div
			editorRef.current = monaco.editor.create(replRef.current, {
				value: fileContent,
				language: 'python',
				theme: 'vs',
				automaticLayout: true,
			})

			// Editor and runtime are ready
			setLoading(false)
		}

		// Call setup function
		init()

		// Cleanup on unmount — dispose the editor
		return () => {
			disposed = true
			if (editorRef.current) {
				editorRef.current.dispose()
				editorRef.current = null
			}
		}
	}, []) // Empty dependency array → run once

	// Function called when the "Run" button is clicked
	const runCode = () => {
		const code = editorRef.current?.getValue() // Get code from editor
		let outputBuffer = []

		// Redirect Python stdout to capture output
		pyodideRef.current.setStdout({
			batched: s => outputBuffer.push(s),
		})

		try {
			// Run the Python code
			pyodideRef.current.runPython(code)
		} catch (e) {
			// If error in Python, capture the message
			outputBuffer.push(e.message)
		}

		// Show output in the textarea
		outputRef.current.value = outputBuffer.join('\n')
	}

	// JSX layout — rendered HTML
	return (
		<>
			{/* Input box with a label */}
			<fieldset className="container box-container input-container ">
				<legend>
					<img src="python-logo.png" alt="python-logo" />
					&nbsp;Пайтон код:
				</legend>
				<div
					ref={replRef} // This div will host the Monaco code editor
					style={{
						width: '100%',
						height: '41vh',
						border: '1px solid var(--border-gray)',
					}}
					className="box input-box"
					role="region"
					aria-label="Python code editor"
				/>
			</fieldset>

			{/* Run button with icon */}
			<div className="container controls-container ">
				<button onClick={runCode} disabled={loading} className="run-button">
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
				👈&nbsp;виконати &nbsp;
				<img src="python-logo.png" alt="python-logo" />
				&nbsp;Пайтон код
			</div>

			{/* Output box with a label */}
			<fieldset className="container box-container output-container ">
				<legend>Вивід:</legend>
				<textarea
					ref={outputRef} // Output goes here
					style={{ width: '100%', height: '41vh' }}
					className="box output-box"
					rows="20"
					disabled // Read-only
				/>
			</fieldset>
		</>
	)
}
