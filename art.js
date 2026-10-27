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

  /* 1. The Jadar valley — raspberries over the only jadarite on Earth.
        The seam is drawn under the soil the whole time; what changes is
        how much of the valley is still above it. */
  jadar: (v, p = {}) => {
    const open = v === "A";
    const surveyed = v === "B";
    const held = v === "C";
    return `
      ${sun(690, 78)}${cloud(230, 104, 1.05)}${cloud(500, 70, 0.8)}${bird(130, 146)}
      ${hill("M0 318c140-48 240-36 340 4s250 30 460-20V500H0z", C.sand)}
      <g opacity="0.9">
        ${P("M60 408c140-18 250 10 360-4s240-16 380 6", "#f4f0e2", 16)}
        ${P("M60 408c140-18 250 10 360-4s240-16 380 6", C.ink, 3)}
        ${TXT(640, 452, "jadarite", 17, "#8a8172")}
      </g>
      ${P("M0 348c120 16 190-14 300 2s250 26 500-6", C.blue, 7)}
      ${TXT(96, 336, "DRINA", 15, C.blue)}
      ${open
        ? `<path d="M300 322q170 150 380 0z" fill="${C.dust}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
           ${puff(470, 290, 1.1)}${digger(560, 300, 0.9, true)}${truck(690, 300, 0.7)}`
        : surveyed
        ? `${[340, 420, 500, 580, 660].map((x) => P(`M${x} 322v-34`, C.red, 4)).join("")}
           ${[340, 420, 500, 580, 660].map((x) => CIRC(x, 284, 6, C.red, C.ink, 3)).join("")}
           ${tag(500, 244, "UNDER ASSESSMENT", C.yellow, 220)}`
        : `${rasp(360, 326, 1)}${rasp(440, 332, 0.9)}${rasp(520, 326, 1.05)}${rasp(610, 334, 0.95)}`}
      ${held ? `${doc(690, 150, "CLAIM FILED")}` : ""}
      ${rasp(120, 332, 1.1)}${rasp(196, 340, 0.95)}
      ${fig(150, 330, 1.15, held ? "cheer" : open ? "sad" : "stand")}
      ${fig(214, 338, 1.0, open ? "walkaway" : "point", C.teal)}
      ${!open && !surveyed ? "" : rig(740, 318, 0.8)}`;
  },

  /* 2. The Drina — conditions you attach become things that exist.
        Live: the picture gains hardware as the room picks cards. */
  drina: (v, p = {}) => {
    const on = new Set(p.chosen || []);
    const dry = on.has("drystack");
    return `
      ${cloud(200, 80, 1)}${cloud(620, 64, 0.8)}${bird(130, 130)}
      ${hill("M0 300h800v200H0z", "#cfe0d2")}
      <path d="M0 356c120 22 200-18 320 4s250 30 480-8V500H0z" fill="${C.blue}" stroke="${C.ink}" stroke-width="5"/>
      ${P("M0 392c140 18 230-12 350 6s240 20 450-4", "#8fc0e0", 5)}
      ${TXT(76, 476, "DRINA", 18, "#eaf4fb")}
      ${dry
        ? `<path d="M300 300h260l-26-54H326z" fill="${C.dust}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
           ${P("M326 272h208", C.ink, 3)}${tag(430, 214, "DRY STACK", C.teal, 150)}`
        : `<path d="M296 300h268v-70c0-10-10-18-22-18H318c-12 0-22 8-22 18z" fill="#b9a98c" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
           ${P("M300 246h260", "#8d7f66", 10)}${tag(430, 186, "IMPOUNDMENT", C.red, 180)}`}
      ${on.has("nodischarge")
        ? `<g>${P("M564 262q70 0 70 40t-70 34", C.teal, 6)}${P("M620 320l14 16 14-16", C.teal, 5)}${tag(672, 232, "CLOSED", C.teal, 108)}</g>`
        : `${P("M564 268q60 10 86 74", C.red, 6)}${P("M646 336l4 22 16-14", C.red, 5)}`}
      ${on.has("baseline") ? `<g>${P("M150 388v-78", C.ink, 5)}${P("M134 324h32M134 344h32M134 364h32", C.ink, 3)}
          ${CIRC(150, 302, 10, "#fff", C.teal, 4)}${tag(150, 262, "GAUGED", C.teal, 108)}</g>` : ""}
      ${on.has("sanu") ? `<g>${fig(694, 300, 0.85, "stand", C.blue)}${fig(736, 300, 0.85, "point", C.blue)}
          ${tag(716, 232, "REVIEW PANEL", C.blue, 164)}</g>` : ""}
      ${on.has("bond") ? `<g><rect x="36" y="414" width="86" height="56" rx="6" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5"/>
          ${P("M36 440h86", C.ink, 4)}${CIRC(79, 440, 7, "#fff", C.ink, 4)}${TXT(79, 406, "BOND", 15)}</g>` : ""}
      ${(p.chosen || []).length === 0 && p.locked ? TXT(430, 120, "nothing attached", 24) : ""}`;
  },

  /* 3. The loop — RMI's six solutions as a ring that closes.
        Funded segments ink in. This is the only picture in the game
        where the good outcome is a shape being completed. */
  loop: (v, p = {}) => {
    const chosen = new Set((p.chosen || []).map((id) => String(id).replace(/^L2?_/, "")));
    const cx = 400, cy = 252, r = 132;
    const pt = (a, rad = r) => [cx + rad * Math.cos((a * Math.PI) / 180), cy + rad * Math.sin((a * Math.PI) / 180)];
    const segs = LOOP.map((s, i) => {
      const a0 = -90 + i * 60 + 5, a1 = -90 + (i + 1) * 60 - 5;
      const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
      const [lx, ly] = pt((a0 + a1) / 2, r + 36);
      const live = chosen.has(s.id);
      return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"
            fill="none" stroke="${live ? C.teal : "#c6bda8"}" stroke-width="${live ? 16 : 9}" stroke-linecap="round"/>
          ${TXT(lx, ly + 7, s.letter, live ? 26 : 22, live ? C.ink : "#9b9280")}`;
    }).join("");
    const n = chosen.size;
    return `
      <rect width="800" height="500" fill="#f1efe4"/>
      ${segs}
      <g>
        <rect x="${cx - 46}" y="${cy - 34}" width="92" height="68" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
        <rect x="${cx - 10}" y="${cy - 44}" width="20" height="12" rx="3" fill="${C.ink}"/>
        ${P(`M${cx - 10} ${cy + 14}l16-30h-10l14-24`, C.yellow, 7)}
      </g>
      ${n >= 4
        ? `${P(`M${cx - 92} ${cy + 108}q92 44 184 0`, C.teal, 5)}${TXT(cx, cy + 150, "the loop is closing", 24, C.teal)}`
        : TXT(cx, cy + 150, n === 0 ? "nothing funded" : `${n} of six funded`, 24, "#8a8172")}
      ${TXT(cx, 70, "MINE ONCE. RECOVER FOREVER.", 20, "#8a8172")}`;
  },

  /* 4. Where the value lands — live slider. At 0 the ore leaves on a
        train; at 100 the plant is in the valley, next to the school. */
  refinery: (v, p = {}) => {
    const r = p.refine == null ? 50 : p.refine;
    const stacks = Math.round((r / 100) * 3);
    return `
      ${sun(700, 76)}${cloud(240, 94, 1)}
      ${hill("M0 322c140-40 240-30 340 2s250 26 460-16V500H0z", C.sand)}
      ${P("M0 350c120 14 190-12 300 2s250 22 500-6", C.blue, 6)}
      <g>
        <rect x="286" y="236" width="196" height="86" fill="#ded3b8" stroke="${C.ink}" stroke-width="5"/>
        ${P("M286 236l98-44 98 44", C.ink, 5)}
        ${Array.from({ length: stacks }, (_, i) =>
          `<rect x="${330 + i * 54}" y="${150}" width="26" height="90" fill="#cfc7b4" stroke="${C.ink}" stroke-width="5"/>
           ${puff(343 + i * 54, 132, 0.8)}`).join("")}
        ${TXT(384, 300, r >= 75 ? "REFINERY" : r >= 25 ? "PRIMARY" : "LOADOUT", 20)}
      </g>
      ${r < 50
        ? `<g>${P("M560 318h210", C.ink, 5)}
            ${[0, 1, 2].map((i) => `<rect x="${566 + i * 68}" y="282" width="56" height="30" rx="4" fill="${C.dust}" stroke="${C.ink}" stroke-width="5"/>`).join("")}
            ${P("M770 300l22-10-22-10", C.ink, 5)}${TXT(666, 262, "CONCENTRATE, OUT", 17, "#8a8172")}</g>`
        : `<g>${P("M600 322v-46", C.teal, 5)}${CIRC(600, 262, 16, "#fff", C.teal, 5)}${TXT(600, 269, "€", 20, C.teal)}
            ${TXT(662, 232, "VALUE STAYS", 17, C.teal)}</g>`}
      ${P("M96 322v-42h58v42", C.ink, 5)}${TXT(125, 268, "SCHOOL", 14)}
      ${fig(190, 324, 1.05, r >= 75 ? "point" : "stand")}
      ${rasp(690, 330, 0.9)}`;
  },

  /* 5. Care and maintenance — the worst picture in the game is the one
        where nothing is happening. */
  parked: (v, p = {}) => `
    ${cloud(220, 92, 1.05)}${cloud(560, 70, 0.85)}
    ${hill("M0 320c140-44 240-32 340 2s250 28 460-18V500H0z", "#ded8c4")}
    ${P("M0 350c120 14 190-12 300 2s250 22 500-6", "#9db9cf", 6)}
    <g opacity="0.75">${digger(300, 318, 0.95, false)}</g>
    <path d="M250 318q70-54 142 0z" fill="#c9c2ae" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    ${[120, 180, 240, 300, 360, 420].map((x) => P(`M${x} 318v-50`, "#9b9280", 4)).join("")}
    ${P("M110 282h320", "#9b9280", 4)}
    ${sign(470, 236, 240, 64, "#fff", v === "B" ? "FOUR YEARS" : v === "C" ? "STATE HELD" : "CARE & MAINTENANCE", 19)}
    ${v === "B" ? `${CIRC(590, 160, 34, "#fff", C.ink, 5)}${P("M590 160v-20M590 160l16 10", C.ink, 4)}` : ""}
    ${v === "C" ? `${P("M676 318V180h84l-16 22 16 22h-84", C.blue, 5)}` : ""}
    ${rasp(640, 330, 0.9)}${rasp(718, 336, 1)}
    ${fig(150, 326, 1.15, v === "B" ? "stand" : "sad")}
    ${TXT(400, 460, v === "B" ? "a clock, at last" : v === "C" ? "bought at the bottom" : "the fifth year of not knowing", 22, "#8a8172")}`,

  /* 6. Marae Moana — the park is the whole zone. The ring is the part
        that is actually closed. */
  lagoon: (v, p = {}) => {
    const closed = v === "B";
    const blocks = v === "C";
    return `
      <rect width="800" height="500" fill="#bcd8e6"/>
      ${sun(706, 72)}${cloud(190, 72, 0.9)}${bird(120, 126)}
      <circle cx="330" cy="300" r="${closed ? 300 : 150}" fill="${closed ? "#a6cfd8" : "#9ec8dc"}"
        stroke="${closed ? C.teal : C.ink}" stroke-width="5" stroke-dasharray="18 14"/>
      ${atoll(330, 300, 1)}
      ${TXT(330, 384, closed ? "CLOSED — WHOLE ZONE" : "50 NAUTICAL MILES", 17, C.ink)}
      ${blocks
        ? `${[0, 1, 2, 3].map((i) => `<rect x="${540 + (i % 2) * 110}" y="${150 + Math.floor(i / 2) * 110}" width="94" height="94"
             fill="none" stroke="${i === 0 ? C.teal : "#7ba7c4"}" stroke-width="5" stroke-dasharray="${i === 0 ? "" : "12 10"}"/>`).join("")}
           ${TXT(650, 400, "BLOCK BY BLOCK", 18, C.ink)}`
        : closed
        ? TXT(650, 220, "no licences", 22, C.teal)
        : `${ship(600, 300, 0.9, C.blue)}${ship(720, 320, 0.75, C.red)}
           ${TXT(660, 420, "THE OTHER 84%", 19, C.ink)}`}
      ${fig(330, 266, 0.9, closed ? "shrug" : "point")}`;
  },

  /* 7. The abyss — five thousand metres down, and a date. */
  abyss: (v) => `
    <rect width="800" height="500" fill="${C.deep}"/>
    ${P("M0 108c120 28 220-18 340 6s260 32 460-10", "#2d5a85", 6)}
    ${fish(96, 112, 0.9)}${fish(660, 86, 0.8, C.rose)}
    <path d="M0 392h800v108H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
    ${nodules(384, 20, 6)}
    ${v === "C"
      ? `${ship(640, 150, 0.85, C.grey, "")}${P("M600 150l-44-16", C.grey, 4)}${TXT(400, 250, "SURVEY ENDED", 26, "#cfe8ec")}`
      : v === "B"
      ? `${ship(400, 140, 0.9, C.teal, "")}${P("M400 162v190", "#9fd8cf", 3)}${CIRC(400, 360, 13, "#fff", C.ink, 4)}
         ${TXT(400, 250, "DECIDE NOW", 26, "#cfe8ec")}`
      : `${ship(400, 142, 0.9, C.blue, "")}${P("M400 164v186", "#9fd8cf", 3)}${CIRC(400, 358, 12, "#fff", C.ink, 4)}
         <rect x="306" y="206" width="188" height="62" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="5"/>${TXT(400, 250, v === "A" ? "2032" : "SURVEYING", 28)}`}
    ${TXT(400, 466, "nodules grow millimetres per million years", 18, "#8fb6cc")}`,

  /* 8. Whose flag — three doors, each held open by somebody. */
  flags: (v) => {
    const pole = (x, col, label) => `<g>${P(`M${x} 330V170`, C.ink, 5)}
      <path d="M${x} 172h86v46h-86z" fill="${col}" stroke="${C.ink}" stroke-width="5"/>${TXT(x + 43, 150, label, 15)}</g>`;
    return `
      <rect width="800" height="500" fill="#bcd8e6"/>
      ${sun(708, 74)}${cloud(200, 84, 0.9)}
      <path d="M0 330h800v170H0z" fill="${C.blue}" stroke="${C.ink}" stroke-width="5"/>
      ${atoll(400, 330, 1.25)}
      ${v === "A" ? `${pole(150, C.red, "RESEARCH")}${pole(560, C.yellow, "CAPITAL")}${pole(680, C.teal, "PASSPORTS")}` : ""}
      ${v === "B" ? `${pole(560, C.teal, "ONE PARTNER")}
        <g><rect x="120" y="214" width="150" height="96" rx="8" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5"/>
        ${P("M120 254h150", C.ink, 4)}${TXT(195, 292, "FUND", 22)}${TXT(195, 196, "AUDITED", 15, C.teal)}</g>` : ""}
      ${v === "C" ? TXT(400, 200, "NO AGREEMENTS", 26) : ""}
      ${fig(400, 296, 1.1, v === "B" ? "stand" : v === "C" ? "shrug" : "point")}
      ${fish(90, 440, 0.8)}${fish(700, 420, 0.7, C.rose)}`;
  },

  /* 9. The number nobody wants — a cobalt forecast, falling. */
  ledger: (v) => `
    <rect width="800" height="500" fill="#f1efe4"/>
    <g>
      ${P("M120 390h560", C.ink, 5)}${P("M120 390V120", C.ink, 5)}
      ${P("M140 170q140 24 260 108t260 96", C.red, 7)}
      ${CIRC(660, 374, 9, C.red, C.ink, 4)}
      ${TXT(300, 150, "COBALT PER BATTERY", 19, "#8a8172")}
      ${TXT(690, 410, "2030", 16, "#8a8172")}
      ${TXT(150, 412, "2019", 16, "#8a8172")}
      ${P("M470 300l-22 26 30 4", C.red, 4)}
      ${TXT(560, 268, "÷3.6", 24, C.red)}
    </g>
    ${v === "A"
      ? `<g>${doc(140, 440, "PUBLISHED")}${TXT(400, 466, "whatever it says", 20, C.teal)}</g>`
      : v === "B"
      ? `<g><rect x="96" y="414" width="150" height="64" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="5"/>
          ${P("M96 414l75 40 75-40", C.ink, 4)}${TXT(171, 500, "", 1)}${TXT(400, 466, "advice to government", 20, "#8a8172")}</g>`
      : TXT(400, 466, "nobody checked", 20, "#8a8172")}`,

  endGood: () => `
    <rect width="800" height="500" fill="#eef3e6"/>
    ${sun(690, 80)}${cloud(240, 108, 1)}${bird(140, 150)}
    ${hill("M0 316c130-50 230-40 330 0s250 36 470-20V500H0z", C.sand)}
    ${oak(260, 320, 0.95)}${flower(430, 332, 1.3)}${sage(620, 300, 1.1)}
    ${fig(120, 326, 1.2, "cheer", C.teal, "anim-hop")}${fig(180, 332, 1.1, "stand")}
    ${truck(640, 300, 0.7)}
    <g>${P("M470 500V400c0-24 20-44 46-44h110c26 0 46 20 46 44v100z", C.ink, 5, "#2b2622")}
       ${fish(520, 430, 0.7)}${nodules(466, 5, 1)}</g>`,

  endBad: () => `
    <rect width="800" height="500" fill="#f0e4d8"/>
    ${sun(690, 80, C.red)}
    ${hill("M0 330h800v170H0z", C.dust)}
    <path d="M120 330q260 170 520 0z" fill="#b5a489" stroke="${C.ink}" stroke-width="5"/>
    ${puff(360, 300, 1.4, "#d8cdb5")}
    ${fig(80, 330, 1.2, "sad")}${truck(700, 318, 0.75, C.grey)}`,

  endMixed: () => `
    <rect width="800" height="500" fill="#f1ecdd"/>
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
    <g filter="url(#wob)" font-family="'Inter', system-ui, sans-serif">${fn(variant, params)}</g>
  </svg>`;
}
