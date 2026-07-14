# Sajid Islam || [TACTICAL_INTEL] Portfolio

![Portfolio Preview](img/profile.jpg)

A high-performance, modular portfolio for a **Data Scientist & Business Analyst** built with a "Tactical HUD" aesthetic. This project combines modern web technologies with a terminal-driven user experience.

## 🚀 Key Features

- **PWA Ready**: Offline support and home screen installation via `sw.js`.
- **Tactical Terminal**: An interactive CLI for system diagnostics, project browsing, and session management.
- **Data-Driven Visualization**: Real-time session analytics and interactive skills radar charts.
- **Secure Portfolio Bridge**: A HUD-style window to browse external projects without leaving the site.
- **Modular Architecture**: Clean separation of concerns between structure (HTML), styling (CSS), and logic (JS).
- **Responsive Resume**: Integrated `resume.html` with PDF-export support.
- **AI-Powered Chatbot**: Local knowledge base with optional Gemini/OpenAI integration.
- **Audio Engine**: Procedural sound effects for HUD interactions.

## 📁 Directory Structure

```text
├── css/                    # Modular CSS (HUD, Tactical, Enhancements)
│   ├── modern-custom.css
│   ├── tactical-hud.css
│   ├── tactical-enhancements.css
│   ├── floating-widgets.css
│   ├── github-feed.css
│   └── deep-black-terminal.css
├── img/                    # Profile and project images
├── js/                     # Modular JavaScript
│   ├── data.js             # Local static backup data source
│   ├── portfolio-data.js   # Global dynamic data hub (Google Sheets ingestion & fallback)
│   ├── theme-switcher-ripple.js # Global teardrop ripple transition animation
│   ├── audio-engine.js     # Procedural sound effects (extracted module)
│   ├── tactical-core.js    # Core UI, theme management, skills globe
│   ├── tactical-data.js    # Data rendering & mapping for Tactical HUD theme
│   ├── tactical-enhancements.js # Audio, keyboard shortcuts, command palette
│   ├── terminal.js         # Interactive CLI terminal
│   ├── widgets.js          # UI widget utilities
│   ├── ai-bot.js           # AI assistant (Gemini / local knowledge)
│   ├── command-palette.js  # Quick command palette
│   ├── portfolio-bridge.js # External project viewer
│   ├── github-feed.js      # GitHub activity feed
│   ├── floating-widgets.js # Floating HUD widgets
│   ├── tactical-widgets.js # HUD stats & geospatial map
│   ├── pwa-loader.js       # Service Worker registration
│   ├── debug-widgets.js    # Development debugging tools
│   └── theme.html          # Theme template
├── scripts/                # Python & Data utility scripts
├── scss/                   # SASS source files
├── .github/                # GitHub Actions workflows
├── sw.js                   # Service Worker (PWA offline support)
├── manifest.json           # PWA manifest
├── vite.config.js          # Vite build configuration
├── eslint.config.js        # ESLint flat config
├── .prettierrc             # Prettier formatting config
├── main.js                 # Module load-order documentation
├── index.html              # Theme Router (Gateway / Redirect Script)
├── theme-sketchbook.html   # Sketchbook Ink theme (Tailwind HUD)
├── theme-tactical.html     # Tactical HUD theme (Bootstrap HUD)
├── theme-ironforge.html    # Ironforge Studio theme (Fitness Style HUD)
├── resume.html             # Printable resume page
└── THEMING_ARCHITECTURE.md # Multi-Page Routing & Dynamic Data architecture docs
```

> **Note:** Third-party libraries (Bootstrap 5.3, Font Awesome 6.4) are loaded via CDN — no local `vendor/` directory.

## 🛠️ Development & Deployment

### Quick Start
1. **Clone**: `git clone https://github.com/Sajid-ul-Islam/Sajid-ul-Islam.github.io.git`
2. **Install**: `npm install` (requires Node.js)
3. **Run**: `npm run dev` (opens Vite dev server on port 3000)

### Available Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build with Vite |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on JS files |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |

### Legacy Gulp Scripts (preserved for backward compatibility)
| Command | Description |
|---------|-------------|
| `npm run legacy:start` | Gulp watch with BrowserSync |
| `npm run legacy:build` | Gulp production build |
| `npm run legacy:bundle` | Gulp CSS/JS bundling |

### Performance Optimizations Implemented
- **Preconnect hints**: DNS prefetch and preconnect to critical origins (fonts, CDNs)
- **Deferred loading**: Non-critical JS loads with `defer` attribute
- **Lazy-loaded Chart.js**: Chart library loads on-demand when skills section is visible
- **Error boundaries**: Render functions have try-catch error handling with user-friendly error messages
- **Modular AudioEngine**: Extracted to separate module to break circular dependencies
- **Service Worker**: Network-first strategy for HTML, stale-while-revalidate for assets

### Static Data
The `PortfolioData.xlsx` file in the `scripts/` folder contains the master copy of the portfolio data. Use `generate_spreadsheet.py` to regenerate values if needed.

## 🔑 AI Bot Configuration
The AI Oracle chatbot works using local knowledge by default. To enable live AI responses:
1. Click the **Terminal** icon to open the tactical terminal.
2. Type `link_gemini YOUR_API_KEY` and press Enter.
3. Your key is stored only in your browser's `localStorage` — it is never committed to the repo.

## 🔒 Security
- **No hardcoded API keys**: All AI provider keys are stored in browser `localStorage` only.
- **Sandboxed iframes**: Portfolio Bridge uses sandboxed iframes for external project viewing.
- **XSS awareness**: HTML template literals are used for rendering; consider DOM-based rendering for user-input contexts.

## 📝 License
Copyright © 2025 Sajid Islam. Released under the MIT License.
Based on the [Start Bootstrap Resume](https://startbootstrap.com/template-overviews/resume/) template.
