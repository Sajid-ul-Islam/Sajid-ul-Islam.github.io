# TACTICAL_INTEL Portfolio - Agent Blueprint

> **Project Type**: Personal Portfolio / Developer Showcase  
> **Architecture**: Static Site with PWA capabilities  
> **Aesthetic**: Tactical HUD / Terminal Interface  
> **Primary Stack**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5  
> **Build Tool**: Gulp + SASS  
> **Deployment**: GitHub Pages

---

## 1. Executive Summary

This is a high-performance, modular portfolio for a Data Scientist & Business Analyst. The design follows a "Tactical HUD" aesthetic inspired by military command interfaces and terminal UIs. It features an interactive CLI terminal, PWA support, real-time session analytics, and a modular JavaScript architecture.

**Key Value Propositions:**
- PWA-ready with offline support via Service Worker
- Interactive tactical terminal with command palette
- Data-driven visualization with skill radar charts
- Secure portfolio bridge for external projects
- Responsive resume with PDF export capability

---

## 2. Directory Structure

```
Portfolio_Terminal/
├── index.html                 # Main operative interface (Tactical HUD)
├── resume.html               # Printable resume page
├── sw.js                     # Service Worker (PWA offline support)
├── manifest.json             # PWA manifest
├── package.json              # NPM dependencies & build scripts
├── gulpfile.js               # Gulp build configuration
│
├── css/                      # Stylesheets (modular architecture)
│   ├── modern-custom.css     # Core styles + Bootstrap overrides
│   ├── tactical-hud.css      # HUD-specific components
│   ├── tactical-enhancements.css # Advanced effects & animations
│   ├── file-tree.css         # VS Code-style file explorer
│   ├── floating-widgets.css  # HUD widget styling
│   ├── github-feed.css       # GitHub integration styles
│   ├── resume.css            # Resume page styles
│   └── deep-black-terminal.css # Terminal-specific styling
│
├── js/                       # JavaScript modules (tactical architecture)
│   ├── data.js               # CENTRAL DATA SOURCE - All portfolio content
│   ├── tactical-core.js      # Core UI, theme management, audio engine
│   ├── tactical-data.js      # Data rendering & GitHub integration
│   ├── tactical-enhancements.js # Advanced HUD effects & interactions
│   ├── tactical-widgets.js   # HUD widgets (stats, charts)
│   ├── terminal.js           # Interactive CLI terminal
│   ├── widgets.js            # UI widget utilities
│   ├── ai-bot.js             # AI assistant integration
│   ├── command-palette.js    # Quick command palette
│   ├── portfolio-bridge.js   # External project viewer
│   ├── github-feed.js        # GitHub repo fetching
│   ├── floating-widgets.js   # Floating HUD widgets
│   ├── pwa-loader.js         # Service Worker registration
│   ├── resume.js             # Resume page logic
│   └── debug-widgets.js      # Development debugging tools
│
├── vendor/                   # Third-party libraries
│   ├── bootstrap/            # Bootstrap 5.3.0
│   ├── fontawesome/          # Font Awesome 6.4.0
│   └── jquery/               # jQuery 3.7.1
│
├── img/                      # Portfolio images & assets
├── scripts/                  # Python utility scripts
├── scss/                     # SASS source files
├── archive/                  # Legacy/backup files
└── .github/                  # GitHub Actions/workflows
```

---

## 3. Technology Stack

### Core Technologies
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 | Semantic markup, PWA manifest integration |
| **Styling** | CSS3 + SASS | Modular styles with Bootstrap 5.3 base |
| **Logic** | Vanilla ES6+ | Modular JS architecture, no framework |
| **UI Framework** | Bootstrap 5.3 | Grid system, components, responsive utilities |
| **Icons** | Font Awesome 6.4 | Iconography throughout interface |
| **Animation** | CSS3 + JS | Glitch effects, progress bars, transitions |

### Build & Development
| Tool | Purpose |
|------|---------|
| **Gulp** | Task runner (SASS compile, minification, live reload) |
| **BrowserSync** | Development server with hot reload |
| **SASS** | CSS preprocessing |
| **GitHub Pages** | Static hosting & deployment |

### PWA Features
| Feature | Implementation |
|---------|---------------|
| **Service Worker** | `sw.js` - Network-first strategy for HTML, stale-while-revalidate for assets |
| **Manifest** | `manifest.json` - Add to home screen, theme colors |
| **Offline Support** | Cache API for static assets |

---

## 4. Data Architecture

### Central Data Source (`js/data.js`)

All content is stored in a single `DATA` object exported as a global constant:

```javascript
const DATA = {
  projects: [...],        // Portfolio projects with case studies
  blogPosts: [...],        // Blog articles
  learningItems: [...],    // Current learning track (ML, AI, etc.)
  gaming: {...},           // Gaming stats & favorites
  favoriteMedia: [...],    // Favorite movies/books
  fileTreeData: [...],     // VS Code-style file explorer
  socialLinks: [...],      // Social media links
  skillGroups: [...],      // Skills with levels & categories
  experiences: [...]       // Work history
};
```

### Data Flow

```
1. data.js        → Exports DATA object (static content)
2. tactical-data.js → Renders DATA into DOM elements
3. index.html     → Displays rendered content
```

### External Data Integration
- **GitHub API**: `fetchGithubRepos()` pulls public repositories
- **Browser APIs**: Battery, Memory, Speech Synthesis, Geolocation

---

## 5. Key Components

### 5.1 Tactical Terminal (`js/terminal.js`)
- **Purpose**: Interactive CLI for direct system interaction
- **Features**:
  - Command history & autocomplete
  - System diagnostics (`status`, `health`)
  - Cache management (`flush`, `reload`)
  - Contact integration (`contact`, `email`)
  - Easter eggs (`matrix`, `party`)

**Available Commands:**
```
help, clear, date, whoami, social, contact
projects, skills, flush, reload, reboot
matrix, party, weather, joke, quote
```

### 5.2 HUD Widgets (`js/tactical-widgets.js`, `js/widgets.js`)
- Session analytics (time on site, page views)
- Real-time skill progress bars
- Interactive radar charts for skill visualization
- Floating system stats widgets

### 5.3 Portfolio Bridge (`js/portfolio-bridge.js`)
- Opens external projects in HUD-styled modal
- Sandboxed iframe with security controls
- Prevents navigation away from main site

### 5.4 AI Bot (`js/ai-bot.js`)
- Conversational interface
- TTS (Text-to-Speech) integration via Web Speech API
- Contextual responses based on portfolio content

### 5.5 Command Palette (`js/command-palette.js`)
- VS Code-style quick navigation (Ctrl+K)
- Search projects, skills, sections
- Keyboard-driven workflow

---

## 6. Styling Architecture

### CSS Modularization

| File | Responsibility |
|------|---------------|
| `modern-custom.css` | Base styles, Bootstrap overrides, responsive utilities |
| `tactical-hud.css` | HUD-specific: panels, borders, terminals, progress bars |
| `tactical-enhancements.css` | Animations: glitch effects, scanlines, cyberpunk elements |
| `file-tree.css` | VS Code file explorer styling |
| `floating-widgets.css` | HUD overlay widgets |

### Design System

**Color Palette:**
- Primary: `#007bff` (Bootstrap blue)
- Dark Theme: `#0d1117` (GitHub dark)
- Terminal Green: `#28a745`
- Alert/Accent: `#dc3545`
- HUD Cyan: `#00d4ff`

**Typography:**
- Headings: `Saira Extra Condensed` (Google Fonts)
- Body: `Open Sans` (Google Fonts)
- Mono: System monospace for terminal/code

**Effects:**
- Glitch text animations
- CRT scanlines (subtle)
- Progress bar animations
- Hover glow effects

---

## 7. Build & Deployment

### NPM Scripts
```json
{
  "start": "gulp watch",      // Development with BrowserSync
  "build": "gulp"              // Production build (compile SASS, minify)
}
```

### Gulp Tasks
1. **SASS Compilation** → `scss/` to `css/`
2. **CSS Minification** → `.min.css` production files
3. **JS Minification** → `.min.js` production files
4. **BrowserSync** → Local dev server on port 3000

### Deployment Flow
1. Develop locally: `npm start`
2. Build for production: `npm run build`
3. Push to GitHub: `git push origin main`
4. GitHub Pages auto-deploys from `main` branch

---

## 8. PWA Specifications

### Service Worker Strategy (`sw.js`)

**Cache Configuration:**
- Cache Name: `tactical-intel-v2`
- Static Assets: Core HTML, CSS, JS, images

**Fetch Strategies:**
- **Navigation (HTML)**: Network-First → updates immediately, fallback to cache
- **Static Assets**: Stale-While-Revalidate → fast load + background update

### Manifest (`manifest.json`)
- App Name: "Tactical Intel Portfolio"
- Short Name: "Portfolio"
- Theme: Dark (#0d1117)
- Display: Standalone
- Icons: Multiple sizes for all platforms

---

## 9. Extension Points

### Adding New Projects
Edit `js/data.js` → `DATA.projects` array:
```javascript
{
  id: "unique-id",
  title: "Project Name",
  description: "...",
  image: "img/projects/image.png",
  liveUrl: "https://...",
  technologies: ["Tech1", "Tech2"],
  category: "ml-ai|bi-viz|automation|web-apps",
  caseStudy: { role, timeline, problem, solution, impact, metrics }
}
```

### Adding Learning Items
Edit `js/data.js` → `DATA.learningItems`:
```javascript
{ name: "New Skill", category: "AI|ML|Data Ops", progress: 75 }
```

### Adding New Terminal Commands
Edit `js/terminal.js` → `TERMINAL_COMMANDS` object:
```javascript
newcommand: {
  description: "What it does",
  action: () => { /* implementation */ }
}
```

---

## 10. Browser APIs Used

| API | Purpose | File |
|-----|---------|------|
| **Cache API** | PWA offline storage | `sw.js` |
| **Battery API** | System health display | `tactical-core.js` |
| **Device Memory** | RAM info display | `tactical-core.js` |
| **Speech Synthesis** | AI bot voice | `tactical-core.js` |
| **Geolocation** | Location-based features | `tactical-enhancements.js` |
| **LocalStorage** | Theme preference, session data | `tactical-core.js` |
| **Fetch API** | GitHub repos, external data | `github-feed.js` |
| **IntersectionObserver** | Scroll animations | `tactical-enhancements.js` |

---

## 11. Development Guidelines

### Code Style
- **ES6+** syntax (arrow functions, destructuring, template literals)
- **Modular architecture** - each file has a single responsibility
- **JSDoc comments** for complex functions
- **Global namespaces** minimized (`window.DATA`, `window.TACTICAL_INFO`)

### Performance Considerations
- **Lazy loading**: Images load on scroll
- **Debounced events**: Scroll/resize handlers
- **Minimal DOM manipulation**: Batch updates where possible
- **Cached selectors**: Query DOM once, reference stored

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators for terminal/palette
- Semantic HTML5 structure

---

## 12. Troubleshooting

### Cache Not Updating
1. Open Terminal (click terminal icon)
2. Type `flush` and press Enter
3. Or hard reload: Ctrl+Shift+R

### Service Worker Issues
```javascript
// In console:
navigator.serviceWorker.getRegistrations().then(r => {
  r.forEach(reg => reg.unregister());
});
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

---

## 13. Future Enhancements

- [ ] Blog content management system
- [ ] Dynamic project loading from headless CMS
- [ ] Dark/Light theme toggle refinement
- [ ] WebGL particle background effects
- [ ] Real-time GitHub contribution graph
- [ ] Contact form with serverless backend

---

## 14. Credits & License

- **Original Template**: Start Bootstrap Resume (MIT License)
- **Author**: Sajid Islam
- **Copyright**: 2025 Sajid Islam
- **License**: MIT

---

**END OF BLUEPRINT**

*For questions or contributions, use the terminal command: `contact`*
