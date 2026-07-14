/**
 * TACTICAL CORE
 * Core UI interactions, theme management, and base effects
 */

const GLITCH_CHARS = 'ABCDEFGHIKLMNOPQRSTUVWXYZ0123456789§$#@*&';

function glitchEffect(el) {
    if (!el) return;
    const originalText = el.getAttribute('data-original') || el.innerText;
    if (!el.getAttribute('data-original')) el.setAttribute('data-original', originalText);

    let iterations = 0;
    const interval = setInterval(() => {
        el.innerText = originalText.split('').map((char, index) => {
            if (index < iterations) return char;
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('');
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
    }, 30);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const themeIcon = themeToggle.querySelector('i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

/**
 * MISSION_CRITICAL CORE v6.0
 * Hardware Diagnostics, Neural Voice, and Ambient Situational Audio
 *
 * NOTE: AudioEngine is defined in tactical-enhancements.js (loaded after this file).
 * References to AudioEngine here are guarded by typeof checks or resolved at call time.
 */

function updateSystemHealth() {
    const batteryNode = document.getElementById('batteryNode');
    const memoryNode = document.getElementById('memoryNode');
    const osNode = document.getElementById('osNode');

    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            const updateBat = () => { batteryNode.textContent = `${Math.round(bat.level * 100)}%`; };
            updateBat();
            bat.onlevelchange = updateBat;
        });
    }

    if (navigator.deviceMemory) {
        memoryNode.textContent = `${navigator.deviceMemory}GB_RAM`;
    } else {
        memoryNode.textContent = "DETECT_FAILED";
    }

    const platform = navigator.userAgentData ? navigator.userAgentData.platform : "LEGACY_OS";
    osNode.textContent = platform.toUpperCase();
}

// SECRET_DOSSIERS
window.MISSION_SECRETS = {
    "secrets.txt": "TOP_SECRET: Project Antigravity is a success. Codename: Sajid_Islam. Origin: Dhaka_Grid_02.",
    "access_codes.md": "ACCESS_GRANTED: Use 'sudo clearance' to elevate your situational awareness."
};

function copyEmail(email, event) {
    navigator.clipboard.writeText(email);
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = 'COPIED';
    setTimeout(() => { btn.innerText = originalText; }, 2000);
}

// BACKGROUND MOCK TELEMETRY (Fills Blank Screen Space)
function initTelemetryOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'telemetry-overlay d-none d-xl-flex';

    const colLeft = document.createElement('div');
    colLeft.className = 'telemetry-column left-col';
    const colRight = document.createElement('div');
    colRight.className = 'telemetry-column right-col text-end';

    overlay.appendChild(colLeft);
    overlay.appendChild(colRight);
    document.body.appendChild(overlay);

    const generateHex = () => Array.from({ length: 4 }, () => Math.random().toString(16).substr(2, 4).toUpperCase()).join(' ');
    const generateBin = () => Array.from({ length: 4 }, () => Math.random() > 0.5 ? '1011' : '0100').join(' ');

    setInterval(() => {
        let leftText = '';
        let rightText = '';
        for (let i = 0; i < 35; i++) {
            leftText += `[SYS_${Math.floor(Math.random() * 99)}] 0x${generateHex()}\n`;
            rightText += `MEM_${generateBin()}\n`;
        }
        colLeft.textContent = leftText;
        colRight.textContent = rightText;
    }, 5000);
}

// Initializer
// 3D_SKILL_GLOBE_CORE
const SkillsGlobe = {
    canvas: null, ctx: null, tags: [],
    radius: 140, angleX: 0, angleY: 0,
    init: function () {
        this.canvas = document.getElementById('skillCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        const skillList = ["PYTHON", "SQL", "POWER_BI", "TABLEAU", "MACHINE_LEARNING", "NLP", "DEEP_LEARNING", "BUSINESS_OPS", "CHURN_ANALYSIS", "STREAMLIT", "EXCEL", "PANDAS", "DASHBOARDING", "DATA_OPS", "SCRUTINY", "VIZ"];

        this.tags = skillList.map((text, i) => {
            const phi = Math.acos(-1 + (2 * i) / skillList.length);
            const theta = Math.sqrt(skillList.length * Math.PI) * phi;
            return {
                text,
                x: this.radius * Math.cos(theta) * Math.sin(phi),
                y: this.radius * Math.sin(theta) * Math.sin(phi),
                z: this.radius * Math.cos(phi)
            };
        });

        const parent = document.getElementById('canvasParent');
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = parent.offsetWidth;
            this.canvas.height = parent.offsetHeight;
        });

        // Pause animation when off-screen or tab hidden
        this._paused = false;
        const observer = new IntersectionObserver((entries) => {
            this._paused = !entries[0].isIntersecting;
            if (!this._paused) this.animate();
        }, { threshold: 0.1 });
        observer.observe(this.canvas);

        document.addEventListener('visibilitychange', () => {
            this._paused = document.hidden;
            if (!this._paused) this.animate();
        });

        this.animate();
    },
    animate: function () {
        if (this._paused) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.angleX += 0.003;
        this.angleY += 0.003;

        const projectedPoints = [];

        this.tags.forEach(tag => {
            // Rotate around X
            let y1 = tag.y * Math.cos(this.angleX) - tag.z * Math.sin(this.angleX);
            let z1 = tag.y * Math.sin(this.angleX) + tag.z * Math.cos(this.angleX);
            // Rotate around Y
            let x1 = tag.x * Math.cos(this.angleY) + z1 * Math.sin(this.angleY);
            let z2 = -tag.x * Math.sin(this.angleY) + z1 * Math.cos(this.angleY);

            const scale = 300 / (300 - z2);
            const x2 = x1 * scale + this.canvas.width / 2;
            const y2 = y1 * scale + this.canvas.height / 2;

            if (scale > 0) {
                projectedPoints.push({ x: x2, y: y2 });
                const alpha = (scale - 0.5) / 1.5;
                this.ctx.fillStyle = `rgba(34, 197, 94, ${alpha})`;
                this.ctx.font = `${10 * scale}px "JetBrains Mono"`;
                this.ctx.textAlign = "center";
                this.ctx.fillText(tag.text, x2, y2);
            }
        });

        // Neural Network Connection Lines
        this.ctx.beginPath();
        for (let i = 0; i < projectedPoints.length; i++) {
            for (let j = i + 1; j < projectedPoints.length; j++) {
                const dist = Math.hypot(projectedPoints[i].x - projectedPoints[j].x, projectedPoints[i].y - projectedPoints[j].y);
                if (dist < 60) { // Connect nodes if they are close
                    this.ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
                    this.ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
                }
            }
        }
        this.ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();

        if (!this._paused) {
            requestAnimationFrame(() => this.animate());
        }
    }
};

window.replayProject = (projectId) => {
    const term = document.getElementById('bottomTerminal');
    const output = document.getElementById('bottom-terminal-output');
    if (!term || !output) return;

    term.classList.add('active');
    switchTerminalTab('terminal');
    output.innerHTML = '';

    const logs = [
        `[REPLAY_INIT]: ${projectId}`,
        `> fetching remote_origin... SUCCESS`,
        `> initializing situational environment...`,
        `> optimizing tactical assets...`,
        `> code_origin v1.0 compiled.`,
        `[MISSION_COMPLETE]: ${projectId} replayed successfully.`
    ];

    logs.forEach((log, i) => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'terminal-line terminal-response';
            line.textContent = log;
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('beep');
        }, i * 800);
    });
};

window.addEventListener('DOMContentLoaded', () => {
    updateSystemHealth();
    SkillsGlobe.init();
    initTelemetryOverlay();

    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) musicBtn.addEventListener('click', () => AudioEngine.toggleMusic());

    window.speechSynthesis.getVoices();

    // Update active theme tracker
    localStorage.setItem('portfolio-active-theme', 'theme-tactical.html');

    // --- Theme Switching Ops ---
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const applyTheme = (theme, accent) => {
        root.setAttribute('data-theme', theme);
        if (accent) {
            root.setAttribute('data-accent', accent);
        }
        document.body.setAttribute('data-theme', theme); // for backward compatibility
        updateThemeIcon(theme);
    };

    const savedTheme = localStorage.getItem('tactical-theme') || 'dark';
    const savedAccent = localStorage.getItem('tactical-accent') || 'green';
    applyTheme(savedTheme, savedAccent);

    // Initialize Teardrop ripple switcher
    window.initThemeToggleWithRipple({
      buttonId: 'theme-toggle',
      getTheme: () => root.getAttribute('data-theme') || 'dark',
      applyTheme: (theme) => applyTheme(theme, root.getAttribute('data-accent')),
      saveTheme: (theme) => localStorage.setItem('tactical-theme', theme)
    });

    // --- Accent Color Switcher ---
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            const newAccent = e.target.getAttribute('data-color');
            const currentTheme = root.getAttribute('data-theme');
            applyTheme(currentTheme, newAccent);
            localStorage.setItem('tactical-accent', newAccent);
        });
    });

    // --- Glitch Effect Initializer ---
    document.querySelectorAll('.section-label, h2:not(.display-2)').forEach(el => {
        el.addEventListener('mouseenter', () => glitchEffect(el));
        setTimeout(() => glitchEffect(el), 500);
    });

    // --- Initial Sync ---
    if (typeof initializeProjectFilters !== 'undefined') {
        initializeProjectFilters();
    }

    // --- Skills Radar Chart ---
    const canvas = document.getElementById('skillsChart');
    const skillMap = { 'PYTHON': 0, 'SQL': 1, 'POWER_BI': 2, 'TABLEAU': 2, 'EXCEL': 1, 'PYTHON_ML': 3, 'ML': 3, 'REACT': 4, 'NODE.JS': 4, 'GOOGLE_ANALYTICS': 5 }; // Map pills to indices
    const baseData = [90, 85, 95, 70, 75, 80];
    window.chartBaseData = [...baseData]; // Setup global baseline

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
                // Backward compatibility for Chart.js v2
                scale: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    gridLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { fontColor: '#94a3b8', fontFamily: 'JetBrains Mono' },
                    ticks: { display: false, min: 0, max: 100 }
                },
                // Compatibility for Chart.js v3+
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
                plugins: {
                    legend: { display: false }
                },
                legend: { display: false } // Legacy v2 config
            }
        });

        // Gamify connections using Event Delegation (fixes missing async DOM elements)
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
});
