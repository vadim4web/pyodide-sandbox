# 🧪 Pyodide Sandbox

An interactive Python playground built with React, Vite, and Pyodide — instantly deployable on GitHub Pages.

## 🚀 Getting Started

1. Fork the repository

Use GitHub’s **`Fork`** button to create your own copy.

2. **Clone** your fork

```shell
git clone https://github.com/your-username/pyodide-sandbox.git
cd pyodide-sandbox
```

3. Run the **setup** script

&nbsp;&nbsp;&nbsp;&nbsp;This command will:

&nbsp;&nbsp;&nbsp;&nbsp;- [x] Install all dependencies

&nbsp;&nbsp;&nbsp;&nbsp;- [x] Automatically update the homepage in package.json

&nbsp;&nbsp;&nbsp;&nbsp;- [x] Build the app

&nbsp;&nbsp;&nbsp;&nbsp;- [x] Deploy it to GitHub Pages

```shell
npm run setup
```

Your sandbox will be available at:
[https://your-username.github.io/pyodide-sandbox](https://your-username.github.io/pyodide-sandbox)

## 🌐 Custom Script Source
You can load your own Python script via a URL parameter:

`?src=https://example.com/your-script.py`

## Example:

`https://your-username.github.io/pyodide-sandbox?src=https://raw.githubusercontent.com/ekidscoding/python/main/examples/kirilche/4_1.py`

## 🛠 Scripts

```shell
npm run dev # Start local development server
```

```shell
npm run build # Build the app for production
```

```shell
npm run preview # Preview production build
```

```shell
npm run deploy # Deploy manually to GitHub Pages
```

```shell
npm run setup # Full automatic setup: install, build, and deploy
```

```shell
npm run lint # Run ESLint

```

## 🧩 Customize

Change the default script in `DEFAULT_SRC` in `src/App.jsx`

Modify UI and styles in `src/index.css`

Replace logos or adjust labels in `src/App.jsx`

## 📦 Deployment

If you want to deploy manually:

1. Set your `GITHUB_USER` env variable

2. Run:

```shell
npm run deploy
```

The predeploy and postinstall scripts ensure homepage is always correct.

## ✅ License

MIT — use freely and modify for your needs.