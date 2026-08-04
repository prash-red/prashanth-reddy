# Personal Website Redesign & Cleanup — Design

## Context
Static portfolio site (Bootstrap 5 + NES.css retro/pixel-art theme) consisting of `index.html`,
`style.css`, and an `assets/` folder with images/icons/resume. No build step, no JS.

Reference for layout direction: https://www.peterholderrieth.com/ — an academic/researcher
personal site with a clean single-column layout, section dividers, and content-first structure.
This design adopts that structural approach in a **hybrid** with the site's existing pixel/NES
visual personality (fonts, colors, buttons, playful animations are kept).

## Goals
1. Fix existing HTML/CSS bugs.
2. Reorganize the directory structure for clarity and to remove spaces from folder/file names.
3. Restructure the page layout to a single-column, researcher-site-style flow while keeping the
   retro/NES visual identity.
4. Add playful, retro/pixel-style animations consistent with the NES.css aesthetic.

## 1. Bug fixes
- Fix broken nesting in the Skills section: missing closing `</div>`/`</li>` in the
  "Frameworks" list, and a missing closing `</div>` for the "Databases" `nes-container`
  (currently swallows the "Other Tools" block into it).
- Remove the leftover Instagram icon/link from the footer (Instagram was already removed
  from the main page per a prior commit; footer was missed).
- Update footer copyright year from "© 2023" to "© 2026".
- Fix unquoted inline `height=20px` attributes and the `whie-text-body-secondary` typo
  (should be `text-body-secondary`).

## 2. Directory reorganization
Target structure:
```
assets/
  images/        (me.jpeg, background.png, animated.gif)
  icons/
    emojis/      (renamed, no spaces: waving-hand.png, grad-cap.png, man-tech.png, rocket.png, guitar.png, brain.png)
    skills/      (renamed, no spaces: c-sharp.png, css-3.png, ...)
  projects/      (renamed from "projects assets": guesswho.jpg, social-distance.png)
  docs/          (resume.pdf)
css/
  style.css
js/
  animations.js
index.html
README.md
```
- All `src=`/`href=` references in `index.html` updated to match new paths.
- `Academic History.pdf` (unreferenced stray file at repo root) is deleted.
- Filenames with spaces are renamed to kebab-case.

## 3. Page layout restructure (researcher-site hybrid)
Single column, centered, ~900px max-width, generous whitespace, horizontal-rule dividers
between sections (replacing the current full-width Bootstrap grid hero/sections):

1. **Header/bio block** — replaces the current `100vh` background-gif hero. Rectangular
   profile photo positioned top-right next to name/subtitle, plus a flowing bio section
   (existing emoji-icon bullet lines kept as playful accents, not a full-screen banner).
   LinkedIn/GitHub/résumé buttons remain, just restyled to fit inline with the bio block.
2. **Skills** — same grouped NES containers, narrowed to the single-column width (may wrap
   to fewer columns responsively).
3. **Projects** — reframed like a "publications" list: each project as a stacked row
   (thumbnail + title + description + tags + GitHub link) instead of a 3-wide card grid.
4. **Resume** — same embedded PDF viewer, centered within the narrower column.
5. **Contact + footer** — same content (fixed Instagram link + copyright year), narrowed to
   column width.
- The `background.png`/`animated.gif` full-page background is dropped in favor of a plain
  background consistent with the cleaner layout; the gif/image files are kept in
  `assets/images/` in case they're reused elsewhere (e.g. as a small decorative accent),
  but are no longer the full-page background.

## 4. Animations
Playful/retro style, matching the 8-bit theme, applied to the new layout:
- Scroll-triggered reveal for each section (Header/Bio, Skills, Projects, Resume, Contact) via
  `IntersectionObserver`, using a stepped/instant-snap transition rather than smooth easing.
- Enhanced NES-style button "press" effect on click (offset/shadow snap on `:active`).
- Pixel-flicker/glitch hover effect on nav links and section headers.
- Skill/project rows "jump" on hover (instant `translateY` snap, no ease curve).
- All animations respect `prefers-reduced-motion: reduce` (disabled/no-op when set).
- Implemented as a new `js/animations.js` (vanilla JS, no new dependencies) plus additions
  to `css/style.css`.

## Out of scope
- No new content (bio text, project descriptions) beyond what already exists.
- No backend/build tooling introduced — site remains plain static HTML/CSS/JS.
- No dark/light theme toggle.

## Testing
Serve locally (`python3 -m http.server`) and manually verify: nav links scroll correctly,
all images load from new paths, hover/click animations behave, `prefers-reduced-motion`
disables animations, no console errors, layout looks correct at desktop and mobile widths.
