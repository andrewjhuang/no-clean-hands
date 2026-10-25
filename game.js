/* NO CLEAN HANDS — engine.
   Ten coins for the whole game. A metal target you probably can't reach
   honestly. Four chapters, three decisions each, one storyline. */

const G = {
  ch: -1, b: 0, beats: [], phase: "title",
  s: Object.assign({}, START),
  flags: new Set(), record: [], spent: 0,
  secs: 120, left: 0, tick: null,
  p: {}, artKey: "title", artVar: "base",
};

const $ = (q) => document.querySelector(q);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cl = (n) => Math.max(0, Math.min(100, n));
const addD = (a, b) => { Object.entries(b || {}).forEach(([k, v]) => (a[k] = (a[k] || 0) + v)); return a; };
const setFlags = (f) => { if (f) String(f).split(",").forEach((x) => x.trim() && G.flags.add(x.trim())); };

function avatar(seed) {
  const f = [...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const brow = f % 3, mouth = (f >> 2) % 3;
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#231f20" stroke-width="3" fill="none" stroke-linecap="round">
    <circle cx="20" cy="20" r="14"/><circle cx="15" cy="17" r="1.6" fill="#231f20"/><circle cx="25" cy="17" r="1.6" fill="#231f20"/>
    ${brow === 0 ? '<path d="M11 11l6 2M29 11l-6 2"/>' : brow === 1 ? '<path d="M11 13h6M23 13h6"/>' : '<path d="M11 13l6-2M29 13l-6-2"/>'}
    ${mouth === 0 ? '<path d="M14 26q6 5 12 0"/>' : mouth === 1 ? '<path d="M14 27h12"/>' : '<path d="M14 28q6-5 12 0"/>'}
  </g></svg>`;
}

/* -------------------------------------------------------------- shell */
function shell(panel, extra = "") {
  document.body.innerHTML = `${bar()}
    <main class="stage">
      <section class="art"><div class="plate" id="art">
        <div class="layer" id="artlayer">${drawScene(G.artKey, G.artVar, G.p)}</div>${extra}
      </div></section>
      <section class="panel ${G.phase === "outcome" ? "mid" : ""}">${panel}</section>
    </main>`;
}
const paintArt = () => { const l = $("#artlayer"); if (l) l.innerHTML = drawScene(G.artKey, G.artVar, G.p); };

function coinRow(n, spentNow = 0) {
  let out = "";
  for (let i = 0; i < START.coins; i++) {
    const cls = i < n - spentNow ? "coin" : i < n ? "coin pend" : "coin gone";
    out += `<span class="${cls}"></span>`;
  }
  return out;
}

function bar(pending = 0) {
  if (G.phase === "title") {
    return `<header class="top"><span class="mark">No Clean <em>Hands</em></span><span class="grow"></span>
      <span class="tiny"><kbd>space</kbd> start</span></header>`;
  }
  const done = G.phase === "end" || G.phase === "debrief";
  const chap = CHAPTERS[Math.max(0, G.ch)];
  return `<header class="top">
    <span class="mark">No Clean <em>Hands</em></span>
    <span class="step">${done ? "2034" : `${esc(chap.title)} &middot; ${Math.min(G.b + 1, G.beats.length || 3)}/${G.beats.length || 3}`}</span>
    <span class="purse" title="Ten coins for the whole game. You never get more.">
      <b>${G.s.coins - pending}</b><span class="coins">${coinRow(G.s.coins, pending)}</span></span>
    <span class="grow"></span>
    <div class="gauges">
      <div class="gauge metal" data-k="metal" title="${esc(METERS[2].full)}">
        <div class="lb">Metal<b>${G.s.metal}<i>/${METAL_TARGET}</i></b></div>
        <div class="bar"><div class="fill" style="width:${Math.min(100, (G.s.metal / METAL_TARGET) * 100)}%"></div>
          <span class="goal"></span></div>
      </div>
      ${["trust", "nature"].map((k, i) => {
        const m = METERS[k === "trust" ? 0 : 1];
        return `<div class="gauge ${G.s[k] < 34 ? "low" : ""}" data-k="${k}" title="${esc(m.full)}">
          <div class="lb">${m.label}<b>${G.s[k]}</b></div>
          <div class="bar"><div class="fill" style="width:${G.s[k]}%"></div></div></div>`;
      }).join("")}
    </div></header>`;
}

const bump = (d) => Object.keys(d).forEach((k) => {
  const g = document.querySelector(`.gauge[data-k="${k}"]`);
  if (g) { g.classList.add("pop"); setTimeout(() => g.classList.remove("pop"), 520); }
});

/* -------------------------------------------------------------- title */
function title() {
  G.phase = "title"; G.artKey = "title"; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = "land";
  shell(`<div class="titlewrap">
      <h1 class="bigtitle">No Clean<br><em>Hands</em></h1>
      <p class="subtitle">${esc(PROLOGUE.sub)}</p>
      ${PROLOGUE.lines.map((l) => `<p class="situation">${l}</p>`).join("")}
      <div class="row"><button class="btn" id="go">Start</button>
        <label class="tiny">talk time <select id="tsel" class="sel">
          <option value="90">90s</option><option value="120" selected>2 min</option>
          <option value="180">3 min</option><option value="0">none</option></select></label></div>
      <p class="tiny">${esc(PROLOGUE.note)}</p>
    </div>`);
  $("#tsel").onchange = (e) => (G.secs = +e.target.value);
  $("#go").onclick = () => { G.ch = 0; chapter(); };
}

/* ------------------------------------------------------------ chapter */
function chapter() {
  const c = CHAPTERS[G.ch];
  if (!c) return ending();
  G.phase = "intro"; G.b = 0;
  G.beats = c.beats.filter((b) => !b.requires || G.flags.has(b.requires));
  G.artKey = c.art; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = c.realm;
  shell(`<div class="scroll">
      <div class="where"><h2>${esc(c.title)}</h2><span class="yr">chapter ${G.ch + 1} of ${CHAPTERS.length}</span></div>
      <p class="subtitle">${esc(c.sub)}</p>
      <p class="situation">${esc(c.intro)}</p>
      <div class="castrow">${c.cast.map((p) => `
        <span class="castchip"><span class="av">${avatar(p.who)}</span><b>${esc(p.who)}</b><i>${esc(p.role)}</i></span>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn" id="go">Three decisions &rarr;</button></div>`);
  $("#go").onclick = beat;
}

/* --------------------------------------------------------------- beat */
function beat() {
  const b = G.beats[G.b];
  if (!b) { G.ch++; return chapter(); }
  G.phase = "beat";
  G.artKey = b.art || CHAPTERS[G.ch].art; G.artVar = "base";
  G.p = b.type === "slider" ? { [b.slider.key]: b.slider.start }
      : b.type === "budget" ? { alloc: b.budget.lines.map(() => 0) }
      : b.type === "spend" ? { chosen: [] } : {};

  shell(`<div class="scroll">
      <div class="where"><h2>${esc(b.place)}</h2><span class="yr">${esc(b.year)}</span></div>
      <p class="situation">${esc(b.situation)}</p>
      ${(b.voices || []).map((v) => `<div class="voice"><span class="av">${avatar(v.who)}</span>
        <span class="said"><b>${esc(v.who)} &middot; ${esc(v.role)}</b>${esc(v.line)}</span></div>`).join("")}
    </div>
    <div class="askline">${esc(b.ask)}</div>
    <div class="controls" id="controls">${controls(b)}</div>
    <div class="row"><button class="btn alt mini" id="talk">Talk it over</button>
      <button class="btn alt mini" id="more">More detail</button>
      <span class="grow"></span>${b.type === "choice" ? "" : `<button class="btn" id="commit">Commit</button>`}</div>`);
  wire(b);
}

const price = (n) => n === 0 ? `<span class="free">free</span>` : `<span class="cost">${"●".repeat(n)} ${n}</span>`;

function controls(b) {
  if (b.type === "choice") {
    return b.choices.map((c, i) => {
      const broke = c.cost > G.s.coins;
      return `<button class="pick ${broke ? "broke" : ""}" data-i="${i}" ${broke ? "disabled" : ""}>
        <span class="key">${i + 1}</span>
        <span class="tx"><b>${esc(c.label)}</b><i>${esc(c.sub)}</i></span>
        <span class="pr">${price(c.cost)}</span></button>`;
    }).join("");
  }
  if (b.type === "spend") {
    return `<div class="cards">${b.options.map((o, i) => `
      <button class="card" data-id="${o.id}" data-i="${i}" aria-pressed="false">
        <span class="cx"><b>${esc(o.label)}</b><i>${esc(o.note)}</i></span>
        <span class="pr">${price(o.cost)}</span></button>`).join("")}</div>`;
  }
  if (b.type === "slider") {
    const v = G.p[b.slider.key];
    return `<div class="sliderbox">
      <input type="range" id="sl" min="${b.slider.min}" max="${b.slider.max}" step="${b.slider.step}" value="${v}">
      <div class="slends"><span>${esc(b.slider.labelLow)}</span><b id="slval">${v}${esc(b.slider.unit)}</b><span>${esc(b.slider.labelHigh)}</span></div>
    </div>`;
  }
  if (b.type === "budget") {
    const a = G.p.alloc, cap = Math.min(b.budget.max, G.s.coins);
    return `<div class="budget"><div class="left">Up to <b>${cap}</b> coins</div>
      ${b.budget.lines.map((l, i) => `<div class="bline">
        <span class="bt"><b>${esc(l.label)}</b><i>${esc(l.note)}</i></span>
        <span class="bctl"><button class="bstep" data-i="${i}" data-d="-1" aria-label="less">&minus;</button>
        <b class="bval" id="bv${i}">${a[i]}</b>
        <button class="bstep" data-i="${i}" data-d="1" aria-label="more">+</button></span></div>`).join("")}</div>`;
  }
  return "";
}

function wire(b) {
  $("#talk").onclick = () => sheet("talk", b);
  $("#more").onclick = () => sheet("detail", b);

  if (b.type === "choice") {
    document.querySelectorAll(".pick").forEach((el) => (el.onclick = () => {
      const c = b.choices[+el.dataset.i];
      if (c.cost > G.s.coins) return;
      spendCoins(c.cost); setFlags(c.flag);
      land(b, c.key, c.out.t, c.out.x, Object.assign({}, c.d), c.label, c.cost);
    }));
    return;
  }
  if (b.type === "spend") {
    const refresh = () => {
      const used = G.p.chosen.reduce((t, id) => t + b.options.find((o) => o.id === id).cost, 0);
      document.querySelectorAll(".card").forEach((el) => {
        const o = b.options.find((x) => x.id === el.dataset.id);
        const on = G.p.chosen.includes(o.id);
        el.setAttribute("aria-pressed", on ? "true" : "false");
        el.classList.toggle("broke", !on && o.cost > G.s.coins - used);
      });
      document.querySelector("header").outerHTML = bar(used);
      paintArt();
    };
    document.querySelectorAll(".card").forEach((el) => (el.onclick = () => {
      const o = b.options.find((x) => x.id === el.dataset.id);
      const used = G.p.chosen.reduce((t, id) => t + b.options.find((y) => y.id === id).cost, 0);
      if (G.p.chosen.includes(o.id)) G.p.chosen = G.p.chosen.filter((x) => x !== o.id);
      else if (o.cost <= G.s.coins - used) G.p.chosen = [...G.p.chosen, o.id];
      else return;
      refresh();
    }));
    $("#commit").onclick = () => {
      const picked = b.options.filter((o) => G.p.chosen.includes(o.id));
      const missed = b.options.filter((o) => !G.p.chosen.includes(o.id) && o.no);
      const cost = picked.reduce((t, o) => t + o.cost, 0);
      const d = {}; picked.forEach((o) => { addD(d, o.d); setFlags(o.flag); });
      spendCoins(cost);
      const txt = [...picked.map((o) => o.yes), ...missed.map((o) => o.no)].filter(Boolean).join(" ");
      land(b, "base", picked.length ? "What you bought" : "You bought nothing",
           txt || "You spend nothing and the default happens, which is what the default is for.",
           d, picked.map((o) => o.label).join(" + ") || "nothing", cost);
    };
    return;
  }
  if (b.type === "slider") {
    const sl = $("#sl");
    sl.oninput = () => { G.p[b.slider.key] = +sl.value; $("#slval").textContent = sl.value + b.slider.unit; paintArt(); };
    $("#commit").onclick = () => {
      const v = G.p[b.slider.key];
      const band = b.bands.find((x) => v <= x.max) || b.bands[b.bands.length - 1];
      setFlags(band.flag);
      land(b, "base", band.t, band.x, Object.assign({}, band.d), `${v}${b.slider.unit}`, 0);
    };
    return;
  }
  if (b.type === "budget") {
    const cap = Math.min(b.budget.max, G.s.coins);
    document.querySelectorAll(".bstep").forEach((el) => (el.onclick = () => {
      const i = +el.dataset.i, dd = +el.dataset.d, a = G.p.alloc;
      const used = a.reduce((x, y) => x + y, 0);
      if (dd > 0 && used >= cap) return;
      a[i] = Math.max(0, a[i] + dd);
      $("#bv" + i).textContent = a[i];
      document.querySelector("header").outerHTML = bar(a.reduce((x, y) => x + y, 0));
      paintArt();
    }));
    $("#commit").onclick = () => {
      const a = G.p.alloc, d = {};
      b.budget.lines.forEach((l, i) => { for (let k = 0; k < a[i]; k++) addD(d, l.per); });
      const used = a.reduce((x, y) => x + y, 0);
      spendCoins(used);
      let top = -1, ti = -1;
      a.forEach((v, i) => { if (v > top) { top = v; ti = i; } });
      const parts = [top === 0 ? b.outcomes.none : b.outcomes[b.budget.lines[ti].id]];
      const zeros = b.budget.lines.filter((l, i) => a[i] === 0 && top > 0).map((l) => l.label.toLowerCase());
      if (zeros.length) parts.push(`You put nothing into ${zeros.join(" or ")}, and the committee notices.`);
      land(b, "base", top === 0 ? "You let the market do it" : `Mostly on ${b.budget.lines[ti].label.toLowerCase()}`,
           parts.join(" "), d, a.map((v, i) => `${b.budget.lines[i].label} ${v}`).join(" · "), used);
    };
  }
}

function spendCoins(n) { G.s.coins = Math.max(0, G.s.coins - n); G.spent += n; }

/* ------------------------------------------------------------- sheets */
function sheet(kind, b) {
  const art = $("#art");
  art.querySelector(".sheet")?.remove();
  const el = document.createElement("div");
  el.className = "sheet";
  el.innerHTML = kind === "talk"
    ? `<h3>Talk it over</h3><ol>${b.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <div class="bigclock" id="clock">${G.secs ? fmt(G.secs) : "--:--"}</div>
       <div class="row"><button class="btn mini alt" id="more1">+1 min</button>
       <button class="btn mini alt" id="close">Back to the picture</button></div>`
    : `<h3>What else is true</h3><ul class="deets">${b.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
       <div class="row" style="margin-top:auto"><button class="btn mini alt" id="close">Back to the picture</button></div>`;
  art.appendChild(el);
  el.querySelector("#close").onclick = () => { stop(); el.remove(); };
  el.querySelector("#more1") && (el.querySelector("#more1").onclick = () => { G.left += 60; tickPaint(); });
  if (kind === "talk" && G.secs) run(G.secs);
}
const fmt = (t) => `${t < 0 ? "-" : ""}${Math.floor(Math.abs(t) / 60)}:${String(Math.abs(t) % 60).padStart(2, "0")}`;
function tickPaint() { const c = $("#clock"); if (c) { c.textContent = fmt(G.left); c.classList.toggle("warn", G.left <= 20); } }
function run(s) { stop(); G.left = s; tickPaint(); G.tick = setInterval(() => { G.left--; tickPaint(); if (G.left <= -60) stop(); }, 1000); }
function stop() { if (G.tick) { clearInterval(G.tick); G.tick = null; } }

/* -------------------------------------------------------------- land */
function land(b, variant, t, x, d, stampText, cost) {
  stop();
  G.s.trust = cl(G.s.trust + (d.trust || 0));
  G.s.nature = cl(G.s.nature + (d.nature || 0));
  G.s.metal = Math.max(0, G.s.metal + (d.metal || 0));
  G.record.push({ place: b.place, label: stampText, cost });
  G.phase = "outcome"; G.artVar = variant;
  if (b.type === "spend") G.p.locked = true;

  const chips = [["metal", "Metal"], ["trust", "Trust"], ["nature", "Nature"]]
    .filter(([k]) => d[k]).map(([k, lbl]) => `<span class="chip ${d[k] > 0 ? "up" : "down"}">${lbl} ${d[k] > 0 ? "+" : ""}${d[k]}</span>`).join("")
    + (cost ? `<span class="chip spend">&minus;${cost} ${cost === 1 ? "coin" : "coins"}</span>` : "");

  shell(`<div class="scroll">
      <div class="where"><h2 class="outcome-t">${esc(t)}</h2><span class="yr">${esc(b.year)}</span></div>
      <p class="outcome-x">${esc(x)}</p>
      <div class="deltas">${chips}</div>
      ${G.s.coins === 0 ? `<p class="warnline">No coins left. Everything that protects somebody is now out of reach.</p>` : ""}
    </div>
    <div class="controls"><button class="btn" id="next">Next</button></div>`,
    `<div class="stamp">${esc(stampText)}</div>`);

  const layer = $("#artlayer");
  layer.classList.add("art-enter");
  if ((d.nature || 0) + (d.trust || 0) < -14) setTimeout(() => layer.classList.add("shake"), 300);
  bump(d);
  $("#next").onclick = () => {
    // re-filter: a flag set by THIS beat may have just unlocked the next one
    G.beats = CHAPTERS[G.ch].beats.filter((x) => !x.requires || G.flags.has(x.requires));
    G.b++;
    if (G.b >= G.beats.length) { G.ch++; if (G.ch >= CHAPTERS.length) return ending(); return chapter(); }
    beat();
  };
}

/* ------------------------------------------------------------- ending */
function ending() {
  G.phase = "end";
  const e = ENDINGS.find((x) => x.test(G.s)) || ENDINGS[ENDINGS.length - 1];
  G.artKey = e.art; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = G.flags.has("sea_mine") ? "sea" : "land";
  const hit = G.s.metal >= METAL_TARGET;
  shell(`<div class="scroll">
      <div class="where"><h2>${esc(e.title)}</h2><span class="yr">2034</span></div>
      <p class="tally"><b class="${hit ? "ok" : "bad"}">${G.s.metal} / ${METAL_TARGET}</b> metal &nbsp;&middot;&nbsp;
        ${G.spent} of ${START.coins} coins spent &nbsp;&middot;&nbsp; trust ${G.s.trust} &nbsp;&middot;&nbsp; nature ${G.s.nature}</p>
      <p class="situation">${esc(e.text)}</p>
      <div class="fates">${FATES.map((f) => `<div><b>${esc(f.who)}</b> ${esc(G.flags.has(f.if) ? f.yes : f.no)}</div>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn" id="deb">Debrief</button>
      <button class="btn alt" id="again">Play again</button></div>`);
  $("#deb").onclick = debrief;
  $("#again").onclick = reset;
}

function debrief() {
  G.phase = "debrief"; G.artKey = "title"; G.artVar = "base"; G.p = {};
  shell(`<div class="scroll">
      <div class="where"><h2>What was real</h2></div>
      <div class="facts">${DEBRIEF.real.map(([h, t]) => `<div><b>${esc(h)}.</b> ${esc(t)}</div>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn alt" id="again">Run it again</button></div>`,
    `<div class="sheet"><h3>Now the real argument</h3>
      <ol>${DEBRIEF.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol></div>`);
  $("#again").onclick = reset;
}

function reset() {
  stop();
  G.ch = -1; G.b = 0; G.beats = []; G.s = Object.assign({}, START);
  G.flags = new Set(); G.record = []; G.spent = 0; G.p = {};
  title();
}

document.addEventListener("keydown", (e) => {
  if (["SELECT", "INPUT"].includes(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === " " || k === "enter") { const b = $("#go") || $("#next") || $("#deb"); if (b) { e.preventDefault(); b.click(); } return; }
  if (k === "t" && G.phase === "beat") { $("#talk")?.click(); return; }
  if (G.phase === "beat" && ["1", "2", "3", "4"].includes(k)) {
    (document.querySelector(`.pick[data-i="${+k - 1}"]`) || document.querySelector(`.card[data-i="${+k - 1}"]`))?.click();
  }
  if (k === "r" && (G.phase === "end" || G.phase === "debrief")) reset();
});

title();
