/**
 * MAIN ENTRY POINT - ES Module System
 * Consolidates all portfolio modules with proper imports/exports
 */

// ===== DATA IMPORTS =====
import { 
  DATA, PROFILE_INFO, EXPERIENCES, EDUCATION, PROJECTS, 
  SKILL_GROUPS, BLOG_POSTS, LEARNING_ITEMS, GAMING, 
  FILE_TREE, SOCIAL_LINKS, LOCAL_INTEL, SHEET_CONFIG,
  PortfolioData, parseCSV, fetchSheetData 
} from './data/index.js';

// ===== AUDIO ENGINE =====
import { AudioEngine } from './audio-engine.js';

// ===== TACTICAL CORE =====
import { 
  glitchEffect, updateThemeIcon, updateSystemHealth, 
  copyEmail, initTelemetryOverlay, SkillsGlobe,
  replayProject, MISSION_SECRETS 
} from './tactical-core.js';

// ===== TACTICAL ENHANCEMENTS =====
import { 
  ScrollGlitchEffect, KeyboardNavigator,
  AnimatedCounters, SkillProgressBars,
  TestimonialsCarousel, ScanlinePulse
} from './tactical-enhancements.js';

// ===== TACTICAL DATA =====
import { 
  initializeTacticalData, renderInfo, renderExperience, 
  renderEducation, renderSkillGroups,
  renderProjects, renderBlogs, renderLearning, renderGaming,
  renderMedia, renderFileTree, fetchGithubRepos,
  decryptDossier, toggleCaseStudy, initializeProjectFilters,
  openCaseStudy, closeCaseStudy,
  toggleTreeSection, toggleMobileSidebar, handleTreeClick,
  runTypewriter
} from './tactical-data.js';

// ===== TERMINAL =====
import { 
  toggleBottomTerminal, switchTerminalTab, startTelemetryStreams,
  cleanupTerminal, initTerminal
} from './terminal.js';

// ===== COMMAND PALETTE =====
import { initCommandPalette, togglePalette } from './command-palette.js';

// ===== FLOATING WIDGETS =====
import { FloatingWidget, initFloatingWidgets } from './floating-widgets.js';

// ===== GITHUB FEED =====
import { initGitHubFeed } from './github-feed.js';

// ===== PORTFOLIO BRIDGE (iframe uplink) =====
import { 
  openPortfolioBridge as openBridge, closePortfolioBridge as closeBridge,
  minimizePortfolioBridge, restorePortfolioBridge, toggleMaximizeBridge,
  initResizableBridge, EXTERNAL_BLOCK_LIST
} from './portfolio-bridge.js';

// ===== WIDGETS =====
import { 
  initDigitalClock, initScrollProgress, initSystemStatus,
  initLiveSearch, initPdfFab, initZenMode, initDataViz,
  initSectionAnalytics
} from './widgets.js';

// ===== TACTICAL WIDGETS =====
import { TacticalWidgets } from './tactical-widgets.js';

// ===== THEME SWITCHER =====
import { initThemeToggleWithRipple } from './theme-switcher-ripple.js';

// ===== PWA LOADER =====
import { initPWA } from './pwa-loader.js';

// ===== MAKE GLOBALS AVAILABLE =====
// Expose all needed globals for backward compatibility
window.DATA = DATA;
window.AudioEngine = AudioEngine;
window.MISSION_SECRETS = MISSION_SECRETS;
window.PortfolioData = PortfolioData;
window.projectsList = null;
window.skillsRadarChart = null;
window.chartBaseData = null;
window.TACTICAL_INFO = null;
window.TestimonialsCarousel = TestimonialsCarousel;
window.replayProject = replayProject;
window.decryptDossier = decryptDossier;
window.toggleCaseStudy = toggleCaseStudy;
window.openCaseStudy = openCaseStudy;
window.closeCaseStudy = closeCaseStudy;
window.openPortfolioBridge = openBridge;
window.closePortfolioBridge = closeBridge;
window.toggleTreeSection = toggleTreeSection;
window.toggleMobileSidebar = toggleMobileSidebar;
window.handleTreeClick = handleTreeClick;
window.switchTerminalTab = switchTerminalTab;
window.toggleBottomTerminal = toggleBottomTerminal;
window.togglePalette = togglePalette;
window.copyEmail = copyEmail;
window.handleSuggestion = null; // Will be set by ai-bot
window.glitchEffect = glitchEffect;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Core initialization
  updateSystemHealth();
  SkillsGlobe.init();
  initTelemetryOverlay();
  
  // Audio
  const musicBtn = document.getElementById('musicToggle');
  if (musicBtn) musicBtn.addEventListener('click', () => AudioEngine.toggleMusic());
  
  // Speech synthesis
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
  }
  
  // Theme management
  localStorage.setItem('portfolio-active-theme', 'theme-tactical.html');
  
  const root = document.documentElement;
  
  const applyTheme = (theme, accent) => {
    root.setAttribute('data-theme', theme);
    if (accent) root.setAttribute('data-accent', accent);
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  };
  
  const savedTheme = localStorage.getItem('tactical-theme') || 'dark';
  const savedAccent = localStorage.getItem('tactical-accent') || 'green';
  applyTheme(savedTheme, savedAccent);
  
  // Initialize theme toggle with ripple
  if (typeof initThemeToggleWithRipple === 'function') {
    initThemeToggleWithRipple({
      buttonId: 'theme-toggle',
      getTheme: () => root.getAttribute('data-theme') || 'dark',
      applyTheme: (theme) => applyTheme(theme, root.getAttribute('data-accent')),
      saveTheme: (theme) => localStorage.setItem('tactical-theme', theme)
    });
  }
  
  // Accent color switcher
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      const newAccent = e.target.getAttribute('data-color');
      const currentTheme = root.getAttribute('data-theme');
      applyTheme(currentTheme, newAccent);
      localStorage.setItem('tactical-accent', newAccent);
    });
  });
  
  // Glitch effect initializer
  document.querySelectorAll('.section-label, h2:not(.display-2)').forEach(el => {
    el.addEventListener('mouseenter', () => glitchEffect(el));
    setTimeout(() => glitchEffect(el), 500);
  });
  
  // Initialize skills radar chart
  initSkillsRadarChart();
  
  // Initialize all widget modules
  initTerminal();
  initCommandPalette();
  initializeProjectFilters();
  initDigitalClock();
  initScrollProgress();
  initSystemStatus();
  initLiveSearch();
  initPdfFab();
  initZenMode();
  initDataViz();
  initSectionAnalytics();
  
  // Initialize floating widgets (handles drag + resize)
  setTimeout(initFloatingWidgets, 500);
  
  // Initialize tactical widgets
  TacticalWidgets.init();
  
  // Initialize PWA
  initPWA();
  
  // Initialize enhancement classes
  new KeyboardNavigator();
  new ScrollGlitchEffect().init();
  ScanlinePulse.init();
  AnimatedCounters.init();
  SkillProgressBars.init();
  TestimonialsCarousel.init();
});

// ===== SKILLS RADAR CHART =====
function initSkillsRadarChart() {
  const canvas = document.getElementById('skillsChart');
  const skillMap = { 'PYTHON': 0, 'SQL': 1, 'POWER_BI': 2, 'TABLEAU': 2, 'EXCEL': 1, 'PYTHON_ML': 3, 'ML': 3, 'REACT': 4, 'NODE.JS': 4, 'GOOGLE_ANALYTICS': 5 };
  const baseData = [90, 85, 95, 70, 75, 80];
  window.chartBaseData = [...baseData];
  
  if (canvas && typeof Chart !== 'undefined') {
    const ctx = canvas.getContext('2d');
    window.skillsRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Python', 'SQL', 'BI Tools', 'ML', 'Web Dev', 'Analytics'],
        datasets: [{
          label: '[SKILL_POWER_LEVEL]',
          data: [...baseData],
          backgroundColor: 'rgba(163, 230, 53, 0.2)',
          borderColor: '#a3e635',
          borderWidth: 1,
          pointBackgroundColor: '#a3e635'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#94a3b8', font: { family: 'JetBrains Mono' } },
            ticks: { display: false },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: { legend: { display: false } }
      }
    });
    
    // Gamify connections using Event Delegation
    document.addEventListener('mouseover', (e) => {
      const badge = e.target.closest('.skill-pill-tactical, .tech-chip');
      if (badge && window.skillsRadarChart) {
        badge.style.cursor = 'pointer';
        const skill = badge.textContent.trim().toUpperCase();
        let index = skillMap[skill];
        
        if (index === undefined) {
          const labels = window.skillsRadarChart.data.labels.map(l => l.toUpperCase());
          index = labels.indexOf(skill);
        }
        
        if (index !== undefined && index !== -1) {
          const currentData = window.chartBaseData || baseData;
          const newData = currentData.map((v, i) => i === index ? 100 : v * 0.4);
          window.skillsRadarChart.data.datasets[0].data = newData;
          window.skillsRadarChart.update('none');
          badge.classList.add('pulse');
        }
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const badge = e.target.closest('.skill-pill-tactical, .tech-chip');
      if (badge && window.skillsRadarChart) {
        window.skillsRadarChart.data.datasets[0].data = [...(window.chartBaseData || baseData)];
        window.skillsRadarChart.update('none');
        badge.classList.remove('pulse');
      }
    });
  }
}

// ===== EXPORT FOR MODULE USAGE =====
export {
  DATA, PROFILE_INFO, EXPERIENCES, EDUCATION, PROJECTS,
  SKILL_GROUPS, BLOG_POSTS, LEARNING_ITEMS, GAMING,
  FILE_TREE, SOCIAL_LINKS, LOCAL_INTEL, SHEET_CONFIG,
  PortfolioData, parseCSV, fetchSheetData,
  AudioEngine, glitchEffect, updateThemeIcon, updateSystemHealth,
  copyEmail, initTelemetryOverlay, SkillsGlobe,
  initializeTacticalData, renderInfo, renderExperience,
  renderEducation, renderSkillGroups,
  renderProjects, renderBlogs, renderLearning, renderGaming,
  renderMedia, renderFileTree, fetchGithubRepos,
  decryptDossier, toggleCaseStudy, initializeProjectFilters,
  openCaseStudy, closeCaseStudy,
  toggleBottomTerminal, switchTerminalTab, startTelemetryStreams,
  cleanupTerminal, initTerminal, initCommandPalette, togglePalette,
  FloatingWidget, initFloatingWidgets, initGitHubFeed,
  openBridge, closeBridge, minimizePortfolioBridge, restorePortfolioBridge,
  toggleMaximizeBridge, initResizableBridge, EXTERNAL_BLOCK_LIST,
  initDigitalClock, initScrollProgress, initSystemStatus,
  initLiveSearch, initPdfFab, initZenMode, initDataViz,
  initSectionAnalytics, TacticalWidgets, initThemeToggleWithRipple,
  initPWA, runTypewriter
};
