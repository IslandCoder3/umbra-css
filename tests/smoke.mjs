// Smoke tests for Umbra. Run: npm install && npx playwright install chromium && npm test
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.UMBRA_ROOT || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, b) => e ? (res.writeHead(404), res.end('nf')) : (res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' }), res.end(b)));
});
await new Promise(r => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}/`;
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : '  -> ' + detail}`); };

const browser = await chromium.launch();
const open = async (url, w = 1280, mobile = false) => {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.goto(BASE + url); await page.waitForTimeout(400);
  return { ctx, page, errors };
};

// 1. Gallery
{
  const { ctx, page, errors } = await open('index.html');
  await page.waitForFunction(() => document.querySelectorAll('.tile').length >= 160);
  const n = await page.evaluate(() => document.querySelectorAll('.tile').length);
  check('gallery renders 160+ designs', n >= 160, String(n));
  const slugs = await page.evaluate(() => D.map(d => slug(d[1])));
  check('design slugs are unique', new Set(slugs).size === slugs.length);
  check('design slugs are valid class names', slugs.every(s => /^[a-z]/.test(s)));
  const counts = await page.evaluate(() => [...document.querySelectorAll('#filters .chip')].filter(c => !['All', 'Favorites'].includes(c.dataset.c)).every(c => +c.querySelector('.n').textContent === D.filter(d => d[0] === c.dataset.c).length));
  check('category chip counts match', counts);
  await page.fill('#q', 'glass'); await page.waitForTimeout(300);
  check('search filters designs', await page.evaluate(() => { const v = [...document.querySelectorAll('.tile')].filter(t => !t.hidden).length; return v >= 3 && v < 20 }));
  await page.fill('#q', '');
  await page.evaluate(() => document.querySelector('.tile .chip').click());
  check('edit panel opens with code', await page.evaluate(() => !document.querySelector('#drawer').hidden && document.querySelector('#dcode').value.length > 20));
  check('deep link hash is set', await page.evaluate(() => location.hash.length > 1));
  await page.click('#dclose');
  await page.goto(BASE + 'index.html#soft-lift'); await page.waitForTimeout(500);
  check('deep link opens the design', await page.evaluate(() => !document.querySelector('#drawer').hidden && document.querySelector('#dtitle').textContent === 'Soft lift'));
  await page.click('#dfav'); await page.reload(); await page.waitForTimeout(400);
  check('favorites persist after reload', await page.evaluate(() => document.querySelector('#filters [data-c="Favorites"] .n').textContent === '1'));
  await page.goto(BASE + 'index.html'); await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(200);
  await page.click('.totop'); await page.waitForTimeout(1500);
  check('back to top works', await page.evaluate(() => scrollY === 0));
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(200);
  const navTop = await page.evaluate(() => document.querySelector('.links [aria-current]').textContent);
  await page.evaluate(() => document.querySelector('#tools').scrollIntoView()); await page.waitForTimeout(300);
  const navTools = await page.evaluate(() => document.querySelector('.links [aria-current]').textContent);
  check('nav highlights Designs at the top and Tools in its section', navTop === 'Designs' && navTools === 'Tools', navTop + ' / ' + navTools);
  for (const cat of ['Cards', 'Glass']) {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(200);
    await page.evaluate(c => document.querySelector(`#filters [data-c="${c}"]`).click(), cat); await page.waitForTimeout(1400);
    const off = await page.evaluate(() => { const t = [...document.querySelectorAll('.tile')].find(x => !x.hidden).getBoundingClientRect().top, head = document.querySelector('.site').offsetHeight + document.querySelector('.bar').offsetHeight; return t - head });
    check(`category click scrolls to the first designs: ${cat}`, off >= 0 && off <= 60, `offset ${Math.round(off)}px`);
  }
  check('gallery has no console errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// 2. Studio: every tool, formats, share round trip, saved looks
{
  const { ctx, page, errors } = await open('studio.html');
  const ids = await page.evaluate(() => TOOLS.flatMap(g => g[1].map(t => t[0])));
  check('studio has 34 tools', ids.length === 34, String(ids.length));
  const bad = [];
  for (const id of ids) {
    await page.evaluate(i => { location.hash = '#' + i }, id); await page.waitForTimeout(90);
    const code = await page.evaluate(() => document.querySelector('#code').textContent);
    if (!code.trim() || /NaN|undefined|\[object/.test(code)) bad.push(id);
  }
  check('every tool outputs valid code', bad.length === 0, bad.join(','));
  await page.evaluate(() => { location.hash = '#box' }); await page.waitForTimeout(150);
  for (const f of ['Tailwind', 'SCSS', 'Variables', 'React']) {
    await page.evaluate(f => [...document.querySelectorAll('#fmts button')].find(b => b.textContent === f).click(), f);
    const t = await page.evaluate(() => document.querySelector('#code').textContent);
    check(`export format: ${f}`, t.length > 20 && !/undefined/.test(t));
  }
  for (const id of ['box', 'gradient', 'clip', 'flex', 'spec']) {
    await page.goto(BASE + 'studio.html#' + id); await page.waitForTimeout(250);
    await page.evaluate(() => [...document.querySelectorAll('#fmts button')].find(b => b.textContent === 'CSS').click());
    await page.evaluate(() => { window.__u = null; navigator.clipboard.writeText = async t => { window.__u = t } });
    const before = await page.evaluate(() => document.querySelector('#code').textContent);
    await page.click('#share'); await page.waitForTimeout(150);
    const url = await page.evaluate(() => window.__u);
    const p2 = await ctx.newPage(); await p2.goto(url); await p2.waitForTimeout(300);
    check(`share link round trip: ${id}`, (await p2.evaluate(() => document.querySelector('#code').textContent)) === before); await p2.close();
  }
  await page.goto(BASE + 'studio.html#gradient'); await page.waitForTimeout(250);
  await page.click('#save'); await page.reload(); await page.waitForTimeout(300);
  check('saved looks persist', await page.evaluate(() => document.querySelectorAll('.svrow').length === 1));
  check('studio has no console errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// 2b. Editing features: undo, import, draggable handles, steps, formatter
{
  const { ctx, page, errors } = await open('studio.html#box');
  const code = () => page.evaluate(() => document.querySelector('#code').textContent);
  const click = label => page.evaluate(l => [...document.querySelectorAll('#controls button')].find(b => b.textContent === l).click(), label);
  const drag = async (i, dx, dy) => { const bb = await page.locator('.hnd').nth(i).boundingBox(); const x = bb.x + bb.width / 2, y = bb.y + bb.height / 2; await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + dx, y + dy, { steps: 6 }); await page.mouse.up(); await page.waitForTimeout(200) };
  const c0 = await code();
  await page.evaluate(() => { const r = [...document.querySelectorAll('#controls input[type=range]')].find(x => x.id.startsWith('s_Blur')); r.value = 60; r.dispatchEvent(new Event('input')) });
  const c1 = await code(); await click('Undo'); const u = await code(); await click('Redo'); const r = await code(); await click('Reset'); const z = await code();
  check('undo, redo and reset work', c1 !== c0 && u === c0 && r === c1 && z === c0);
  await click('Import CSS'); await page.fill('.imp textarea', 'background: linear-gradient(90deg, #111 0%, #f0f 100%);'); await click('Apply'); await page.waitForTimeout(250);
  check('pasting CSS opens the matching tool', await page.evaluate(() => document.querySelector('#tabs [aria-selected=true]').textContent === 'Gradient') && /linear-gradient\(90deg/.test(await code()));
  await click('Import CSS'); await page.fill('.imp textarea', 'font-size: clamp(1rem, 0.143rem + 3.81vw, 3rem);'); await click('Apply'); await page.waitForTimeout(250);
  check('pasted clamp() is read back', (await code()).startsWith('font-size: clamp(1rem, 0.143rem + 3.81vw, 3rem)'), (await code()).split('\n')[0]);
  await page.goto(BASE + 'studio.html#ease'); await page.waitForTimeout(300);
  const e0 = await code(); await drag(0, 60, -80); check('easing curve handle drags', (await code()) !== e0);
  await page.goto(BASE + 'studio.html#gradient'); await page.waitForTimeout(300);
  const g0 = await code(); await drag(1, -60, 0); check('gradient stop handle drags', (await code()) !== g0);
  const n = await page.evaluate(() => document.querySelectorAll('.hnd').length); const g1 = await code(); await drag(n - 1, 0, -70); check('gradient angle dial drags', (await code()) !== g1);
  await page.goto(BASE + 'studio.html#radius'); await page.waitForTimeout(300);
  const r0 = await code(); await drag(0, -70, 0); check('radius handle drags', (await code()) !== r0);
  await page.goto(BASE + 'studio.html#fmt'); await page.waitForTimeout(300);
  check('formatter formats CSS', /\.card \{\n  display: flex;/.test(await code()));
  await click('Minify'); check('formatter minifies CSS', !(await code()).includes('\n') && (await code()).startsWith('.card{display:flex'));
  await page.goto(BASE + 'studio.html#anim'); await page.waitForTimeout(300); await click('custom');
  const pct = async () => (await code()).match(/\n  \d+%/g).length;
  const s0 = await pct(); await click('Add step'); check('animation keyframe steps can be added', (await pct()) === s0 + 1);
  await page.goto(BASE + 'studio.html#tw'); await page.waitForTimeout(300);
  const twOut = await code(); check('Tailwind classes convert to CSS', /display: flex;/.test(twOut) && /\.element:hover \{/.test(twOut) && /@media \(min-width: 768px\)/.test(twOut));
  await page.goto(BASE + 'studio.html#fonts'); await page.waitForTimeout(300);
  check('font pairing outputs Google Fonts code', /fonts\.googleapis\.com\/css2/.test(await code()) && /font-family: "Playfair Display"/.test(await code()));
  await page.goto(BASE + 'studio.html#theme'); await page.waitForTimeout(300);
  const thOut = await code(); check('theme builder outputs light and dark variables', /--color-bg/.test(thOut) && /prefers-color-scheme: dark/.test(thOut) && /\[data-theme="dark"\]/.test(thOut));
  await page.goto(BASE + 'studio.html#boxm'); await page.waitForTimeout(300);
  check('box model outputs sizes', /drawn size with padding and border: 248px x 140px/.test(await code()));
  check('studio editing has no console errors', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// 3. No sideways scrolling, every tool, several widths
for (const [w, mobile] of [[320, true], [390, true], [768, false], [1280, false]]) {
  for (const pageName of ['index.html', 'studio.html']) {
    const { ctx, page } = await open(pageName, w, mobile);
    let over = [];
    if (pageName === 'studio.html') {
      const ids = await page.evaluate(() => TOOLS.flatMap(g => g[1].map(t => t[0])));
      for (const id of ids) { await page.evaluate(i => { location.hash = '#' + i }, id); await page.waitForTimeout(60); if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) over.push(id) }
    } else { await page.waitForFunction(() => document.querySelectorAll('.tile').length >= 160); if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) over.push('page') }
    check(`no horizontal overflow: ${pageName} at ${w}px`, over.length === 0, over.join(','));
    await ctx.close();
  }
}

// 4. Metadata and PWA files
{
  const { ctx, page } = await open('index.html');
  const meta = await page.evaluate(() => ['og:title', 'og:description', 'og:image', 'og:url'].every(p => document.querySelector(`meta[property="${p}"]`)?.content) && !!document.querySelector('meta[name="twitter:card"]') && !!document.querySelector('meta[name="description"]') && !!document.querySelector('link[rel="canonical"]') && !!document.querySelector('link[rel="icon"]') && !!document.querySelector('link[rel="manifest"]'));
  check('share and SEO metadata present', meta);
  await ctx.close();
  const get = async f => (await fetch(BASE + f));
  const man = await (await get('manifest.webmanifest')).json();
  check('manifest is valid', man.name && man.icons.length >= 2 && man.start_url);
  for (const f of ['sw.js', '404.html', 'robots.txt', 'sitemap.xml', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'og-image.png']) check(`file served: ${f}`, (await get(f)).status === 200);
}

await browser.close(); server.close();
const failed = results.filter(r => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
