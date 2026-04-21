# Sajid Islam || [TACTICAL_INTEL] Portfolio

![Portfolio Preview](img/profile.jpg)

A high-performance, modular portfolio for a **Data Scientist & Business Analyst** built with a "Tactical HUD" aesthetic. This project combines modern web technologies with a terminal-driven user experience.

## 🚀 Key Features

- **PWA Ready**: Offline support and home screen installation via `sw.js`.
- **Tactical Terminal**: An interactive CLI for direct contact, system diagnostics, and cache management.
- **Data-Driven Visualization**: Real-time session analytics and interactive skills radar charts.
- **Secure Portfolio Bridge**: A HUD-style window to browse external projects without leaving the site.
- **Modular Architecture**: Clean separation of concerns between structure (HTML), styling (CSS), and logic (JS).
- **Responsive Resume**: Integrated `resume.html` with PDF-export support.

## 📁 Directory Structure

```text
├── archive/           # Old/Backup HTML files
├── css/               # Modular CSS (HUD, Tactical, Enhancements)
├── img/               # Optimized profile and project images
├── js/                # Modular JavaScript (Modularized for easier dev)
│   ├── terminal.js    # Terminal logic
│   ├── widgets.js     # HUD widgets and analytics
│   ├── pwa-loader.js  # Service Worker management
│   └── ...            # Other helpers
├── scripts/           # Python & Data utility scripts
├── vendor/            # Third-party libraries (Bootstrap, FontAwesome)
└── index.html         # Main operative interface
```

## 🛠️ Development & Deployment

### Quick Start
1.  **Clone**: `git clone https://github.com/saajiidi/saajiidi.github.io.git`
2.  **Install**: `npm install` (requires Node.js)
3.  **Run**: `npm start` (opens BrowserSync on port 3000)

### Building Assets
The project uses Gulp to manage SASS, JS minification, and asset bundling:
- `npm start`: Live-reload development mode with BrowserSync.
- `npm run build`: Compiles all assets for production.
- `npm run bundle`: Bundles and minifies CSS/JS into `dist/` for optimal performance.
- `npm run build:prod`: Full production build with bundling.

### Performance Optimizations Implemented
- **Preconnect hints**: DNS prefetch and preconnect to critical origins (fonts, CDNs)
- **Deferred loading**: Non-critical JS loads with `defer` attribute
- **Lazy-loaded Chart.js**: Chart library loads on-demand when skills section is visible
- **CSS/JS bundling**: Use `npm run bundle` to create optimized `dist/bundle.min.css` and `dist/critical.min.js`
- **Error boundaries**: Render functions have try-catch error handling with user-friendly error messages

### Static Data
The `PortfolioData.xlsx` file in the `scripts/` folder contains the master copy of the portfolio data. Use `generate_spreadsheet.py` to regenerate values if needed.

## 📡 Live Updates
If updates are not applying immediately on GitHub Pages, use the built-in terminal:
1.  Click the **Terminal** icon.
2.  Type `flush` and press Enter.
3.  The system will reboot and fetch the latest intel from the network.

## 📝 License
Copyright © 2025 Sajid Islam. Released under the MIT License.
Based on the [Start Bootstrap Resume](https://startbootstrap.com/template-overviews/resume/) template.
