/**
 * MAIN ENTRY POINT - Tactical Intel Portfolio
 *
 * This file is documentation of the module initialization order.
 * The site currently uses classic <script defer> tags in index.html
 * to load modules in the correct dependency order.
 *
 * Load order:
 *  1. data.js          (exposes window.DATA)
 *  2. audio-engine.js  (exposes window.AudioEngine)
 *  3. tactical-core.js (uses AudioEngine at call-time)
 *  4. tactical-enhancements.js (uses AudioEngine, glitchEffect)
 *  5. tactical-data.js (uses window.DATA)
 *  6. terminal.js
 *  7. widgets.js
 *  8. ai-bot.js
 *  9. floating-widgets.js
 * 10. github-feed.js
 * 11. portfolio-bridge.js
 * 12. command-palette.js
 * 13. tactical-widgets.js
 * 14. pwa-loader.js
 * 15. debug-widgets.js
 *
 * To migrate fully to ES modules in the future:
 *  1. Add type="module" to the <script> tag in index.html
 *  2. Uncomment the import statements below
 *  3. Remove the corresponding <script> tags from index.html
 *  4. Each file must export its key functions/classes
 */
