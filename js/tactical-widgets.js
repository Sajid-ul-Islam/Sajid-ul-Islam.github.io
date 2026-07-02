/**
 * TACTICAL WIDGETS - v1.0
 * Live KPIs and Geospatial Impact Map
 */

class TacticalWidgets {
    static init() {
        this.renderLiveMetrics();
        this.renderImpactMap();
    }

    static renderLiveMetrics() {
        const html = `
            <div class="data-viz-widget card-glass draggable-widget" id="metricsWidget" style="top: 150px; right: 20px; width: 220px;">
                <div class="viz-header p-2 border-bottom border-primary border-opacity-10 d-flex justify-content-between align-items-center bg-dark bg-opacity-50">
                    <span class="font-mono small opacity-50">OPERATIONAL_KPI</span>
                    <i class="fas fa-chart-line text-primary small"></i>
                </div>
                <div class="p-3">
                    <div class="metric-item mb-3">
                        <div class="d-flex justify-content-between small mb-1">
                            <span class="opacity-50">DATA_FLOW</span>
                            <span class="text-primary font-mono" id="kpi-flow">1.2k/s</span>
                        </div>
                        <div class="progress" style="height: 2px; background: rgba(255,255,255,0.05)">
                            <div class="progress-bar bg-primary" id="pb-flow" style="width: 65%"></div>
                        </div>
                    </div>
                    <div class="metric-item mb-3">
                        <div class="d-flex justify-content-between small mb-1">
                            <span class="opacity-50">OPTIMIZATION</span>
                            <span class="text-primary font-mono">98.4%</span>
                        </div>
                        <div class="progress" style="height: 2px; background: rgba(255,255,255,0.05)">
                            <div class="progress-bar bg-primary" id="pb-opt" style="width: 98%"></div>
                        </div>
                    </div>
                    <div class="text-center mt-3 pt-2 border-top border-primary border-opacity-10">
                        <span class="font-mono" style="font-size: 0.6rem; color: var(--primary-color)">[STATUS: OPTIMAL]</span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        this.startKPIAnimation();
    }

    static startKPIAnimation() {
        setInterval(() => {
            const flow = (Math.random() * 2 + 1).toFixed(1);
            const flowEl = document.getElementById('kpi-flow');
            if (flowEl) flowEl.innerText = `${flow}k/s`;
            
            const pb = document.getElementById('pb-flow');
            if (pb) pb.style.width = `${40 + Math.random() * 40}%`;
        }, 3000);
    }

    static renderImpactMap() {
        const container = document.getElementById('geospatial-impact');
        if (!container) return;

        // Local inline minimal world map SVG — no external dependency
        const svgMap = `
            <div class="impact-map-container mt-5">
                <label class="section-label mb-4">GEOSPATIAL_OPERATIONAL_IMPACT</label>
                <div class="card-glass p-0 overflow-hidden" style="height: 400px; position: relative;">
                    <div class="map-overlay">
                        <div class="map-node node-dhaka" title="Home Base: Dhaka"></div>
                        <div class="map-pulse pulse-1"></div>
                        <div class="map-line line-1"></div>
                    </div>
                    <svg viewBox="0 0 1000 500" class="world-map-svg" style="width: 100%; height: 100%; opacity: 0.12;">
                        <rect x="0" y="0" width="1000" height="500" fill="none" />
                        <!-- Continents as simplified polygons -->
                        <g fill="currentColor" opacity="0.6">
                            <!-- North America -->
                            <path d="M120,100 L180,80 L220,90 L240,120 L230,160 L200,180 L170,190 L150,170 L130,150 L110,130 Z" />
                            <!-- South America -->
                            <path d="M200,220 L220,210 L240,230 L250,280 L240,330 L220,370 L200,340 L190,290 Z" />
                            <!-- Europe -->
                            <path d="M420,100 L450,90 L480,95 L490,120 L470,140 L440,145 L420,130 Z" />
                            <!-- Africa -->
                            <path d="M430,160 L460,155 L490,170 L500,210 L490,260 L470,290 L440,280 L420,230 Z" />
                            <!-- Asia -->
                            <path d="M500,90 L550,70 L600,65 L650,70 L700,80 L740,110 L730,150 L700,180 L660,200 L620,190 L580,180 L540,170 L510,150 L490,120 Z" />
                            <!-- South Asia (India/Bangladesh) -->
                            <path d="M540,180 L570,175 L590,190 L595,220 L580,240 L550,230 L535,210 Z" />
                            <!-- Australia -->
                            <path d="M720,280 L760,270 L800,280 L810,310 L790,340 L750,350 L720,330 Z" />
                            <!-- UK/Ireland -->
                            <path d="M400,95 L410,88 L420,92 L418,105 L405,108 Z" />
                            <!-- Japan -->
                            <path d="M740,130 L748,125 L752,140 L746,155 L738,148 Z" />
                            <!-- Southeast Asia (Indonesia/Malaysia) -->
                            <path d="M630,250 L660,245 L680,255 L670,270 L640,268 Z" />
                            <!-- Middle East -->
                            <path d="M480,130 L510,125 L520,140 L505,155 L478,150 Z" />
                            <!-- Greenland -->
                            <path d="M290,40 L320,35 L340,45 L335,65 L305,70 Z" />
                        </g>
                        <!-- Grid lines for HUD feel -->
                        <g stroke="currentColor" stroke-width="0.3" opacity="0.15">
                            <line x1="0" y1="100" x2="1000" y2="100" />
                            <line x1="0" y1="200" x2="1000" y2="200" />
                            <line x1="0" y1="300" x2="1000" y2="300" />
                            <line x1="0" y1="400" x2="1000" y2="400" />
                            <line x1="200" y1="0" x2="200" y2="500" />
                            <line x1="400" y1="0" x2="400" y2="500" />
                            <line x1="600" y1="0" x2="600" y2="500" />
                            <line x1="800" y1="0" x2="800" y2="500" />
                        </g>
                    </svg>
                    <div class="map-details p-3 position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 font-mono small">
                        <div class="d-flex justify-content-between">
                            <span>PRIMARY_NODE: DHAKA_HQ</span>
                            <span class="text-primary">LAT: 23.81 LNG: 90.41</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = svgMap;
    }
}

document.addEventListener('DOMContentLoaded', () => TacticalWidgets.init());
