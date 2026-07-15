/**
 * AUDIO ENGINE MODULE
 * Procedural sound effects for the Tactical HUD interface.
 * Now exported as ES module.
 */

export class AudioEngineClass {
  constructor() {
    this.enabled = localStorage.getItem('tactical-audio') !== 'disabled';
    this.sounds = {};
    this.ctx = null;
    this._init();
  }

  _init() {
    document.addEventListener('click', () => this._ensureContext(), { once: true });
    document.addEventListener('keydown', () => this._ensureContext(), { once: true });
    this._generateSounds();
  }

  _ensureContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  _generateSounds() {
    this.sounds.beep = () => {
      if (!this.ctx || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.1);
    };

    this.sounds.type = () => {
      if (!this.ctx || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(200 + Math.random() * 100, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.02);
    };

    this.sounds.hover = () => {
      if (!this.ctx || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.15);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.15);
    };

    this.sounds.click = () => {
      if (!this.ctx || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.08);
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('tactical-audio', this.enabled ? 'enabled' : 'disabled');
    return this.enabled;
  }

  toggleMusic() {
    return this.toggle();
  }
}

// Create singleton instance
export const AudioEngine = new AudioEngineClass();
