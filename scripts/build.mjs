#!/usr/bin/env node
// Gera as páginas a partir de src/ e config/pages.json.
// Uso: node scripts/build.mjs [--target web|artifact|all]
// Sem dependências externas. Lê variáveis de .env (se existir) e do ambiente.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

function loadEnv() {
  const env = { ...process.env };
  const f = join(root, '.env');
  if (existsSync(f)) {
    for (const line of readFileSync(f, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !(m[1] in process.env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const env = loadEnv();
const cfg = JSON.parse(read('config/pages.json'));
const target = (process.argv.find((a) => a.startsWith('--target=')) || '--target=all').split('=')[1];
const hubUrl = env.HUB_URL || '';
if (hubUrl && !/^https:\/\/[^\s"'<>]+$/.test(hubUrl)) {
  console.error('HUB_URL precisa ser uma URL https válida, sem espaços ou aspas.');
  process.exit(1);
}
const outDir = env.BUILD_DIR || 'dist';
const css = read('src/styles/base.css');
const sha = (s) => "'sha256-" + createHash('sha256').update(s, 'utf8').digest('base64') + "'";
const jsonInScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function scriptFor(page) {
  const files = [...cfg.shared];
  for (const b of page.bundles) files.push(cfg.bundles[b]);
  const code = files.map((f) => `/* ${f} */\n${read(f)}`).join('\n');
  const boot = {
    mode: page.mode,
    mod: page.mod || null,
    key: `${cfg.storagePrefix}.${page.slug}`,
    hubUrl: page.mode === 'hub' ? '' : hubUrl,
    order: cfg.hubOrder,
  };
  return `${code}\nT.boot(${jsonInScript(boot)});`;
}

function webPage(page) {
  const js = scriptFor(page);
  const csp = { ...cfg.csp, 'script-src': [sha(js)] };
  const cspStr = Object.entries(csp).map(([k, v]) => `${k} ${v.join(' ')}`).join('; ');
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${cspStr}">
<meta name="referrer" content="no-referrer">
<meta name="description" content="${page.description}">
<title>${page.title}</title>
<link rel="stylesheet" href="${cfg.fonts}">
<style>${css}</style>
</head>
<body>
<div id="app"></div>
<script>${js}</script>
</body>
</html>
`;
}

// Fragmento no formato aceito para publicação como Artifact (sem doctype, html, head ou body).
function artifactPage(page) {
  return `<title>${page.title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="${cfg.fonts}">
<style>${css}</style>
<div id="app"></div>
<script>${scriptFor(page)}</script>
`;
}

if (!['web', 'artifact', 'all'].includes(target)) {
  console.error('--target deve ser web, artifact ou all');
  process.exit(1);
}
rmSync(join(root, outDir), { recursive: true, force: true });
for (const t of ['web', 'artifact']) {
  if (target !== 'all' && target !== t) continue;
  const dir = join(root, outDir, t);
  mkdirSync(dir, { recursive: true });
  for (const page of cfg.pages) {
    const html = t === 'web' ? webPage(page) : artifactPage(page);
    writeFileSync(join(dir, `${page.slug}.html`), html);
    console.log(`${t}/${page.slug}.html  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
  }
  if (t === 'web') {
    const links = cfg.pages.map((p) => `<li><a href="${p.slug}.html">${p.title}</a></li>`).join('\n');
    writeFileSync(join(dir, 'index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Guia Prático de Nutrição na Terapia com Tirzepatida</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:640px;margin:40px auto;padding:0 16px}a{color:#0a7765}</style></head><body><h1>Guia Prático de Nutrição na Terapia com Tirzepatida</h1><ul>\n${links}\n</ul></body></html>\n`);
  }
}
