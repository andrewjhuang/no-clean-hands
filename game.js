/* NO CLEAN HANDS — engine.
   One viewport, never scrolls. Art on one side, words on the other, and
   the drawing changes when a choice lands. */

const TOTAL = new Set(SCENES.map((s) => (s.id === "vacuum" ? "plume" : s.id))).size;

const G = {
  i: -1, scenes: [], phase: "title",
  m: { trust: 50, eco: 50, supply: 50, cap: 50 },
  flags: new Set(), record: [],
  secs: 120, left: 0, tick: null,
};

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clamp = (n) => Math.max(0, Math.min(100, n));

/* little round faces for the speech bubbles */
function avatar(seed) {
  const f = [...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const brow = f % 3, mouth = (f >> 2) % 3;
  return `<svg viewBox="0 0 40 40" aria-hidden="true">
    <g stroke="#231f20" stroke-width="3" fill="none" stroke-linecap="round">
      <circle cx="20" cy="20" r="14"/>
      <circle cx="15" cy="17" r="1.6" fill="#231f20"/><circle cx="25" cy="17" r="1.6" fill="#231f20"/>
      ${brow === 0 ? '<path d="M11 11l6 2M29 11l-6 2"/>' : brow === 1 ? '<path d="M11 13h6M23 13h6"/>' : '<path d="M11 13l6-2M29 13l-6-2"/>'}
      ${mouth === 0 ? '<path d="M14 26q6 5 12 0"/>' : mouth === 1 ? '<path d="M14 27h12"/>' : '<path d="M14 28q6-5 12 0"/>'}
    </g></svg>`;
}

/* ------------------------------------------------------------- shell */
function shell(artKey, variant, panelHTML, extra = "") {
  document.body.innerHTML = `
    ${topBar()}
    <main class="stage">
      <section class="art">
        <div class="plate" id="art">
          <div class="layer" id="artlayer">${drawScene(artKey, variant)}</div>
          ${extra}
        </div>
      </section>
      <section class="panel ${G.phase === "outcome" ? "mid" : ""}">${panelHTML}</section>
    </main>`;
}

function topBar() {
  if (G.phase === "title") {
    return `<header class="top"><span class="mark">No Clean <em>Hands</em></span><span class="grow"></span>
      <span class="tiny"><kbd>space</kbd> start &nbsp; <kbd>1</kbd>&ndash;<kbd>3</kbd> choose</span></header>`;
  }
  const n = Math.min(G.i + 1, TOTAL);
  const done = G.phase === "end" || G.phase === "debrief";
  return `<header class="top">
    <span class="mark">No Clean <em>Hands</em></span>
    <span class="step">${done ? "done" : `${n} / ${TOTAL}`}</span>
    <span class="grow"></span>
    <div class="gauges">
      ${METERS.map((x) => `
        <div class="gauge ${G.m[x.key] < 34 ? "low" : ""}" data-k="${x.key}" title="${esc(x.full)}">
          <div class="lb">${esc(x.label)}<b>${G.m[x.key]}</b></div>
          <div class="bar"><div class="fill" style="width:${G.m[x.key]}%"></div></div>
        </div>`).join("")}
    </div>
  </header>`;
}

function bumpGauges(d) {
  Object.keys(d).forEach((k) => {
    const g = document.querySelector(`.gauge[data-k="${k}"]`);
    if (g) { g.classList.add("pop"); setTimeout(() => g.classList.remove("pop"), 520); }
  });
}

/* -------------------------------------------------------------- title */
function title() {
  G.phase = "title";
  document.body.dataset.realm = "land";
  shell("title", "base", `
    <div class="titlewrap">
      <h1 class="bigtitle">No Clean<br><em>Hands</em></h1>
      <p class="subtitle">${esc(PROLOGUE.sub)}</p>
      ${PROLOGUE.lines.map((l) => `<p class="situation">${esc(l)}</p>`).join("")}
      <div class="row">
        <button class="btn" id="go">Start</button>
        <label class="tiny">talk time
          <select id="tsel" style="font:inherit;margin-left:6px;border:3px solid var(--ink);border-radius:8px;padding:4px 6px;background:#fff">
            <option value="90">90s</option><option value="120" selected>2 min</option>
            <option value="180">3 min</option><option value="0">none</option>
          </select>
        </label>
      </div>
      <p class="tiny">${esc(PROLOGUE.note)}</p>
    </div>`);
  $("#tsel").onchange = (e) => { G.secs = +e.target.value; };
  $("#go").onclick = () => { G.i = 0; G.scenes = pick(); scene(); };
}

const pick = () => SCENES.filter((s) => !s.requires || G.flags.has(s.requires));
const now = () => G.scenes[G.i];

/* -------------------------------------------------------------- scene */
function scene() {
  const s = now();
  if (!s) return ending();
  G.phase = "scene";
  document.body.dataset.realm = s.realm;

  const voices = [s.voice, s.voice2].filter(Boolean).map((v) => `
    <div class="voice">
      <span class="av">${avatar(v.who)}</span>
      <span class="said"><b>${esc(v.who)}</b>${esc(v.line)}</span>
    </div>`).join("");

  shell(s.art, "base", `
    <div class="scroll">
      <div class="where"><h2>${esc(s.place)}</h2><span class="yr">${esc(s.year)}</span></div>
      <p class="situation">${esc(s.situation)}</p>
      ${voices}
    </div>
    <div class="choices" id="choices">
      <button class="btn alt" id="talk">Talk it over</button>
      ${s.choices.map((c, i) => `
        <button class="pick" data-i="${i}">
          <span class="key">${i + 1}</span>
          <span class="tx"><b>${esc(c.label)}</b><i>${esc(c.sub)}</i></span>
        </button>`).join("")}
    </div>`);

  document.querySelectorAll(".pick").forEach((b) => (b.onclick = () => choose(+b.dataset.i)));
  $("#talk").onclick = talk;
}

/* ---------------------------------------------------------- discussion */
function talk() {
  const s = now();
  const art = $("#art");
  if (art.querySelector(".sheet")) return;
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.innerHTML = `
    <h3>Talk it over</h3>
    <ol>${s.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
    <div class="bigclock" id="clock">${G.secs ? fmt(G.secs) : "--:--"}</div>
    <div class="row">
      <button class="btn mini alt" id="more">+1 min</button>
      <button class="btn mini alt" id="close">Back to the picture</button>
    </div>`;
  art.appendChild(sheet);
  sheet.querySelector("#close").onclick = () => { stop(); sheet.remove(); };
  sheet.querySelector("#more").onclick = () => { G.left += 60; paint(); };
  if (G.secs) run(G.secs);
}

const fmt = (t) => `${t < 0 ? "-" : ""}${Math.floor(Math.abs(t) / 60)}:${String(Math.abs(t) % 60).padStart(2, "0")}`;
function paint() { const c = $("#clock"); if (c) { c.textContent = fmt(G.left); c.classList.toggle("warn", G.left <= 20); } }
function run(sec) { stop(); G.left = sec; paint(); G.tick = setInterval(() => { G.left--; paint(); if (G.left <= -60) stop(); }, 1000); }
function stop() { if (G.tick) { clearInterval(G.tick); G.tick = null; } }

/* -------------------------------------------------------------- choose */
function choose(i) {
  const s = now(), c = s.choices[i];
  if (!c) return;
  stop();

  const applied = Object.assign({}, c.d);
  if (G.i < TOTAL - 1) applied.cap = (applied.cap || 0) + 5;   // a year passes; you rebuild a little
  Object.entries(applied).forEach(([k, v]) => (G.m[k] = clamp(G.m[k] + v)));
  (c.flags || []).forEach((f) => G.flags.add(f));
  G.record.push({ place: s.place, label: c.label });

  const rough = (applied.eco || 0) + (applied.trust || 0) < -14;
  G.phase = "outcome";

  shell(s.art, c.key, `
    <div class="scroll">
      <div class="where"><h2 class="outcome-t">${esc(c.out.t)}</h2><span class="yr">${esc(s.year)}</span></div>
      <p class="outcome-x">${esc(c.out.x)}</p>
      <div class="deltas">
        ${METERS.filter((m) => applied[m.key]).map((m) => {
          const v = applied[m.key];
          return `<span class="chip ${v > 0 ? "up" : "down"}">${esc(m.label)} ${v > 0 ? "+" : ""}${v}</span>`;
        }).join("")}
      </div>
    </div>
    <div class="choices">
      <button class="btn" id="next">${G.i + 1 >= TOTAL ? "See how it ends" : "Next"}</button>
    </div>`,
    `<div class="stamp">${esc(c.label)}</div>`);

  const layer = $("#artlayer");
  layer.classList.add("art-enter");
  if (rough) setTimeout(() => layer.classList.add("shake"), 300);
  bumpGauges(applied);

  $("#next").onclick = () => {
    G.i++;
    G.scenes = pick();
    if (G.i >= TOTAL) ending(); else scene();
  };
}

/* ------------------------------------------------------------- ending */
function ending() {
  G.phase = "end";
  const e = ENDINGS.find((x) => x.test(G.m)) || ENDINGS[ENDINGS.length - 1];
  document.body.dataset.realm = G.flags.has("sea_mine") ? "sea" : "land";
  shell(e.art, "base", `
    <div class="scroll">
      <div class="where"><h2>${esc(e.title)}</h2><span class="yr">2034</span></div>
      <p class="situation">${esc(e.text)}</p>
      <div class="recs">
        ${G.record.map((r) => `<div><span>${esc(r.place)}</span><b>${esc(r.label)}</b></div>`).join("")}
      </div>
    </div>
    <div class="choices">
      <button class="btn" id="deb">Debrief</button>
      <button class="btn alt" id="again">Play again</button>
    </div>`);
  $("#deb").onclick = debrief;
  $("#again").onclick = reset;
}

function debrief() {
  G.phase = "debrief";
  shell("title", "base", `
    <div class="scroll">
      <div class="where"><h2>What was real</h2></div>
      <div class="facts">
        ${DEBRIEF.real.map(([h, t]) => `<div><b>${esc(h)}.</b> ${esc(t)}</div>`).join("")}
      </div>
    </div>
    <div class="choices"><button class="btn alt" id="again">Run it again</button></div>`,
    `<div class="sheet">
       <h3>Now the real argument</h3>
       <ol>${DEBRIEF.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <p class="tiny" style="margin-top:auto">Ernest Scheyder, <em>The War Below</em> &middot; Olive Heffernan, <em>The High Seas</em>, ch. 1, 4, 12</p>
     </div>`);
  $("#again").onclick = reset;
}

function reset() {
  stop();
  G.i = -1; G.m = { trust: 50, eco: 50, supply: 50, cap: 50 };
  G.flags = new Set(); G.record = []; G.scenes = [];
  title();
}

/* ----------------------------------------------------------- keyboard */
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "SELECT") return;
  const k = e.key.toLowerCase();
  if (k === " " || k === "enter") {
    const b = $("#go") || $("#next") || $("#deb");
    if (b) { e.preventDefault(); b.click(); }
    return;
  }
  if (k === "t" && G.phase === "scene") { const b = $("#talk"); if (b) b.click(); return; }
  if (G.phase === "scene" && ["1", "2", "3"].includes(k)) {
    const b = document.querySelector(`.pick[data-i="${+k - 1}"]`);
    if (b) b.click();
  }
  if (k === "r" && (G.phase === "end" || G.phase === "debrief")) reset();
});

title();
