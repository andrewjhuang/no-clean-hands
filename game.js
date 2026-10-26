/* NO CLEAN HANDS — engine.
   Two cases, eight rounds, one charter. Breaking a principle you adopted
   is the expensive thing; the ending is scored on that, not on meters. */

const G = {
  ch: -1, b: 0, beats: [], phase: "title",
  s: Object.assign({}, START),
  charter: [],            // the two principle ids the council adopted
  breaches: [],           // { round, place, principle, label }
  flags: new Set(), record: [],
  secs: 120, left: 0, tick: null,
  p: {}, artKey: "title", artVar: "base",
};

const $ = (q) => document.querySelector(q);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cl = (n) => Math.max(0, Math.min(100, n));
const addD = (a, b) => { Object.entries(b || {}).forEach(([k, v]) => (a[k] = (a[k] || 0) + v)); return a; };
const setFlags = (f) => { if (f) String(f).split(",").forEach((x) => x.trim() && G.flags.add(x.trim())); };
const principle = (id) => PRINCIPLES.find((p) => p.id === id);
const adopted = (ids) => (ids || []).filter((x) => G.charter.includes(x));

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

function bar() {
  if (G.phase === "title") {
    return `<header class="top"><span class="mark">No Clean <em>Hands</em></span><span class="grow"></span>
      <span class="tiny"><kbd>space</kbd> start</span></header>`;
  }
  const c = CHAPTERS[Math.max(0, G.ch)];
  const done = G.phase === "end" || G.phase === "debrief";
  const label = done ? "Verdict" : c.id === "charter" ? "Charter" : `${c.title.split(":")[0]} · ${G.b + 1}/${G.beats.length}`;
  return `<header class="top">
    <span class="mark">No Clean <em>Hands</em></span>
    <span class="step">${esc(label)}</span>
    ${G.charter.length ? `<span class="charter">${G.charter.map((id) => {
      const p = principle(id);
      const broke = G.breaches.some((x) => x.principle === id);
      return `<span class="pr-chip ${broke ? "broke" : ""}" title="${esc(p.rule)}">${esc(p.label)}${broke ? " ✕" : ""}</span>`;
    }).join("")}</span>` : ""}
    <span class="grow"></span>
    <div class="gauges">${METERS.map((m) => `
      <div class="gauge ${G.s[m.key] < 34 ? "low" : ""}" data-k="${m.key}" title="${esc(m.full)}">
        <div class="lb">${esc(m.label)}<b>${G.s[m.key]}</b></div>
        <div class="bar"><div class="fill" style="width:${G.s[m.key]}%"></div></div>
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
  shell(`<div class="titlewrap">
      <h1 class="bigtitle">No Clean<br><em>Hands</em></h1>
      <p class="subtitle">${esc(PROLOGUE.sub)}</p>
      ${PROLOGUE.lines.map((l) => `<p class="situation">${l}</p>`).join("")}
      <div class="row"><button class="btn" id="go">Convene</button>
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
      <div class="where"><h2>${esc(c.title)}</h2><span class="yr">${esc(c.sub)}</span></div>
      <p class="situation">${esc(c.intro)}</p>
      ${c.cast.length ? `<div class="castrow">${c.cast.map((p) => `
        <span class="castchip"><span class="av">${avatar(p.who)}</span><b>${esc(p.who)}</b><i>${esc(p.role)}</i></span>`).join("")}</div>` : ""}
      ${G.charter.length ? `<div class="charterblock"><h4>Your charter</h4>${G.charter.map((id) => {
        const p = principle(id);
        return `<div class="pr-line"><b>${esc(p.label)}.</b> ${esc(p.short)}</div>`;
      }).join("")}</div>` : ""}
    </div>
    <div class="controls"><button class="btn" id="go">${c.id === "charter" ? "Write it" : "Open the case"} &rarr;</button></div>`);
  $("#go").onclick = beat;
}

/* --------------------------------------------------------------- beat */
function beat() {
  const b = G.beats[G.b];
  if (!b) { G.ch++; return chapter(); }
  G.phase = "beat";
  G.artKey = b.art || CHAPTERS[G.ch].art; G.artVar = "base";
  G.p = b.type === "slider" ? { [b.slider.key]: b.slider.start }
      : b.type === "spend" || b.type === "charter" ? { chosen: [] } : {};

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
      <span class="grow"></span>${b.type === "choice" ? "" : `<button class="btn" id="commit" ${b.type === "charter" ? "disabled" : ""}>Commit</button>`}</div>`);
  wire(b);
}

/* ----------------------------------------------------------- controls */
const tagsFor = (o) => {
  const up = adopted(o.up), vio = adopted(o.vio);
  return [...vio.map((p) => `<span class="tg bad">breaks ${esc(principle(p).label)}</span>`),
          ...up.map((p) => `<span class="tg good">keeps ${esc(principle(p).label)}</span>`)].join("");
};

function controls(b) {
  if (b.type === "charter") {
    return `<div class="cards">${PRINCIPLES.map((p, i) => `
      <button class="card" data-id="${p.id}" data-i="${i}" aria-pressed="false">
        <span class="cx"><b>${esc(p.label)}</b><i>${esc(p.rule)}</i></span>
        <span class="tick">${i + 1}</span></button>`).join("")}</div>`;
  }
  if (b.type === "choice") {
    return b.choices.map((c, i) => `
      <button class="pick" data-i="${i}">
        <span class="key">${i + 1}</span>
        <span class="tx"><b>${esc(c.label)}</b><i>${esc(c.sub)}</i>${tagsFor(c) ? `<span class="tags">${tagsFor(c)}</span>` : ""}</span>
      </button>`).join("");
  }
  if (b.type === "spend") {
    return `<div class="cards">${b.options.map((o, i) => `
      <button class="card" data-id="${o.id}" data-i="${i}" aria-pressed="false">
        <span class="cx"><b>${esc(o.label)}</b><i>${esc(o.note)}</i>${tagsFor(o) ? `<span class="tags">${tagsFor(o)}</span>` : ""}</span>
        <span class="tick">${i + 1}</span></button>`).join("")}</div>`;
  }
  if (b.type === "slider") {
    const v = G.p[b.slider.key];
    return `<div class="sliderbox">
      <input type="range" id="sl" min="${b.slider.min}" max="${b.slider.max}" step="${b.slider.step}" value="${v}">
      <div class="slends"><span>${esc(b.slider.labelLow)}</span><b id="slval">${v}${esc(b.slider.unit)}</b><span>${esc(b.slider.labelHigh)}</span></div>
      <div class="bandnote" id="bandnote"></div>
    </div>`;
  }
  return "";
}

const bandFor = (b, v) => b.bands.find((x) => v <= x.max) || b.bands[b.bands.length - 1];

function wire(b) {
  $("#talk").onclick = () => sheet("talk", b);
  $("#more").onclick = () => sheet("detail", b);

  if (b.type === "charter") {
    document.querySelectorAll(".card").forEach((el) => (el.onclick = () => {
      const id = el.dataset.id;
      if (G.p.chosen.includes(id)) G.p.chosen = G.p.chosen.filter((x) => x !== id);
      else if (G.p.chosen.length < b.pickCount) G.p.chosen = [...G.p.chosen, id];
      else return;
      document.querySelectorAll(".card").forEach((c) =>
        c.setAttribute("aria-pressed", G.p.chosen.includes(c.dataset.id) ? "true" : "false"));
      $("#commit").disabled = G.p.chosen.length !== b.pickCount;
    }));
    $("#commit").onclick = () => {
      G.charter = G.p.chosen.slice();
      const kept = PRINCIPLES.filter((p) => G.charter.includes(p.id));
      const left = PRINCIPLES.filter((p) => !G.charter.includes(p.id));
      land(b, "base", "The charter stands",
        `You adopt ${kept.map((p) => p.label).join(" and ")}. ` +
        `${left.map((p) => p.label).join(" and ")} remain true for other people and cost you nothing to ignore. ` +
        `From here, breaking your own rule is the expensive move.`,
        {}, kept.map((p) => p.label).join(" + "), [], []);
    };
    return;
  }

  if (b.type === "choice") {
    document.querySelectorAll(".pick").forEach((el) => (el.onclick = () => {
      const c = b.choices[+el.dataset.i];
      setFlags(c.flag);
      land(b, c.key, c.out.t, c.out.x, Object.assign({}, c.d), c.label, c.vio, c.up);
    }));
    return;
  }

  if (b.type === "spend") {
    document.querySelectorAll(".card").forEach((el) => (el.onclick = () => {
      const id = el.dataset.id;
      if (G.p.chosen.includes(id)) G.p.chosen = G.p.chosen.filter((x) => x !== id);
      else G.p.chosen = [...G.p.chosen, id];
      document.querySelectorAll(".card").forEach((c) =>
        c.setAttribute("aria-pressed", G.p.chosen.includes(c.dataset.id) ? "true" : "false"));
      paintArt();
    }));
    $("#commit").onclick = () => {
      const picked = b.options.filter((o) => G.p.chosen.includes(o.id));
      const missed = b.options.filter((o) => !G.p.chosen.includes(o.id) && o.no);
      const d = {}, vio = [], up = [];
      picked.forEach((o) => { addD(d, o.d); setFlags(o.flag); (o.vio || []).forEach((x) => vio.push(x)); (o.up || []).forEach((x) => up.push(x)); });
      G.p.locked = true;
      land(b, "base", picked.length ? "What you attached" : "You attached nothing",
        [...picked.map((o) => o.yes), ...missed.map((o) => o.no)].filter(Boolean).join(" ") ||
          "Nothing is attached and the default proceeds, which is what defaults are for.",
        d, picked.map((o) => o.label).join(" + ") || "nothing", vio, up);
    };
    return;
  }

  if (b.type === "slider") {
    const sl = $("#sl");
    const note = () => {
      const band = bandFor(b, G.p[b.slider.key]);
      const t = [...adopted(band.vio).map((p) => `breaks ${principle(p).label}`),
                 ...adopted(band.up).map((p) => `keeps ${principle(p).label}`)];
      $("#bandnote").innerHTML = `<b>${esc(band.t)}</b>${t.length ? ` &middot; <span class="${adopted(band.vio).length ? "warnline" : ""}">${esc(t.join(", "))}</span>` : ""}`;
    };
    sl.oninput = () => { G.p[b.slider.key] = +sl.value; $("#slval").textContent = sl.value + b.slider.unit; note(); paintArt(); };
    note();
    $("#commit").onclick = () => {
      const band = bandFor(b, G.p[b.slider.key]);
      setFlags(band.flag);
      land(b, "base", band.t, band.x, Object.assign({}, band.d), `${G.p[b.slider.key]}${b.slider.unit}`, band.vio, band.up);
    };
  }
}

/* -------------------------------------------------------------- sheets */
function sheet(kind, b) {
  const art = $("#art");
  art.querySelector(".sheet")?.remove();
  const el = document.createElement("div");
  el.className = "sheet";
  el.innerHTML = kind === "talk"
    ? `<h3>Talk it over</h3><ol>${b.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <div class="bigclock" id="clock">${G.secs ? fmt(G.secs) : "--:--"}</div>
       <div class="row"><button class="btn mini alt" id="more1">+1 min</button>
       <button class="btn mini alt" id="close">Back</button></div>`
    : `<h3>What else is true</h3><ul class="deets">${b.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
       <div class="row" style="margin-top:auto"><button class="btn mini alt" id="close">Back</button></div>`;
  art.appendChild(el);
  el.querySelector("#close").onclick = () => { stop(); el.remove(); };
  el.querySelector("#more1") && (el.querySelector("#more1").onclick = () => { G.left += 60; tickPaint(); });
  if (kind === "talk" && G.secs) run(G.secs);
}
const fmt = (t) => `${t < 0 ? "-" : ""}${Math.floor(Math.abs(t) / 60)}:${String(Math.abs(t) % 60).padStart(2, "0")}`;
function tickPaint() { const c = $("#clock"); if (c) { c.textContent = fmt(G.left); c.classList.toggle("warn", G.left <= 20); } }
function run(s) { stop(); G.left = s; tickPaint(); G.tick = setInterval(() => { G.left--; tickPaint(); if (G.left <= -60) stop(); }, 1000); }
function stop() { if (G.tick) { clearInterval(G.tick); G.tick = null; } }

/* --------------------------------------------------------------- land */
function land(b, variant, t, x, d, stampText, vioRaw, upRaw) {
  stop();
  const vio = adopted(vioRaw), up = adopted(upRaw);
  // a principle you adopted and then broke is the expensive thing in this game
  if (vio.length) d.trust = (d.trust || 0) - 12 * vio.length;
  if (up.length) d.trust = (d.trust || 0) + 4 * up.length;
  vio.forEach((p) => G.breaches.push({ place: b.place, principle: p, label: stampText }));

  Object.keys(START).forEach((k) => { if (d[k]) G.s[k] = cl(G.s[k] + d[k]); });
  G.record.push({ place: b.place, label: stampText, vio, up });
  G.phase = "outcome"; G.artVar = variant;

  const chips = METERS.filter((m) => d[m.key])
    .map((m) => `<span class="chip ${d[m.key] > 0 ? "up" : "down"}">${esc(m.label)} ${d[m.key] > 0 ? "+" : ""}${d[m.key]}</span>`).join("");

  shell(`<div class="scroll">
      <div class="where"><h2 class="outcome-t">${esc(t)}</h2><span class="yr">${esc(b.year)}</span></div>
      ${vio.length ? `<div class="breach">Charter breach &middot; ${vio.map((p) => esc(principle(p).label)).join(", ")}
        <i>${esc(principle(vio[0]).short)}</i></div>` : ""}
      ${up.length && !vio.length ? `<div class="upheld">Charter upheld &middot; ${up.map((p) => esc(principle(p).label)).join(", ")}</div>` : ""}
      <p class="outcome-x">${esc(x)}</p>
      <div class="deltas">${chips}</div>
    </div>
    <div class="controls"><button class="btn" id="next">Next</button></div>`,
    `<div class="stamp">${esc(stampText)}</div>`);

  const layer = $("#artlayer");
  layer.classList.add("art-enter");
  if (vio.length || (d.env || 0) + (d.comm || 0) < -18) setTimeout(() => layer.classList.add("shake"), 300);
  bump(d);
  $("#next").onclick = () => {
    G.beats = CHAPTERS[G.ch].beats.filter((x) => !x.requires || G.flags.has(x.requires));
    G.b++;
    if (G.b >= G.beats.length) { G.ch++; if (G.ch >= CHAPTERS.length) return ending(); return chapter(); }
    beat();
  };
}

/* ------------------------------------------------------------- ending */
function ending() {
  G.phase = "end";
  const n = G.breaches.length;
  const e = ENDINGS.find((x) => x.test(G.s, n)) || ENDINGS[ENDINGS.length - 1];
  G.artKey = e.art; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = G.flags.has("sea_mine") || G.flags.has("reversed") ? "sea" : "land";
  shell(`<div class="scroll">
      <div class="where"><h2>${esc(e.title)}</h2><span class="yr">Verdict</span></div>
      <p class="tally">Charter: <b>${G.charter.map((id) => esc(principle(id).label)).join(" + ")}</b> &nbsp;·&nbsp;
        <b class="${n ? "bad" : "ok"}">${n} ${n === 1 ? "breach" : "breaches"}</b></p>
      <p class="situation">${esc(e.text)}</p>
      ${n ? `<div class="fates">${G.breaches.slice(0, 3).map((x) => `<div><b>${esc(principle(x.principle).label)}</b> broken at ${esc(x.place)}</div>`).join("")}
        ${n > 3 ? `<div><b>and ${n - 3} more</b> across the two cases</div>` : ""}</div>` : ""}
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
  G.charter = []; G.breaches = []; G.flags = new Set(); G.record = []; G.p = {};
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
