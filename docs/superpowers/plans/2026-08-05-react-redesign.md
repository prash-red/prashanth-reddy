# React Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static portfolio site as a Vite + React application with tab-based page routing (React Router), keeping NES.css retro UI components and the pixel font selectively, on a modernized clean layout, deployable to GitHub Pages.

**Architecture:** Vite + React (function components/hooks) + React Router (`BrowserRouter`). A shared layout (`NavBar` + `Footer`) wraps 5 routed pages (Home/Skills/Projects/Resume/Contact). Plain CSS (global stylesheet + per-component files), NES.css as an npm dependency for buttons/badges/containers only. Static assets live in `public/assets/` (Vite's static-asset convention) and are referenced through a small `asset()` helper that respects the GitHub Pages base path.

**Tech Stack:** Vite 5, React 18, react-router-dom 6, nes.css (npm), plain CSS, GitHub Actions for deployment.

## Global Constraints

- This repo (`prash-red/prashanth-reddy`) serves GitHub Pages at
  `https://prash-red.github.io/prashanth-reddy/` — a project page, no custom domain.
  `vite.config.js` must set `base: '/prashanth-reddy/'`, and `BrowserRouter` must use
  `basename="/prashanth-reddy"`.
- No Tailwind, no CSS-in-JS, no component library beyond NES.css. Plain CSS only.
- All animations/transitions must no-op under `prefers-reduced-motion: reduce`.
- Static assets referenced via the `asset()` helper (`src/utils/asset.js`) so paths work
  correctly both in dev (`BASE_URL` = `/`) and production (`BASE_URL` = `/prashanth-reddy/`).
- No backend/data-fetching — page content is hardcoded JSX, same content as the current
  static site.
- No test framework is added — this is a small static personal site. Verification is
  `npm run build` (catches syntax/import errors), source-level grep checks, and
  `npm run build && npm run preview` + `curl` walkthroughs of every route.
- Spec: `docs/superpowers/specs/2026-08-05-react-redesign-design.md`

---

### Task 1: Scaffold the Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `.gitignore`, `index.html` (root — replaces
  the old static entry point, but do NOT delete the old one yet; that happens in Task 10
  so the site stays viewable via git history until the new one is verified)
- Create: `src/main.jsx`, `src/App.jsx` (placeholder), `src/utils/asset.js`
- Move: `assets/` → `public/assets/` (git mv, preserving the existing kebab-case
  structure from the prior redesign: `images/`, `icons/emojis/`, `icons/skills/`,
  `projects/`, `docs/`)

**Interfaces:**
- Produces: `asset(path)` helper — `import { asset } from './utils/asset.js'`, returns
  `` `${import.meta.env.BASE_URL}${path}` ``. All later page components import and use
  this for every `<img src>` / `<iframe src>` pointing at `public/assets/...`.
- Produces: working `npm run dev`, `npm run build`, `npm run preview` scripts.

- [ ] **Step 1: Move the old root `index.html` out of the way temporarily**

The old static `index.html` at repo root conflicts with the new Vite entry point of the
same name. Rename it so Task 10 can restore/remove it deliberately once the React app is
verified:

```bash
git mv index.html index.old.html
```

- [ ] **Step 2: Move assets into `public/`**

```bash
mkdir -p public
git mv assets public/assets
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "prashanth-reddy-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "nes.css": "^2.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 4: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/prashanth-reddy/',
})
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 6: Create the new `index.html` (Vite entry point) at repo root**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
    <title>Prashanth Reddy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/utils/asset.js`**

```js
export function asset(path) {
    return `${import.meta.env.BASE_URL}${path}`
}
```

- [ ] **Step 8: Create a placeholder `src/App.jsx`** (Task 3 replaces this with real
  routing)

```jsx
export default function App() {
    return <div>Coming soon</div>
}
```

- [ ] **Step 9: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'nes.css/css/nes.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 10: Install dependencies**

```bash
npm install
```

- [ ] **Step 11: Verify the build succeeds**

```bash
npm run build
ls dist/index.html && echo "build output OK"
```

Expected: build completes with no errors, `dist/index.html` exists.

- [ ] **Step 12: Verify the dev server responds**

```bash
npm run dev -- --port 5173 &
sleep 2
curl -sf http://localhost:5173/prashanth-reddy/ | grep -q 'id="root"' && echo "dev server OK"
kill %1
```

Expected: `dev server OK` printed (dev server is reachable and serves the Vite HTML
shell; the base path `/prashanth-reddy/` matches `vite.config.js`).

- [ ] **Step 13: Verify assets moved correctly**

```bash
find public/assets -type f | sort | head -5
test -f public/assets/images/me.jpeg && echo "assets moved OK"
```

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React project structure"
```

---

### Task 2: Global stylesheet with retro animation classes

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/main.jsx` (import the new stylesheet)

**Interfaces:**
- Produces CSS custom properties (`--bg`, `--text`, `--accent`, `--font-pixel`,
  `--font-body`) and utility classes (`.page-wrap`, `.pixel-text`, `.pixel-flicker`,
  `.hover-jump`, `.page-enter`/`.page-enter-active`) that all later components/pages use.

- [ ] **Step 1: Create `src/styles/global.css`**

```css
:root {
    --bg: #f7f5f0;
    --text: #1b1b1b;
    --accent: #d92626;
    --font-pixel: 'Press Start 2P', system-ui, sans-serif;
    --font-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

* {
    box-sizing: border-box;
}

html {
    scroll-padding-top: 5rem;
}

body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
}

.page-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.pixel-text {
    font-family: var(--font-pixel);
}

.nes-btn:active {
    transform: translate(2px, 2px);
}

.pixel-flicker:hover {
    animation: pixel-flicker 0.4s steps(2, end) infinite;
}

@keyframes pixel-flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

.hover-jump {
    transition: transform 0s;
}

.hover-jump:hover {
    transform: translateY(-6px);
}

.page-enter {
    opacity: 0;
    transform: translateY(16px);
}

.page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.2s steps(4, end), transform 0.2s steps(4, end);
}

@media (prefers-reduced-motion: reduce) {
    .pixel-flicker:hover {
        animation: none !important;
    }
    .hover-jump:hover {
        transform: none !important;
    }
    .nes-btn:active {
        transform: none !important;
    }
    .page-enter,
    .page-enter-active {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}
```

- [ ] **Step 2: Import it in `src/main.jsx`**

Change:
```jsx
import App from './App.jsx'
import 'nes.css/css/nes.min.css'
```
to:
```jsx
import App from './App.jsx'
import 'nes.css/css/nes.min.css'
import './styles/global.css'
```

- [ ] **Step 3: Verify the build still succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify the reduced-motion override block exists**

```bash
grep -n "prefers-reduced-motion" src/styles/global.css
```

Expected: at least one match.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css src/main.jsx
git commit -m "Add global stylesheet with retro animation classes and reduced-motion support"
```

---

### Task 3: Routing, shared layout, and page-transition hook

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Create: `src/layout/PageTransition.jsx`
- Create: `src/layout/NavBar.jsx`, `src/layout/NavBar.css`
- Create: `src/layout/Footer.jsx`, `src/layout/Footer.css`
- Create: `src/pages/Home.jsx`, `src/pages/Skills.jsx`, `src/pages/Projects.jsx`,
  `src/pages/Resume.jsx`, `src/pages/Contact.jsx` (placeholder stubs — Tasks 4-8 fill in
  real content)
- Modify: `src/App.jsx` (replace placeholder with real routing)

**Interfaces:**
- Consumes: `.page-wrap`, `.pixel-text`, `.pixel-flicker`, `.page-enter`/
  `.page-enter-active` from Task 2's global.css; `asset()` from Task 1.
- Produces: `<PageTransition>` component — wraps a page's content, adds
  `page-enter`/`page-enter-active` classes on mount, respecting reduced motion. Every
  page component (Tasks 4-8) wraps its top-level content with it, e.g.:
  ```jsx
  export default function Home() {
      return (
          <PageTransition>
              <div className="page-wrap">...</div>
          </PageTransition>
      )
  }
  ```
- Produces: routes `/`, `/skills`, `/projects`, `/resume`, `/contact`, all rendered
  inside `<NavBar>` + page + `<Footer>`, with `basename="/prashanth-reddy"`.

- [ ] **Step 1: Create `src/hooks/usePrefersReducedMotion.js`**

```js
import { useEffect, useState } from 'react'

export default function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(
        () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
        const handler = (e) => setReduced(e.matches)
        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [])

    return reduced
}
```

- [ ] **Step 2: Create `src/layout/PageTransition.jsx`**

```jsx
import { useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

export default function PageTransition({ children }) {
    const reducedMotion = usePrefersReducedMotion()
    const [entered, setEntered] = useState(reducedMotion)

    useEffect(() => {
        if (reducedMotion) {
            setEntered(true)
            return
        }
        setEntered(false)
        const id = requestAnimationFrame(() => setEntered(true))
        return () => cancelAnimationFrame(id)
    }, [reducedMotion])

    return (
        <div className={`page-enter ${entered ? 'page-enter-active' : ''}`}>
            {children}
        </div>
    )
}
```

- [ ] **Step 3: Create `src/layout/NavBar.css`**

```css
.nav-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #1b1b1b;
}

.nav-logo {
    color: #fff;
    font-size: 0.85rem;
}

.nav-links {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
}

.nav-link-active {
    color: #d92626;
}
```

- [ ] **Step 4: Create `src/layout/NavBar.jsx`**

```jsx
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NAV_LINKS = [
    { to: '/', label: 'About Me', end: true },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/resume', label: 'Resume' },
    { to: '/contact', label: 'Contact' },
]

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <span className="nav-logo pixel-text">Prashanth Reddy</span>
            <ul className="nav-links">
                {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `nav-link pixel-flicker${isActive ? ' nav-link-active' : ''}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
```

- [ ] **Step 5: Create `src/layout/Footer.css`**

```css
.site-footer {
    border-top: 2px solid var(--text);
    margin-top: 2rem;
}

.footer-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.footer-copy {
    font-size: 10px;
}

.footer-links {
    display: flex;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
}
```

- [ ] **Step 6: Create `src/layout/Footer.jsx`**

```jsx
import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="page-wrap footer-inner">
                <span className="footer-copy">© 2026 Prashanth Reddy</span>
                <ul className="footer-links">
                    <li>
                        <a href="https://www.linkedin.com/in/prashanthreddy/" target="_blank" rel="noreferrer">
                            <i className="nes-icon linkedin is-medium"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/prash-red" target="_blank" rel="noreferrer">
                            <i className="nes-icon github is-medium"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
```

- [ ] **Step 7: Create placeholder page stubs**

`src/pages/Home.jsx`:
```jsx
import PageTransition from '../layout/PageTransition.jsx'

export default function Home() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Home</h1>
            </div>
        </PageTransition>
    )
}
```

`src/pages/Skills.jsx`:
```jsx
import PageTransition from '../layout/PageTransition.jsx'

export default function Skills() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Skills</h1>
            </div>
        </PageTransition>
    )
}
```

`src/pages/Projects.jsx`:
```jsx
import PageTransition from '../layout/PageTransition.jsx'

export default function Projects() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Projects</h1>
            </div>
        </PageTransition>
    )
}
```

`src/pages/Resume.jsx`:
```jsx
import PageTransition from '../layout/PageTransition.jsx'

export default function Resume() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Resume</h1>
            </div>
        </PageTransition>
    )
}
```

`src/pages/Contact.jsx`:
```jsx
import PageTransition from '../layout/PageTransition.jsx'

export default function Contact() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Contact</h1>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 8: Replace `src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './layout/NavBar.jsx'
import Footer from './layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
    return (
        <BrowserRouter basename="/prashanth-reddy">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
```

- [ ] **Step 9: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 10: Verify routing works via preview + curl**

```bash
npm run preview -- --port 4173 &
sleep 2
for route in "" "skills" "projects" "resume" "contact" "some/deep/unknown/path"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4173/prashanth-reddy/$route")
  echo "$route -> $code"
done
kill %1
```

Expected: every route returns `200` (Vite's preview server serves `index.html` for
unknown paths by default, which is what makes client-side routing work — this also
previews the same fallback behavior GitHub Pages' `404.html` trick will provide in
Task 9).

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Add routing, shared layout, and page-transition hook with placeholder pages"
```

---

### Task 4: Home page (bio)

**Files:**
- Create: `src/pages/Home.css`
- Modify: `src/pages/Home.jsx` (replace placeholder with real content)

**Interfaces:**
- Consumes: `asset()` from Task 1, `.page-wrap`/`.pixel-text`/`.pixel-flicker` from
  Task 2, `<PageTransition>` from Task 3.

- [ ] **Step 1: Create `src/pages/Home.css`**

```css
.bio-top {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
}

.profile {
    border: 4px solid var(--text);
    border-radius: 50%;
    height: 180px;
    width: 180px;
    object-fit: cover;
    flex-shrink: 0;
}

.bio-intro {
    flex: 1;
    min-width: 240px;
}

.site-name {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
}

.site-subtitle {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--accent);
    margin-bottom: 1rem;
}

.social-links {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.bio-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.bio-list li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-bottom: 1rem;
}

@media (max-width: 600px) {
    .bio-top {
        flex-direction: column;
        text-align: center;
    }
}
```

- [ ] **Step 2: Replace `src/pages/Home.jsx`**

```jsx
import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Home.css'

export default function Home() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <div className="bio-top">
                    <img
                        src={asset('assets/images/me.jpeg')}
                        className="profile"
                        alt="Prashanth Reddy"
                    />
                    <div className="bio-intro">
                        <h1 className="site-name pixel-text">Prashanth Reddy</h1>
                        <h3 className="site-subtitle">
                            Computer Science @ University of Toronto '26
                        </h3>
                        <div className="social-links">
                            <a
                                className="nes-btn is-error"
                                href="https://www.linkedin.com/in/prashanthreddy/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="nes-icon linkedin is-medium"></i>
                            </a>
                            <a
                                className="nes-btn is-success"
                                href="https://github.com/prash-red"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <i className="nes-icon github is-medium"></i>
                            </a>
                            <a
                                className="nes-btn is-warning"
                                href={asset('assets/docs/resume.pdf')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Resume
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="bio-list">
                    <li>
                        <img src={asset('assets/icons/emojis/waving-hand.png')} height="20" alt="" />
                        <p>
                            Hello! I'm Prashanth, a passionate second-year student, eagerly
                            exploring the world of Software Engineering and technology.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/grad-cap.png')} height="20" alt="" />
                        <p>
                            I'm pursuing an HBSc with a Specialist in Computer Science (ASIP
                            co-op), graduating class of 2026.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/man-tech.png')} height="20" alt="" />
                        <p>
                            I've gained valuable experience as a Trading Developer at
                            TradeBeez Brokers in Dubai. Additionally, I contributed as a Mesh
                            Maker Software Developer at Nia Technologies in Toronto,
                            enhancing proprietary software with a user-friendly mesh creation
                            interface.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/rocket.png')} height="20" alt="" />
                        <p>
                            In terms of projects, my work spans diverse areas. I developed a
                            Line Drawing Classifier using TensorFlow, HTML, CSS, and
                            JavaScript, enabling the recognition and classification of line
                            drawings. Another exciting project was "GuessWho AI," a digital
                            version of the Guess Who game featuring an AI opponent, employing
                            decision tree algorithms.
                        </p>
                    </li>
                    <li>
                        <img src={asset('assets/icons/emojis/guitar.png')} height="20" alt="" />
                        <p>
                            Apart from my passion for Software Engineering, I am also deeply
                            intrigued by the intersection of artificial intelligence and
                            math, constantly seeking ways to integrate these fields into my
                            projects and research. Additionally, I have a keen interest in
                            music, especially playing the guitar.
                        </p>
                    </li>
                </ul>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify no stale/broken asset references**

```bash
grep -o "asset('[^']*')" src/pages/Home.jsx | sed "s/asset('//;s/')//" | while read -r p; do
  test -f "public/$p" && echo "OK: $p" || echo "MISSING: $p"
done
```

Expected: every line prints `OK: ...`, no `MISSING` lines.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.css
git commit -m "Add Home page content"
```

---

### Task 5: Skills page

**Files:**
- Create: `src/pages/Skills.css`
- Modify: `src/pages/Skills.jsx`

**Interfaces:**
- Consumes: `asset()`, `.page-wrap`/`.pixel-text`, `<PageTransition>`.

- [ ] **Step 1: Create `src/pages/Skills.css`**

```css
.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.skill-sub {
    width: 260px;
}

.skill-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}

.no-bullets {
    list-style-type: none;
    padding: 0;
}
```

- [ ] **Step 2: Replace `src/pages/Skills.jsx`**

```jsx
import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Skills.css'

const SKILL_GROUPS = [
    {
        title: 'Languages',
        items: [
            { icon: 'python.png', label: 'python' },
            { icon: 'java.png', label: 'java' },
            { icon: 'html.png', label: 'html' },
            { icon: 'css-3.png', label: 'css' },
            { icon: 'js.png', label: 'javascript' },
            { icon: 'c-sharp.png', label: 'C#' },
        ],
    },
    {
        title: 'Frameworks',
        items: [
            { icon: 'react.png', label: 'ReactJS' },
            { icon: 'node.png', label: 'NodeJS' },
            { icon: 'express.png', label: 'ExpressJS' },
            { icon: 'flask.png', label: 'flask' },
            { icon: 'bootstrap.png', label: 'bootstrap' },
            { icon: 'opencv.png', label: 'Opencv' },
        ],
    },
    {
        title: 'Databases',
        items: [
            { icon: 'sql.png', label: 'MySQL' },
            { icon: 'mongo.png', label: 'MongoDB' },
            { icon: 'firebase.png', label: 'Firebase' },
        ],
    },
    {
        title: 'Other Tools',
        items: [
            { icon: 'git.png', label: 'Git' },
            { icon: 'unity.jpg', label: 'Unity' },
            { icon: 'latex.png', label: 'latex' },
            { icon: 'vscode.png', label: 'VS Code' },
        ],
    },
]

export default function Skills() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Skills</h1>
                <div className="skills-grid">
                    {SKILL_GROUPS.map((group) => (
                        <div
                            key={group.title}
                            className="nes-container is-dark is-centered with-title skill-sub"
                        >
                            <p className="title">{group.title}</p>
                            <ul className="no-bullets">
                                {group.items.map((item) => (
                                    <li key={item.label}>
                                        <div className="skill-item">
                                            <img
                                                src={asset(`assets/icons/skills/${item.icon}`)}
                                                height="20"
                                                alt=""
                                            />
                                            {item.label}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify every referenced skill icon exists**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('src/pages/Skills.jsx', 'utf8');
const icons = [...src.matchAll(/icon: '([^']+)'/g)].map(m => m[1]);
let missing = false;
for (const icon of icons) {
  const p = 'public/assets/icons/skills/' + icon;
  if (!fs.existsSync(p)) { console.log('MISSING: ' + p); missing = true; }
}
if (!missing) console.log('all skill icons OK (' + icons.length + ')');
"
```

Expected: `all skill icons OK (19)`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Skills.jsx src/pages/Skills.css
git commit -m "Add Skills page content"
```

---

### Task 6: Projects page

**Files:**
- Create: `src/pages/Projects.css`
- Modify: `src/pages/Projects.jsx`

**Interfaces:**
- Consumes: `asset()`, `.page-wrap`/`.pixel-text`/`.hover-jump`, `<PageTransition>`.

- [ ] **Step 1: Create `src/pages/Projects.css`**

```css
.project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.project-row {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.03);
    padding: 1rem;
}

.project-thumb {
    width: 180px;
    height: 130px;
    object-fit: cover;
    border: 4px solid var(--text);
    flex-shrink: 0;
}

.project-body {
    flex: 1;
    min-width: 200px;
}

.project-subtitle {
    color: var(--accent);
}
```

- [ ] **Step 2: Replace `src/pages/Projects.jsx`**

```jsx
import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Projects.css'

const PROJECTS = [
    {
        title: 'GuessWho AI',
        subtitle: 'Python App',
        thumb: 'guesswho.jpg',
        description:
            'A project aimed at exploring different decision tree regression algorithms within the context of the game of Guess Who',
        tags: [
            { label: 'python', className: 'is-primary' },
            { label: 'java', className: 'is-warning' },
        ],
        github: 'https://github.com/nsaroiu/GuessWho',
    },
    {
        title: 'Social Distance Tracker',
        subtitle: 'Python App',
        thumb: 'social-distance.png',
        description:
            'Social Distance Tracker made using AI and CV. Developed using object detection and depth estimation on Nvidia Jetson MCU and Luxonis stereo camera',
        tags: [
            { label: 'python', className: 'is-primary' },
            { label: 'OpenCV', className: 'is-warning' },
        ],
        github: 'https://github.com/prash-red/Social_Distance_Tracker',
    },
]

export default function Projects() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Projects</h1>
                <div className="project-list">
                    {PROJECTS.map((project) => (
                        <div key={project.title} className="project-row hover-jump">
                            <img
                                src={asset(`assets/projects/${project.thumb}`)}
                                className="project-thumb"
                                alt={project.title}
                            />
                            <div className="project-body">
                                <h5 className="project-title">{project.title}</h5>
                                <h6 className="project-subtitle">{project.subtitle}</h6>
                                <p>{project.description}</p>
                                <div className="d-flex align-items-center">
                                    {project.tags.map((tag) => (
                                        <div className="nes-badge" key={tag.label} style={{ marginRight: '0.75rem' }}>
                                            <span className={tag.className}>{tag.label}</span>
                                        </div>
                                    ))}
                                    <a href={project.github} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto' }}>
                                        <i className="nes-icon github is-medium"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify every referenced project thumbnail exists**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('src/pages/Projects.jsx', 'utf8');
const thumbs = [...src.matchAll(/thumb: '([^']+)'/g)].map(m => m[1]);
let missing = false;
for (const t of thumbs) {
  const p = 'public/assets/projects/' + t;
  if (!fs.existsSync(p)) { console.log('MISSING: ' + p); missing = true; }
}
if (!missing) console.log('all project thumbnails OK (' + thumbs.length + ')');
"
```

Expected: `all project thumbnails OK (2)`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Projects.jsx src/pages/Projects.css
git commit -m "Add Projects page content"
```

---

### Task 7: Resume page

**Files:**
- Create: `src/pages/Resume.css`
- Modify: `src/pages/Resume.jsx`

**Interfaces:**
- Consumes: `asset()`, `.page-wrap`/`.pixel-text`, `<PageTransition>`.

- [ ] **Step 1: Create `src/pages/Resume.css`**

```css
.pdf {
    height: 500px;
    width: 100%;
    max-width: 500px;
    margin-top: 1.5rem;
    display: block;
}
```

- [ ] **Step 2: Replace `src/pages/Resume.jsx`**

```jsx
import PageTransition from '../layout/PageTransition.jsx'
import { asset } from '../utils/asset.js'
import './Resume.css'

export default function Resume() {
    return (
        <PageTransition>
            <div className="page-wrap" style={{ textAlign: 'center' }}>
                <h1 className="pixel-text">Resume</h1>
                <iframe title="Resume" src={asset('assets/docs/resume.pdf')} className="pdf">
                    <p>
                        Unable to display PDF file.{' '}
                        <a href={asset('assets/docs/resume.pdf')}>Download</a> instead.
                    </p>
                </iframe>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify the resume asset exists**

```bash
test -f public/assets/docs/resume.pdf && echo "resume asset OK"
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/Resume.jsx src/pages/Resume.css
git commit -m "Add Resume page content"
```

---

### Task 8: Contact page

**Files:**
- Create: `src/pages/Contact.css`
- Modify: `src/pages/Contact.jsx`

**Interfaces:**
- Consumes: `.page-wrap`/`.pixel-text`, `<PageTransition>`.

- [ ] **Step 1: Create `src/pages/Contact.css`**

```css
.contact-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}
```

- [ ] **Step 2: Replace `src/pages/Contact.jsx`**

```jsx
import PageTransition from '../layout/PageTransition.jsx'
import './Contact.css'

export default function Contact() {
    return (
        <PageTransition>
            <div className="page-wrap">
                <h1 className="pixel-text">Contact</h1>
                <div className="contact-cards">
                    <div className="nes-container is-dark is-centered with-title">
                        <p className="title" style={{ color: 'var(--accent)' }}>Personal</p>
                        <a href="mailto:shyamalaprashanth2004@gmail.com">
                            shyamalaprashanth2004@gmail.com
                        </a>
                    </div>
                    <div className="nes-container is-dark is-centered with-title">
                        <p className="title" style={{ color: '#e6a817' }}>Academic</p>
                        <a href="mailto:prashanth.shyamala@mail.utoronto.ca">
                            prashanth.shyamala@mail.utoronto.ca
                        </a>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
```

- [ ] **Step 3: Verify the build succeeds**

```bash
npm run build && echo "build OK"
```

- [ ] **Step 4: Verify both email addresses are present**

```bash
grep -c "shyamalaprashanth2004@gmail.com\|prashanth.shyamala@mail.utoronto.ca" src/pages/Contact.jsx
```

Expected: `4` (each address appears twice — once as `href`, once as link text).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Contact.jsx src/pages/Contact.css
git commit -m "Add Contact page content"
```

---

### Task 9: GitHub Pages deployment config

**Files:**
- Modify: `package.json` (add `postbuild` script)
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: `dist/404.html` after every build (GitHub Pages serves this file for any
  path it doesn't recognize — copying `index.html` to `404.html` is what lets a client
  route like `/prashanth-reddy/projects` load correctly on a hard refresh or direct
  link, since the React app then reads the intended path from the URL and routes to it).

- [ ] **Step 1: Add a `postbuild` script to `package.json`**

Change:
```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```
to:
```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "postbuild": "cp dist/index.html dist/404.html",
    "preview": "vite preview"
  },
```

- [ ] **Step 2: Verify `dist/404.html` is produced**

```bash
npm run build
test -f dist/404.html && echo "404.html OK"
diff dist/index.html dist/404.html && echo "404.html matches index.html"
```

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Verify the workflow YAML is well-formed**

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))" && echo "YAML valid"
```

(If `python3-yaml` isn't available, visually confirm indentation is consistent — 2
spaces throughout, no tabs.)

- [ ] **Step 5: Commit**

```bash
git add package.json .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment: 404.html SPA fallback and Actions workflow"
```

**Note for the human partner (not a plan step — nothing to automate here):** this
workflow only takes effect once GitHub Pages is switched to "GitHub Actions" as the
source in the repo's Settings → Pages. That's a one-time manual step in the GitHub UI.

---

### Task 10: Cleanup old static site and final verification

**Files:**
- Delete: `index.old.html` (the pre-React static site, renamed aside in Task 1;
  git history retains it)
- Delete: `css/style.css`, `js/animations.js` (superseded by `src/styles/global.css`
  and per-page CSS / React components)
- No new files — verification only beyond the deletions.

**Interfaces:**
- Consumes: the fully assembled app from Tasks 1-9.

- [ ] **Step 1: Delete the old static site files**

```bash
git rm index.old.html
git rm -r css js
```

- [ ] **Step 2: Verify the old files are gone and nothing references them**

```bash
find . -maxdepth 1 -name "index.old.html" -o -maxdepth 1 -name "css" -o -maxdepth 1 -name "js" 2>/dev/null | grep -v node_modules
git status --short
```

Expected: no output from the `find` (aside from expected absence), `git status --short`
shows only the staged deletions until committed.

- [ ] **Step 3: Full production build + preview walkthrough**

```bash
rm -rf dist
npm run build
npm run preview -- --port 4173 &
sleep 2
for route in "" "skills" "projects" "resume" "contact"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4173/prashanth-reddy/$route")
  echo "$route -> $code"
done
kill %1
```

Expected: every route returns `200`.

- [ ] **Step 4: Verify every static asset resolves through the preview server**

```bash
npm run preview -- --port 4173 &
sleep 2
for path in \
  assets/images/me.jpeg \
  assets/icons/emojis/waving-hand.png \
  assets/icons/skills/python.png \
  assets/projects/guesswho.jpg \
  assets/projects/social-distance.png \
  assets/docs/resume.pdf ; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:4173/prashanth-reddy/$path")
  echo "$path -> $code"
done
kill %1
```

Expected: every path returns `200`.

- [ ] **Step 5: Verify `dist/404.html` still matches `dist/index.html` after the full build**

```bash
diff dist/index.html dist/404.html && echo "404.html OK"
```

- [ ] **Step 6: Manual browser walkthrough note**

This environment has no GUI browser. Before considering the redesign fully done, the
human partner should run `npm run dev` locally and confirm in an actual browser: clicking
each nav tab changes the URL and page content with no full page reload, the retro
NES.css buttons/badges render correctly, hover/press/pixel-flicker effects work, the
page-mount fade-in plays once per navigation, and enabling
"prefers-reduced-motion: reduce" (via browser dev tools) disables all of the above
effects instantly.

- [ ] **Step 7: Commit the cleanup**

```bash
git add -A
git commit -m "Remove old static site files now that the React app replaces them"
```
