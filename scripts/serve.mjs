#!/usr/bin/env node
// Servidor estático para desenvolvimento. Escuta só em 127.0.0.1 por padrão.
// Configuração: PORT (padrão 5173) e HOST (padrão 127.0.0.1) por ambiente ou .env.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = join(root, '.env');
const env = { ...process.env };
if (existsSync(envFile)) {
  for (const l of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const host = env.HOST || '127.0.0.1';
const port = Number(env.PORT || 5173);
const base = resolve(root, env.BUILD_DIR || 'dist', 'web');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };

export function start(p = port, h = host) {
  const srv = createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
    let rel;
    try { rel = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
    if (rel.includes('\0')) { res.writeHead(400).end(); return; }
    let file = normalize(join(base, rel));
    if (file !== base && !file.startsWith(base + sep)) { res.writeHead(403).end('Forbidden'); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'no-store',
    });
    res.end(req.method === 'HEAD' ? undefined : readFileSync(file));
  });
  return new Promise((ok) => srv.listen(p, h, () => ok(srv)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!existsSync(base)) { console.error('Execute "npm run build" antes de servir.'); process.exit(1); }
  start().then(() => console.log(`Servindo ${base}\nhttp://${host}:${port}/`));
}
