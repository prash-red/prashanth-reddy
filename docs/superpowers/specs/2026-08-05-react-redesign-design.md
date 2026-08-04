# React Redesign — Design

## Context
The site is currently a plain static HTML/CSS/JS single-page portfolio (Bootstrap 5 +
NES.css retro theme, single-column "researcher site" layout with scroll-based navigation
and `<hr>` section dividers, plus scroll-reveal/hover animations — see
`docs/superpowers/specs/2026-08-05-personal-website-cleanup-design.md` for that prior
redesign). This spec replaces that implementation with a React application, keeping the
content and some of the retro visual personality but changing the navigation model from
single-page scrolling to true page-per-section routing.

## Goals
1. Rebuild the site as a React (Vite) application.
2. Replace scroll-based section navigation with tab-based routing: clicking a nav tab
   navigates to a distinct page/route (URL changes, content swaps) instead of scrolling
   to an anchor.
3. Modernize the overall visual design (clean typography, whitespace, simple layout)
   while keeping NES.css-based retro UI components (buttons, badges, bordered containers)
   and the pixel font used selectively.
4. Preserve all existing content (bio, skills, projects, resume, contact) and reused
   image/icon assets.
5. Remain deployable as a static site on GitHub Pages.

## 1. Tech stack
- **Vite** as the build tool/dev server (fast, minimal config, no SSR needed for a static
  personal site).
- **React** (function components + hooks).
- **React Router** (`react-router-dom`, `BrowserRouter`) for page routing.
- **NES.css** as an npm dependency (replacing the CDN `<link>`), used for buttons, badges,
  and bordered containers only — not for full-page theming.
- **Plain CSS** (a global stylesheet plus one CSS file per component/page). No Tailwind,
  no CSS-in-JS, no component library beyond NES.css — matches the site's small scope.
- Bootstrap is dropped entirely; its layout/grid responsibilities are replaced by simple
  flexbox/grid rules in the new CSS, and its only other use (the navbar) is replaced by a
  custom `<NavBar>` component.
- Google Fonts "Press Start 2P" kept, loaded via a `<link>` in `index.html`, used
  selectively (headings, nav, logo) rather than for all body text.

## 2. Routing / page structure
Routes (all under a shared layout with persistent `<NavBar>` and `<Footer>`):

| Path | Page | Content |
|---|---|---|
| `/` | Home | Bio: photo, name, subtitle, social/resume buttons, intro bullet list (today's "About Me" content) |
| `/skills` | Skills | Languages / Frameworks / Databases / Other Tools groups |
| `/projects` | Projects | GuessWho AI, Social Distance Tracker |
| `/resume` | Resume | Embedded resume PDF |
| `/contact` | Contact | Personal + academic email cards |

Clicking a `<NavBar>` tab is a real route change (`<Link>`/`<NavLink>` from React Router) —
no anchor-scrolling. The active tab is visually indicated (`NavLink`'s active state).
A catch-all `*` route redirects unknown paths to `/`.

## 3. Visual design
- Modern clean layout: single-column content area (max-width ~900px, matching the prior
  redesign's spacing scale), generous whitespace, a normal sans-serif for body text
  (system font stack — no new font dependency for body copy).
- Retro elements kept:
  - NES.css buttons (`nes-btn`), badges (`nes-badge`), and bordered containers
    (`nes-container`) for skills groups, project tag pills, and contact cards.
  - "Press Start 2P" pixel font used for: the site name/logo in the nav, page headings,
    and section titles — not for paragraph body text (readability).
  - Retro-styled hover/press interactions ported from the prior CSS: NES button
    "press" snap on `:active`, pixel-flicker hover on nav links/headings, hover "jump" on
    project rows/skill cards.
  - A lightweight fade/slide-in-on-mount transition per page (replacing the old
    scroll-triggered `IntersectionObserver` reveal, which no longer applies once content
    isn't one long scrolling page) — implemented as a small `useEffect`-driven mount
    transition per page component, respecting `prefers-reduced-motion`.
- Color palette and layout proportions carried over from the prior redesign (light
  background, dark text, warm accent color for subtitles/links).

## 4. Directory structure
```
src/
  main.jsx
  App.jsx                   (BrowserRouter + route definitions + shared layout)
  layout/
    NavBar.jsx / NavBar.css
    Footer.jsx / Footer.css
  pages/
    Home.jsx / Home.css
    Skills.jsx / Skills.css
    Projects.jsx / Projects.css
    Resume.jsx / Resume.css
    Contact.jsx / Contact.css
  styles/
    global.css              (CSS variables, resets, shared retro animation classes,
                              prefers-reduced-motion overrides)
assets/                      (kept from the current repo: images/, icons/, projects/, docs/ —
                              no renaming needed, already kebab-case from the prior redesign)
index.html                   (Vite entry point — replaces the current root index.html)
vite.config.js
package.json
```
The current root-level `index.html`, `css/style.css`, and `js/animations.js` are deleted
once the React app replaces them (git history retains the old implementation).
`docs/` (specs/plans) is untouched.

## 5. Deployment (GitHub Pages)
- Confirmed via `gh repo view`: this repo (`prash-red/prashanth-reddy`) serves Pages at
  `https://prash-red.github.io/prashanth-reddy/` (a project page, no custom domain/CNAME).
  `vite.config.js` sets `base: '/prashanth-reddy/'` accordingly, and `BrowserRouter` is
  given `basename="/prashanth-reddy"`.
- A `404.html` is added to the build output (copied from `index.html` post-build, the
  standard SPA-on-GitHub-Pages trick) so direct navigation/refresh on a route like
  `/projects` doesn't 404 — GitHub Pages serves `404.html` for unknown paths, which then
  redirects back into the React app with the intended path preserved.
- A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys `dist/` to
  GitHub Pages on push to `main`.

## Out of scope
- No backend/CMS/data-fetching — content stays hardcoded in the page components, same as
  the current static HTML.
- No new content beyond what already exists.
- No design system beyond NES.css + the custom CSS described above (no Tailwind, no
  component library).
- No test framework added — this is a small static personal site; manual verification
  (dev server + build output check) is the testing strategy, consistent with the prior
  redesign.

## Testing / verification strategy
- `npm run dev` — manually click every nav tab, confirm URL changes and correct page
  content renders, confirm no console errors.
- `npm run build && npm run preview` — confirm the production build serves correctly,
  confirm direct navigation to a non-root route works via the 404.html redirect trick.
- Manual resize to mobile width to confirm responsive layout.
- Confirm `prefers-reduced-motion` disables the retro hover/press/mount-transition effects.
