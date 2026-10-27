/* ------------------------------------------------------------------
   NO CLEAN HANDS — hand-drawn scene art.

   Scenes are composed from primitives so the drawing can MUTATE: the pit
   opens, the fence moves, coins stack up, people walk off. Each scene
   function takes (variant, p) where `p` is live input — a slider value,
   a budget split, a set of chosen stakeholders — so the picture moves
   WHILE the class is still arguing, before anything is locked in.
------------------------------------------------------------------- */

const VB = { w: 800, h: 500 };

const C = {
  ink: "#231f20", red: "#e4572e", teal: "#2a9d8f", yellow: "#f2c14e",
  blue: "#3d6cb9", deep: "#1b3a5c", sand: "#e8d9b5", rose: "#d88ca0",
  dust: "#c9b89a", grey: "#cfc7b4",
};

const P = (d, stroke = C.ink, w = 5, fill = "none") =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const CIRC = (x, y, r, fill = "none", stroke = C.ink, w = 5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;

const TXT = (x, y, t, size = 20, fill = C.ink) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" fill="${fill}">${t}</text>`;

/* ----------------------------------------------------------- people */
function fig(x, y, s = 1, pose = "stand", color = C.ink, cls = "") {
  const head = `<circle cx="0" cy="-46" r="12" fill="none" stroke="${color}" stroke-width="5"/>`;
  const poses = {
    stand:    `${head}<path d="M0-34V-6"/><path d="M0-28l-13 12M0-28l13 12"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    armsup:   `${head}<path d="M0-34V-6"/><path d="M0-28l-15-14M0-28l15-14"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    point:    `${head}<path d="M0-34V-6"/><path d="M0-28l-12 12M0-26l20-6"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    sit:      `${head}<path d="M0-34V-12"/><path d="M0-28l-12 10M0-28l12 10"/><path d="M0-12h16M16-12v14"/><path d="M0-12l-12 6"/>`,
    sad:      `${head}<path d="M2-34l-4 28"/><path d="M1-28l-13 16M1-28l12 16"/><path d="M-2-6l-10 22M-2-6l9 22"/>`,
    crouch:   `${head}<path d="M0-34v14"/><path d="M0-30l-13 8M0-30l13 8"/><path d="M0-20l-12 12 2 12M0-20l12 12-2 12"/>`,
    cheer:    `${head}<path d="M0-34V-6"/><path d="M0-28l-16-16M0-28l16-16"/><path d="M0-6l-13 20M0-6l13 20"/>`,
    walkaway: `${head}<path d="M0-34V-6"/><path d="M0-26l-14 10M0-26l10 14"/><path d="M0-6l-16 20M0-6l12 20"/>`,
    shrug:    `${head}<path d="M0-34V-6"/><path d="M0-28l-14 4-2-10M0-28l14 4 2-10"/><path d="M0-6l-11 22M0-6l11 22"/>`,
  };
  return `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${s})" stroke="${color}" fill="none"
     stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${poses[pose] || poses.stand}</g></g>`;
}

const sign = (x, y, w, h, fill, text = "", size = 20) =>
  `<g><path d="M${x} ${y} V${y + 46}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
   <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
   ${text ? TXT(x, y - h / 2 + size * 0.35, text, size) : ""}</g>`;

/* ------------------------------------------------------- landscape */
const hill = (d, fill) => P(d, C.ink, 5, fill);

const tag = (x, y, text, fill = C.teal, w = 104) =>
  `<g><rect x="${x - w / 2}" y="${y - 20}" width="${w}" height="28" rx="5" fill="${fill}" stroke="${C.ink}" stroke-width="4"/>
   ${TXT(x, y, text, 15, (fill === C.yellow || fill === "#fff") ? C.ink : "#fff")}</g>`;

const cloud = (x, y, s = 1, cls = "anim-float") =>
  `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-44 0a18 18 0 0 1 16-18 22 22 0 0 1 42-4 18 18 0 0 1 10 22z" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g></g>`;

const bird = (x, y, s = 1) =>
  `<g class="anim-flap"><path d="M${x} ${y}q${8 * s} ${-7 * s} ${15 * s} 0q${7 * s} ${-7 * s} ${15 * s} 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/></g>`;

const sun = (x, y, color = C.yellow) =>
  `<g>${CIRC(x, y, 30, color)}
     ${P(`M${x - 48} ${y}h-14M${x + 48} ${y}h14M${x} ${y - 48}v-14M${x - 36} ${y - 36}l-10-10M${x + 36} ${y - 36}l10-10`, C.ink, 4)}</g>`;

const sage = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round">
     <path d="M0 0v-16M0-9l-8-8M0-9l8-8M0-16l-5-9M0-16l5-9"/></g>`;

const puff = (x, y, s = 1, fill = "#e3d6bb") =>
  `<g class="anim-puff"><g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-30 0a16 16 0 0 1 14-16 20 20 0 0 1 38-4 16 16 0 0 1 8 20z" fill="${fill}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g></g>`;

const truck = (x, y, s = 1, color = C.yellow) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-54 0h64l14-26h22l12 26h6v20h-118z" fill="${color}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     ${CIRC(-30, 24, 15, "#fff")}${CIRC(34, 24, 15, "#fff")}
     ${CIRC(-30, 24, 5, C.ink, C.ink, 2)}${CIRC(34, 24, 5, C.ink, C.ink, 2)}</g>`;

const digger = (x, y, s = 1, armDown = false) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-40 0h58v22h-58z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     ${CIRC(-24, 30, 13, "#fff")}${CIRC(4, 30, 13, "#fff")}
     <g class="${armDown ? "anim-dig" : ""}">
       <path d="M10 2 ${armDown ? "l40-6 14 30" : "l34-30 26 10"}" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
       <path d="${armDown ? "M60 28l16-6 4 16-18 6z" : "M66-20l18-4 6 16-18 6z"}" fill="${C.red}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     </g></g>`;

const flower = (x, y, s = 1, alive = true, cls = "") =>
  `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})" opacity="${alive ? 1 : 0.4}">
     <path d="M0 0v-26" stroke="${C.teal}" stroke-width="5" stroke-linecap="round"/>
     ${alive
       ? `${CIRC(0, -34, 9, C.rose)}${CIRC(-11, -27, 7, C.rose)}${CIRC(11, -27, 7, C.rose)}${CIRC(0, -44, 7, C.rose)}`
       : P("M-8-34l16 14M8-34l-16 14", C.ink, 4)}
     <path d="M0-14l-10-6M0-18l10-7" stroke="${C.teal}" stroke-width="4" stroke-linecap="round"/></g>`;

const oak = (x, y, s = 1, alive = true) =>
  `<g transform="translate(${x} ${y}) scale(${s})" opacity="${alive ? 1 : 0.4}">
     <path d="M0 0v-54" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
     <path d="M0-30l-20-14M0-40l20-14" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
     <path d="M-44-66a30 26 0 0 1 24-26 34 30 0 0 1 44 2 28 26 0 0 1 20 26 26 24 0 0 1-26 20h-38a26 22 0 0 1-24-22z"
        fill="${alive ? C.teal : C.grey}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

/* ------------------------------------------------------------- sea */
/* a raspberry cane: the valley's actual export */
const rasp = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${P("M0 0v-44", "#4a7a3a", 5)}${P("M0-20l-16-12M0-30l16-12", "#4a7a3a", 4)}
  ${CIRC(-4, -52, 7, C.red, C.ink, 3)}${CIRC(9, -44, 6, C.red, C.ink, 3)}</g>`;

/* an exploration rig: the thing that found it in 2004 */
const rig = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  ${P("M-26 0L0-78 26 0", C.ink, 5)}${P("M-16-48h32M-21-24h42", C.ink, 4)}${P("M0-78v-16", C.ink, 5)}</g>`;

/* a filed document, for the rounds decided on paper */
const doc = (x, y, label) => `<g transform="translate(${x} ${y})">
  <rect x="-54" y="-38" width="108" height="76" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
  ${P("M-36-18h72M-36-2h72M-36 14h44", "#9b9280", 4)}
  ${TXT(0, 60, label, 15, C.ink)}</g>`;

/* an island with a reef, seen from above-ish */
const atoll = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="0" cy="0" rx="62" ry="26" fill="#8fd4c4" stroke="${C.ink}" stroke-width="5"/>
  <ellipse cx="0" cy="-4" rx="34" ry="14" fill="${C.sand}" stroke="${C.ink}" stroke-width="4"/>
  ${P("M-10-8v-24", "#4a7a3a", 4)}${P("M-10-32l-13-7M-10-32l13-7M-10-30l0-12", "#4a7a3a", 4)}</g>`;

const nodules = (y, n = 16, seed = 3) => {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += CIRC(60 + ((i * 97 + seed * 31) % 680), y + ((i * 53) % 26), 6 + ((i * 7) % 5), "#5a6b7d", C.ink, 3);
  }
  return out;
};

const fish = (x, y, s = 1, color = C.yellow, cls = "anim-swim") =>
  `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${s})">
     <path d="M0 0c12-14 38-14 50 0-12 14-38 14-50 0z" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
     <path d="M0 0l-12-9v18z" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
     ${CIRC(38, -3, 2.4, C.ink, C.ink, 2)}</g></g>`;

const collector = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-60 0h120v34h-120z" fill="${C.red}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M-46 34h92" stroke="${C.ink}" stroke-width="5"/>
     ${CIRC(-40, 44, 11, "#fff")}${CIRC(-8, 44, 11, "#fff")}${CIRC(24, 44, 11, "#fff")}${CIRC(52, 44, 11, "#fff")}
     <path d="M0 0v-34" stroke="${C.ink}" stroke-width="5"/>
     <path d="M-16-34h32v-14h-32z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const plumeCloud = (x, y, s = 1, big = false) =>
  `<g class="anim-drift"><g transform="translate(${x} ${y}) scale(${s})" opacity="0.85">
     <path d="M0 0c40-30 120-26 170-6 54 22 120 10 150-14" fill="none" stroke="#8a7f6d" stroke-width="${big ? 46 : 22}" stroke-linecap="round" opacity="0.55"/>
     <path d="M10 18c44-26 118-20 164-2 48 18 112 8 146-14" fill="none" stroke="#a79a85" stroke-width="${big ? 30 : 14}" stroke-linecap="round" opacity="0.5"/></g></g>`;

const ship = (x, y, s = 1, color = C.blue, cls = "anim-bob") =>
  `<g class="${cls}"><g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-60 0h120l-16 26h-88z" fill="${color}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M-24 0v-26h40v26" fill="#fff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M30-26v-20" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g></g>`;

/* ------------------------------------------------------------ misc */
const chart = (x, y, up = false) =>
  `<g transform="translate(${x} ${y})">
     <path d="M0 0v-120M0 0h200" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
     <path d="${up ? "M10-20 60-50 110-46 160-100" : "M10-100 60-84 110-40 160-16"}"
        fill="none" stroke="${up ? C.teal : C.red}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="${up ? "M160-100l-4 18 20-4z" : "M160-16l-18-6 4 20z"}" fill="${up ? C.teal : C.red}" stroke="${C.ink}" stroke-width="3"/></g>`;

/** a stack of coins whose height tracks a number of units */
const coins = (x, y, units, color, label) => {
  let out = "";
  const n = Math.max(0, Math.round(units));
  for (let i = 0; i < n; i++) {
    out += `<ellipse cx="${x}" cy="${y - i * 15}" rx="30" ry="11" fill="${color}" stroke="${C.ink}" stroke-width="4"/>`;
  }
  if (!n) out += `<ellipse cx="${x}" cy="${y}" rx="30" ry="11" fill="none" stroke="${C.ink}" stroke-width="3" stroke-dasharray="7 7"/>`;
  out += TXT(x, y + 36, label, 17);
  return `<g>${out}</g>`;
};

/* --------------------------------------------------------- scenes */
/* ------------------------------------------------------------------
   Six scenes. Two of them do the work.

   Both case scenes read the SAME inputs — p.actRound (how far through
   the act we are) and p.needs (how each of the six interests is faring)
   — and both draw the same six figures in the same order along the
   bottom. The valley and the seafloor are deliberately the same
   picture with the water raised. That is the argument of the game,
   made in the art rather than in a paragraph.

   Everything ambient is animated: clouds drift, water breathes,
   machines work, fish swim, dust puffs. The progression (pit depth,
   collector descent, plume spread) advances with actRound, so the
   picture changes as the class argues even when nothing is clicked.
------------------------------------------------------------------- */

/* a figure whose posture is its need: 0 starved, 4 fully met */
const stakeFig = (x, y, need, col = C.ink, s = 1) => {
  const pose = need <= 0 ? "walkaway" : need === 1 ? "sad" : need >= 4 ? "cheer" : need >= 3 ? "armsup" : "stand";
  const cls = need >= 4 ? "anim-hop" : need <= 0 ? "anim-drift" : "";
  return fig(x, y, s, pose, need <= 0 ? "#9b9280" : col, cls);
};

/* the six interests, drawn along the ground in a fixed order so the two
   acts are visibly the same line-up */
const stakeLine = (needs, y, xs, cols) =>
  STAKEHOLDERS.map((st, i) => stakeFig(xs[i], y, (needs || {})[st.id] ?? 2, cols[i], 0.86)).join("");

const SX = [72, 162, 252, 548, 638, 728];
const SC = [C.ink, C.yellow, C.blue, C.red, C.teal, "#7a5ea8"];

const ART = {
  title: (v, p = {}) => `
    ${sun(680, 86)}${cloud(220, 118, 1.1)}${cloud(470, 76, 0.85)}${bird(120, 160)}
    ${hill("M0 300c120-56 220-44 320 0s260 40 480-28V500H0z", C.sand)}
    ${P("M0 362c150 30 300-10 460 14s240 10 340-16", C.ink, 4)}
    ${rasp(96, 322, 1.2)}${rasp(190, 336, 0.9)}${oak(300, 320, 0.8)}
    <g>
      <path d="M470 500V392c0-28 24-50 54-50h120c30 0 54 22 54 50v108z" fill="#2b2622" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      ${nodules(452, 6, 5)}${fish(506, 424, 0.7)}${fish(606, 468, 0.6, C.rose)}
    </g>
    ${fig(150, 318, 1.15, "stand")}${fig(210, 330, 1, "point")}
    ${truck(600, 300, 0.8)}`,

  /* ------------------------------------------------ ACT ONE: the valley */
  jadar: (v, p = {}) => {
    const r = Math.min(4, p.actRound || 0);
    const needs = p.needs || {};
    const dead = v === "C" || p.flagDead;
    const pit = dead ? 0 : r;                      // the hole deepens each round
    const drop = 12 + pit * 19;                    // shallow enough to keep the line-up clear
    const on = new Set(p.chosen || []);
    const years = p.years;                          // live slider in round 2
    const rushing = years != null && years <= 4;
    const siteOk = (needs.site ?? 2) >= 3;
    const sciOk = (needs.science ?? 2) >= 3;
    return `
      ${sun(690, 78)}${cloud(230, 104, 1.05)}${cloud(500, 70, 0.8)}${bird(130, 146)}
      ${hill("M0 318c140-48 240-36 340 4s250 30 460-20V500H0z", C.sand)}

      <!-- the seam is always drawn: the thing everybody is arguing over -->
      <g opacity="0.9">
        ${P("M60 408c140-18 250 10 360-4s240-16 380 6", "#f4f0e2", 16)}
        ${P("M60 408c140-18 250 10 360-4s240-16 380 6", C.ink, 3)}
      </g>

      <!-- the river: it breathes, and it is downstream of everything -->
      ${P("M0 348c120 16 190-14 300 2s250 26 500-6", C.blue, 7, "none").replace("<path ", '<path class="anim-drift" ')}
      ${sciOk ? `${P("M150 348v-54", C.teal, 4)}${CIRC(150, 286, 9, "#fff", C.teal, 4)}` : ""}

      ${pit > 0 ? `
        <path d="M${356 - pit * 8} 322q${140 + pit * 14} ${drop * 2} ${280 + pit * 16} 0z"
          fill="${C.dust}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
        ${pit >= 2 ? puff(470, 290, 1 + pit * 0.08) : ""}
        ${digger(300, 302, 0.78, true)}
        ${pit >= 3 ? truck(690, 302, 0.62) : ""}` : `
        ${rasp(390, 326, 1)}${rasp(470, 332, 0.9)}${rasp(550, 326, 1.05)}${rasp(630, 334, 0.95)}`}

      ${on.has("drystack") ? `<path d="M300 500v-40h200l-18-30H318z" fill="${C.dust}" stroke="${C.ink}" stroke-width="5"/>` : ""}
      ${on.has("bond") ? `<g><rect x="32" y="430" width="74" height="48" rx="5" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5"/>${P("M32 452h74", C.ink, 4)}</g>` : ""}
      ${rushing ? `<g class="anim-puff">${puff(400, 250, 1.3)}</g>` : ""}

      ${siteOk ? `${rasp(40, 330, 1.1)}${rasp(792, 336, 1)}` : `${rasp(40, 330, 1.1)}`}
      ${stakeLine(needs, 482, SX, SC)}
      ${years != null ? tag(400, 150, `${years} YEARS TO FIRST ORE`, C.ink, 300) : ""}`;
  },

  /* ------------------------------------------------ ACT TWO: the floor */
  /* Identical composition to the valley, with the water raised. Same
     six figures, same order, same positions. */
  lagoon: (v, p = {}) => {
    const r = Math.min(4, p.actRound || 0);
    const needs = p.needs || {};
    const closed = v === "B" || p.flagClosed;
    const area = p.area;                            // live slider in round 6
    const on = new Set(p.chosen || []);
    const reach = closed ? 0 : (area != null ? area / 100 : r / 4);
    const sciOk = (needs.science ?? 2) >= 3;
    const siteOk = (needs.site ?? 2) >= 3;
    return `
      <rect width="800" height="500" fill="#bcd8e6"/>
      ${sun(706, 72)}${cloud(190, 72, 0.9)}${cloud(430, 58, 0.75)}${bird(120, 126)}

      <!-- surface -->
      <path d="M0 300h800v200H0z" fill="${C.blue}" stroke="${C.ink}" stroke-width="5"/>
      ${P("M0 330c120 20 220-16 340 4s260 24 460-8", "#6fa8cf", 6, "none").replace("<path ", '<path class="anim-drift" ')}
      ${atoll(120, 300, 0.95)}
      <circle cx="120" cy="300" r="${closed ? 320 : 118}" fill="none"
        stroke="${closed ? C.teal : "#eaf4fb"}" stroke-width="5" stroke-dasharray="18 14" opacity=".85"/>

      <!-- the floor: the same seam, four kilometres lower -->
      <path d="M0 418h800v82H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
      ${nodules(410, 18, 6)}

      ${reach > 0 ? `
        ${ship(400 + 0, 300, 0.9, C.blue, "anim-bob")}
        ${P(`M400 318V${392}`, "#9fd8cf", 4)}
        ${collector(400, 400, 0.9)}
        <g class="anim-drift">${plumeCloud(250, 372, 0.8 + reach, reach > 0.6)}</g>
        ${reach > 0.5 ? ship(640, 300, 0.75, C.red, "anim-bob") : ""}` : `
        ${ship(400, 300, 0.85, C.teal, "anim-bob")}${P("M400 318v70", "#9fd8cf", 3)}${CIRC(400, 396, 10, "#fff", C.ink, 4)}`}

      ${on.has("observers") ? `${fig(470, 300, 0.7, "point", C.teal)}` : ""}
      ${on.has("seabaseline") || sciOk ? `${P("M690 418v-48", C.teal, 4)}${CIRC(690, 362, 9, "#fff", C.teal, 4)}` : ""}
      ${siteOk ? `${fish(200, 360, 0.9)}${fish(560, 350, 0.8, C.rose)}${fish(300, 392, 0.7, C.yellow)}` : `${fish(620, 346, 0.7, C.rose)}`}

      <!-- a plank under each of the six, so the line-up stands on a jetty
           rather than on the water -->
      ${SX.map((x) => `<g>${P(`M${x - 28} 300h56`, C.ink, 6)}${P(`M${x - 20} 300v14M${x + 20} 300v14`, C.ink, 4)}</g>`).join("")}
      ${stakeLine(needs, 296, SX, SC)}
      ${area != null ? tag(400, 150, `${area}% OF THE OPEN ZONE`, C.ink, 300) : ""}`;
  },

  endGood: (v, p = {}) => `
    <rect width="800" height="500" fill="#eef3e6"/>
    ${sun(690, 80)}${cloud(240, 108, 1)}${bird(140, 150)}${bird(210, 178, 0.8)}
    ${hill("M0 316c130-50 230-40 330 0s250 36 470-20V500H0z", C.sand)}
    ${P("M0 352c120 16 190-12 300 2s250 22 500-6", C.blue, 7, "none").replace("<path ", '<path class="anim-drift" ')}
    ${rasp(90, 330, 1.1)}${rasp(170, 338, 0.95)}${oak(300, 318, 0.85)}${atoll(640, 330, 0.9)}
    ${stakeLine(p.needs, 440, SX, SC)}`,

  endMixed: (v, p = {}) => `
    <rect width="800" height="500" fill="#f1efe4"/>
    ${cloud(220, 96, 1.05)}${cloud(560, 72, 0.85)}${sun(700, 78)}
    ${hill("M0 320c140-44 240-32 340 2s250 28 460-18V500H0z", "#ded8c4")}
    ${P("M0 352c120 14 190-12 300 2s250 22 500-6", "#9db9cf", 6, "none").replace("<path ", '<path class="anim-drift" ')}
    <path d="M330 322q150 90 320 0z" fill="#c9c2ae" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    ${rasp(100, 332, 1)}${atoll(690, 334, 0.8)}
    ${stakeLine(p.needs, 452, SX, SC)}`,

  endBad: (v, p = {}) => `
    <rect width="800" height="500" fill="#efe6dc"/>
    ${cloud(260, 86, 1.1)}${cloud(600, 66, 0.9)}${sun(86, 84, C.red)}
    ${hill("M0 324h800v176H0z", "#d6cab2")}
    <path d="M160 324q230 150 480 0z" fill="#b9a98c" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <g class="anim-puff">${puff(420, 290, 1.4)}</g>
    ${P("M0 356c120 14 190-12 300 2s250 22 500-6", "#a9a08c", 6)}
    ${stakeLine(p.needs, 456, SX, SC)}`,
};

function drawScene(key, variant = "base", params = {}) {
  const fn = ART[key] || ART.title;
  return `
  <svg viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" class="scene-svg" role="img" aria-label="Scene illustration">
    <defs>
      <filter id="wob" x="-6%" y="-6%" width="112%" height="112%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <g filter="url(#wob)" font-family="'Inter', system-ui, sans-serif">${fn(variant, params)}</g>
  </svg>`;
}
