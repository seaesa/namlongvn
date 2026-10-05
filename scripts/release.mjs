// Copies only the deployable static site into dist/ (no docs, tooling, templates, data or node_modules).
//   node scripts/release.mjs   ->  dist/  (upload this folder to the web root)
import { cpSync, rmSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const exclude = new Set(['dist', 'docs', 'scripts', 'templates', 'data', 'node_modules', '.playwright-mcp', '.git',
  'package.json', 'package-lock.json', 'nginx.conf.example', '.DS_Store', '.env.local', '.gitignore', '.vercel', '.vercelignore', 'README.md']);
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
let files = 0;
for (const name of readdirSync(root)) {
  if (exclude.has(name)) continue;
  const src = join(root, name);
  // top level: keep page folders (contain index.html), assets/, index.html, 404.html, .htaccess, robots/sitemap if any
  const keep = name === 'assets' || /\.(html|txt|xml|ico)$/.test(name) || name === '.htaccess'
    || (statSync(src).isDirectory() && existsSync(join(src, 'index.html'))) || (statSync(src).isDirectory() && name !== 'assets' && readdirSync(src).some(n => existsSync(join(src, n, 'index.html'))));
  if (!keep) { console.log('skip', name); continue; }
  cpSync(src, join(dist, name), { recursive: true, filter: (s) => !s.endsWith('.DS_Store') });
  files++;
}
console.log(`dist/ ready (${files} top-level entries)`);
