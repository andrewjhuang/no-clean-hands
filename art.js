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

const puff = (x, y, s = 1, fill = "#fff") =>
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
const ART = {
  title: () => `
    ${sun(680, 86)}${cloud(220, 118, 1.1)}${cloud(470, 76, 0.85)}${bird(120, 160)}
    ${hill("M0 300c120-56 220-44 320 0s260 40 480-28V500H0z", C.sand)}
    ${P("M0 362c150 30 300-10 460 14s240 10 340-16", C.ink, 4)}
    ${sage(96, 322, 1.2)}${sage(190, 336, 0.9)}${sage(690, 318, 1.1)}
    ${oak(300, 320, 0.8)}
    <g>
      <path d="M470 500V392c0-28 24-50 54-50h120c30 0 54 22 54 50v108z" fill="#2b2622" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      ${nodules(452, 6, 5)}${fish(506, 424, 0.7)}${fish(606, 468, 0.6, C.rose)}
    </g>
    ${fig(150, 318, 1.15, "stand")}${fig(210, 330, 1, "point")}
    ${truck(600, 300, 0.8)}`,

  /* 1. Thacker Pass — stakeholders. Satisfied people stay; the rest leave. */
  thacker: (v, p = {}) => {
    const won = new Set(p.chosen || []);
    const locked = !!p.locked;
    const dug = locked ? won.has("company") || won.has("county") : false;
    const people = [
      { id: "tribe",   x: 120, pose: won.has("tribe") ? "cheer" : locked ? "sad" : "point", col: C.red },
      { id: "county",  x: 196, pose: won.has("county") ? "cheer" : locked ? "walkaway" : "stand", col: C.ink },
      { id: "company", x: 272, pose: won.has("company") ? "cheer" : locked ? "walkaway" : "stand", col: C.blue },
      { id: "state",   x: 348, pose: won.has("state") ? "cheer" : locked ? "shrug" : "stand", col: C.teal },
    ];
    return `
      ${sun(690, 78)}${cloud(230, 110, 1.1)}${cloud(470, 72, 0.85)}${bird(120, 150)}
      ${hill("M0 316c130-62 230-50 330-4s250 42 470-26V500H0z", C.sand)}
      ${dug ? P("M430 330q110 86 230 0", C.ink, 5, C.dust) : ""}
      ${sage(60, 332, 1.3)}${sage(700, 300, 1.2)}
      ${dug ? digger(560, 298, 1.05, true) + puff(470, 296, 1.1) : digger(600, 296, 1, false)}
      ${people.map((q) => fig(q.x, 332, 1.2, q.pose, q.col, won.has(q.id) ? "anim-hop" : "")).join("")}
      ${won.has("tribe") ? sign(150, 286, 120, 32, C.teal, "SHARED", 17) : ""}`;
  },

  /* 2. Rhyolite Ridge — a live slider. The fence and the flowers MOVE. */
  buckwheat: (v, p = {}) => {
    const keep = p.keep == null ? 50 : p.keep;          // % of habitat left alone
    const fenceX = 150 + (keep / 100) * 300;             // fence slides right as you protect more
    const spots = [[170, 352], [214, 344], [128, 356], [258, 350], [300, 346], [338, 354], [382, 348], [424, 352]];
    return `
      ${sun(680, 76)}${cloud(200, 104, 1)}${bird(380, 120, 0.9)}
      ${hill("M0 340c160-40 260-30 360 6s280 20 440-30V500H0z", C.sand)}
      <g class="mine-mass" transform="translate(${fenceX} 0)">
        ${P("M0 300h640v200H0z", C.ink, 5, C.dust)}
        ${truck(120, 330, 0.85)}
      </g>
      <g class="fence">
        ${P(`M${fenceX} 300v70`, C.teal, 6)}
        ${P(`M90 364h${Math.max(0, fenceX - 90)}`, C.teal, 5)}
      </g>
      ${spots.map(([fx, fy], i) =>
        flower(fx, fy, 1.25, fx < fenceX - 10, "fl")).join("")}
      ${fig(70, 362, 1.1, keep > 55 ? "cheer" : keep > 25 ? "crouch" : "sad", C.teal)}
      ${TXT(Math.min(fenceX + 70, 700), 290, keep >= 95 ? "NO MINE" : keep <= 5 ? "FULL MINE" : `${100 - keep}% MINED`, 20)}`;
  },

  /* 3. Oak Flat — choice, but the crater is the whole argument */
  oakflat: (v) => {
    const gone = v === "A";
    return `
      ${sun(90, 82, C.red)}${cloud(300, 96, 0.9)}
      ${hill("M0 300h800v200H0z", C.sand)}${P("M0 300h800", C.ink, 5)}
      ${gone
        ? `<path d="M140 300q240 190 480 0z" fill="${C.dust}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>${puff(380, 330, 1.3, "#d8cdb5")}`
        : `<g opacity="0.65"><path d="M180 320q210 150 420 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="14 12"/>
           <path d="M300 420h200v60h-200z" fill="#b9a98c" stroke="${C.ink}" stroke-width="4"/></g>`}
      ${oak(390, 300, 1.1, !gone)}
      ${gone ? fig(660, 300, 1.15, "sad")
             : `${fig(290, 300, 1, "stand")}${fig(338, 300, 1, "armsup", C.teal)}${fig(458, 300, 1, "stand")}${fig(506, 300, 1, "stand")}`}
      ${v === "C" ? `${P("M300 420h200v60h-200z", C.ink, 4, C.teal)}${TXT(400, 458, "BACKFILL", 22)}` : ""}`;
  },

  /* 4. The crash — a live budget. Coin stacks rise as you allocate. */
  crash: (v, p = {}) => {
    const a = p.alloc || [0, 0, 0];
    const spent = a[0] + a[1] + a[2];
    return `
      ${cloud(150, 86, 1)}${cloud(650, 62, 0.8)}
      ${hill("M0 392h800v108H0z", C.sand)}
      ${chart(58, 372, a[0] + a[2] >= 4)}
      ${coins(346, 372, a[0], C.yellow, "floor price")}
      ${coins(468, 372, a[1], C.teal, "tariffs")}
      ${coins(590, 372, a[2], C.blue, "refining")}
      ${spent === 0 ? TXT(470, 220, "nothing spent yet", 24) : ""}
      ${fig(722, 392, 1.25, spent >= 5 ? "cheer" : spent >= 2 ? "stand" : "sad")}`;
  },

  /* 5. The deep */
  deep: (v) => `
    <rect width="800" height="500" fill="${C.deep}"/>
    ${P("M0 120c120 30 220-20 340 6s260 34 460-10", "#2d5a85", 6)}
    ${fish(90, 120, 0.95)}${fish(640, 90, 0.85, C.rose)}
    <path d="M0 400h800v100H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
    ${nodules(392, 18, 2)}
    ${v === "C"
      ? `${ship(400, 150, 1, C.teal)}${P("M400 176v120", "#9fd8cf", 4)}
         <rect x="300" y="296" width="200" height="56" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${TXT(400, 334, "PAUSED", 26)}`
      : `${collector(400, 356, 1)}${plumeCloud(180, 330, 0.9, v === "B")}`}
    ${v === "B" ? ship(140, 150, 0.8, C.red) : ""}
    ${v === "A" ? `${ship(140, 150, 0.8, C.blue)}${ship(640, 160, 0.7, C.teal)}` : ""}
    ${v === "base" ? `${ship(400, 140, 0.9, C.blue)}${P("M400 166v180", "#9fd8cf", 3)}` : ""}`,

  /* 6a. The plume — live slider: how deep you release the sediment */
  plume: (v, p = {}) => {
    const depth = p.depth == null ? 20 : p.depth;        // % of water column down
    const y = 150 + (depth / 100) * 200;
    const spread = 1.5 - (depth / 100);                   // shallower = wider drift
    return `
      <rect width="800" height="500" fill="${C.deep}"/>
      <path d="M0 400h800v100H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
      ${nodules(392, 14, 4)}
      ${collector(400, 356, 0.95)}
      ${P(`M400 356V${y}`, "#9fd8cf", 4)}
      ${plumeCloud(120, y, spread, depth < 40)}
      ${fish(90, 160, 0.95)}${depth < 45 ? "" : fish(680, 180, 0.85, C.rose)}
      ${TXT(400, y - 36, depth < 35 ? "SHALLOW RELEASE" : depth < 70 ? "MID WATER" : "NEAR SEAFLOOR", 20, "#cfe8ec")}`;
  },

  /* 6b. The vacuum */
  vacuum: (v) => `
    <rect width="800" height="500" fill="#bcd8e6"/>
    ${P("M0 300h800v200H0z", C.ink, 5, C.blue)}
    ${P("M0 330c120 20 220-16 340 4s260 24 460-8", "#6fa8cf", 6)}
    ${ship(570, 268, 0.9, C.red)}
    ${v === "B" ? `${ship(300, 276, 0.8, C.teal)}${P("M330 250h190", C.ink, 4)}` : ""}
    <g><path d="M60 300h190v-10H60z" fill="#d9c49a" stroke="${C.ink}" stroke-width="5"/>
       <path d="M78 300v40M232 300v40" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g>
    ${fig(140, 290, 1.15, v === "A" ? "stand" : "point")}
    ${v === "A" ? sign(206, 258, 130, 34, "#fff", "WAIT", 19) : ""}
    ${sun(700, 80)}${cloud(420, 110, 0.9)}`,

  endGood: () => `
    ${sun(690, 80)}${cloud(240, 108, 1)}${bird(140, 150)}
    ${hill("M0 316c130-50 230-40 330 0s250 36 470-20V500H0z", C.sand)}
    ${oak(260, 320, 0.95)}${flower(430, 332, 1.3)}${sage(620, 300, 1.1)}
    ${fig(120, 326, 1.2, "cheer", C.teal, "anim-hop")}${fig(180, 332, 1.1, "stand")}
    ${truck(640, 300, 0.7)}
    <g>${P("M470 500V400c0-24 20-44 46-44h110c26 0 46 20 46 44v100z", C.ink, 5, "#2b2622")}
       ${fish(520, 430, 0.7)}${nodules(466, 5, 1)}</g>`,

  endBad: () => `
    ${sun(690, 80, C.red)}
    ${hill("M0 330h800v170H0z", C.dust)}
    <path d="M120 330q260 170 520 0z" fill="#b5a489" stroke="${C.ink}" stroke-width="5"/>
    ${puff(360, 300, 1.4, "#d8cdb5")}
    ${fig(80, 330, 1.2, "sad")}${truck(700, 318, 0.75, C.grey)}`,

  endMixed: () => `
    ${sun(690, 84)}${cloud(260, 104, 0.9)}
    ${hill("M0 324c130-40 230-30 330 4s250 26 470-16V500H0z", C.sand)}
    ${oak(250, 326, 0.85)}${flower(420, 338, 1.1, false)}
    <path d="M520 326q90 60 190 0z" fill="${C.dust}" stroke="${C.ink}" stroke-width="5"/>
    ${fig(120, 330, 1.15, "stand")}${fig(176, 336, 1.05, "sad")}
    ${truck(660, 310, 0.7)}`,
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
    <g filter="url(#wob)" font-family="'Shantell Sans', system-ui, sans-serif">${fn(variant, params)}</g>
  </svg>`;
}
