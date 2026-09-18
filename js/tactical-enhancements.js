/**
 * TACTICAL ENHANCEMENTS - v3.0
 * Scroll reveal effects, keyboard navigation, counters, skill bars, testimonials, scanlines
 * Now exported as ES module.
 */

export class ScrollGlitchEffect {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('glitched')) {
                    entry.target.classList.add('glitched');
                    if (typeof window.glitchEffect === 'function' && entry.target instanceof HTMLElement) {
                        window.glitchEffect(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });
    }
    
    init() {
        const targets = document.querySelectorAll('h2, .section-label, .card-title');
        targets.forEach(el => this.observer.observe(el));
    }
}

export class KeyboardNavigator {
    constructor() {
        this.sections = ['about', 'experience', 'education', 'skills', 'projects', 'awards'];
        this.currentSection = 0;
        this.commandPaletteOpen = false;
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.currentSection = this.sections.indexOf(id);
                }
            });
        }, { threshold: 0.5 });
        
        this.sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) this.observer.observe(el);
        });
    }
    
    handleKeydown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (typeof window.togglePalette === 'function') window.togglePalette();
            return;
        }
        
        if (e.key === 'Escape' && this.commandPaletteOpen) {
            if (typeof window.togglePalette === 'function') window.togglePalette();
            return;
        }
        
        if (this.commandPaletteOpen) return;
        
        if (e.key === 'j' || e.key === 'ArrowDown') {
            e.preventDefault();
            this.nextSection();
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.prevSection();
        } else if (e.key === 'g' && !e.shiftKey) {
            e.preventDefault();
            this.goToTop();
        } else if (e.key === 'G' || (e.key === 'g' && e.shiftKey)) {
            e.preventDefault();
            this.goToBottom();
        } else if (e.altKey && e.key === 't') {
            e.preventDefault();
            const term = document.getElementById('bottomTerminal');
            if (term) term.classList.toggle('active');
            if (typeof window.AudioEngine !== 'undefined') window.AudioEngine.play('beep');
        } else if (e.altKey && e.key === 'h') {
            e.preventDefault();
            document.body.classList.toggle('hud-off');
            this.showNotification(`HUD Overlays ${document.body.classList.contains('hud-off') ? 'DISABLED' : 'ENABLED'}`);
        } else if (e.altKey && e.key === 'm') {
            e.preventDefault();
            if (typeof window.AudioEngine !== 'undefined' && window.AudioEngine.toggleMusic) {
                window.AudioEngine.toggleMusic();
            } else if (document.getElementById('musicToggle')) {
                document.getElementById('musicToggle').click();
            }
        } else if (e.key === 'a') {
            e.preventDefault();
            if (typeof window.AudioEngine !== 'undefined') {
                window.AudioEngine.toggle();
                this.showNotification(`Audio ${window.AudioEngine.enabled ? 'ENABLED' : 'DISABLED'}`);
            }
        }
    }
    
    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.scrollToSection(this.sections[this.currentSection]);
        }
    }
    
    prevSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.scrollToSection(this.sections[this.currentSection]);
        }
    }
    
    goToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof window.AudioEngine !== 'undefined') window.AudioEngine.play('beep');
    }
    
    goToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        if (typeof window.AudioEngine !== 'undefined') window.AudioEngine.play('beep');
    }
    
    scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            if (typeof window.AudioEngine !== 'undefined') window.AudioEngine.play('beep');
        }
    }
    
    showNotification(text) {
        const notif = document.createElement('div');
        notif.className = 'tactical-notification';
        notif.textContent = text;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2000);
    }
}

export class AnimatedCounters {
    static init() {
        const counters = document.querySelectorAll('.animated-counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target instanceof HTMLElement) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target || '0');
                    const suffix = counter.dataset.suffix || '';
                    const prefix = counter.dataset.prefix || '';
                    AnimatedCounters.animate(counter, target, prefix, suffix);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(c => observer.observe(c));
    }
    
    static animate(el, target, prefix, suffix) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const step = () => {
            current += increment;
            if (current >= target) {
                el.textContent = `${prefix}${target}${suffix}`;
                if (typeof window.AudioEngine !== 'undefined') window.AudioEngine.play('beep');
            } else {
                el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                setTimeout(step, duration / steps);
            }
        };
        
        step();
    }
}

export class SkillProgressBars {
    static init() {
        const container = document.getElementById('skill-progress-bars');
        if (!container) return;
        
        const skills = [
            { name: 'Python', level: 90 },
            { name: 'SQL', level: 85 },
            { name: 'Power BI', level: 95 },
            { name: 'Machine Learning', level: 75 },
            { name: 'Data Analysis', level: 90 }
        ];
        
        container.innerHTML = skills.map(skill => `
            <div class="skill-progress-item">
                <div class="skill-progress-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill" data-level="${skill.level}"></div>
                </div>
            </div>
        `).join('');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-progress-fill').forEach((fill, i) => {
                        if (fill instanceof HTMLElement) {
                            setTimeout(() => {
                                fill.style.width = `${fill.dataset.level || '0'}%`;
                            }, i * 100);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(container);
    }
}

export class TestimonialsCarousel {
    static init() {
        const container = document.getElementById('testimonials-carousel');
        if (!container) return;
        
        const testimonials = [
            {
                quote: "Sajid's data insights transformed our business strategy. His BI dashboards are exceptional.",
                author: "DEEN Commerce Team",
                role: "Business Intelligence"
            },
            {
                quote: "Exceptional analytical skills. The churn prediction model improved our retention by 25%.",
                author: "Project Lead",
                role: "ML Initiative"
            },
            {
                quote: "A true data strategist who understands both technical and business perspectives.",
                author: "Daraz Analytics",
                role: "Marketplace Operations"
            }
        ];
        
        const render = () => {
            const t = testimonials[this.current];
            container.innerHTML = `
                <div class="testimonial-card card-glass">
                    <div class="testimonial-quote">"${t.quote}"</div>
                    <div class="testimonial-author">
                        <span class="author-name">${t.author}</span>
                        <span class="author-role">${t.role}</span>
                    </div>
                    <div class="testimonial-nav">
                        <button class="testimonial-btn" onclick="TestimonialsCarousel.prev()">◀</button>
                        <span class="testimonial-dots">
                            ${testimonials.map((_, i) => `<span class="dot ${i === this.current ? 'active' : ''}"></span>`).join('')}
                        </span>
                        <button class="testimonial-btn" onclick="TestimonialsCarousel.next()">▶</button>
                    </div>
                </div>
            `;
        };
        
        this.testimonials = testimonials;
        this.current = 0;
        this.render = render;
        render();
        
        setInterval(() => this.next(), 5000);
    }
    
    static next() {
        this.current = (this.current + 1) % this.testimonials.length;
        this.render();
    }
    
    static prev() {
        this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length;
        this.render();
    }
}

export class ScanlinePulse {
    static init() {
        const scanlines = document.querySelector('.scanlines');
        if (!scanlines) return;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scanlinePulse {
                0%, 100% { opacity: 0.15; }
                50% { opacity: 0.25; }
            }
            .scanlines {
                animation: scanlineScroll 10s linear infinite, scanlinePulse 4s ease-in-out infinite !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize Custom Tactical Cursor
function initCustomCursor() {
// Initialize Custom Tactical Pointer Engine
export function initCustomCursor() {
    if (typeof window === 'undefined' || !window.document) return;
    
    // Check if touch-only device or mobile viewport (< 992px)
    const isTouchOnly = window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
    const isMobileWidth = window.innerWidth < 992;
    if (isTouchOnly || isMobileWidth) return;

    const cursor = /** @type {HTMLElement | null} */ (document.querySelector('.custom-cursor'));
    const follower = /** @type {HTMLElement | null} */ (document.querySelector('.cursor-follower'));
    if (!cursor || !follower) return;

    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    
    // Smooth follower animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerpFactor = prefersReducedMotion ? 1.0 : 0.22;

    let mouseX = -100;
    let mouseY = -100;
    let posX = -100;
    let posY = -100;
    let isVisible = false;
    let isInitialized = false;

    // Dynamically toggle custom cursor on/off based on screen width and input type
    function updateCursorEligibility() {
        const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse) and (hover: none)').matches;
        const isDesktop = window.innerWidth >= 992 && !isTouch;
        document.body.classList.toggle('has-custom-cursor', isDesktop);
        if (!isDesktop) {
            isVisible = false;
            if (cursor) cursor.style.opacity = '0';
            if (follower) follower.style.opacity = '0';
        }
    }
    updateCursorEligibility();
    window.addEventListener('resize', updateCursorEligibility, { passive: true });

    // Smooth follower animation loop
    function renderCursor() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        follower.style.transform = `translate(${posX}px, ${posY}px)`;
        
        if (isVisible && cursor && follower) {
            posX += (mouseX - posX) * lerpFactor;
            posY += (mouseY - posY) * lerpFactor;

            // Pixel-perfect centering with hardware-accelerated translate3d
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    }

    document.addEventListener('mousemove', (e) => {
    // Pointer move handling with dynamic target detection (Event Delegation)
    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isInitialized) {
            posX = mouseX;
            posY = mouseY;
            isInitialized = true;
        }

        if (!isVisible) {
            isVisible = true;
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        }

        const target = /** @type {HTMLElement | null} */ (e.target);
        if (!target) return;

        // 1. Text input / code editor mode
        if (target.closest('input, textarea, select, [contenteditable="true"]')) {
            cursor.classList.add('text-mode');
            follower.classList.add('text-mode');
            cursor.classList.remove('hovering', 'drag-mode');
            follower.classList.remove('hovering', 'drag-mode');
            return;
        }

        // 2. Drag handle mode (Floating window headers)
        if (target.closest('.fw-header, .drag-handle')) {
            cursor.classList.remove('text-mode', 'hovering');
            follower.classList.remove('text-mode', 'hovering');
            cursor.classList.add('drag-mode');
            follower.classList.add('drag-mode');
            return;
        }

        // 3. Interactive targeting lock mode (Links, buttons, chips, cards)
        const interactive = target.closest(
            'a, button, [role="button"], .btn, .nav-link, .filter-btn, .social-link, ' +
            '.terminal-cmd-btn, .camo-style-option, .clickable, .cursor-pointer, ' +
            '[data-interactive], .fw-btn, #decryptAllBtn, .skill-pill-tactical, .tech-chip'
        );

        if (interactive) {
            cursor.classList.remove('text-mode', 'drag-mode');
            follower.classList.remove('text-mode', 'drag-mode');
            cursor.classList.add('hovering');
            follower.classList.add('hovering');
            return;
        }

        // Default state
        cursor.classList.remove('hovering', 'text-mode', 'drag-mode');
        follower.classList.remove('hovering', 'text-mode', 'drag-mode');
    }, { passive: true });

    // Tactile Click / Recoil Feedback
    window.addEventListener('pointerdown', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    }, { passive: true });

    window.addEventListener('pointerup', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    }, { passive: true });

    window.addEventListener('pointercancel', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    }, { passive: true });

    // Handle cursor leaving and entering window
    document.documentElement.addEventListener('pointerleave', () => {
        isVisible = false;
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    document.documentElement.addEventListener('pointerenter', () => {
        if (isInitialized) {
            isVisible = true;
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        }
    });

    document.addEventListener('mouseleave', () => {
    window.addEventListener('blur', () => {
        isVisible = false;
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .nav-link, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            follower.classList.remove('hovering');
        });
    });

    renderCursor();
}

document.addEventListener('DOMContentLoaded', initCustomCursor);
// Auto-run safe initialization
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomCursor);
    } else {
        initCustomCursor();
    }
}

