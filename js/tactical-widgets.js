/**
 * TACTICAL WIDGETS - v1.0
 * Geospatial Impact Map
 * KPI animation is now inline in the unified Command Center widget.
 * Now exported as ES module.
 */

export class TacticalWidgets {
    static init() {
        this.renderImpactMap();
    }

    static renderImpactMap() {
        const container = document.getElementById('geospatial-impact');
        if (!container) return;

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
                        <g fill="currentColor" opacity="0.6">
                            <path d="M120,100 L180,80 L220,90 L240,120 L230,160 L200,180 L170,190 L150,170 L130,150 L110,130 Z" />
                            <path d="M200,220 L220,210 L240,230 L250,280 L240,330 L220,370 L200,340 L190,290 Z" />
                            <path d="M420,100 L450,90 L480,95 L490,120 L470,140 L440,145 L420,130 Z" />
                            <path d="M430,160 L460,155 L490,170 L500,210 L490,260 L470,290 L440,280 L420,230 Z" />
                            <path d="M500,90 L550,70 L600,65 L650,70 L700,80 L740,110 L730,150 L700,180 L660,200 L620,190 L580,180 L540,170 L510,150 L490,120 Z" />
                            <path d="M540,180 L570,175 L590,190 L595,220 L580,240 L550,230 L535,210 Z" />
                            <path d="M720,280 L760,270 L800,280 L810,310 L790,340 L750,350 L720,330 Z" />
                            <path d="M400,95 L410,88 L420,92 L418,105 L405,108 Z" />
                            <path d="M740,130 L748,125 L752,140 L746,155 L738,148 Z" />
                            <path d="M630,250 L660,245 L680,255 L670,270 L640,268 Z" />
                            <path d="M480,130 L510,125 L520,140 L505,155 L478,150 Z" />
                            <path d="M290,40 L320,35 L340,45 L335,65 L305,70 Z" />
                        </g>
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
