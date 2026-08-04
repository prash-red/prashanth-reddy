# Personal Website Redesign & Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the static portfolio site's file structure, fix existing HTML/CSS bugs, restructure the page into a researcher-site-style single-column layout (hybrid with the existing NES.css retro theme), and add playful pixel-style animations.

**Architecture:** Plain static site — `index.html`, `css/style.css`, `js/animations.js`, and an `assets/` tree. No build step, no package manager, no test framework. "Tests" for this plan are manual browser verification plus grep/`find`-based structural checks run via the shell.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (`IntersectionObserver`, `matchMedia`), Bootstrap 5 (CDN), NES.css (CDN), Google Fonts "Press Start 2P" (CDN).

## Global Constraints

- No new dependencies/build tooling — CDN links for Bootstrap/NES.css/font stay as-is.
- All asset folder/file names must be kebab-case with no spaces.
- All animations must no-op under `prefers-reduced-motion: reduce`.
- Layout max-width ~900px, single column, section dividers (`<hr>`), matching the researcher-site reference direction agreed with the user.
- Existing nav anchor IDs (`about`, `skills`, `projects`, `resume`, `contact`) must be preserved since the nav links target them.
- Spec: `docs/superpowers/specs/2026-08-05-personal-website-cleanup-design.md`

---

### Task 1: Reorganize asset directories and CSS location

**Files:**
- Move: `assets/me.jpeg`, `assets/background.png`, `assets/animated.gif` → `assets/images/`
- Move: `assets/pixelated emojis/*.png` → `assets/icons/emojis/*.png` (renamed, kebab-case)
- Move: `assets/skills icons/*` → `assets/icons/skills/*` (renamed, kebab-case)
- Move: `assets/projects assets/*` → `assets/projects/*`
- Move: `assets/resume.pdf` → `assets/docs/resume.pdf`
- Move: `style.css` → `css/style.css`
- Delete: `Academic History.pdf`
- Modify: `index.html` (update the `<link href="style.css">` path only — content/body changes come in later tasks)

**Interfaces:**
- Produces: final asset path map used by all later tasks:
  - `assets/images/me.jpeg`, `assets/images/background.png`, `assets/images/animated.gif`
  - `assets/icons/emojis/waving-hand.png`, `grad-cap.png`, `man-tech.png`, `rocket.png`, `guitar.png`, `brain.png`
  - `assets/icons/skills/python.png`, `java.png`, `html.png`, `css-3.png`, `js.png`, `c-sharp.png`, `react.png`, `node.png`, `express.png`, `flask.png`, `bootstrap.png`, `opencv.png`, `sql.png`, `mongo.png`, `firebase.png`, `git.png`, `unity.jpg`, `latex.png`, `vscode.png`
  - `assets/projects/guesswho.jpg`, `assets/projects/social-distance.png`
  - `assets/docs/resume.pdf`
  - `css/style.css`

- [ ] **Step 1: Create new directories**

```bash
mkdir -p assets/images assets/icons/emojis assets/icons/skills assets/projects assets/docs css js
```

- [ ] **Step 2: Move and rename files with git mv**

```bash
git mv assets/me.jpeg assets/images/me.jpeg
git mv assets/background.png assets/images/background.png
git mv assets/animated.gif assets/images/animated.gif

git mv "assets/pixelated emojis/brain.png" assets/icons/emojis/brain.png
git mv "assets/pixelated emojis/grad cap.png" assets/icons/emojis/grad-cap.png
git mv "assets/pixelated emojis/guitar.png" assets/icons/emojis/guitar.png
git mv "assets/pixelated emojis/man tech.png" assets/icons/emojis/man-tech.png
git mv "assets/pixelated emojis/rocket.png" assets/icons/emojis/rocket.png
git mv "assets/pixelated emojis/waving hand.png" assets/icons/emojis/waving-hand.png
rmdir "assets/pixelated emojis"

git mv "assets/skills icons/bootstrap.png" assets/icons/skills/bootstrap.png
git mv "assets/skills icons/c-sharp.png" assets/icons/skills/c-sharp.png
git mv "assets/skills icons/css-3.png" assets/icons/skills/css-3.png
git mv "assets/skills icons/express.png" assets/icons/skills/express.png
git mv "assets/skills icons/firebase.png" assets/icons/skills/firebase.png
git mv "assets/skills icons/flask.png" assets/icons/skills/flask.png
git mv "assets/skills icons/git.png" assets/icons/skills/git.png
git mv "assets/skills icons/html.png" assets/icons/skills/html.png
git mv "assets/skills icons/java.png" assets/icons/skills/java.png
git mv "assets/skills icons/js.png" assets/icons/skills/js.png
git mv "assets/skills icons/latex.png" assets/icons/skills/latex.png
git mv "assets/skills icons/mongo.png" assets/icons/skills/mongo.png
git mv "assets/skills icons/node.png" assets/icons/skills/node.png
git mv "assets/skills icons/opencv.png" assets/icons/skills/opencv.png
git mv "assets/skills icons/python.png" assets/icons/skills/python.png
git mv "assets/skills icons/react.png" assets/icons/skills/react.png
git mv "assets/skills icons/sql.png" assets/icons/skills/sql.png
git mv "assets/skills icons/unity.jpg" assets/icons/skills/unity.jpg
git mv "assets/skills icons/vscode.png" assets/icons/skills/vscode.png
rmdir "assets/skills icons"

git mv "assets/projects assets/guesswho.jpg" assets/projects/guesswho.jpg
git mv "assets/projects assets/social-distance.png" assets/projects/social-distance.png
rmdir "assets/projects assets"

git mv assets/resume.pdf assets/docs/resume.pdf

git mv style.css css/style.css

git rm "Academic History.pdf"
```

- [ ] **Step 3: Verify the file tree matches the target structure**

```bash
find assets css js -type f | sort
```

Expected output (order may vary, but exactly these paths, no others):

```
assets/docs/resume.pdf
assets/icons/emojis/brain.png
assets/icons/emojis/grad-cap.png
assets/icons/emojis/guitar.png
assets/icons/emojis/man-tech.png
assets/icons/emojis/rocket.png
assets/icons/emojis/waving-hand.png
assets/icons/skills/bootstrap.png
assets/icons/skills/c-sharp.png
assets/icons/skills/css-3.png
assets/icons/skills/express.png
assets/icons/skills/firebase.png
assets/icons/skills/flask.png
assets/icons/skills/git.png
assets/icons/skills/html.png
assets/icons/skills/java.png
assets/icons/skills/js.png
assets/icons/skills/latex.png
assets/icons/skills/mongo.png
assets/icons/skills/node.png
assets/icons/skills/opencv.png
assets/icons/skills/python.png
assets/icons/skills/react.png
assets/icons/skills/sql.png
assets/icons/skills/unity.jpg
assets/icons/skills/vscode.png
assets/images/animated.gif
assets/images/background.png
assets/images/me.jpeg
assets/projects/guesswho.jpg
assets/projects/social-distance.png
css/style.css
```

(`js/` will be empty until Task 5 — that's expected.)

- [ ] **Step 4: Update the stylesheet link path in `index.html`**

Change:
```html
    <link href = "style.css" rel = "stylesheet" type = "text/css">
```
to:
```html
    <link href="css/style.css" rel="stylesheet" type="text/css">
```

- [ ] **Step 5: Verify the page still loads with the old (pre-restructure) content**

```bash
python3 -m http.server 8000 &
sleep 1
curl -sf http://localhost:8000/css/style.css > /dev/null && echo "css OK"
curl -sf http://localhost:8000/assets/images/me.jpeg > /dev/null && echo "me.jpeg OK"
curl -sf http://localhost:8000/assets/docs/resume.pdf > /dev/null && echo "resume OK"
kill %1
```

Expected: `css OK`, `me.jpeg OK`, `resume OK` all printed — note `index.html` still references old `assets/me.jpeg`-style paths for images other than the stylesheet at this point, so a full visual check comes after Task 3. This step only confirms the *new file locations* are being served correctly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Reorganize asset directories and move stylesheet into css/"
```

---

### Task 2: Fix existing HTML bugs

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: nothing from Task 1 besides the updated `css/style.css` link already in place.
- Produces: a structurally valid `index.html` body (still using the old wide-grid layout) ready for the Task 3 restructure.

- [ ] **Step 1: Fix the broken "Frameworks" list nesting**

Find:
```html
                <li>
                    <div class = "skill-item">
                        <img src = 'assets/skills icons/express.png' height= 20px>ExpressJS
                </li>
```
Replace with:
```html
                <li>
                    <div class = "skill-item">
                        <img src = 'assets/skills icons/express.png' height= 20px>ExpressJS
                    </div>
                </li>
```
(Note: the `assets/skills icons/...` paths here get corrected to `assets/icons/skills/...` in Task 3's full rewrite — this step only fixes the missing tag.)

- [ ] **Step 2: Fix the broken "Databases" container nesting**

Find:
```html
                <li>
                    <div class = "skill-item">
                        <img src = 'assets/skills icons/firebase.png' height= 20px>Firebase
                    </div>
                </li>
        </div>
        <div class="nes-container is-dark is-centered with-title skill-sub">
            <p class="title">Other Tools</p>
```
Replace with:
```html
                <li>
                    <div class = "skill-item">
                        <img src = 'assets/skills icons/firebase.png' height= 20px>Firebase
                    </div>
                </li>
            </ul>
        </div>
        <div class="nes-container is-dark is-centered with-title skill-sub">
            <p class="title">Other Tools</p>
```

- [ ] **Step 3: Remove the Instagram link from the footer**

Find:
```html
              <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3"><a class="text-body-secondary" href="https://www.instagram.com/reddyboss420/" target="_blank"><i class="nes-icon instagram is-medium"></i></a></li>
                <li class="ms-3"><a class="text-body-secondary" href="https://www.linkedin.com/in/prashanthreddy/" target="_blank"><i class="nes-icon linkedin is-medium"></i></a></li>
```
Replace with:
```html
              <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3"><a class="text-body-secondary" href="https://www.linkedin.com/in/prashanthreddy/" target="_blank"><i class="nes-icon linkedin is-medium"></i></a></li>
```

- [ ] **Step 4: Fix the copyright year and the `whie-text-body-secondary` typo**

Find:
```html
                <span class="mb-3 mb-md-0 whie-text-body-secondary">© 2023 Prashanth Reddy</span>
```
Replace with:
```html
                <span class="mb-3 mb-md-0 text-body-secondary">© 2026 Prashanth Reddy</span>
```

- [ ] **Step 5: Verify tag balance with a quick grep check**

```bash
python3 - <<'EOF'
from html.parser import HTMLParser
content = open("index.html").read()
class Checker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
    def handle_starttag(self, tag, attrs):
        if tag not in ("img", "br", "hr", "input", "link", "meta"):
            self.stack.append(tag)
    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            print(f"MISMATCH at </{tag}>: stack is {self.stack[-3:]}")
        else:
            self.stack.pop()
c = Checker()
c.feed(content)
print("Unclosed at EOF:", c.stack)
EOF
```

Expected: no `MISMATCH` lines printed, and `Unclosed at EOF: []`.

- [ ] **Step 6: Confirm the Instagram reference and old copyright string are gone**

```bash
grep -n "instagram" index.html; grep -n "2023" index.html; grep -n "whie-text" index.html
```

Expected: all three `grep` calls print nothing (exit code 1).

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "Fix broken skills-list nesting, remove footer Instagram link, fix copyright/typo"
```

---

### Task 3: Restructure `index.html` into the researcher-site-style single-column layout

**Files:**
- Modify: `index.html` (full body rewrite)

**Interfaces:**
- Consumes: the asset paths produced by Task 1, the fixed skills markup from Task 2.
- Produces: the following CSS hooks/classes/IDs that Task 4 (layout CSS) and Task 5 (animations) style and target — later tasks depend on these exact names:
  - Structural classes: `.page-wrap`, `.bio`, `.bio-top`, `.bio-intro`, `.bio-list`, `.social-links`, `.section-divider`, `.section-title`, `.skills-grid`, `.project-list`, `.project-row`, `.project-thumb`, `.project-body`, `.site-footer`, `.footer-inner`, `.footer-links`, `.footer-copy`
  - Animation hook class used by Task 5/6: `.reveal` (placed on the bio list, skills section, project list, resume section, contact section)
  - IDs preserved for nav: `about`, `skills`, `projects`, `resume`, `contact`

- [ ] **Step 1: Replace the `<body>` contents of `index.html`**

Replace everything from `<body class = "background">` through the closing `</body>` with:

```html
<body class="site-body">

    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#about">About Me</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#skills">Skills</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#projects">Projects</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#resume">Resume</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <header class="page-wrap bio" id="about">
        <div class="bio-top">
            <img src="assets/images/me.jpeg" class="profile" alt="Prashanth Reddy">
            <div class="bio-intro">
                <h1 class="site-name">Prashanth Reddy</h1>
                <h3 class="site-subtitle">Computer Science @ University of Toronto '26</h3>
                <div class="social-links">
                    <a class="nes-btn is-error" href="https://www.linkedin.com/in/prashanthreddy/" target="_blank"><i class="nes-icon linkedin is-medium"></i></a>
                    <a class="nes-btn is-success" href="https://github.com/prash-red" target="_blank"><i class="nes-icon github is-medium"></i></a>
                    <a class="nes-btn is-warning" href="assets/docs/resume.pdf" target="_blank">Resume</a>
                </div>
            </div>
        </div>
        <ul class="bio-list reveal">
            <li class="list-item">
                <img src="assets/icons/emojis/waving-hand.png" height="20px" alt="">
                <p>Hello! I'm Prashanth, a passionate second-year student, eagerly exploring the world of Software Engineering and technology.</p>
            </li>
            <li class="list-item">
                <img src="assets/icons/emojis/grad-cap.png" height="20px" alt="">
                <p>I'm pursuing an HBSc with a Specialist in Computer Science (ASIP co-op), graduating class of 2026.</p>
            </li>
            <li class="list-item">
                <img src="assets/icons/emojis/man-tech.png" height="20px" alt="">
                <p>I've gained valuable experience as a Trading Developer at TradeBeez Brokers in Dubai. Additionally, I contributed as a Mesh Maker Software Developer at Nia Technologies in Toronto, enhancing proprietary software with a user-friendly mesh creation interface.</p>
            </li>
            <li class="list-item">
                <img src="assets/icons/emojis/rocket.png" height="20px" alt="">
                <p>In terms of projects, my work spans diverse areas. I developed a Line Drawing Classifier using TensorFlow, HTML, CSS, and JavaScript, enabling the recognition and classification of line drawings. Another exciting project was "GuessWho AI," a digital version of the Guess Who game featuring an AI opponent, employing decision tree algorithms.</p>
            </li>
            <li class="list-item">
                <img src="assets/icons/emojis/guitar.png" height="20px" alt="">
                <p>Apart from my passion for Software Engineering, I am also deeply intrigued by the intersection of artificial intelligence and math, constantly seeking ways to integrate these fields into my projects and research. Additionally, I have a keen interest in music, especially playing the guitar.</p>
            </li>
        </ul>
    </header>

    <hr class="section-divider">

    <section class="page-wrap reveal" id="skills">
        <h3 class="section-title">Skills</h3>
        <div class="skills-grid">
            <div class="nes-container is-dark is-centered with-title skill-sub">
                <p class="title">Languages</p>
                <ul class="text-white no-bullets">
                    <li><div class="skill-item"><img src="assets/icons/skills/python.png" height="20px" alt="">python</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/java.png" height="20px" alt="">java</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/html.png" height="20px" alt="">html</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/css-3.png" height="20px" alt="">css</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/js.png" height="20px" alt="">javascript</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/c-sharp.png" height="20px" alt="">C#</div></li>
                </ul>
            </div>
            <div class="nes-container is-dark is-centered with-title skill-sub">
                <p class="title">Frameworks</p>
                <ul class="text-white no-bullets">
                    <li><div class="skill-item"><img src="assets/icons/skills/react.png" height="20px" alt="">ReactJS</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/node.png" height="20px" alt="">NodeJS</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/express.png" height="20px" alt="">ExpressJS</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/flask.png" height="20px" alt="">flask</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/bootstrap.png" height="20px" alt="">bootstrap</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/opencv.png" height="25px" alt="">Opencv</div></li>
                </ul>
            </div>
            <div class="nes-container is-dark is-centered with-title skill-sub">
                <p class="title">Databases</p>
                <ul class="text-white no-bullets">
                    <li><div class="skill-item"><img src="assets/icons/skills/sql.png" height="20px" alt="">MySQL</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/mongo.png" height="20px" alt="">MongoDB</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/firebase.png" height="20px" alt="">Firebase</div></li>
                </ul>
            </div>
            <div class="nes-container is-dark is-centered with-title skill-sub">
                <p class="title">Other Tools</p>
                <ul class="text-white no-bullets">
                    <li><div class="skill-item"><img src="assets/icons/skills/git.png" height="20px" alt="">Git</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/unity.jpg" height="20px" alt="">Unity</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/latex.png" height="8px" alt="">latex</div></li>
                    <li><div class="skill-item"><img src="assets/icons/skills/vscode.png" height="20px" alt="">VS Code</div></li>
                </ul>
            </div>
        </div>
    </section>

    <hr class="section-divider">

    <section class="page-wrap reveal" id="projects">
        <h3 class="section-title">Projects</h3>
        <div class="project-list">
            <div class="project-row">
                <img src="assets/projects/guesswho.jpg" class="project-thumb" alt="GuessWho AI">
                <div class="project-body">
                    <h5 class="project-title">GuessWho AI</h5>
                    <h6 class="project-subtitle text-info">Python App</h6>
                    <p>A project aimed at exploring different decision tree regression algorithms within the context of the game of Guess Who</p>
                    <div class="d-flex align-items-center small-text">
                        <div class="nes-badge me-3"><span class="is-primary">python</span></div>
                        <div class="nes-badge"><span class="is-warning">java</span></div>
                        <div class="ms-auto"><a href="https://github.com/nsaroiu/GuessWho" target="_blank"><i class="nes-icon github is-medium"></i></a></div>
                    </div>
                </div>
            </div>
            <div class="project-row">
                <img src="assets/projects/social-distance.png" class="project-thumb" alt="Social Distance Tracker">
                <div class="project-body">
                    <h5 class="project-title">Social Distance Tracker</h5>
                    <h6 class="project-subtitle text-info">Python App</h6>
                    <p>Social Distance Tracker made using AI and CV. Developed using object detection and depth estimation on Nvidia Jetson MCU and Luxonis stereo camera</p>
                    <div class="d-flex align-items-center small-text">
                        <div class="nes-badge me-3"><span class="is-primary">python</span></div>
                        <div class="nes-badge"><span class="is-warning">OpenCV</span></div>
                        <div class="ms-auto"><a href="https://github.com/prash-red/Social_Distance_Tracker" target="_blank"><i class="nes-icon github is-medium"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <hr class="section-divider">

    <section class="page-wrap reveal" id="resume">
        <h3 class="section-title">Resume</h3>
        <div class="d-flex justify-content-center">
            <iframe src="assets/docs/resume.pdf" class="pdf">
                <p>Unable to display PDF file. <a href="assets/docs/resume.pdf">Download</a> instead.</p>
            </iframe>
        </div>
    </section>

    <hr class="section-divider">

    <section class="page-wrap reveal" id="contact">
        <h3 class="section-title">Contact</h3>
        <div class="d-flex justify-content-center">
            <div class="nes-container is-dark d-flex flex-wrap justify-content-center">
                <div class="nes-container is-dark is-centered with-title">
                    <p class="title text-info">Personal</p>
                    <a href="mailto:shyamalaprashanth2004@gmail.com" class="text-white small-text">shyamalaprashanth2004@gmail.com</a>
                </div>
                <div class="nes-container is-dark is-centered with-title">
                    <p class="title text-warning">Academic</p>
                    <a href="mailto:prashanth.shyamala@mail.utoronto.ca" class="text-white small-text">prashanth.shyamala@mail.utoronto.ca</a>
                </div>
            </div>
        </div>
    </section>

    <footer class="site-footer">
        <div class="page-wrap footer-inner">
            <span class="footer-copy">© 2026 Prashanth Reddy</span>
            <ul class="nav footer-links list-unstyled d-flex">
                <li class="ms-3"><a href="https://www.linkedin.com/in/prashanthreddy/" target="_blank"><i class="nes-icon linkedin is-medium"></i></a></li>
                <li class="ms-3"><a href="https://github.com/prash-red" target="_blank"><i class="nes-icon github is-medium"></i></a></li>
            </ul>
        </div>
    </footer>

    <script src="js/animations.js"></script>
</body>

</html>
```

- [ ] **Step 2: Verify no stale asset paths remain**

```bash
grep -n "assets/me.jpeg\|assets/background.png\|assets/animated.gif\|pixelated emojis\|skills icons\|projects assets\|assets/resume.pdf" index.html
```

Expected: no output (exit code 1) — everything should now point at the Task 1 paths (`assets/images/...`, `assets/icons/...`, `assets/projects/...`, `assets/docs/resume.pdf`).

- [ ] **Step 3: Verify the required IDs and hook classes are present**

```bash
for needle in 'id="about"' 'id="skills"' 'id="projects"' 'id="resume"' 'id="contact"' 'class="reveal' 'section-divider' 'project-row' 'bio-list'; do
  grep -q "$needle" index.html && echo "FOUND: $needle" || echo "MISSING: $needle"
done
```

Expected: every line prints `FOUND: ...`.

- [ ] **Step 4: Re-run the tag-balance check from Task 2 Step 5**

```bash
python3 - <<'EOF'
from html.parser import HTMLParser
content = open("index.html").read()
class Checker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
    def handle_starttag(self, tag, attrs):
        if tag not in ("img", "br", "hr", "input", "link", "meta"):
            self.stack.append(tag)
    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            print(f"MISMATCH at </{tag}>: stack is {self.stack[-3:]}")
        else:
            self.stack.pop()
c = Checker()
c.feed(content)
print("Unclosed at EOF:", c.stack)
EOF
```

Expected: no `MISMATCH` lines, `Unclosed at EOF: []`.

- [ ] **Step 5: Visual check**

```bash
python3 -m http.server 8000 &
sleep 1
xdg-open http://localhost:8000/index.html
```

Confirm in the browser: profile photo + name/subtitle appear side by side at the top, all skill icons render, both project rows render with thumbnails, resume PDF embed loads, contact section shows both emails, footer shows only LinkedIn/GitHub icons and "© 2026". Layout will look unstyled/wide at this point — that's expected, since Task 4 adds the new CSS. Stop the server with `kill %1` when done.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "Restructure page into single-column researcher-site-style layout"
```

---

### Task 4: Rewrite `css/style.css` for the new single-column layout

**Files:**
- Modify: `css/style.css` (full rewrite, replacing the old rules)

**Interfaces:**
- Consumes: the class names produced by Task 3 (`.page-wrap`, `.bio`, `.bio-top`, `.bio-intro`, `.bio-list`, `.social-links`, `.section-divider`, `.section-title`, `.skills-grid`, `.skill-sub`, `.skill-item`, `.no-bullets`, `.project-list`, `.project-row`, `.project-thumb`, `.project-body`, `.pdf`, `.site-footer`, `.footer-inner`, `.footer-links`, `.footer-copy`, `.list-item`, `.profile`, `.site-name`, `.site-subtitle`).
- Produces: nothing new for later tasks — Task 5/6 append to this same file rather than depend on new selectors from it.

- [ ] **Step 1: Replace the entire contents of `css/style.css`**

```css
:root {
    --bg: #f7f5f0;
    --text: #1b1b1b;
    --accent: #d92626;
}

body.site-body {
    background: var(--bg);
    color: var(--text);
}

.page-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.bio {
    padding-top: 6rem;
    padding-bottom: 2.5rem;
}

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
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text);
}

.site-subtitle {
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

.list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 12px;
    margin-bottom: 1rem;
}

.section-divider {
    max-width: 900px;
    margin: 0 auto;
    border: none;
    border-top: 2px dashed var(--text);
    opacity: 0.5;
}

.section-title {
    font-size: 1.25rem;
    margin: 2.5rem 0 1.5rem;
    color: var(--text);
    text-align: center;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding-bottom: 2rem;
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

.project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
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

.pdf {
    height: 500px;
    width: 100%;
    max-width: 500px;
    margin-bottom: 2rem;
}

.site-footer {
    padding: 2rem 0;
    margin-top: 2rem;
    border-top: 2px solid var(--text);
}

.footer-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.footer-links {
    gap: 0.75rem;
}

@media (max-width: 600px) {
    .bio-top {
        flex-direction: column;
        text-align: center;
    }
    .project-row {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}
```

- [ ] **Step 2: Verify no leftover rules reference removed selectors**

```bash
grep -n "\.background\b\|\.home\b\|\.about\b" css/style.css
```

Expected: no output — the old full-viewport `.home`/`.background` hero rules and the old `.about` margin rule are gone, replaced by `.bio`/`.page-wrap`.

- [ ] **Step 3: Visual check**

```bash
python3 -m http.server 8000 &
sleep 1
xdg-open http://localhost:8000/index.html
```

Confirm: content is centered in a ~900px column, profile photo circular and sits beside the name, dashed dividers appear between sections, project rows stack vertically with thumbnail + text side by side, layout collapses to a single centered column on a narrow (mobile-width) browser window. `kill %1` when done.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "Add single-column researcher-site-style layout CSS"
```

---

### Task 5: Add scroll-reveal animation script

**Files:**
- Create: `js/animations.js`

**Interfaces:**
- Consumes: `.reveal` elements placed in Task 3's HTML (bio list, skills/projects/resume/contact sections).
- Produces: `.is-visible` class toggled onto `.reveal` elements — Task 6's CSS defines the transition between the two states.

- [ ] **Step 1: Create `js/animations.js`**

```js
(function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var revealEls = document.querySelectorAll('.reveal');

    if (prefersReduced || !('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
        observer.observe(el);
    });
})();
```

- [ ] **Step 2: Verify the script is wired up in `index.html`**

```bash
grep -n 'script src="js/animations.js"' index.html
```

Expected: one match (already added in Task 3 Step 1).

- [ ] **Step 3: Verify in-browser behavior via the console**

```bash
python3 -m http.server 8000 &
sleep 1
xdg-open http://localhost:8000/index.html
```

In the browser dev tools console, run:
```js
document.querySelectorAll('.reveal.is-visible').length
document.querySelectorAll('.reveal').length
```
Expected: scrolling down the page causes each `.reveal` section's count of `.is-visible` to increase as it enters the viewport, and both numbers become equal once you've scrolled to the bottom. `kill %1` when done.

- [ ] **Step 4: Verify reduced-motion behavior**

In Chrome/Firefox dev tools, open the Rendering tab (or Command Palette → "Show Rendering") and set "Emulate CSS media feature prefers-reduced-motion" to `reduce`, then reload the page. Confirm in the console that `document.querySelectorAll('.reveal.is-visible').length === document.querySelectorAll('.reveal').length` immediately on load (no scrolling needed).

- [ ] **Step 5: Commit**

```bash
git add js/animations.js
git commit -m "Add scroll-reveal animation script with reduced-motion support"
```

---

### Task 6: Add animation CSS (reveal transition, button press, hover flicker, row jump)

**Files:**
- Modify: `css/style.css` (append new rules)

**Interfaces:**
- Consumes: `.reveal`/`.is-visible` classes from Task 5, `.nes-btn` (from NES.css CDN), `.nav-link`/`.section-title` from Task 3, `.project-row`/`.skill-sub` from Task 3/4.
- Produces: nothing further downstream — this is the last styling task.

- [ ] **Step 1: Append the following to the end of `css/style.css`**

```css
/* Scroll-reveal transition */
.reveal {
    opacity: 0;
    transform: translateY(24px);
}

.reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.15s steps(4, end), transform 0.15s steps(4, end);
}

/* NES-style button press snap */
.nes-btn:active {
    transform: translate(2px, 2px);
}

/* Pixel-flicker hover on nav links and section titles */
.nav-link:hover,
.section-title:hover {
    animation: pixel-flicker 0.4s steps(2, end) infinite;
}

@keyframes pixel-flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

/* Project row / skill card hover jump */
.project-row,
.skill-sub {
    transition: transform 0s;
}

.project-row:hover,
.skill-sub:hover {
    transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
    .reveal {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
    .nav-link:hover,
    .section-title:hover {
        animation: none !important;
    }
    .project-row:hover,
    .skill-sub:hover {
        transform: none !important;
    }
    .nes-btn:active {
        transform: none !important;
    }
}
```

- [ ] **Step 2: Verify the reduced-motion override block exists**

```bash
grep -n "prefers-reduced-motion" css/style.css
```

Expected: at least one match.

- [ ] **Step 3: Visual/interaction check**

```bash
python3 -m http.server 8000 &
sleep 1
xdg-open http://localhost:8000/index.html
```

Confirm: hovering a project row or skill card snaps it upward slightly; hovering a nav link or section title produces a quick flicker; clicking (holding down on) a `nes-btn` snaps it down-right 2px; scrolling reveals each section in a blocky (stepped, not smooth) fade/slide. Re-enable the reduced-motion emulation from Task 5 Step 4 and confirm all of the above hover/click effects are disabled. `kill %1` when done.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "Add pixel-style hover, press, and scroll-reveal animation CSS"
```

---

### Task 7: Full end-to-end verification pass

**Files:**
- None (verification only; fixes here are only to address anything the earlier tasks' checks missed).

**Interfaces:**
- Consumes: the fully assembled site from Tasks 1–6.

- [ ] **Step 1: Confirm the stray PDF is gone and the git tree is clean**

```bash
test -f "Academic History.pdf" && echo "STILL PRESENT (bug)" || echo "removed OK"
git status --short
```

Expected: `removed OK`, and `git status --short` prints nothing (everything committed).

- [ ] **Step 2: Full link/asset check**

```bash
python3 -m http.server 8000 &
sleep 1
for path in \
  index.html \
  css/style.css \
  js/animations.js \
  assets/images/me.jpeg \
  assets/images/background.png \
  assets/images/animated.gif \
  assets/icons/emojis/waving-hand.png \
  assets/icons/skills/python.png \
  assets/projects/guesswho.jpg \
  assets/projects/social-distance.png \
  assets/docs/resume.pdf ; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8000/$path")
  echo "$path -> $code"
done
kill %1
```

Expected: every path returns `200`.

- [ ] **Step 3: Manual browser walkthrough**

```bash
python3 -m http.server 8000 &
sleep 1
xdg-open http://localhost:8000/index.html
```

Click every nav link (About Me, Skills, Projects, Resume, Contact) and confirm it scrolls to the right section. Click the LinkedIn, GitHub, and Resume buttons in the bio block and confirm they open the right targets in a new tab. Click each project's GitHub icon. Resize the browser to a narrow (mobile) width and confirm the bio block and project rows stack vertically and remain readable. Open the browser console and confirm there are no errors logged. `kill %1` when done.

- [ ] **Step 4: Final commit (only if Step 1–3 surfaced fixes; otherwise skip)**

```bash
git add -A
git commit -m "Final verification pass for website redesign"
```
