# TACTICAL_INTEL Portfolio - Agent Blueprint

> **Project Type**: Personal Portfolio / Developer Showcase  
> **Architecture**: Static Site with PWA capabilities  
> **Aesthetic**: Tactical HUD / Terminal Interface  
> **Primary Stack**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5  
> **Build Tool**: Vite (primary) / Gulp (legacy)  
> **Linting**: ESLint flat config + Prettier  
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
- AI-powered chatbot with local knowledge base
- Procedural audio engine for HUD interactions

---

## 2. Directory Structure

```
Portfolio_Terminal/
├── index.html                 # Main operative interface (Tactical HUD)
├── resume.html               # Printable resume page
├── theme-ironforge.html      # Alternative Ironforge theme
├── sw.js                     # Service Worker (PWA offline support)
├── manifest.json             # PWA manifest
├── package.json              # NPM dependencies & build scripts
├── vite.config.js            # Vite build configuration
├── eslint.config.js          # ESLint flat config
├── .prettierrc               # Prettier formatting config
├── gulpfile.js               # Legacy Gulp build (preserved)
├── main.js                   # Module load-order documentation
│
├── css/                      # Stylesheets (modular architecture)
│   ├── modern-custom.css     # Core styles + Bootstrap overrides
│   ├── tactical-hud.css      # HUD-specific components
│   ├── tactical-enhancements.css # Advanced effects & animations
│   ├── file-tree.css         # VS Code-style file explorer
│   ├── floating-widgets.css  # HUD widget styling
│   ├── github-feed.css       # GitHub integration styles
│   └── deep-black-terminal.css # Terminal-specific styling
│
├── js/                       # JavaScript modules (tactical architecture)
│   ├── data.js               # CENTRAL DATA SOURCE - All portfolio content
│   ├── audio-engine.js       # Procedural sound effects (extracted module)
│   ├── tactical-core.js      # Core UI, theme management, skills globe
│   ├── tactical-data.js      # Data rendering & GitHub integration
│   ├── tactical-enhancements.js # Keyboard shortcuts, command palette, animations
│   ├── tactical-widgets.js   # HUD widgets (stats, geospatial map)
│   ├── terminal.js           # Interactive CLI terminal
│   ├── widgets.js            # UI widget utilities
│   ├── ai-bot.js             # AI assistant integration (secured)
│   ├── command-palette.js    # Quick command palette
│   ├── portfolio-bridge.js   # External project viewer
│   ├── github-feed.js        # GitHub repo fetching
│   ├── floating-widgets.js   # Floating HUD widgets
│   ├── pwa-loader.js         # Service Worker registration
│   └── debug-widgets.js      # Development debugging tools
│
│   Note: Bootstrap 5.3 & Font Awesome 6.4 are loaded via CDN.
│
├── img/                      # Portfolio images & assets
├── scripts/                  # Python utility scripts
├── scss/                     # SASS source files
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
| **Vite** | Primary build tool & dev server (ESM-native, fast HMR) |
| **Gulp** | Legacy build tool (preserved for backward compatibility) |
| **ESLint** | Code linting with flat config |
| **Prettier** | Code formatting |
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

All content is stored in a single `DATA` object exposed as `window.DATA`:

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
1. data.js          → Exposes DATA object (window.DATA)
2. tactical-data.js → Fetches Google Sheets data, falls back to DATA
3. index.html       → Displays rendered content
```

### External Data Integration
- **Google Sheets API**: Live data sync via CSV export URL
- **GitHub API**: `fetchGithubRepos()` pulls public repositories
- **Browser APIs**: Battery, Memory, Speech Synthesis, Geolocation

---

## 5. Key Components

### 5.1 Audio Engine (`js/audio-engine.js`)
- **Purpose**: Procedural sound effects for HUD interactions
- **Extracted from**: `tactical-enhancements.js` (to break circular dependencies)
- **Sounds**: beep, type, hover, click (all generated via Web Audio API)
- **Global**: Exposed as `window.AudioEngine`
- **Controls**: Toggle via keyboard `a` key or terminal

### 5.2 Tactical Terminal (`js/terminal.js`)
- **Purpose**: Interactive CLI for direct system interaction
- **Features**:
  - Command history & autocomplete (Tab)
  - System diagnostics (`status`, `neofetch`)
  - Project browsing (`ls`, `cat`)
  - Blog editor mode (`write`, `save`, `abort`)
  - AI key management (`link_gemini`)

**Available Commands:**
```
help           Show this command directory
neofetch       System summary & specs
ls [-a]        List project archive nodes
cat [id]       Display project dossier by ID
whoami         Operative identification
status         System diagnostics
clearance      Elevate security clearance display
write [title]  Start blog editor mode
save           Commit buffer to Intel Reports
abort          Clear buffer & exit editor mode
echo [text]    Reflect input back to output
pwd            Print working directory
clear          Reset shell
exit           Terminate session (close terminal)
```

### 5.3 HUD Widgets (`js/tactical-widgets.js`, `js/widgets.js`)
- Session analytics (time on site, page views)
- Real-time skill progress bars
- Interactive radar charts for skill visualization
- Floating system stats widgets
- Geospatial impact map

### 5.4 Portfolio Bridge (`js/portfolio-bridge.js`)
- Opens external projects in HUD-styled modal
- Sandboxed iframe with security controls
- Blocked domain list for external redirects

### 5.5 AI Bot (`js/ai-bot.js`)
- Local knowledge-based responses (no API key required)
- Optional Gemini/OpenAI integration via `link_gemini` / `link_openai`
- **Security**: All API keys stored in `localStorage` only — never hardcoded
- TTS (Text-to-Speech) integration via Web Speech API

### 5.6 Command Palette (`js/command-palette.js`)
- VS Code-style quick navigation (Ctrl+K or `/`)
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
| `github-feed.css` | GitHub activity feed styling |
| `deep-black-terminal.css` | Terminal-specific dark styling |

### Theming Architecture (Multi-Page)
The project supports full-page UX/UI replacements via distinct HTML files. For details, see [THEMING_ARCHITECTURE.md](./THEMING_ARCHITECTURE.md).

### Design System

**Color Palette:**
- Primary: `#22c55e` (Terminal Green)
- Dark Theme: `#051410` (Deep Black)
- Accent: `#a3e635` (HUD Lime)

**Typography:**
- Headings: `Saira Extra Condensed` (Google Fonts)
- Body: `Open Sans` (Google Fonts)
- Mono: `JetBrains Mono` for terminal/code

**Effects:**
- Glitch text animations
- CRT scanlines (subtle)
- Progress bar animations
- Hover glow effects

---

## 7. Build & Deployment

### NPM Scripts (Vite — Primary)
```json
{
  "dev": "vite",              // Dev server with HMR
  "build": "vite build",      // Production build
  "preview": "vite preview",  // Preview production build
  "lint": "eslint js/",       // Lint JS files
  "lint:fix": "eslint js/ --fix",
  "format": "prettier --write js/**/*.js"
}
```

### Legacy Gulp Scripts (preserved)
```json
{
  "legacy:start": "gulp watch",
  "legacy:build": "gulp",
  "legacy:bundle": "gulp bundle"
}
```

### Deployment Flow
1. Develop locally: `npm run dev`
2. Lint & format: `npm run lint` / `npm run format`
3. Build for production: `npm run build`
4. Push to GitHub: `git push origin master`
5. GitHub Pages auto-deploys from `master` branch

---

## 8. PWA Specifications

### Service Worker Strategy (`sw.js`)

**Cache Configuration:**
- Cache Name: `tactical-intel-v4`
- Static Assets: Core HTML, CSS, JS, images

**Fetch Strategies:**
- **Navigation (HTML)**: Network-First → updates immediately, fallback to cache
- **Static Assets**: Stale-While-Revalidate → fast load + background update

### Manifest (`manifest.json`)
- App Name: "Tactical Intel Portfolio"
- Short Name: "Tactical Intel"
- Theme: Dark (#051410)
- Display: Standalone

---

## 9. Module Load Order

Scripts load via `<script defer>` tags in `index.html`. The order matters:

1. `data.js` → Exposes `window.DATA`
2. `audio-engine.js` → Exposes `window.AudioEngine`
3. `tactical-core.js` → Uses `AudioEngine` at call-time
4. `tactical-data.js` → Uses `window.DATA` for rendering
5. `pwa-loader.js` → Service Worker registration
6. `tactical-widgets.js` → HUD stats & map
7. `terminal.js` → CLI terminal
8. `widgets.js` → UI utilities
9. `ai-bot.js` → AI chatbot
10. `tactical-enhancements.js` → Keyboard, palette, animations
11. `floating-widgets.js` → Draggable widgets
12. `github-feed.js` → GitHub activity
13. `portfolio-bridge.js` → External project viewer
14. `command-palette.js` → VS Code-style palette

---

## 10. Extension Points

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

### Adding New Terminal Commands
Edit `js/terminal.js` → `terminalCommands` object:
```javascript
mycommand: (args) => {
    return `Output: ${args.join(' ')}`;
}
```

### Adding New Themes
See [THEMING_ARCHITECTURE.md](./THEMING_ARCHITECTURE.md).

---

## 11. Browser APIs Used

| API | Purpose | File |
|-----|---------|------|
| **Cache API** | PWA offline storage | `sw.js` |
| **Battery API** | System health display | `tactical-core.js` |
| **Device Memory** | RAM info display | `tactical-core.js` |
| **Speech Synthesis** | AI bot voice | `ai-bot.js` |
| **AudioContext** | Procedural sound effects | `audio-engine.js` |
| **LocalStorage** | Theme preference, API keys | `tactical-core.js`, `ai-bot.js` |
| **Fetch API** | GitHub repos, Google Sheets | `github-feed.js`, `tactical-data.js` |
| **IntersectionObserver** | Scroll animations | `tactical-enhancements.js` |

---

## 12. Security

- **No hardcoded API keys**: All AI provider keys are stored in browser `localStorage` only.
- **Sandboxed iframes**: Portfolio Bridge uses sandboxed iframes for external viewing.
- **Blocked domains**: WhatsApp, social media, and other restricted nodes open in new tabs.
- **XSS awareness**: Template literals used for rendering from trusted data only.

---

## 13. Development Guidelines

### Code Style
- **ES6+** syntax (arrow functions, destructuring, template literals)
- **Modular architecture** — each file has a single responsibility
- **Global namespace pattern**: Files expose via `window.*` for classic script loading
- **ESLint + Prettier**: Enforced code quality (run `npm run lint` and `npm run format`)

### Performance Considerations
- **Lazy loading**: Images load on scroll
- **Debounced events**: Scroll/resize handlers use RAF
- **Minimal DOM manipulation**: Batch updates where possible
- **AudioEngine**: Procedural sounds (no audio file downloads)

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support (j/k, Ctrl+K, /)
- Focus indicators for terminal/palette
- Semantic HTML5 structure

---

## 14. Troubleshooting

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

### Lint Errors
```bash
# Auto-fix most issues
npm run lint:fix

# Format all files
npm run format
```

---

## 15. Future Enhancements

- [ ] Blog content management system
- [ ] Dynamic project loading from headless CMS
- [ ] Migrate to ES modules (add `type="module"` to script tags)
- [ ] WebGL particle background effects
- [ ] Real-time GitHub contribution graph
- [ ] Contact form with serverless backend
- [ ] Convert to TypeScript for type safety

---

## 16. Credits & License

- **Original Template**: Start Bootstrap Resume (MIT License)
- **Author**: Sajid Islam
- **Copyright**: 2025 Sajid Islam
- **License**: MIT

---

**END OF BLUEPRINT**

*For questions or contributions, use the terminal command: `contact`*
