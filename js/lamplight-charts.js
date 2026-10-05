/* ==========================================================================
   Case-file evidence charts — "Lamplight & Signal"
   --------------------------------------------------------------------------
   Every rendering of a case chart is generated from one declarative spec:
   the in-page evidence panel, the cursor-following preview card, and the
   screen-reader data table. Because the geometry is derived from the same
   numbers that get printed on the axes, a chart can no longer draw one story
   while labelling another (the old hand-written SVGs did exactly that, and
   drew SVG's downward y-axis as if it were a rising value axis).
   ========================================================================== */

/* SVG user-space canvas. 320 × 200 keeps the existing 16:10 aspect. */
const VIEW = { w: 320, h: 200 };
const PAD = { l: 44, r: 14, t: 22, b: 42 };

/* Trim float noise: 8.6 -> "8.6", 10 -> "10". */
const fmt = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(1)));

/**
 * Each entry is the single source of truth for one case chart.
 *
 * kind      'bars' | 'area' | 'network'
 * x / y     matched series — x labels and their values
 * yMax      top of the value axis (chosen so the peak sits below the frame)
 * yTicks    horizontal gridlines, labelled with their value
 * delta     the headline outcome, printed inside the plot
 * summary   plain-language description used as the accessible name
 */
export const CASE_CHARTS = {
  drop: {
    kind: 'bars',
    title: 'Weekly reporting hours',
    unit: 'hrs/wk',
    delta: '−40%',
    x: ['S1', 'S2', 'S3', 'S4', 'S5'],
    y: [10, 8.6, 7.4, 6.5, 6],
    yMax: 12,
    yTicks: [0, 4, 8, 12],
    trend: true,
    summary:
      'Column chart. Weekly reporting time falls across five sprints from 10 hours to 6 hours per week, a 40 per cent reduction.',
  },
  aging: {
    kind: 'area',
    title: 'Quality partners onboarded',
    unit: 'partners/qtr',
    delta: '+50%',
    x: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
    y: [24, 26, 29, 31, 33, 35, 36],
    yMax: 40,
    yTicks: [0, 20, 40],
    summary:
      'Rising area chart. Quality partners onboarded per quarter climb from 24 to 36, a 50 per cent increase.',
  },
  margin: {
    kind: 'area',
    title: 'Repeat-purchase rate',
    unit: '% repeat',
    delta: '+15%',
    x: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'],
    y: [0, 2.5, 5, 7, 9, 11, 13, 15],
    yMax: 18,
    yTicks: [0, 6, 12, 18],
    summary:
      'Rising area chart. The repeat-purchase rate climbs from 0 to 15 per cent over eight months.',
  },
  network: {
    kind: 'network',
    title: 'Surfaces on one core',
    unit: '',
    delta: 'web · mobile · API',
    nodes: ['WEB', 'MOBILE', 'API', 'DATA', 'AI'],
    summary:
      'Diagram. Five surfaces — web, mobile, API, data and AI — all converge on the single DEEN Commerce core.',
  },
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function plotBox() {
  return { x0: PAD.l, x1: VIEW.w - PAD.r, y0: PAD.t, y1: VIEW.h - PAD.b };
}

/* Value -> SVG y. The one place the downward axis is handled. */
function yScale(spec, b) {
  const span = b.y1 - b.y0;
  return (v) => b.y1 - (clamp(v, 0, spec.yMax) / spec.yMax) * span;
}

function axesMarkup(spec, b, y, compact) {
  const grid = spec.yTicks
    .map((t) => {
      const gy = y(t);
      const line = `<line class="mc-grid" x1="${b.x0}" x2="${b.x1}" y1="${gy.toFixed(1)}" y2="${gy.toFixed(1)}"/>`;
      if (compact) return line;
      return `${line}<text class="mc-ylabel" x="${b.x0 - 7}" y="${(gy + 3.5).toFixed(1)}" text-anchor="end">${fmt(t)}</text>`;
    })
    .join('');
  const baseline = `<line class="mc-axis" x1="${b.x0}" x2="${b.x1}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}"/>`;
  if (compact) return grid + baseline;
  const unit = `<text class="mc-unit" x="${b.x0}" y="${PAD.t - 9}">${spec.unit}</text>`;
  const delta = `<text class="mc-delta" x="${b.x1}" y="${PAD.t - 9}" text-anchor="end">${spec.delta}</text>`;
  return grid + baseline + unit + delta;
}

function xLabelsMarkup(points, b) {
  return points
    .map(
      (p) =>
        `<text class="mc-xlabel" x="${p.x.toFixed(1)}" y="${b.y1 + 17}" text-anchor="middle">${p.label}</text>`,
    )
    .join('');
}

function barsMarkup(spec, b, y, compact) {
  const n = spec.y.length;
  const band = (b.x1 - b.x0) / n;
  const bw = Math.min(40, band * 0.56);
  const points = [];
  const bars = spec.y.map((v, i) => {
    const cx = b.x0 + band * (i + 0.5);
    const top = y(v);
    points.push({ x: cx, y: top, label: spec.x[i], value: v });
    const cls = i === n - 1 ? 'mc-bar mc-bar--hot' : 'mc-bar';
    const h = Math.max(1, b.y1 - top);
    return `<rect class="${cls}" x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3"/>`;
  });
  const trend =
    spec.trend && !compact
      ? `<polyline class="mc-line mc-line--amber" points="${points
          .map((p) => `${p.x.toFixed(1)},${(p.y - 7).toFixed(1)}`)
          .join(' ')}"/>`
      : '';
  const labels = compact ? '' : xLabelsMarkup(points, b);
  return { body: bars.join('') + trend + labels, points };
}

function areaMarkup(spec, b, y, compact, gradId) {
  const n = spec.y.length;
  const points = spec.y.map((v, i) => ({
    x: n === 1 ? b.x0 : b.x0 + (i / (n - 1)) * (b.x1 - b.x0),
    y: y(v),
    label: spec.x[i],
    value: v,
  }));
  const verts = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  const first = points[0];
  const last = points[n - 1];
  const filled = `M${verts.join(' L')} L${last.x.toFixed(1)},${b.y1.toFixed(1)} L${first.x.toFixed(1)},${b.y1.toFixed(1)} Z`;
  const body = [
    `<path class="mc-area" fill="url(#${gradId})" d="${filled}"/>`,
    `<polyline class="mc-line" points="${verts.join(' ')}"/>`,
    `<circle class="mc-node" cx="${first.x.toFixed(1)}" cy="${first.y.toFixed(1)}" r="4.5"/>`,
    `<circle class="mc-dot" cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="5"/>`,
  ].join('');
  const labels = compact ? '' : xLabelsMarkup(points, b);
  return { body: body + labels, points };
}

function networkMarkup(spec, b) {
  const nodes = spec.nodes || [];
  const hubX = b.x1 - 26;
  const hubY = (b.y0 + b.y1) / 2;
  const parts = nodes.map((name, i) => {
    const ny = b.y0 + ((i + 0.5) / nodes.length) * (b.y1 - b.y0);
    const nx = b.x0 + 12;
    const d = `M${nx + 10},${ny.toFixed(1)} C${b.x0 + 104},${ny.toFixed(1)} ${hubX - 72},${hubY.toFixed(1)} ${hubX - 12},${hubY.toFixed(1)}`;
    return [
      `<path class="mc-line" d="${d}"/>`,
      `<circle class="mc-node" cx="${nx}" cy="${ny.toFixed(1)}" r="4"/>`,
      `<text class="mc-xlabel" x="${nx - 9}" y="${(ny + 3.5).toFixed(1)}" text-anchor="end">${name}</text>`,
    ].join('');
  });
  parts.push(
    `<circle class="mc-hub" cx="${hubX}" cy="${hubY.toFixed(1)}" r="11"/>`,
    `<text class="mc-delta" x="${hubX + 17}" y="${(hubY + 4).toFixed(1)}">DEEN</text>`,
  );
  return { body: parts.join(''), points: [] };
}

function tableMarkup(spec) {
  const rows = spec.x
    .map((label, i) => `<tr><th scope="row">${label}</th><td>${fmt(spec.y[i])}</td></tr>`)
    .join('');
  return (
    '<table class="sr-only">' +
    `<caption>${spec.title} (${spec.unit})</caption>` +
    '<thead><tr><th scope="col">Period</th><th scope="col">Value</th></tr></thead>' +
    `<tbody>${rows}</tbody></table>`
  );
}

let gradSeq = 0;

/**
 * Build one case chart.
 *
 * @param {string} type  key of CASE_CHARTS
 * @param {{compact?: boolean}} [opts] compact drops axes, labels and the
 *   readout overlay for the small cursor-preview card.
 * @returns {{html: string, spec: object, points: Array}}
 */
export function buildCaseChart(type, opts = {}) {
  const spec = CASE_CHARTS[type] || CASE_CHARTS.drop;
  const compact = !!opts.compact;
  const b = plotBox();
  const y = yScale(spec, b);
  const gradId = `mcGrad${(gradSeq += 1)}`;

  let body = '';
  let points = [];
  if (spec.kind === 'network') {
    ({ body, points } = networkMarkup(spec, b));
  } else if (spec.kind === 'bars') {
    const series = barsMarkup(spec, b, y, compact);
    body = axesMarkup(spec, b, y, compact) + series.body;
    points = series.points;
  } else {
    const series = areaMarkup(spec, b, y, compact, gradId);
    body = axesMarkup(spec, b, y, compact) + series.body;
    points = series.points;
  }

  const defs =
    spec.kind === 'area'
      ? `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">` +
        '<stop offset="0" stop-color="#5cc6e8" stop-opacity=".55"/>' +
        '<stop offset="1" stop-color="#5cc6e8" stop-opacity="0"/></linearGradient></defs>'
      : '';

  const interactive = !compact && points.length > 0;
  const overlay = interactive
    ? `<line class="mc-cross mc-off" x1="0" x2="0" y1="${b.y0}" y2="${b.y1}"/>` +
      '<g class="mc-readout mc-off"><rect class="mc-readout-bg" rx="4" width="0" height="18"/>' +
      '<text class="mc-readout-txt" x="0" y="12.5"></text></g>'
    : '';

  const svg =
    `<svg viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="xMidYMid meet" ` +
    `aria-hidden="true" focusable="false">${defs}${body}${overlay}</svg>`;

  return {
    html: svg + (interactive && spec.y ? tableMarkup(spec) : ''),
    spec,
    points,
    interactive,
  };
}

/* Screen-pixel x -> SVG user-space x, accounting for the letterboxing that
   preserveAspectRatio="xMidYMid meet" introduces inside the padded panel. */
function toUserX(svg, clientX) {
  const r = svg.getBoundingClientRect();
  if (!r.width || !r.height) return null;
  const scale = Math.min(r.width / VIEW.w, r.height / VIEW.h);
  return (clientX - r.left - (r.width - VIEW.w * scale) / 2) / scale;
}

/**
 * Wire hover + keyboard readout onto a rendered chart panel.
 * Progressive enhancement only: without it the chart is still fully readable
 * and the data table is still available to assistive tech.
 *
 * @param {HTMLElement} container  the .case__chart panel
 * @param {{spec: object, points: Array, interactive?: boolean}} chart
 */
export function attachCaseChart(container, chart) {
  if (!container || !chart || !chart.interactive) return;
  const svg = container.querySelector('svg');
  const cross = container.querySelector('.mc-cross');
  const readout = container.querySelector('.mc-readout');
  const bg = container.querySelector('.mc-readout-bg');
  const txt = container.querySelector('.mc-readout-txt');
  if (!svg || !cross || !readout || !bg || !txt) return;

  const { spec, points } = chart;
  const live = document.createElement('span');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  container.appendChild(live);

  container.tabIndex = 0;
  container.setAttribute('role', 'group');
  container.setAttribute(
    'aria-label',
    `${spec.summary} Use the arrow keys to step through the values.`,
  );

  let active = -1;
  const hint = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const hide = () => {
    active = -1;
    cross.classList.add('mc-off');
    readout.classList.add('mc-off');
  };

  const show = (i) => {
    if (i < 0 || i >= points.length) return hide();
    if (i === active) return;
    active = i;
    const p = points[i];
    const text = `${p.label} · ${fmt(p.value)} ${spec.unit}`.trim();
    const w = text.length * 5.5 + 14;

    bg.setAttribute('width', w.toFixed(1));
    const bx = clamp(p.x - w / 2, 2, VIEW.w - w - 2);
    const by = clamp(p.y - 27, 2, VIEW.h - 21);
    readout.setAttribute('transform', `translate(${bx.toFixed(1)} ${by.toFixed(1)})`);
    txt.setAttribute('x', '7');
    txt.textContent = text;

    cross.setAttribute('x1', p.x.toFixed(1));
    cross.setAttribute('x2', p.x.toFixed(1));
    cross.classList.remove('mc-off');
    readout.classList.remove('mc-off');

    live.textContent = `${spec.title}, ${p.label}: ${fmt(p.value)} ${spec.unit}`.trim();
  };

  if (hint) {
    container.addEventListener(
      'pointermove',
      (e) => {
        const ux = toUserX(svg, e.clientX);
        if (ux === null) return;
        let best = 0;
        let bestD = Infinity;
        points.forEach((p, i) => {
          const d = Math.abs(p.x - ux);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        show(best);
      },
      { passive: true },
    );
    container.addEventListener('pointerleave', hide);
  }

  container.addEventListener('focus', () => show(active < 0 ? 0 : active));
  container.addEventListener('blur', hide);
  container.addEventListener('keydown', (e) => {
    const n = points.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      show((active + 1 + n) % n);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      show((active - 1 + n) % n);
      e.preventDefault();
    } else if (e.key === 'Home') {
      show(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      show(n - 1);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      hide();
    }
  });
}
