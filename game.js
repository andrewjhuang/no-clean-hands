/* NO CLEAN HANDS — engine.
   One viewport, never scrolls. Four kinds of decision. The drawing
   updates live while the class is still arguing. */

const TOTAL = new Set(SCENES.map((s) => (s.id === "vacuum" ? "plume" : s.id))).size;

const G = {
  i: -1, scenes: [], phase: "title",
  m: { trust: 50, eco: 50, supply: 50, cap: 50 },
  flags: new Set(), record: [],
  secs: 120, left: 0, tick: null,
  p: {},            // live params for the current scene's art
  artKey: "title", artVar: "base",
};

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clamp = (n) => Math.max(0, Math.min(100, n));
const addD = (a, b) => { Object.entries(b || {}).forEach(([k, v]) => (a[k] = (a[k] || 0) + v)); return a; };

function avatar(seed) {
  const f = [...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const brow = f % 3, mouth = (f >> 2) % 3;
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><g stroke="#231f20" stroke-width="3" fill="none" stroke-linecap="round">
    <circle cx="20" cy="20" r="14"/><circle cx="15" cy="17" r="1.6" fill="#231f20"/><circle cx="25" cy="17" r="1.6" fill="#231f20"/>
    ${brow === 0 ? '<path d="M11 11l6 2M29 11l-6 2"/>' : brow === 1 ? '<path d="M11 13h6M23 13h6"/>' : '<path d="M11 13l6-2M29 13l-6-2"/>'}
    ${mouth === 0 ? '<path d="M14 26q6 5 12 0"/>' : mouth === 1 ? '<path d="M14 27h12"/>' : '<path d="M14 28q6-5 12 0"/>'}
  </g></svg>`;
}

/* ------------------------------------------------------------- shell */
function shell(panelHTML, extra = "") {
  document.body.innerHTML = `
    ${topBar()}
    <main class="stage">
      <section class="art">
        <div class="plate" id="art">
          <div class="layer" id="artlayer">${drawScene(G.artKey, G.artVar, G.p)}</div>
          ${extra}
        </div>
      </section>
      <section class="panel ${G.phase === "outcome" ? "mid" : ""}">${panelHTML}</section>
    </main>`;
}

function paintArt() {
  const l = $("#artlayer");
  if (l) l.innerHTML = drawScene(G.artKey, G.artVar, G.p);
}

function topBar() {
  if (G.phase === "title") {
    return `<header class="top"><span class="mark">No Clean <em>Hands</em></span><span class="grow"></span>
      <span class="tiny"><kbd>space</kbd> start</span></header>`;
  }
  const done = G.phase === "end" || G.phase === "debrief";
  return `<header class="top">
    <span class="mark">No Clean <em>Hands</em></span>
    <span class="step">${done ? "done" : `${Math.min(G.i + 1, TOTAL)} / ${TOTAL}`}</span>
    <span class="grow"></span>
    <div class="gauges">${METERS.map((x) => `
      <div class="gauge ${G.m[x.key] < 34 ? "low" : ""}" data-k="${x.key}" title="${esc(x.full)}">
        <div class="lb">${esc(x.label)}<b>${G.m[x.key]}</b></div>
        <div class="bar"><div class="fill" style="width:${G.m[x.key]}%"></div></div>
      </div>`).join("")}</div>
  </header>`;
}

const bump = (d) => Object.keys(d).forEach((k) => {
  const g = document.querySelector(`.gauge[data-k="${k}"]`);
  if (g) { g.classList.add("pop"); setTimeout(() => g.classList.remove("pop"), 520); }
});

/* -------------------------------------------------------------- title */
function title() {
  G.phase = "title"; G.artKey = "title"; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = "land";
  shell(`
    <div class="titlewrap">
      <h1 class="bigtitle">No Clean<br><em>Hands</em></h1>
      <p class="subtitle">${esc(PROLOGUE.sub)}</p>
      ${PROLOGUE.lines.map((l) => `<p class="situation">${esc(l)}</p>`).join("")}
      <div class="row">
        <button class="btn" id="go">Start</button>
        <label class="tiny">talk time
          <select id="tsel" class="sel"><option value="90">90s</option><option value="120" selected>2 min</option>
          <option value="180">3 min</option><option value="0">none</option></select>
        </label>
      </div>
      <p class="tiny">${esc(PROLOGUE.note)}</p>
    </div>`);
  $("#tsel").onchange = (e) => (G.secs = +e.target.value);
  $("#go").onclick = () => { G.i = 0; G.scenes = pickScenes(); scene(); };
}

const pickScenes = () => SCENES.filter((s) => !s.requires || G.flags.has(s.requires));
const now = () => G.scenes[G.i];

/* -------------------------------------------------------------- scene */
function scene() {
  const s = now();
  if (!s) return ending();
  G.phase = "scene";
  G.artKey = s.art; G.artVar = "base";
  G.p = startParams(s);
  document.body.dataset.realm = s.realm;

  const voices = (s.voices || []).map((v) => `
    <div class="voice"><span class="av">${avatar(v.who)}</span>
      <span class="said"><b>${esc(v.who)} &middot; ${esc(v.role)}</b>${esc(v.line)}</span></div>`).join("");

  shell(`
    <div class="scroll">
      <div class="where"><h2>${esc(s.place)}</h2><span class="yr">${esc(s.year)}</span></div>
      <p class="situation">${esc(s.situation)}</p>
      ${voices}
    </div>
    <div class="askline">${esc(s.ask)}</div>
    <div class="controls" id="controls">${controlsFor(s)}</div>
    <div class="row"><button class="btn alt mini" id="talk">Talk it over</button>
      <button class="btn alt mini" id="more">More detail</button>
      <span class="grow"></span>${confirmFor(s)}</div>`);

  wire(s);
}

function startParams(s) {
  if (s.type === "slider") return { [s.slider.key]: s.slider.start };
  if (s.type === "budget") return { alloc: [0, 0, 0] };
  if (s.type === "stakeholders") return { chosen: [] };
  return {};
}

/* ----------------------------------------------------------- controls */
function controlsFor(s) {
  if (s.type === "choice") {
    return s.choices.map((c, i) => `
      <button class="pick" data-i="${i}">
        <span class="key">${i + 1}</span>
        <span class="tx"><b>${esc(c.label)}</b><i>${esc(c.sub)}</i></span>
      </button>`).join("");
  }
  if (s.type === "stakeholders") {
    return `<div class="cards">${s.stakeholders.map((h, i) => `
      <button class="card" data-id="${h.id}" data-i="${i}" aria-pressed="false">
        <span class="face">${avatar(h.who)}</span>
        <span class="cx"><b>${esc(h.who)} &middot; ${esc(h.role)}</b><i>${esc(h.ask)}</i>
        <em>&ldquo;${esc(h.line)}&rdquo;</em></span>
        <span class="tick">${i + 1}</span>
      </button>`).join("")}</div>`;
  }
  if (s.type === "slider") {
    const v = G.p[s.slider.key];
    return `<div class="sliderbox">
      <input type="range" id="sl" min="${s.slider.min}" max="${s.slider.max}" step="${s.slider.step}" value="${v}">
      <div class="slends"><span>${esc(s.slider.labelLow)}</span><b id="slval">${v}${esc(s.slider.unit)}</b><span>${esc(s.slider.labelHigh)}</span></div>
    </div>`;
  }
  if (s.type === "budget") {
    const b = s.budget, a = G.p.alloc;
    const left = b.units - a.reduce((x, y) => x + y, 0);
    return `<div class="budget">
      <div class="left">Unspent: <b id="bleft">${left}</b> &times; ${esc(b.unitLabel)}</div>
      ${b.lines.map((l, i) => `
        <div class="bline">
          <span class="bt"><b>${esc(l.label)}</b><i>${esc(l.note)}</i></span>
          <span class="bctl">
            <button class="bstep" data-i="${i}" data-d="-1" aria-label="less">&minus;</button>
            <b class="bval" id="bv${i}">${a[i]}</b>
            <button class="bstep" data-i="${i}" data-d="1" aria-label="more">+</button>
          </span>
        </div>`).join("")}
    </div>`;
  }
  return "";
}

function confirmFor(s) {
  if (s.type === "choice") return "";
  const label = s.type === "stakeholders" ? "Lock it in" : "Commit";
  return `<button class="btn" id="commit" ${s.type === "stakeholders" ? "disabled" : ""}>${label}</button>`;
}

function wire(s) {
  $("#talk").onclick = () => sheet("talk", s);
  $("#more").onclick = () => sheet("detail", s);

  if (s.type === "choice") {
    document.querySelectorAll(".pick").forEach((b) => (b.onclick = () => resolveChoice(s, +b.dataset.i)));
    return;
  }
  if (s.type === "stakeholders") {
    document.querySelectorAll(".card").forEach((b) => (b.onclick = () => {
      const id = b.dataset.id, on = G.p.chosen.includes(id);
      if (on) G.p.chosen = G.p.chosen.filter((x) => x !== id);
      else if (G.p.chosen.length < s.pickCount) G.p.chosen = [...G.p.chosen, id];
      else return;
      document.querySelectorAll(".card").forEach((c) =>
        c.setAttribute("aria-pressed", G.p.chosen.includes(c.dataset.id) ? "true" : "false"));
      $("#commit").disabled = G.p.chosen.length !== s.pickCount;
      paintArt();
    }));
    $("#commit").onclick = () => resolveStakeholders(s);
    return;
  }
  if (s.type === "slider") {
    const sl = $("#sl");
    sl.oninput = () => { G.p[s.slider.key] = +sl.value; $("#slval").textContent = sl.value + s.slider.unit; paintArt(); };
    $("#commit").onclick = () => resolveSlider(s);
    return;
  }
  if (s.type === "budget") {
    document.querySelectorAll(".bstep").forEach((b) => (b.onclick = () => {
      const i = +b.dataset.i, d = +b.dataset.d, a = G.p.alloc;
      const used = a.reduce((x, y) => x + y, 0);
      if (d > 0 && used >= s.budget.units) return;
      a[i] = Math.max(0, a[i] + d);
      $("#bv" + i).textContent = a[i];
      $("#bleft").textContent = s.budget.units - a.reduce((x, y) => x + y, 0);
      paintArt();
    }));
    $("#commit").onclick = () => resolveBudget(s);
  }
}

/* -------------------------------------------------------------- sheets */
function sheet(kind, s) {
  const art = $("#art");
  if (art.querySelector(".sheet")) art.querySelector(".sheet").remove();
  const el = document.createElement("div");
  el.className = "sheet";
  el.innerHTML = kind === "talk"
    ? `<h3>Talk it over</h3><ol>${s.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <div class="bigclock" id="clock">${G.secs ? fmt(G.secs) : "--:--"}</div>
       <div class="row"><button class="btn mini alt" id="more1">+1 min</button>
       <button class="btn mini alt" id="close">Back to the picture</button></div>`
    : `<h3>What else is true</h3><ul class="deets">${s.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
       <div class="row" style="margin-top:auto"><button class="btn mini alt" id="close">Back to the picture</button></div>`;
  art.appendChild(el);
  el.querySelector("#close").onclick = () => { stop(); el.remove(); };
  const m1 = el.querySelector("#more1");
  if (m1) m1.onclick = () => { G.left += 60; paintClock(); };
  if (kind === "talk" && G.secs) run(G.secs);
}

const fmt = (t) => `${t < 0 ? "-" : ""}${Math.floor(Math.abs(t) / 60)}:${String(Math.abs(t) % 60).padStart(2, "0")}`;
function paintClock() { const c = $("#clock"); if (c) { c.textContent = fmt(G.left); c.classList.toggle("warn", G.left <= 20); } }
function run(sec) { stop(); G.left = sec; paintClock(); G.tick = setInterval(() => { G.left--; paintClock(); if (G.left <= -60) stop(); }, 1000); }
function stop() { if (G.tick) { clearInterval(G.tick); G.tick = null; } }

/* ------------------------------------------------------------ resolve */
function resolveChoice(s, i) {
  const c = s.choices[i];
  if (!c) return;
  (c.flags || []).forEach((f) => G.flags.add(f));
  land(s, c.key, c.out.t, c.out.x, Object.assign({}, c.d), c.label);
}

function resolveStakeholders(s) {
  const chosen = G.p.chosen, d = {};
  const won = s.stakeholders.filter((h) => chosen.includes(h.id));
  const lost = s.stakeholders.filter((h) => !chosen.includes(h.id));
  won.forEach((h) => addD(d, h.d));
  // ignoring someone is not free: you lose part of what they were offering
  lost.forEach((h) => Object.entries(h.d).forEach(([k, v]) => { if (v > 0) d[k] = (d[k] || 0) - Math.round(v * 0.4); }));
  const t = s.pairTitles[chosen.slice().sort().join("|")] || "Two promises kept";
  const x = won.map((h) => h.win).join(" ") + " " + lost.map((h) => h.lose).join(" ");
  G.p.locked = true;
  land(s, "base", t, x.trim(), d, won.map((h) => h.who.split(",")[0]).join(" + "));
}

function resolveSlider(s) {
  const v = G.p[s.slider.key];
  const band = s.bands.find((b) => v <= b.max) || s.bands[s.bands.length - 1];
  land(s, "base", band.t, band.x, Object.assign({}, band.d), `${v}${s.slider.unit}`);
}

function resolveBudget(s) {
  const a = G.p.alloc, b = s.budget, d = {};
  b.lines.forEach((l, i) => {
    for (let k = 0; k < a[i]; k++) addD(d, l.per);
  });
  const left = b.units - a.reduce((x, y) => x + y, 0);
  if (left) addD(d, { cap: left * 2 });                      // unspent money is kept clout
  let top = -1, topI = -1;
  a.forEach((v, i) => { if (v > top) { top = v; topI = i; } });
  const parts = [];
  parts.push(top === 0 ? s.outcomes.none : s.outcomes[b.lines[topI].id]);
  const zeros = b.lines.filter((l, i) => a[i] === 0 && top > 0).map((l) => l.label.toLowerCase());
  if (zeros.length) parts.push(`You put nothing into ${zeros.join(" or ")}, and the committee notices.`);
  if (left) parts.push(`${left} billion stays unspent, which buys you room you will need later.`);
  land(s, "base", top === 0 ? "You let the market do it" : `Six billion, mostly on ${b.lines[topI].label.toLowerCase()}`,
       parts.join(" "), d, a.map((v, i) => `${b.lines[i].label} ${v}`).join(" · "));
}

/* a decision lands: meters move, the drawing changes, the stamp drops */
function land(s, variant, t, x, d, stampText) {
  stop();
  if (G.i < TOTAL - 1) d.cap = (d.cap || 0) + 5;
  Object.entries(d).forEach(([k, v]) => (G.m[k] = clamp(G.m[k] + v)));
  G.record.push({ place: s.place, label: stampText });
  G.phase = "outcome";
  G.artVar = variant;

  shell(`
    <div class="scroll">
      <div class="where"><h2 class="outcome-t">${esc(t)}</h2><span class="yr">${esc(s.year)}</span></div>
      <p class="outcome-x">${esc(x)}</p>
      <div class="deltas">${METERS.filter((m) => d[m.key]).map((m) => {
        const v = d[m.key];
        return `<span class="chip ${v > 0 ? "up" : "down"}">${esc(m.label)} ${v > 0 ? "+" : ""}${v}</span>`;
      }).join("")}</div>
    </div>
    <div class="controls"><button class="btn" id="next">${G.i + 1 >= TOTAL ? "See how it ends" : "Next"}</button></div>`,
    `<div class="stamp">${esc(stampText)}</div>`);

  const layer = $("#artlayer");
  layer.classList.add("art-enter");
  if ((d.eco || 0) + (d.trust || 0) < -14) setTimeout(() => layer.classList.add("shake"), 300);
  bump(d);
  $("#next").onclick = () => { G.i++; G.scenes = pickScenes(); G.i >= TOTAL ? ending() : scene(); };
}

/* ------------------------------------------------------------- ending */
function ending() {
  G.phase = "end";
  const e = ENDINGS.find((x) => x.test(G.m)) || ENDINGS[ENDINGS.length - 1];
  G.artKey = e.art; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = G.flags.has("sea_mine") ? "sea" : "land";
  shell(`
    <div class="scroll">
      <div class="where"><h2>${esc(e.title)}</h2><span class="yr">2034</span></div>
      <p class="situation">${esc(e.text)}</p>
      <div class="recs">${G.record.map((r) => `<div><span>${esc(r.place)}</span><b>${esc(r.label)}</b></div>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn" id="deb">Debrief</button>
      <button class="btn alt" id="again">Play again</button></div>`);
  $("#deb").onclick = debrief;
  $("#again").onclick = reset;
}

function debrief() {
  G.phase = "debrief"; G.artKey = "title"; G.artVar = "base"; G.p = {};
  shell(`
    <div class="scroll">
      <div class="where"><h2>What was real</h2></div>
      <div class="facts">${DEBRIEF.real.map(([h, t]) => `<div><b>${esc(h)}.</b> ${esc(t)}</div>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn alt" id="again">Run it again</button></div>`,
    `<div class="sheet"><h3>Now the real argument</h3>
       <ol>${DEBRIEF.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <p class="tiny" style="margin-top:auto">Ernest Scheyder, <em>The War Below</em> &middot; Olive Heffernan, <em>The High Seas</em>, ch. 1, 4, 12</p>
     </div>`);
  $("#again").onclick = reset;
}

function reset() {
  stop();
  G.i = -1; G.m = { trust: 50, eco: 50, supply: 50, cap: 50 };
  G.flags = new Set(); G.record = []; G.scenes = []; G.p = {};
  title();
}

/* ----------------------------------------------------------- keyboard */
document.addEventListener("keydown", (e) => {
  if (["SELECT", "INPUT"].includes(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === " " || k === "enter") {
    const b = $("#go") || $("#next") || $("#deb") || (!$("#commit")?.disabled && $("#commit"));
    if (b) { e.preventDefault(); b.click(); }
    return;
  }
  if (k === "t" && G.phase === "scene") { $("#talk")?.click(); return; }
  if (G.phase === "scene" && ["1", "2", "3", "4"].includes(k)) {
    const el = document.querySelector(`.pick[data-i="${+k - 1}"]`) || document.querySelector(`.card[data-i="${+k - 1}"]`);
    el?.click();
  }
  if (k === "r" && (G.phase === "end" || G.phase === "debrief")) reset();
});

title();
