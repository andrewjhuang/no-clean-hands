/* NO CLEAN HANDS — engine
   Designed to be driven from the front of a room: large type, keyboard
   shortcuts, an explicit discussion phase with a visible clock. */

const TOTAL_ACTS = new Set(SCENES.map((s) => s.act)).size;

const app = document.getElementById("app");
const hud = document.getElementById("hud");

const state = {
  i: -1,                 // index into the active scene list
  scenes: [],            // resolved at runtime (act 6 branches)
  meters: { trust: 50, eco: 50, supply: 50, cap: 50 },
  flags: new Set(),
  record: [],            // { place, label }
  phase: "title",        // title | brief | floor | outcome | end | debrief
  timerSecs: 120,
  tick: null,
  remaining: 0,
};

/* ------------------------------------------------------------ utils */
const clamp = (n) => Math.max(0, Math.min(100, n));
const mount = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); app.appendChild(t.content); };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setRealm(realm) {
  document.body.dataset.realm = realm;
}

function buildSnow() {
  const host = document.querySelector(".snow");
  if (!host || host.childElementCount) return;
  for (let i = 0; i < 46; i++) {
    const s = document.createElement("i");
    s.style.left = (Math.random() * 100).toFixed(2) + "%";
    s.style.animationDuration = (16 + Math.random() * 26).toFixed(1) + "s";
    s.style.animationDelay = (-Math.random() * 30).toFixed(1) + "s";
    const sz = (1 + Math.random() * 2.4).toFixed(1);
    s.style.width = sz + "px"; s.style.height = sz + "px";
    host.appendChild(s);
  }
}

/* ------------------------------------------------------------- HUD  */
function renderHud() {
  if (state.phase === "title") { hud.innerHTML = ""; return; }
  const total = TOTAL_ACTS;
  const n = Math.min(state.i + 1, total);
  hud.innerHTML = `
    <div class="hud">
      <span class="brand">No Clean Hands</span>
      <span class="spacer"></span>
      <span class="act">Decision ${n} of ${total}</span>
    </div>
    <div class="meters">
      ${METERS.map((m) => {
        const v = state.meters[m.key];
        return `<div class="meter ${v < 34 ? "low" : ""}" data-m="${m.key}" title="${esc(m.hint)}">
          <div class="top"><span class="nm">${esc(m.label)}</span><span class="vl">${v}</span><span class="delta"></span></div>
          <div class="track"><div class="fill" style="width:${v}%"></div></div>
        </div>`;
      }).join("")}
    </div>`;
}

function flashDeltas(deltas) {
  Object.entries(deltas).forEach(([k, d]) => {
    if (!d) return;
    const node = hud.querySelector(`.meter[data-m="${k}"] .delta`);
    if (!node) return;
    node.textContent = (d > 0 ? "+" : "") + d;
    node.className = "delta show " + (d > 0 ? "up" : "down");
    setTimeout(() => { node.className = "delta"; }, 2600);
  });
}

/* ----------------------------------------------------------- scenes */
function resolveScenes() {
  // Act 6 has two mutually exclusive versions; pick by flag at runtime.
  return SCENES.filter((s) => !s.requires || state.flags.has(s.requires));
}

function current() { return state.scenes[state.i]; }

/* ------------------------------------------------------------ views */
function viewTitle() {
  state.phase = "title";
  setRealm("land");
  renderHud();
  app.innerHTML = "";
  mount(`
    <div class="card title-card fade">
      <div class="scene-head"><span class="tag">${esc(PROLOGUE.year)}</span></div>
      <h1 class="title">${esc(PROLOGUE.title)}</h1>
      <div class="sub">${esc(PROLOGUE.sub)}</div>
      <div class="lede">${PROLOGUE.body.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <div class="timer-row">
        <button class="btn" id="start">Convene the council</button>
        <label class="hint">Discussion clock
          <select id="tsel" style="font:inherit;margin-left:8px;padding:6px 8px;background:transparent;color:inherit;border:1px solid var(--line);border-radius:3px">
            <option value="90">90 seconds</option>
            <option value="120" selected>2 minutes</option>
            <option value="180">3 minutes</option>
            <option value="0">no clock</option>
          </select>
        </label>
        <span class="hint">Keys: <kbd>space</kbd> advance &nbsp; <kbd>1</kbd>–<kbd>4</kbd> choose</span>
      </div>
      <p class="note">${esc(PROLOGUE.note)}</p>
    </div>`);

  document.getElementById("tsel").onchange = (e) => { state.timerSecs = +e.target.value; };
  document.getElementById("start").onclick = () => { state.i = 0; state.scenes = resolveScenes(); viewScene(); };
}

function viewScene() {
  const s = current();
  if (!s) return viewEnd();
  state.phase = "brief";
  setRealm(s.realm);
  if (s.realm === "sea") buildSnow();
  renderHud();

  app.innerHTML = "";
  mount(`
    <div class="card fade">
      <div class="scene-head">
        <span class="tag">${esc(s.year)}</span>
        <span class="where">${esc(s.where)}</span>
      </div>
      <h2 class="place">${esc(s.place)}</h2>
      <h3 class="headline">${esc(s.headline)}</h3>
      <div class="brief">${s.brief.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <div class="humans">
        ${s.humans.map((h) => `
          <div class="human">
            <div class="who">${esc(h.name)}${h.age ? ", " + h.age : ""}${h.role ? " &middot; " + esc(h.role) : ""}</div>
            <div class="quote">&ldquo;${esc(h.quote)}&rdquo;</div>
          </div>`).join("")}
      </div>
      <div class="stake">${esc(s.stake)}</div>
      <div class="timer-row">
        <button class="btn" id="floor">Open the floor</button>
        <span class="hint">Read it out, then let them argue.</span>
      </div>
    </div>
    <div class="card ctx fade">
      <h4>Context</h4>
      <ul>${s.context.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    </div>`);

  document.getElementById("floor").onclick = viewFloor;
}

function viewFloor() {
  const s = current();
  state.phase = "floor";
  app.innerHTML = "";
  mount(`
    <div class="card fade">
      <div class="scene-head">
        <span class="tag">Discuss</span>
        <span class="where">${esc(s.place)} &middot; ${esc(s.year)}</span>
      </div>
      <div class="discuss" style="margin-top:14px">
        <h4>Questions for the table</h4>
        <ol>${s.discuss.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
      </div>
      <div class="timer-row">
        <div class="clock" id="clock">${state.timerSecs ? fmt(state.timerSecs) : "--:--"}</div>
        <button class="btn ghost sm" id="addtime">+1 min</button>
        <span class="hint">Choose when the room is ready. The clock is a prompt, not a rule.</span>
      </div>
    </div>
    <div class="card fade">
      <div class="scene-head"><span class="tag">Decide</span><span class="where">${esc(s.stake)}</span></div>
      <div class="choices" id="choices">
        ${s.choices.map((c, idx) => `
          <button class="choice" data-idx="${idx}">
            <span class="k">${idx + 1}</span>
            <span>
              <span class="lb">${esc(c.label)}</span>
              <span class="dt">${esc(c.detail)}</span>
            </span>
          </button>`).join("")}
      </div>
    </div>`);

  document.querySelectorAll(".choice").forEach((b) => {
    b.onclick = () => choose(+b.dataset.idx);
  });
  document.getElementById("addtime").onclick = () => { state.remaining += 60; paint(); };

  if (state.timerSecs) startClock(state.timerSecs);
}

function fmt(sec) {
  const m = Math.floor(Math.abs(sec) / 60), s = Math.abs(sec) % 60;
  return (sec < 0 ? "-" : "") + m + ":" + String(s).padStart(2, "0");
}

function paint() {
  const c = document.getElementById("clock");
  if (!c) return;
  c.textContent = fmt(state.remaining);
  c.classList.toggle("warn", state.remaining <= 20);
}

function startClock(secs) {
  stopClock();
  state.remaining = secs;
  paint();
  state.tick = setInterval(() => {
    state.remaining -= 1;
    paint();
    if (state.remaining <= -30) stopClock();
  }, 1000);
}

function stopClock() { if (state.tick) { clearInterval(state.tick); state.tick = null; } }

function choose(idx) {
  const s = current();
  const c = s.choices[idx];
  if (!c) return;
  stopClock();

  // Almost every option costs political capital, so without a recovery the
  // meter floors at zero by act four and stops telling anyone anything.
  // A year passes between acts; you rebuild a little standing.
  const applied = Object.assign({}, c.deltas);
  if (state.i < state.scenes.length - 1) applied.cap = (applied.cap || 0) + 5;
  Object.entries(applied).forEach(([k, d]) => { state.meters[k] = clamp(state.meters[k] + d); });
  (c.flags || []).forEach((f) => state.flags.add(f));
  state.record.push({ place: s.place, label: c.label });

  renderHud();
  flashDeltas(applied);
  viewOutcome(s, c, applied);
}

function viewOutcome(s, c, applied) {
  state.phase = "outcome";
  const shifts = METERS
    .filter((m) => applied[m.key])
    .map((m) => {
      const d = applied[m.key];
      return `<span class="shift ${d > 0 ? "up" : "down"}">${esc(m.label)} ${d > 0 ? "+" : ""}${d}</span>`;
    }).join("");

  app.innerHTML = "";
  mount(`
    <div class="card outcome fade">
      <div class="scene-head">
        <span class="tag">Consequence</span>
        <span class="where">${esc(s.place)} &middot; you chose: ${esc(c.label)}</span>
      </div>
      <h2>${esc(c.outcome.title)}</h2>
      <p class="body">${esc(c.outcome.text)}</p>
      ${c.outcome.human && c.outcome.human.line ? `<div class="after">${esc(c.outcome.human.line)}</div>` : ""}
      <div class="shifts">${shifts}</div>
      <div class="timer-row">
        <button class="btn" id="next">${state.i + 1 >= state.scenes.length ? "See how it ends" : "Next decision"}</button>
      </div>
    </div>`);

  document.getElementById("next").onclick = () => {
    state.i += 1;
    state.scenes = resolveScenes();           // act 6 branch may now resolve
    if (state.i >= state.scenes.length) viewEnd(); else viewScene();
  };
}

function viewEnd() {
  state.phase = "end";
  const m = state.meters;
  const ending = ENDINGS.find((e) => e.test(m)) || ENDINGS[ENDINGS.length - 1];
  setRealm(state.flags.has("sea_mine") ? "sea" : "land");
  renderHud();

  app.innerHTML = "";
  mount(`
    <div class="card fade">
      <div class="scene-head"><span class="tag">${esc(ending.kicker)}</span></div>
      <h1 class="title" style="font-size:clamp(38px,6vw,78px)">${esc(ending.title)}</h1>
      <p class="lede" style="margin-top:20px">${esc(ending.text)}</p>
      <div class="shifts" style="margin-top:26px">
        ${METERS.map((x) => `<span class="shift">${esc(x.label)} ${state.meters[x.key]}</span>`).join("")}
      </div>
    </div>
    <div class="card fade record">
      <h4 style="font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-dim);margin-bottom:12px">Your council's record</h4>
      ${state.record.map((r) => `<div class="row"><span class="p">${esc(r.place)}</span><span>${esc(r.label)}</span></div>`).join("")}
      <div class="timer-row">
        <button class="btn" id="debrief">Debrief</button>
        <button class="btn ghost" id="again">Play again</button>
      </div>
    </div>`);

  document.getElementById("debrief").onclick = viewDebrief;
  document.getElementById("again").onclick = reset;
}

function viewDebrief() {
  state.phase = "debrief";
  app.innerHTML = "";
  mount(`
    <div class="card fade">
      <div class="scene-head"><span class="tag">Debrief</span></div>
      <h2 class="place">Now the real discussion</h2>
      <div class="discuss" style="margin-top:18px">
        <h4>Questions</h4>
        <ol>${DEBRIEF.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
      </div>
    </div>
    <div class="card fade debrief">
      <h4 style="font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-dim);margin-bottom:12px">${esc(DEBRIEF.title)}</h4>
      ${DEBRIEF.items.map((i) => `<div class="item"><h5>${esc(i.h)}</h5><p>${esc(i.t)}</p></div>`).join("")}
      <div class="timer-row">
        <button class="btn ghost" id="again2">Run it again</button>
        <span class="hint">Sources: Ernest Scheyder, <em>The War Below</em> (2024) &middot; Olive Heffernan, <em>The High Seas</em> (2024), ch. 1, 4, 12</span>
      </div>
    </div>`);
  document.getElementById("again2").onclick = reset;
}

function reset() {
  stopClock();
  state.i = -1;
  state.meters = { trust: 50, eco: 50, supply: 50, cap: 50 };
  state.flags = new Set();
  state.record = [];
  state.scenes = [];
  viewTitle();
}

/* -------------------------------------------------------- keyboard */
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "SELECT") return;
  const k = e.key.toLowerCase();

  if (k === " " || k === "enter") {
    const b = document.getElementById("start") || document.getElementById("floor") ||
              document.getElementById("next") || document.getElementById("debrief");
    if (b) { e.preventDefault(); b.click(); }
    return;
  }
  if (state.phase === "floor" && ["1", "2", "3", "4"].includes(k)) {
    const b = document.querySelector(`.choice[data-idx="${+k - 1}"]`);
    if (b) b.click();
    return;
  }
  if (k === "r" && (state.phase === "end" || state.phase === "debrief")) reset();
});

viewTitle();
