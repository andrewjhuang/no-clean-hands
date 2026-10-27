/* NO CLEAN HANDS — engine.

   One number. Social licence is spent by every decision and paid back,
   each round, by whichever stakeholders' needs are currently met. Leave
   someone starving and they drain it instead. At zero the project stops.

   Four question shapes, used twice each, in the same order in both acts:
   a permit (choice), how much/how fast (slider), what you require
   (conditions), who gets paid (allocate). The mirroring is the argument.

   No speech bubbles. The stakeholders are figures in the picture and
   their state is the back-and-forth. */

const G = {
  act: -1, b: 0, beats: [], phase: "title",
  licence: START_LICENCE,
  needs: {},              // stakeholder id -> 0..4, starts at 2
  flags: new Set(),
  round: 0,               // total decisions taken, drives the art over time
  actRound: 0,            // decisions taken inside the current act
  log: [],                // { place, label, cost, delta }
  p: {},                  // live input for the beat on screen
  artKey: "title", artVar: "base",
  secs: 120, left: 0, tick: null,
  lastIncome: 0, lastDrain: 0,
  built: 0,               // acts in which something was actually approved
};

const $ = (q) => document.querySelector(q);
const $$ = (q) => [...document.querySelectorAll(q)];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clampNeed = (n) => Math.max(0, Math.min(4, n));
const side = () => (ACTS[Math.max(0, G.act)] || ACTS[0]).side;
const nameOf = (s) => s[side()] || s.label;
const wantOf = (s) => s[side() === "sea" ? "seaWant" : "landWant"];
const setFlags = (f) => { if (f) String(f).split(",").forEach((x) => x.trim() && G.flags.add(x.trim())); };
const passes = (b) => !b.requires || String(b.requires).split(",").some((f) => G.flags.has(f.trim()));
const metCount = () => STAKEHOLDERS.filter((s) => G.needs[s.id] >= MET).length;
const starvedList = () => STAKEHOLDERS.filter((s) => G.needs[s.id] <= 0).map((s) => s.id);

STAKEHOLDERS.forEach((s) => (G.needs[s.id] = 2));

/* ------------------------------------------------------------- shell */
function shell(panel, extra = "") {
  document.body.innerHTML = `${bar()}
    <main class="stage${G.phase === "debrief" ? " solo" : ""}">
      <section class="art">
        <div class="plate" id="art"><div class="layer" id="artlayer">${scene()}</div>${extra}</div>
        ${G.phase === "title" || G.phase === "debrief" ? "" : stakeRow()}
      </section>
      <section class="panel ${G.phase === "outcome" ? "mid" : ""}">${panel}</section>
    </main>`;
}

const scene = () => drawScene(G.artKey, G.artVar, Object.assign({
  needs: G.needs, round: G.round, actRound: G.actRound, side: side(), licence: G.licence,
}, G.p));

const paintArt = () => { const l = $("#artlayer"); if (l) l.innerHTML = scene(); };

/* ---------------------------------------------------------- the bar */
/* One number, large, because it is the only one. */
function bar() {
  if (G.phase === "title") {
    return `<header class="top"><span class="mark">No Clean <em>Hands</em></span><span class="grow"></span>
      <span class="tiny"><kbd>space</kbd> start</span></header>`;
  }
  const a = ACTS[Math.max(0, G.act)];
  const done = G.phase === "end" || G.phase === "debrief";
  const label = done ? "Verdict" : `${a.title.split(":")[0]} · ${Math.min(G.b + 1, G.beats.length)}/${G.beats.length}`;
  const pct = Math.max(0, Math.min(100, G.licence));
  const low = G.licence <= 20;
  return `<header class="top">
    <span class="mark">No Clean <em>Hands</em></span>
    <span class="step">${esc(label)}</span>
    <span class="grow"></span>
    <div class="lic ${low ? "low" : ""}" title="Social licence. Spent by every decision, paid back by stakeholders whose needs are met.">
      <div class="lic-lb">Social licence<b>${G.licence}</b></div>
      <div class="lic-bar"><div class="lic-fill" style="width:${pct}%"></div></div>
    </div>
  </header>`;
}

/* The six interests, under the picture, as the thing you are actually
   playing. Their names change with the deposit; their wants do not. */
function stakeRow() {
  return `<div class="stakes">${STAKEHOLDERS.map((s) => {
    const n = G.needs[s.id];
    const st = n <= 0 ? "starved" : n >= MET ? "met" : "thin";
    return `<div class="stake ${st}" data-s="${s.id}" title="${esc(nameOf(s))} — ${esc(wantOf(s))}">
      <span class="sk-ico">${ICON[s.icon]}</span>
      <span class="sk-name">${esc(nameOf(s))}</span>
      <span class="sk-pips">${[1, 2, 3, 4].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>
    </div>`;
  }).join("")}</div>`;
}

const ICON = {
  home: `<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7M6 10v9h12v-9"/></svg>`,
  helmet: `<svg viewBox="0 0 24 24"><path d="M3 16a9 9 0 0 1 18 0zM3 16h18M9 7.5V5a3 3 0 0 1 6 0v2.5"/></svg>`,
  coin: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 10h5M9.5 14h5"/></svg>`,
  flag: `<svg viewBox="0 0 24 24"><path d="M6 21V4M6 5h11l-2 3.5L17 12H6"/></svg>`,
  flask: `<svg viewBox="0 0 24 24"><path d="M10 3h4M11 3v7l-5 9h12l-5-9V3M8 15h8"/></svg>`,
  car: `<svg viewBox="0 0 24 24"><path d="M4 16v-4l2-5h12l2 5v4M4 16h16M7 16v2M17 16v2M7 12h2M15 12h2"/></svg>`,
};

/* ------------------------------------------------------------- title */
function title() {
  G.phase = "title"; G.artKey = "title"; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = "land";
  shell(`<div class="scroll">
      <h1 class="bigtitle">No Clean<br><em>Hands</em></h1>
      <p class="subtitle">${esc(PROLOGUE.sub)}</p>
      ${PROLOGUE.lines.map((l) => `<p class="situation">${l}</p>`).join("")}
      <div class="row"><button class="btn" id="go">Begin</button>
        <label class="tiny">talk time <select id="tsel" class="sel">
          <option value="90">90s</option><option value="120" selected>2 min</option>
          <option value="180">3 min</option><option value="0">none</option></select></label></div>
      <p class="tiny">${esc(PROLOGUE.note)}</p>
    </div>`);
  $("#tsel").onchange = (e) => (G.secs = +e.target.value);
  $("#go").onclick = () => { G.act = 0; act(); };
}

/* --------------------------------------------------------------- act */
function act() {
  const a = ACTS[G.act];
  if (!a) return ending();
  G.phase = "intro"; G.b = 0; G.actRound = 0;
  G.beats = a.beats.filter(passes);
  G.artKey = a.art; G.artVar = "base"; G.p = {};
  document.body.dataset.realm = a.realm;
  shell(`<div class="scroll">
      <div class="where"><h2>${esc(a.title)}</h2><span class="yr">${esc(a.sub)}</span></div>
      <p class="situation">${esc(a.intro)}</p>
      <div class="wants">${STAKEHOLDERS.map((s) => `
        <div class="want"><span class="wk">${ICON[s.icon]}${esc(nameOf(s))}</span><span class="wv">${esc(wantOf(s))}</span></div>`).join("")}</div>
    </div>
    <div class="controls"><button class="btn" id="go">Open the file &rarr;</button></div>`);
  $("#go").onclick = () => beat();
}

/* -------------------------------------------------------------- beat */
function beat() {
  const b = G.beats[G.b];
  if (!b) { G.act++; return act(); }
  G.phase = "beat";
  G.artKey = b.art || ACTS[G.act].art; G.artVar = "base";
  G.p = b.type === "slider" ? { [b.slider.key]: b.slider.start }
      : b.type === "conditions" ? { chosen: [] }
      : b.type === "allocate" ? { give: {}, left: b.pool }
      : {};

  shell(`<div class="scroll">
      <div class="where"><h2>${esc(b.place)}</h2><span class="yr">${esc(b.year)}</span></div>
      <div class="shape">${esc(b.shape)}</div>
      <p class="situation">${esc(b.situation)}</p>
    </div>
    <div class="askline">${esc(b.ask)}</div>
    <div class="controls" id="controls">${controls(b)}</div>
    <div class="row"><button class="btn alt mini" id="talk">Talk it over</button>
      <button class="btn alt mini" id="more">What else is true</button>
      <span class="grow"></span>
      ${b.type === "choice" ? "" : `<button class="btn" id="commit">Commit</button>`}</div>`);
  wire(b);
}

/* --------------------------------------------------------- controls */
/* Every option shows what it costs and who it feeds, because the whole
   game is that those two facts never line up. */
const needTags = (need) => STAKEHOLDERS.filter((s) => need && need[s.id])
  .map((s) => `<span class="nt ${need[s.id] > 0 ? "up" : "down"}">${esc(nameOf(s))} ${need[s.id] > 0 ? "+" : ""}${need[s.id]}</span>`).join("");

const priceTag = (c) => `<span class="cost ${c > G.licence ? "over" : ""}">&minus;${c}</span>`;

function controls(b) {
  if (b.type === "choice") {
    return b.choices.map((c, i) => `
      <button class="pick" data-i="${i}" ${c.cost > G.licence ? "disabled" : ""}>
        <span class="key">${i + 1}</span>
        <span class="tx"><b>${esc(c.label)}</b><i>${esc(c.sub)}</i><span class="tags">${needTags(c.need)}</span></span>
        ${priceTag(c.cost)}
      </button>`).join("");
  }
  if (b.type === "conditions") {
    return `<div class="cards">${b.options.map((o, i) => `
      <button class="card" data-id="${o.id}" data-i="${i}" aria-pressed="false">
        <span class="cx"><b>${esc(o.label)}</b><i>${esc(o.note)}</i><span class="tags">${needTags(o.need)}</span></span>
        ${priceTag(o.cost)}</button>`).join("")}</div>
      <div class="bandnote" id="bandnote"></div>`;
  }
  if (b.type === "slider") {
    const v = G.p[b.slider.key];
    return `<div class="sliderbox">
      <input type="range" id="sl" min="${b.slider.min}" max="${b.slider.max}" step="${b.slider.step}" value="${v}">
      <div class="slends"><span>${esc(b.slider.labelLow)}</span><b id="slval">${v}${esc(b.slider.unit)}</b><span>${esc(b.slider.labelHigh)}</span></div>
      <div class="bandnote" id="bandnote"></div>
    </div>`;
  }
  if (b.type === "allocate") {
    return `<div class="alloc">${STAKEHOLDERS.map((s) => `
      <div class="al" data-s="${s.id}">
        <span class="al-ico">${ICON[s.icon]}</span>
        <span class="al-n"><b>${esc(nameOf(s))}</b><i>${esc(wantOf(s))}</i></span>
        <span class="al-c">
          <button class="stp" data-d="-1" aria-label="less">&minus;</button>
          <b class="al-v" data-v="${s.id}">0</b>
          <button class="stp" data-d="1" aria-label="more">+</button>
        </span>
      </div>`).join("")}</div>
      <div class="bandnote" id="bandnote"></div>`;
  }
  return "";
}

const bandFor = (b, v) => b.bands.find((x) => v <= x.max) || b.bands[b.bands.length - 1];

/* ------------------------------------------------------------- wire */
function wire(b) {
  $("#talk").onclick = () => sheet("talk", b);
  $("#more").onclick = () => sheet("detail", b);

  if (b.type === "choice") {
    $$(".pick").forEach((el) => (el.onclick = () => {
      const c = b.choices[+el.dataset.i];
      setFlags(c.flag);
      land(b, c.key, c.out.t, c.out.x, c.cost, c.need, c.label);
    }));
    return;
  }

  if (b.type === "conditions") {
    const note = () => {
      const spend = b.options.filter((o) => G.p.chosen.includes(o.id)).reduce((t, o) => t + o.cost, 0);
      $("#bandnote").innerHTML = `Spending <b>${spend}</b> of <b>${G.licence}</b>${
        spend > G.licence ? ` &middot; <span class="warnline">more than you have</span>` : ""}`;
      $("#commit").disabled = spend > G.licence;
    };
    $$(".card").forEach((el) => (el.onclick = () => {
      const id = el.dataset.id;
      G.p.chosen = G.p.chosen.includes(id) ? G.p.chosen.filter((x) => x !== id) : [...G.p.chosen, id];
      $$(".card").forEach((c) => c.setAttribute("aria-pressed", G.p.chosen.includes(c.dataset.id) ? "true" : "false"));
      note(); paintArt();
    }));
    note();
    $("#commit").onclick = () => {
      const picked = b.options.filter((o) => G.p.chosen.includes(o.id));
      const missed = b.options.filter((o) => !G.p.chosen.includes(o.id));
      const need = {}; let cost = 0;
      picked.forEach((o) => { cost += o.cost; Object.entries(o.need).forEach(([k, v]) => (need[k] = (need[k] || 0) + v)); });
      G.p.locked = true;
      land(b, "base", picked.length ? "What you required" : "You required nothing",
        [...picked.map((o) => o.yes), ...missed.slice(0, 2).map((o) => o.no)].join(" "),
        cost, need, picked.map((o) => o.label).join(" + ") || "nothing");
    };
    return;
  }

  if (b.type === "slider") {
    const sl = $("#sl");
    const note = () => {
      const band = bandFor(b, G.p[b.slider.key]);
      $("#bandnote").innerHTML = `<b>${esc(band.t)}</b> &middot; costs <b>${band.cost}</b> &middot; ${needTags(band.need) || "no one moves"}`;
    };
    sl.oninput = () => { G.p[b.slider.key] = +sl.value; $("#slval").textContent = sl.value + b.slider.unit; note(); paintArt(); };
    note();
    $("#commit").onclick = () => {
      const band = bandFor(b, G.p[b.slider.key]);
      setFlags(band.flag);
      land(b, "base", band.t, band.x, band.cost, band.need, `${G.p[b.slider.key]}${b.slider.unit}`);
    };
    return;
  }

  if (b.type === "allocate") {
    const note = () => {
      $("#bandnote").innerHTML = `<b>${G.p.left}</b> of ${b.pool} left to give &middot; each point is a point of licence`;
      $$(".al-v").forEach((el) => (el.textContent = G.p.give[el.dataset.v] || 0));
      $("#commit").disabled = false;
    };
    $$(".al .stp").forEach((btn) => (btn.onclick = () => {
      const id = btn.closest(".al").dataset.s, d = +btn.dataset.d;
      const cur = G.p.give[id] || 0;
      if (d > 0 && (G.p.left <= 0 || G.p.left > b.pool)) return;
      if (d > 0 && b.pool - G.p.left >= Math.min(b.pool, G.licence)) return;
      if (d < 0 && cur <= 0) return;
      G.p.give[id] = cur + d; G.p.left -= d;
      note(); paintArt();
    }));
    note();
    $("#commit").onclick = () => {
      const spent = b.pool - G.p.left;
      const need = {}; Object.entries(G.p.give).forEach(([k, v]) => v && (need[k] = v));
      const named = STAKEHOLDERS.filter((s) => G.p.give[s.id]).map((s) => `${nameOf(s)} ${G.p.give[s.id]}`);
      land(b, "base", spent ? "The split" : "You distributed nothing",
        spent
          ? `You moved ${spent} point${spent === 1 ? "" : "s"} of licence into ${named.length} of six interests. The ${6 - named.length} you did not fund are in the minutes as having been considered, which is the word used for this.`
          : "Nothing is distributed. The revenue goes where revenue goes by default, which is to whoever wrote the contract.",
        spent, need, named.join(", ") || "nothing");
    };
  }
}

/* ------------------------------------------------------------ sheets */
function sheet(kind, b) {
  const plate = $("#art");
  plate.querySelector(".sheet")?.remove();
  const el = document.createElement("div");
  el.className = "sheet";
  el.innerHTML = kind === "talk"
    ? `<h3>Talk it over</h3><ol>${b.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
       <div class="bigclock" id="clock">${G.secs ? fmt(G.secs) : "--:--"}</div>
       <div class="row"><button class="btn mini alt" id="more1">+1 min</button>
       <button class="btn mini alt" id="close">Back</button></div>`
    : `<h3>What else is true</h3><ul class="deets">${b.detail.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
       <div class="row" style="margin-top:auto"><button class="btn mini alt" id="close">Back</button></div>`;
  plate.appendChild(el);
  el.querySelector("#close").onclick = () => { stop(); el.remove(); };
  el.querySelector("#more1") && (el.querySelector("#more1").onclick = () => { G.left += 60; tickPaint(); });
  if (kind === "talk" && G.secs) run(G.secs);
}
const fmt = (t) => `${t < 0 ? "-" : ""}${Math.floor(Math.abs(t) / 60)}:${String(Math.abs(t) % 60).padStart(2, "0")}`;
function tickPaint() { const c = $("#clock"); if (c) { c.textContent = fmt(G.left); c.classList.toggle("warn", G.left <= 20); } }
function run(s) { stop(); G.left = s; tickPaint(); G.tick = setInterval(() => { G.left--; tickPaint(); if (G.left <= -60) stop(); }, 1000); }
function stop() { if (G.tick) { clearInterval(G.tick); G.tick = null; } }

/* -------------------------------------------------------------- land */
/* Spend, move the needs, then run the round: everyone whose need is met
   pays you, everyone you left on zero takes from you. */
function land(b, variant, t, x, cost, need, stampText) {
  stop();
  G.licence -= cost;
  const before = Object.assign({}, G.needs);
  Object.entries(need || {}).forEach(([k, v]) => (G.needs[k] = clampNeed(G.needs[k] + v)));

  G.round += 1; G.actRound += 1;
  const met = metCount(), starved = starvedList();
  const clout = (id) => STAKEHOLDERS.find((s) => s.id === id).clout;
  G.lastIncome = STAKEHOLDERS.filter((s) => G.needs[s.id] >= MET).reduce((n, s) => n + s.clout, 0);
  G.lastDrain = starved.reduce((n, id) => n + clout(id) * STARVE_MULT, 0);
  G.licence += G.lastIncome - G.lastDrain;
  G.licence = Math.max(0, Math.min(100, G.licence));

  // "built" means this act produced an approval of some kind, which the
  // ending needs in order to tell refusal apart from compromise
  const approved = { jadar: "live", cook: "open" };
  G.builtActs = G.builtActs || [];
  const a = ACTS[G.act];
  if ((G.flags.has(approved[a.id]) || (a.id === "cook" && G.flags.has("blocks"))) && !G.builtActs.includes(a.id)) {
    G.builtActs.push(a.id);
  }
  G.built = G.builtActs.length;

  G.log.push({ place: b.place, label: stampText, cost, met, starved: starved.length });
  G.phase = "outcome"; G.artVar = variant;

  const moved = STAKEHOLDERS.filter((s) => G.needs[s.id] !== before[s.id]);

  shell(`<div class="scroll">
      <div class="where"><h2 class="outcome-t">${esc(t)}</h2><span class="yr">${esc(b.year)}</span></div>
      <p class="outcome-x">${esc(x)}</p>
      <div class="ledger">
        <div class="lg"><span>Decision</span><b class="dn">&minus;${cost}</b></div>
        <div class="lg"><span>${met} interest${met === 1 ? "" : "s"} met</span><b class="up">+${G.lastIncome}</b></div>
        ${starved.length ? `<div class="lg"><span>${starved.length} starving</span><b class="dn">&minus;${G.lastDrain}</b></div>` : ""}
        <div class="lg tot"><span>Social licence</span><b>${G.licence}</b></div>
      </div>
      ${moved.length ? `<div class="moved">${moved.map((s) => `
        <span class="mv ${G.needs[s.id] > before[s.id] ? "up" : "down"}">${esc(nameOf(s))}
        ${before[s.id]}&rarr;${G.needs[s.id]}</span>`).join("")}</div>` : ""}
      ${G.licence <= 20 && G.licence > 0 ? `<div class="warnbox">Licence is nearly gone. One more expensive round and the project is stopped by the people standing around it.</div>` : ""}
    </div>
    <div class="controls"><button class="btn" id="next">Next</button></div>`,
    `<div class="stamp">${esc(stampText)}</div>`);

  const layer = $("#artlayer");
  layer.classList.add("art-enter");
  if (starved.length || cost > 14) setTimeout(() => layer.classList.add("shake"), 280);
  $$(".stake").forEach((el) => { if (moved.some((s) => s.id === el.dataset.s)) el.classList.add("pop"); });

  $("#next").onclick = () => {
    if (G.licence <= 0) return ending();
    G.beats = ACTS[G.act].beats.filter(passes);
    G.b++;
    if (G.b >= G.beats.length) { G.act++; if (G.act >= ACTS.length) return ending(); return act(); }
    beat();
  };
}

/* ------------------------------------------------------------- ending */
function ending() {
  G.phase = "end"; stop();
  const L = { licence: G.licence, met: metCount(), starved: starvedList(), built: G.built };
  const e = ENDINGS.find((x) => x.test(L)) || ENDINGS[ENDINGS.length - 1];
  G.artKey = e.art; G.artVar = "base"; G.p = {};
  shell(`<div class="scroll">
      <div class="where"><h2>${esc(e.title)}</h2><span class="yr">Verdict</span></div>
      <p class="tally">Social licence <b class="${G.licence <= 20 ? "bad" : "ok"}">${G.licence}</b> &nbsp;·&nbsp;
        <b class="${L.met >= 4 ? "ok" : ""}">${L.met} of 6 met</b>
        ${L.starved.length ? ` &nbsp;·&nbsp; <b class="bad">${L.starved.length} starved</b>` : ""}</p>
      <p class="situation">${esc(e.text)}</p>
      <div class="fates">${STAKEHOLDERS.map((s) => {
        const n = G.needs[s.id];
        return `<div><b>${esc(s.label)}</b> ${n <= 0 ? "was never funded at all." : n >= MET ? "got enough to stay in the room." : "got something, and not enough."}</div>`;
      }).join("")}</div>
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
  G.act = -1; G.b = 0; G.beats = []; G.phase = "title";
  G.licence = START_LICENCE; G.flags = new Set(); G.log = []; G.p = {};
  G.round = 0; G.actRound = 0; G.lastIncome = 0; G.lastDrain = 0; G.built = 0; G.builtActs = [];
  STAKEHOLDERS.forEach((s) => (G.needs[s.id] = 2));
  title();
}

document.addEventListener("keydown", (e) => {
  if (["SELECT", "INPUT"].includes(e.target.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === " " || k === "enter") { const b = $("#go") || $("#next") || $("#deb"); if (b) { e.preventDefault(); b.click(); } return; }
  if (k === "t" && G.phase === "beat") { $("#talk")?.click(); return; }
  if (G.phase === "beat" && ["1", "2", "3", "4", "5", "6"].includes(k)) {
    ($(`.pick[data-i="${+k - 1}"]`) || $(`.card[data-i="${+k - 1}"]`))?.click();
  }
  if (k === "r" && (G.phase === "end" || G.phase === "debrief")) reset();
});

title();
