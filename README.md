# 🧪 Pyodide Sandbox

An interactive Python playground built with React, Vite, and Pyodide — instantly deployable on GitHub Pages.

<p>
<img src="https://raw.githubusercontent.com/vadim4web/pyodide-sandbox/refs/heads/main/doc/landscape.png" alt="landscape screenshot" style="width: 66%; aspect-ratio: 1.7437275" />
<img src="https://raw.githubusercontent.com/vadim4web/pyodide-sandbox/refs/heads/main/doc/portrait.png" alt="portrait screenshot" style="width: 33%; aspect-ratio: 0.5053763" />
</p>

## 🚀 Getting Started

1. Fork the repository

Use GitHub’s **`Fork`** button to create your own copy.

2. **Clone** your fork

```bash
git clone https://github.com/your-username/pyodide-sandbox.git
cd pyodide-sandbox
```

3. Run the **setup** script

This command will:

- [x] Install all dependencies

- [x] Automatically update the homepage in package.json

- [x] Build the app

- [x] Deploy it to GitHub Pages

```bash
npm run setup
```

Your sandbox will be available at:
[https://your-username.github.io/pyodide-sandbox](https://your-username.github.io/pyodide-sandbox)

## 🌐 Custom Script Source
You can load your own Python script via a URL parameter:

`?src=https://example.com/your-script.py`

## Example:

`https://your-username.github.io/pyodide-sandbox?src=https://raw.githubusercontent.com/ekidscoding/python/main/examples/kirilche/4_1.py`

⚠️ **Important:** Make sure the `src` URL points to the **raw content** of the Python file (e.g., from GitHub’s `/raw/` view), or it won’t load correctly in the editor.

## 📚 Suggested Examples
For fun and useful Python scripts to try, explore this collection:
[🔗 ekidscoding/python/examples/kirilche](https://github.com/ekidscoding/python/tree/main/examples/kirilche)

✅ input() is now supported — prompts will appear using the browser's native window.prompt() dialog. Your Python scripts can be interactive!


## 🛠 Available Scripts

```bash
npm run dev # Start local development server
npm run build # Build the app for production
npm run preview # Preview production build
npm run deploy # Deploy manually to GitHub Pages
npm run setup # Full automatic setup: install, build, and deploy
npm run lint # Run ESLint

```

## 🧩 Customize It

- Change the default script source: `src/constants/defaultSrc.js`  

- Modify layout or labels: `src/components/*.jsx`  

- Tweak styles and themes: src/index.css  

## 📦 Manual Deployment

If you want to deploy manually:

1. Set your `GITHUB_USER` env variable

```bash
export GITHUB_USER=your-username
```

2. Run:

```bash
npm run deploy
```

The predeploy and postinstall scripts ensure homepage is always correct.

## ✅ License

MIT — free to use, modify, fork, and deploy.

```yaml

---

Would you like me to:

- Commit this to your project as `README.md`?
- Add a badge or CI status at the top?
- Translate or localize the readme (e.g., to Ukrainian or another language)?

Let me know.
```