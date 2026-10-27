/* Plays a full run of the v1 engine (choice / spend / slider / budget beats),
   reporting any console error and any panel that overflows its viewport.
   Usage: node walk.js [W H] ; PICK=0|1|2 chooses which option to take. */
const puppeteer = require('/Users/andrewhuang/Projects/split/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const W = +(process.argv[2] || 1366), H = +(process.argv[3] || 768);
const PICK = +(process.env.PICK || 0);

(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: W, height: H });
  const errs = [];
  p.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon|font|woff|ERR_FILE_NOT_FOUND|ERR_FAILED/i.test(m.text())) errs.push('console: ' + m.text()); });
  await p.goto('file:///Users/andrewhuang/Projects/no-clean-hands/index.html', { waitUntil: 'networkidle0' });
  await sleep(400);

  const over = [];
  const check = async (tag) => {
    const r = await p.evaluate(() => {
      const d = document.documentElement;
      const of = (sel) => { const e = document.querySelector(sel);
        return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0; };
      return { page: Math.max(0, d.scrollHeight - d.clientHeight),
               pane: of('.panel'), scroll: of('.scroll'), sheet: of('.sheet'),
               head: (document.querySelector('.where h2') || {}).textContent || document.title };
    });
    if (r.page || r.pane || r.scroll || r.sheet)
      over.push(`${tag} [${r.head}] page+${r.page} panel+${r.pane} scroll+${r.scroll} sheet+${r.sheet}`);
    return r;
  };

  let steps = 0, screens = 0;
  while (steps++ < 90) {
    const st = await p.evaluate(() => ({
      phase: G.phase, type: (G.beats[G.b] || {}).type,
      has: { go: !!document.querySelector('#go'), next: !!document.querySelector('#next'),
             pick: document.querySelectorAll('.pick').length, card: document.querySelectorAll('.card').length,
             sl: !!document.querySelector('#sl'), bstep: document.querySelectorAll('.bstep').length,
             commit: !!document.querySelector('#commit'), deb: !!document.querySelector('#deb') }
    }));
    screens++;
    if (process.env.V) console.log('   ', screens, st.phase, st.type || '');
    const r = await check(`${st.phase}${st.type ? '/' + st.type : ''}`);
    if (st.phase === 'debrief') { console.log(`  reached debrief after ${screens} screens`); break; }

    if (st.has.go) { await p.click('#go'); }
    else if (st.has.next) { await p.click('#next'); }
    else if (st.has.deb) { await p.click('#deb'); }
    else if (st.has.pick) {
      // take PICK if it is affordable, else the nearest option that is
      const i = await p.evaluate((want) => {
        const els = [...document.querySelectorAll('.pick')];
        const ok = els.map((e, n) => ({ n, broke: e.disabled })).filter((x) => !x.broke).map((x) => x.n);
        if (!ok.length) return -1;
        return ok.includes(want) ? want : ok.reduce((a, c) => Math.abs(c - want) < Math.abs(a - want) ? c : a);
      }, Math.min(PICK, st.has.pick - 1));
      if (i < 0) { console.log('  DEAD END: every option unaffordable'); break; }
      await p.click(`.pick[data-i="${i}"]`);
    }
    else if (st.has.card) {
      // toggle a couple of cards, then commit
      for (let i = 0; i <= Math.min(PICK + 1, st.has.card - 1); i++) {
        await p.click(`.card[data-i="${i}"]`); await sleep(30);
      }
      await check('spend/picked');
      await p.click('#commit');
    }
    else if (st.has.sl) {
      await p.evaluate((v) => { const s = document.querySelector('#sl');
        s.value = v; s.dispatchEvent(new Event('input')); }, [10, 50, 90][PICK] ?? 50);
      await sleep(40); await check('slider/moved');
      await p.click('#commit');
    }
    else if (st.has.bstep) {
      for (let k = 0; k < 3; k++) { await p.click(`.bstep[data-i="${k % st.has.bstep / 2 | 0}"][data-d="1"]`).catch(()=>{}); await sleep(25); }
      await check('budget/alloc');
      await p.click('#commit');
    }
    else { console.log('  STUCK at', JSON.stringify(st)); break; }
    await sleep(140);
  }

  const fin = await p.evaluate(() => ({ coins: G.s.coins, metal: G.s.metal, trust: G.s.trust, nature: G.s.nature, spent: G.spent, target: METAL_TARGET }));
  console.log(`${W}x${H} PICK=${PICK}  ->  metal ${fin.metal}/${fin.target}  trust ${fin.trust}  nature ${fin.nature}  coins left ${fin.coins} (spent ${fin.spent})`);
  if (errs.length) { console.log('  ERRORS:'); errs.forEach((e) => console.log('   ', e)); }
  if (over.length) { console.log('  OVERFLOW:'); over.forEach((o) => console.log('   ', o)); }
  if (!errs.length && !over.length) console.log('  clean: no js errors, no overflow');
  await b.close();
  process.exit(errs.length || over.length ? 1 : 0);
})();
