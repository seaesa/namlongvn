// Generates static pages for repeated page types: templates/<name>.mjs + data/<name>.json -> <out>/index.html
// The output is plain static HTML; run only when a template or its data changes:
//   node scripts/generate.mjs            (all templates)
//   node scripts/generate.mjs jobs news  (only these)
//
// A template module exports:
//   export const data = 'jobs.json';                       // file in /data (array of items)
//   export const out = (item) => `vi-tri-tuyen-dung/${item.slug}/index.html`;
//   export const shell = 'lien-he/index.html';             // optional: page whose <head>/header/footer is reused (default VI shell)
//   export const page = (item) => ({ title, css: ['x.css'], scripts: ['pages/x.js'], bodyClass: 'page-x' });
//   export const render = (item, all) => `<main id="main">…</main>`;
// Template helpers (esc, each) live in scripts/tpl-helpers.mjs.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url).pathname;
import { esc } from './tpl-helpers.mjs';

function wrap(shellPath, meta, main) {
  const src = readFileSync(join(root, shellPath), 'utf8');
  let head = src.slice(0, src.indexOf('<main'));
  let foot = src.slice(src.indexOf('</main>') + '</main>'.length);
  // drop the shell page's own page-specific assets, then add this page's
  head = head.replace(/\s*<link rel="stylesheet" href="\/assets\/css\/pages\/[^"]+">/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<body class="([^"]*)">/, () => `<body class="is-loading ${meta.bodyClass || ''}">`)
    .replace('</head>', (meta.css || []).map((c) => `  <link rel="stylesheet" href="/assets/css/pages/${c}">\n`).join('') + '</head>');
  foot = foot.replace(/\s*<script src="\/assets\/js\/pages\/[^"]+"><\/script>/g, '')
    .replace('<script src="/assets/js/main.js"></script>',
      (meta.scripts || []).map((s) => `<script src="${s.startsWith('http') ? s : '/assets/js/' + s}"></script>\n  `).join('') + '<script src="/assets/js/main.js"></script>');
  return head + main + foot;
}

const only = process.argv.slice(2);
for (const file of readdirSync(join(root, 'templates')).filter((f) => f.endsWith('.mjs'))) {
  const name = file.replace(/\.mjs$/, '');
  if (only.length && !only.includes(name)) continue;
  const t = await import(pathToFileURL(join(root, 'templates', file)).href);
  const items = JSON.parse(readFileSync(join(root, 'data', t.data), 'utf8'));
  for (const item of items) {
    const html = wrap(t.shell || 'lien-he/index.html', t.page(item, items), t.render(item, items));
    const out = join(root, t.out(item));
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  console.log(`${name}: ${items.length} page(s)`);
}
