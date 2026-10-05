#!/usr/bin/env node
/**
 * DIST ASSET SMOKE TEST
 * Verifies that every local asset reference in the built dist/ output actually
 * resolves to a real file on disk — across HTML entry points, the service
 * worker precache list, manifest icons, and bundled CSS url() references.
 *
 * Prevents "shipped 404s" (e.g. the /img/projects/*.png bug).
 *
 * Usage: npm test   (builds first, then checks — exits 1 on any broken ref)
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(DIST)) {
  console.error('[FAIL] dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const REF_RE = /(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi;
const CSS_URL_RE = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

const missing = new Set();
const checked = new Set();

function isExternal(ref) {
  return /^(https?:|\/\/|data:|mailto:|tel:|blob:|javascript:|#)/i.test(ref);
}

function resolveRef(fromFile, ref) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return null;
  if (clean.startsWith('/')) return path.join(DIST, clean);
  return path.resolve(path.dirname(fromFile), clean);
}

function resolves(target) {
  if (!fs.existsSync(target)) return false;
  // Directory refs (e.g. "/") are fine when they have an index.html — GH Pages serves it.
  if (fs.statSync(target).isDirectory()) return fs.existsSync(path.join(target, 'index.html'));
  return true;
}

function checkRef(fromFile, ref) {
  if (!ref || isExternal(ref)) return;
  const target = resolveRef(fromFile, ref);
  if (!target) return;
  const rel = `${path.relative(DIST, fromFile)} -> ${ref}`;
  if (checked.has(rel)) return;
  checked.add(rel);
  if (!resolves(target)) {
    missing.add(rel);
  }
}

// 1. Local refs in every built HTML entry point
for (const f of fs.readdirSync(DIST)) {
  if (!f.endsWith('.html')) continue;
  const file = path.join(DIST, f);
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(REF_RE)) checkRef(file, m[1]);
}

// 2. Service worker precache list
const swPath = path.join(DIST, 'sw.js');
if (fs.existsSync(swPath)) {
  const sw = fs.readFileSync(swPath, 'utf8');
  const list = sw.match(/STATIC_ASSETS\s*=\s*\[([\s\S]*?)\]/);
  if (list) {
    for (const entry of list[1].matchAll(/['"]([^'"]+)['"]/g)) {
      const ref = entry[1];
      const target = ref === '/' ? path.join(DIST, 'index.html') : path.join(DIST, ref);
      const rel = `sw.js -> ${ref}`;
      checked.add(rel);
      if (!fs.existsSync(target)) missing.add(rel);
    }
  }
}

// 3. Manifest icon paths
const manifestPath = path.join(DIST, 'manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const icon of manifest.icons || []) {
      const rel = `manifest.json -> ${icon.src}`;
      checked.add(rel);
      if (!fs.existsSync(path.join(DIST, icon.src))) missing.add(rel);
    }
  } catch {
    console.error('[WARN] manifest.json in dist/ is not valid JSON.');
  }
}

// 4. url() refs inside bundled CSS (Vite rewrites these to relative hashed files)
function walkCss(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walkCss(p);
    else if (f.name.endsWith('.css')) {
      const css = fs.readFileSync(p, 'utf8');
      for (const m of css.matchAll(CSS_URL_RE)) checkRef(p, m[1]);
    }
  }
}
walkCss(DIST);

if (missing.size > 0) {
  console.error(`\n[FAIL] ${missing.size} broken asset reference(s) in dist/:\n`);
  for (const m of [...missing].sort()) console.error('  ' + m);
  process.exit(1);
}

console.log(`[OK] ${checked.size} asset references checked in dist/ — all resolve.`);
