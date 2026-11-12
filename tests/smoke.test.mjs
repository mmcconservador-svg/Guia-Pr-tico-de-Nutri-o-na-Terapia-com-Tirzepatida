import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(readFileSync(join(root, 'config/pages.json'), 'utf8'));

let browser, server, base;

before(async () => {
  const r = spawnSync(process.execPath, [join(root, 'scripts/build.mjs'), '--target=web'], { encoding: 'utf8', env: { ...process.env, BUILD_DIR: 'dist' } });
  assert.equal(r.status, 0, r.stderr);
  const { chromium } = require('playwright');
  const { start } = await import('../scripts/serve.mjs');
  server = await start(0, '127.0.0.1');
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});
after(async () => { await browser?.close(); server?.close(); });

async function open(slug, errors) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  // Falhas de carregamento das fontes (rede restrita em CI ou sandbox) não são erros do código. Violações de CSP e de script continuam falhando.
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('console: ' + m.text()); });
  await page.goto(`${base}/${slug}.html`);
  await page.waitForSelector('#app h1');
  return { page, ctx };
}

for (const p of cfg.pages) {
  test(`página ${p.slug} abre sem erros e respeita a CSP`, async () => {
    const errors = [];
    const { page, ctx } = await open(p.slug, errors);
    const h1 = await page.textContent('h1');
    assert.ok(h1 && h1.trim().length > 3, 'sem título');
    assert.ok((await page.locator('#app').innerText()).length > 80, 'conteúdo vazio');
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('painel: todas as abas renderizam', async () => {
  const errors = [];
  const { page, ctx } = await open('painel', errors);
  const tabs = await page.locator('.tab').count();
  assert.equal(tabs, cfg.hubOrder.length);
  for (let i = 0; i < tabs; i++) {
    await page.locator('.tab').nth(i).click();
    assert.ok((await page.locator('#view').innerText()).length > 60, `aba ${i} vazia`);
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('cálculos clínicos: GET, Jackson e Pollock e Durnin e Womersley', async () => {
  const errors = [];
  const { page, ctx } = await open('painel', errors);
  const r = await page.evaluate(() => {
    const p = T.S.p;
    return {
      get: T.c.get(p),
      meta: T.c.meta(p),
      jp3: T.compCalc('jp3', { sex: 'F', age: 38, alt: 164, dc: { tri: 28, sup: 32, cox: 40 }, cm: {} }).g,
      dw: T.compCalc('durnin', { sex: 'F', age: 62, alt: 156, dc: { bic: 12, tri: 24, sub: 22, sup: 26 }, cm: {} }).g,
      navyM: T.compCalc('marinha', { sex: 'M', age: 45, alt: 176, dc: {}, cm: { pesc: 44, cint: 124, quad: 112 } }).g,
      navyF: T.compCalc('marinha', { sex: 'F', age: 38, alt: 164, dc: {}, cm: { pesc: 33, cint: 98, quad: 112 } }).g,
      faltando: T.compCalc('jp3', { sex: 'F', age: 38, alt: 164, dc: { tri: 28 }, cm: {} }).miss.length,
      rec: [T.compRec('F', 38, 32.4, 'sedentario').r, T.compRec('M', 45, 38.1, 'sedentario').r, T.compRec('F', 62, 27.9, 'sedentario').r, T.compRec('M', 29, 27.1, 'atleta').r, T.compRec('F', 24, 21.3, 'sedentario').r],
    };
  });
  assert.ok(Math.abs(r.get - 2125.75) < 0.01, `GET ${r.get}`);
  assert.ok(Math.abs(r.meta - 1625.75) < 0.01, `meta ${r.meta}`);
  assert.ok(r.jp3 > 35 && r.jp3 < 38, `JP3 ${r.jp3}`);
  assert.ok(r.dw > 38 && r.dw < 42, `Durnin ${r.dw}`);
  assert.ok(r.navyM > 33 && r.navyM < 41, `Marinha M ${r.navyM}`);
  assert.ok(r.navyF > 40 && r.navyF < 50, `Marinha F ${r.navyF}`);
  assert.equal(r.faltando, 2);
  assert.deepEqual(r.rec, ['jp3', 'marinha', 'durnin', 'jp7', 'guedes']);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('dados persistem após recarregar a página', async () => {
  const errors = [];
  const { page, ctx } = await open('get-deficit-macros', errors);
  await page.fill('#i_p_nome', 'Teste Fictício');
  await page.waitForTimeout(400);
  await page.reload();
  await page.waitForSelector('#app h1');
  assert.equal(await page.inputValue('#i_p_nome'), 'Teste Fictício');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('página gerada não faz requisições de rede além das fontes', async () => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const hosts = new Set();
  page.on('request', (r) => { const u = new URL(r.url()); if (u.protocol.startsWith('http')) hosts.add(u.host); });
  await page.goto(`${base}/painel.html`);
  await page.waitForSelector('#app h1');
  await page.waitForTimeout(300);
  const allowed = new Set([new URL(base).host, 'fonts.googleapis.com', 'fonts.gstatic.com']);
  for (const h of hosts) assert.ok(allowed.has(h), `host inesperado: ${h}`);
  await ctx.close();
});

test('guia: landing abre o aplicativo, navega e volta', async () => {
  const errors = [];
  const { page, ctx } = await open('guia', errors);
  assert.ok(await page.locator('.hero').count(), 'sem hero');
  assert.equal(await page.locator('.tile').count(), 12);
  // escada de doses altera a proteína exibida
  const antes = await page.locator('.hero-c .kpi.hi .v').innerText();
  await page.locator('.stairs button').first().click();
  const depois = await page.locator('.hero-c .kpi.hi .v').innerText();
  assert.notEqual(antes, depois, 'a dose não alterou a meta de proteína');
  await page.locator('.hero [data-act="openapp"]').click();
  await page.waitForSelector('.appx');
  assert.equal(await page.locator('.sl').count(), 12);
  for (let i = 0; i < 12; i++) {
    await page.locator('.sl').nth(i).click();
    assert.ok((await page.locator('#view').innerText()).length > 60, `item ${i} vazio`);
  }
  await page.locator('[data-act="pres"]').click();
  assert.equal(await page.locator('.side').isVisible(), false, 'menu visível na apresentação');
  await page.locator('[data-act="pres"]').click();
  await page.locator('[data-act="home"]').first().click();
  await page.waitForSelector('.hero');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('guia: sem rolagem horizontal em tela de celular', async () => {
  const ctx = await browser.newContext({ viewport: { width: 400, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/guia.html`);
  await page.waitForSelector('.hero');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'landing');
  await page.locator('.hero [data-act="openapp"]').click();
  await page.waitForSelector('.appx');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'app');
  await ctx.close();
});
