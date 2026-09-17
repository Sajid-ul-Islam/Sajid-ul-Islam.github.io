/**
 * TACTICAL CAMOUFLAGE ENGINE v3.0
 * Procedural military-grade camouflage background system.
 * Supports Digital Woodland, Urban Night-Ops, Stealth Black-Ops, and Desert Operator styles.
 * High-performance offscreen canvas caching with interactive tactical radar sweep.
 */

export const CAMO_PALETTES = {
  woodland: {
    name: 'Digital Woodland',
    base: '#0a120b',
    tones: [
      '#131f14', // deep forest shadow
      '#1c2d1b', // military drab olive
      '#293e26', // tactical foliage green
      '#27241a', // field earth tan
      '#364c31', // light foliage highlight
      '#0f1710'  // deep shadow
    ],
    gridColor: 'rgba(74, 222, 128, 0.07)',
    radarColor: 'rgba(74, 222, 128, 0.18)',
    textColor: 'rgba(74, 222, 128, 0.4)'
  },
  urban: {
    name: 'Urban Night-Ops',
    base: '#070b12',
    tones: [
      '#0e1724', // night navy
      '#162336', // slate steel
      '#213248', // tactical blue-gray
      '#1c222b', // concrete drab
      '#2e4159', // light steel highlight
      '#0a1019'  // deep abyss
    ],
    gridColor: 'rgba(56, 189, 248, 0.07)',
    radarColor: 'rgba(56, 189, 248, 0.18)',
    textColor: 'rgba(56, 189, 248, 0.4)'
  },
  stealth: {
    name: 'Stealth Black-Ops',
    base: '#040605',
    tones: [
      '#090d0a', // obsidian
      '#101511', // carbon drab
      '#171e18', // tactical graphite
      '#131814', // matte dark
      '#212b23', // faint highlight
      '#070a08'  // pitch black
    ],
    gridColor: 'rgba(163, 230, 53, 0.06)',
    radarColor: 'rgba(163, 230, 53, 0.15)',
    textColor: 'rgba(163, 230, 53, 0.35)'
  },
  desert: {
    name: 'Desert Operator',
    base: '#110e0a',
    tones: [
      '#1c1710', // dark coyote
      '#292218', // desert drab
      '#393022', // sand earth
      '#2c2419', // dry clay
      '#493d2c', // light sand highlight
      '#15110c'  // shadow earth
    ],
    gridColor: 'rgba(251, 191, 36, 0.07)',
    radarColor: 'rgba(251, 191, 36, 0.18)',
    textColor: 'rgba(251, 191, 36, 0.4)'
  }
};

class TacticalCamoEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.currentStyle = localStorage.getItem('tactical-camo-style') || 'woodland';
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.targetMouseX = -1000;
    this.targetMouseY = -1000;
    this.radarRadius = 0;
    this.radarAlpha = 0;
    this.animId = null;
    this.interactive = true;
  }

  init(canvasId = 'camoReveal') {
    this.canvas = /** @type {HTMLCanvasElement | null} */ (document.getElementById(canvasId));
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    if (!this.ctx) return;

    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Interactive radar & crosshair sweep on camouflage
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = e.clientX;
      this.targetMouseY = e.clientY;
      if (this.radarAlpha < 0.2) {
        this.radarAlpha = 0.5;
        this.radarRadius = 10;
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.targetMouseX = -1000;
      this.targetMouseY = -1000;
    }, { passive: true });

    this.startLoop();
  }

  setStyle(styleKey) {
    if (!CAMO_PALETTES[styleKey]) return;
    this.currentStyle = styleKey;
    localStorage.setItem('tactical-camo-style', styleKey);
    this.renderCamoPattern();
    this.updateDropdownUI();
  }

  setPalette(paletteKey) {
    this.setStyle(paletteKey);
  }

  getStyle() {
    return this.currentStyle;
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.offscreenCanvas.width = Math.round(this.width * this.dpr);
    this.offscreenCanvas.height = Math.round(this.height * this.dpr);

    this.renderCamoPattern();
  }

  /**
   * Generates authentic military digital camouflage pattern.
   * Hybrid procedural approach:
   * 1. Large organic camouflage patches (Woodland/Multicam shapes)
   * 2. Digital pixelated micro-rectangles (MARPAT / CADPAT cluster grid)
   * 3. Coordinate stamps, grid ticks, and CRT phosphor overlay
   */
  renderCamoPattern() {
    if (!this.offscreenCtx) return;
    const ctx = this.offscreenCtx;
    const w = this.width * this.dpr;
    const h = this.height * this.dpr;
    const pal = CAMO_PALETTES[this.currentStyle] || CAMO_PALETTES.woodland;

    // 1. Base Fill
    ctx.fillStyle = pal.base;
    ctx.fillRect(0, 0, w, h);

    // 2. Large Organic Camouflage Blobs (Multi-layer contours)
    const blobCount = Math.floor((w * h) / (120000 * (this.dpr * this.dpr))) + 35;
    for (let i = 0; i < blobCount; i++) {
      const color = pal.tones[i % pal.tones.length];
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const baseR = (50 + Math.random() * 110) * this.dpr;

      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();

      const numPoints = 8 + Math.floor(Math.random() * 6);
      for (let p = 0; p < numPoints; p++) {
        const angle = (p / numPoints) * Math.PI * 2;
        const dist = baseR * (0.65 + Math.sin(p * 2.3 + i) * 0.35 + Math.random() * 0.2);
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // 3. Digital Pixel Clusters (CADPAT/MARPAT pixelated camouflage edge clusters)
    const clusterCount = Math.floor((w * h) / (50000 * (this.dpr * this.dpr))) + 45;
    const pixelUnit = Math.round(14 * this.dpr);

    for (let c = 0; c < clusterCount; c++) {
      const color = pal.tones[(c * 3) % pal.tones.length];
      const startX = Math.floor((Math.random() * w) / pixelUnit) * pixelUnit;
      const startY = Math.floor((Math.random() * h) / pixelUnit) * pixelUnit;
      const clusterW = 3 + Math.floor(Math.random() * 6);
      const clusterH = 3 + Math.floor(Math.random() * 5);

      ctx.fillStyle = color;
      for (let px = 0; px < clusterW; px++) {
        for (let py = 0; py < clusterH; py++) {
          if (Math.random() > 0.38) {
            ctx.fillRect(
              startX + px * pixelUnit,
              startY + py * pixelUnit,
              pixelUnit,
              pixelUnit
            );
          }
        }
      }
    }

    // 4. Subtle Micro-Digital Grain Overlay (pixel noise for authentic tactical texture)
    const microCount = Math.floor((w * h) / (8000 * (this.dpr * this.dpr))) + 80;
    const microSize = Math.max(3 * this.dpr, 3);
    for (let m = 0; m < microCount; m++) {
      ctx.fillStyle = pal.tones[m % pal.tones.length];
      const mx = Math.floor((Math.random() * w) / microSize) * microSize;
      const my = Math.floor((Math.random() * h) / microSize) * microSize;
      ctx.fillRect(mx, my, microSize, microSize);
    }

    // 5. Tactical Coordinate Stamps & Crosshair Markers
    ctx.save();
    ctx.fillStyle = pal.textColor;
    ctx.font = `${Math.round(9 * this.dpr)}px "JetBrains Mono", monospace`;

    const stamps = [
      'SEC-01 // 23°46\'18"N 90°23\'52"E',
      'FDE-GRID // 104.88.21.09',
      'OP-STATUS // DEPLOYED',
      'BAND // TACTICAL-UHF-800'
    ];

    const stampPositions = [
      { x: 30 * this.dpr, y: 70 * this.dpr },
      { x: w - 240 * this.dpr, y: 120 * this.dpr },
      { x: 40 * this.dpr, y: h - 60 * this.dpr },
      { x: w - 250 * this.dpr, y: h - 50 * this.dpr }
    ];

    stampPositions.forEach((pos, idx) => {
      ctx.fillText(`+ [${stamps[idx % stamps.length]}] +`, pos.x, pos.y);
    });

    // 6. Tactical Grid Crosshairs (Corner & Center ticks)
    ctx.strokeStyle = pal.gridColor;
    ctx.lineWidth = 1;
    const crossSize = 10 * this.dpr;
    const gridCols = 4;
    const gridRows = 3;

    for (let i = 1; i < gridCols; i++) {
      for (let j = 1; j < gridRows; j++) {
        const gx = (w / gridCols) * i;
        const gy = (h / gridRows) * j;
        ctx.beginPath();
        ctx.moveTo(gx - crossSize, gy);
        ctx.lineTo(gx + crossSize, gy);
        ctx.moveTo(gx, gy - crossSize);
        ctx.lineTo(gx, gy + crossSize);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  startLoop() {
    const loop = () => {
      this.drawFrame();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  drawFrame() {
    if (!this.ctx || !this.offscreenCanvas) return;

    // Fast blit of pre-rendered camouflage pattern
    this.ctx.drawImage(this.offscreenCanvas, 0, 0);

    // Smooth mouse lerp
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.15;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.15;

    // Interactive radar pulse & tactical crosshairs on hover
    if (this.mouseX > 0 && this.mouseY > 0 && this.mouseX < this.width && this.mouseY < this.height) {
      const pal = CAMO_PALETTES[this.currentStyle] || CAMO_PALETTES.woodland;
      const mx = this.mouseX * this.dpr;
      const my = this.mouseY * this.dpr;

      this.radarRadius += 1.8 * this.dpr;
      this.radarAlpha *= 0.96;

      if (this.radarRadius > 160 * this.dpr) {
        this.radarRadius = 10 * this.dpr;
        this.radarAlpha = 0.45;
      }

      const ctx = this.ctx;
      ctx.save();

      // Subtle ambient radar ring
      if (this.radarAlpha > 0.02) {
        ctx.beginPath();
        ctx.arc(mx, my, this.radarRadius, 0, Math.PI * 2);
        ctx.strokeStyle = pal.radarColor.replace(/[\d\.]+\)$/, `${this.radarAlpha})`);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, this.radarRadius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = pal.radarColor.replace(/[\d\.]+\)$/, `${this.radarAlpha * 0.5})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Subtle tactical cursor coordinates
      ctx.fillStyle = pal.textColor;
      ctx.font = `${Math.round(8 * this.dpr)}px "JetBrains Mono", monospace`;
      ctx.fillText(
        `LOC: ${Math.round(this.mouseX)},${Math.round(this.mouseY)}`,
        mx + 14 * this.dpr,
        my - 10 * this.dpr
      );

      ctx.restore();
    }
  }

  updateDropdownUI() {
    const label = document.getElementById('camoStyleLabel');
    if (label) {
      const pal = CAMO_PALETTES[this.currentStyle];
      label.textContent = pal ? pal.name : 'Camouflage';
    }
    const select = /** @type {HTMLSelectElement | null} */ (document.getElementById('camoStyleSelect'));
    if (select && select.value !== this.currentStyle) {
      select.value = this.currentStyle;
    }
    document.querySelectorAll('.camo-style-option').forEach(el => {
      const optStyle = el.getAttribute('data-camo');
      el.classList.toggle('active', optStyle === this.currentStyle);
    });
  }
}

// Global Singleton
export const TacticalCamo = new TacticalCamoEngine();

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      TacticalCamo.init('camoReveal');
    });
  } else {
    TacticalCamo.init('camoReveal');
  }
}

if (typeof window !== 'undefined') {
  window.TacticalCamo = TacticalCamo;
  window.setTacticalCamo = (style) => TacticalCamo.setStyle(style);
}
