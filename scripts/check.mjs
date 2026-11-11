#!/usr/bin/env node
// Verificações estáticas sem dependências: sintaxe dos scripts, módulos citados na configuração,
// ausência de padrões inseguros e de segredos acidentais no código-fonte.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(root, 'config/pages.json'), 'utf8'));
let errors = 0;
const fail = (m) => { console.error('ERRO: ' + m); errors++; };

const jsFiles = [...cfg.shared, ...Object.values(cfg.bundles)];
for (const f of jsFiles) {
  if (!existsSync(join(root, f))) { fail(`arquivo ausente: ${f}`); continue; }
  const r = spawnSync(process.execPath, ['--check', join(root, f)], { encoding: 'utf8' });
  if (r.status !== 0) fail(`sintaxe em ${f}\n${r.stderr}`);
}
for (const p of cfg.pages) {
  for (const b of p.bundles) if (!cfg.bundles[b]) fail(`página ${p.slug} usa bundle inexistente: ${b}`);
  if (p.mode === 'tool' && !p.mod) fail(`página ${p.slug} sem módulo`);
}
const slugs = cfg.pages.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) fail('slugs duplicados em config/pages.json');

const bad = [
  [/\beval\s*\(/, 'eval()'],
  [/new\s+Function\s*\(/, 'new Function()'],
  [/document\.write\s*\(/, 'document.write()'],
  [/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/, 'chamada de rede (os dados devem ficar no navegador)'],
  [/(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"]{8,}/i, 'possível segredo no código'],
];
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
for (const f of walk(join(root, 'src'))) {
  const t = readFileSync(f, 'utf8');
  for (const [re, name] of bad) if (re.test(t)) fail(`${f.replace(root + '/', '')}: ${name}`);
}
if (errors) { console.error(`\n${errors} problema(s).`); process.exit(1); }
console.log(`ok: ${jsFiles.length} arquivos JS, ${cfg.pages.length} páginas`);
