# Theming Architecture

The portfolio implements a **Multi-Page Routing & Dynamic Data Theming Architecture**. Distinct themes (which completely alter the UI/UX layout, DOM structure, and CSS framework) are split into separate HTML files at the root level. A root index script routes the visitor to their active or last-used theme.

This approach guarantees that:
1. Each theme can use entirely different HTML structures (e.g., Tailwind vs. Bootstrap) and styles.
2. Core data is completely synchronized, dynamic, and shared. A single central data script updates all themes instantly.
3. The light/dark mode teardrop switcher animation is global, modular, and reusable on any theme.

## Core Theming Components

### 1. Default Primary Theme (`index.html`)
- `index.html` directly serves the primary **Lamplight & Signal** cinematic theme with zero redirect delays, full SEO metadata, and instant rendering.
- `theme-lamplight.html` is maintained as a seamless entry point and alias.
- Users can switch to any other theme (Tactical Forge, Sketchbook Ink) at any time via the persistent Theme Switcher header menu.

### 2. Unified Global Data (`js/data/index.js`)
- Exposes `window.PortfolioData` as the single source of truth for the entire portfolio.
- Provides functions (`getInfo()`, `getExperiences()`, `getEducation()`, `getProjects()`, `getSkills()`) returning mapped, normalized data models.
- All data is sourced locally from exported constants — no external API calls or remote data fetching.

### 3. Global Teardrop Transition (`js/theme-switcher-ripple.js`)
- Exposes a reusable helper `window.initThemeToggleWithRipple(options)`.
- Automatically injects the WebGL shaders, SVG droplets, and CSS ripple animations dynamically into the document `<head>`.
- Any theme (present or future) can link this file, provide selector references and theme toggling callbacks, and get the beautiful teardrop light/dark mode transition out-of-the-box.

## Current Themes
- **Lamplight & Signal (Default)** (`index.html` / `theme-lamplight.html`): Cinematic scroll-driven story with WebP scrubbed image sequences, procedural canvas motes/bars, live KPI impact dashboard, and case files.
- **Sketchbook Ink** (`theme-sketchbook.html`): High-aesthetic hand-drawn sketch dashboard built using Tailwind and SVG displacement filters.
- **Tactical Forge** (`theme-tactical.html`): High-energy unified theme merging Tactical HUD and Ironforge Studio. Features interactive terminal CLI, cyber telemetry HUD, audio engine, hero visual reels with Ken Burns playback, athletic marquee tickers, and interactive 3D flip cards for career milestones.
- **Legacy Ironforge Gateway** (`theme-ironforge.html`): Zero-delay gateway redirecting historical bookmarks to Tactical Forge.
- **Interactive Resume** (`resume.html`): Clean, ATS-optimized printable resume with live company credentials.

---

## How to Add a New Theme
If a developer needs to add a new theme layout (e.g., `theme-cyberpunk.html`):
1. **Create HTML**: Create the new HTML file in the root directory.
2. **Import Libraries**: Load the global scripts in the `<head>`:
   ```html
   <script type="module" src="js/data/index.js"></script>
   <script type="module" src="js/theme-switcher-ripple.js"></script>
   ```
3. **Add Navigation Switcher**: Put the Theme switcher dropdown/links in your navigation bar, referencing the separate HTML files:
   - `theme-sketchbook.html`
   - `theme-tactical.html`
   - `theme-ironforge.html`
   - `theme-cyberpunk.html`
   Remember to update the dropdown switcher list in all other themes too.
4. **Initialize Switcher & Tracking**: At the end of your theme's script block, register the teardrop ripple handler and trace the active file:
   ```javascript
   localStorage.setItem('portfolio-active-theme', 'theme-cyberpunk.html');

   window.initThemeToggleWithRipple({
     buttonId: 'theme-toggle',
     getTheme: () => document.documentElement.getAttribute('data-theme') || 'dark',
     applyTheme: (theme) => {
       document.documentElement.setAttribute('data-theme', theme);
       // custom page theme updates...
     },
     saveTheme: (theme) => localStorage.setItem('tactical-theme', theme)
   });
   ```
5. **Render Content Dynamically**: Call `window.PortfolioData.load()` on DOM content loaded, and use modular functions to inject experiences, education, and projects from the global provider.

