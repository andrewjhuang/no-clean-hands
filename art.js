/* ------------------------------------------------------------------
   NO CLEAN HANDS — hand-drawn scene art.

   Everything here is composed from a handful of primitives so a scene
   can MUTATE when a choice lands: the same drawing gains a crater, loses
   a flower, sprouts a plume. Each scene function takes a variant key
   ("base" before the decision, then the chosen option's key).

   Drawn, not generated: thick ink lines, wobble filter, flat spot
   colours, stick people with posture doing the emotional work.
------------------------------------------------------------------- */

const VB = { w: 800, h: 500 };

const C = {
  ink: "#231f20",
  red: "#e4572e",
  teal: "#2a9d8f",
  yellow: "#f2c14e",
  blue: "#3d6cb9",
  deep: "#1b3a5c",
  sand: "#e8d9b5",
  rose: "#d88ca0",
};

/* ---------------------------------------------------------- helpers */
const S = (d, stroke = C.ink, w = 5, fill = "none") =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

const CIRC = (x, y, r, fill = "none", stroke = C.ink, w = 5) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${w}"/>`;

/** a stick person; posture carries the feeling */
function fig(x, y, s = 1, pose = "stand", color = C.ink) {
  const g = (inner) =>
    `<g transform="translate(${x} ${y}) scale(${s})" stroke="${color}" fill="none"
        stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  const head = `<circle cx="0" cy="-46" r="12" fill="none" stroke="${color}" stroke-width="5"/>`;
  const poses = {
    stand:   `${head}<path d="M0-34V-6"/><path d="M0-28l-13 12M0-28l13 12"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    armsup:  `${head}<path d="M0-34V-6"/><path d="M0-28l-15-14M0-28l15-14"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    point:   `${head}<path d="M0-34V-6"/><path d="M0-28l-12 12M0-26l20-6"/><path d="M0-6l-11 22M0-6l11 22"/>`,
    sit:     `${head}<path d="M0-34V-12"/><path d="M0-28l-12 10M0-28l12 10"/><path d="M0-12h16M16-12v14"/><path d="M0-12l-12 6"/>`,
    sad:     `${head}<path d="M2-34l-4 28"/><path d="M1-28l-13 16M1-28l12 16"/><path d="M-2-6l-10 22M-2-6l9 22"/>`,
    crouch:  `${head}<path d="M0-34v14"/><path d="M0-30l-13 8M0-30l13 8"/><path d="M0-20l-12 12 2 12M0-20l12 12-2 12"/>`,
    cheer:   `${head}<path d="M0-34V-6"/><path d="M0-28l-16-16M0-28l16-16"/><path d="M0-6l-13 20M0-6l13 20"/>`,
    walkaway:`${head}<path d="M0-34V-6"/><path d="M0-26l-14 10M0-26l10 14"/><path d="M0-6l-16 20M0-6l12 20"/>`,
  };
  return g(poses[pose] || poses.stand);
}

/** a small placard on a stick */
const sign = (x, y, w, h, fill, text = "") =>
  `<g><path d="M${x} ${y} V${y + 46}" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
   <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
   ${text ? `<text x="${x}" y="${y - h / 2 + 7}" text-anchor="middle" font-size="20" font-family="inherit" font-weight="700" fill="${C.ink}">${text}</text>` : ""}</g>`;

const hill = (d, fill) => S(d, C.ink, 5, fill);

const cloud = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-44 0a18 18 0 0 1 16-18 22 22 0 0 1 42-4 18 18 0 0 1 10 22z" fill="#ffffff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const bird = (x, y, s = 1) =>
  `<path d="M${x} ${y}q${8 * s} ${-7 * s} ${15 * s} 0q${7 * s} ${-7 * s} ${15 * s} 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`;

const sage = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round">
     <path d="M0 0v-16M0-9l-8-8M0-9l8-8M0-16l-5-9M0-16l5-9"/></g>`;

const sun = (x, y, color = C.yellow) =>
  `<g>${CIRC(x, y, 30, color)}${S(`M${x - 48} ${y}h-14M${x + 48} ${y}h14M${x} ${y - 48}v-14M${x - 36} ${y - 36}l-10-10M${x + 36} ${y - 36}l10 10`, C.ink, 4)}</g>`;

const puff = (x, y, s = 1, fill = "#ffffff") =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-30 0a16 16 0 0 1 14-16 20 20 0 0 1 38-4 16 16 0 0 1 8 20z" fill="${fill}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const truck = (x, y, s = 1, color = C.yellow) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-54 0h64l14-26h22l12 26h6v20h-118z" fill="${color}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     ${CIRC(-30, 24, 15, "#ffffff")}${CIRC(34, 24, 15, "#ffffff")}
     ${CIRC(-30, 24, 5, C.ink, C.ink, 2)}${CIRC(34, 24, 5, C.ink, C.ink, 2)}</g>`;

const digger = (x, y, s = 1, armDown = false) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-40 0h58v22h-58z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     ${CIRC(-24, 30, 13, "#ffffff")}${CIRC(4, 30, 13, "#ffffff")}
     <path d="M10 2 ${armDown ? "l40-6 14 30" : "l34-30 26 10"}" fill="none" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
     <path d="${armDown ? "M60 28l16-6 4 16-18 6z" : "M66-20l18-4 6 16-18 6z"}" fill="${C.red}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const flower = (x, y, s = 1, alive = true) =>
  `<g transform="translate(${x} ${y}) scale(${s})" opacity="${alive ? 1 : 0.35}">
     <path d="M0 0v-26" stroke="${C.teal}" stroke-width="5" stroke-linecap="round"/>
     ${alive
       ? `${CIRC(0, -34, 9, C.rose)}${CIRC(-11, -27, 7, C.rose)}${CIRC(11, -27, 7, C.rose)}${CIRC(0, -44, 7, C.rose)}`
       : S("M-8-34l16 14M8-34l-16 14", C.ink, 4)}
     <path d="M0-14l-10-6M0-18l10-7" stroke="${C.teal}" stroke-width="4" stroke-linecap="round"/></g>`;

const oak = (x, y, s = 1, alive = true) =>
  `<g transform="translate(${x} ${y}) scale(${s})" opacity="${alive ? 1 : 0.4}">
     <path d="M0 0v-54" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/>
     <path d="M0-30l-20-14M0-40l20-14" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
     <path d="M-44-66a30 26 0 0 1 24-26 34 30 0 0 1 44 2 28 26 0 0 1 20 26 26 24 0 0 1-26 20h-38a26 22 0 0 1-24-22z"
        fill="${alive ? C.teal : "#cfc7b4"}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const nodules = (y, n = 16, seed = 3) => {
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = 60 + ((i * 97 + seed * 31) % 680);
    const yy = y + ((i * 53) % 26);
    const r = 6 + ((i * 7) % 5);
    out += CIRC(x, yy, r, "#5a6b7d", C.ink, 3);
  }
  return out;
};

const fish = (x, y, s = 1, color = C.yellow) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M0 0c12-14 38-14 50 0-12 14-38 14-50 0z" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
     <path d="M0 0l-12-9v18z" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
     ${CIRC(38, -3, 2.4, C.ink, C.ink, 2)}</g>`;

const collector = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-60 0h120v34h-120z" fill="${C.red}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M-46 34h92" stroke="${C.ink}" stroke-width="5"/>
     ${CIRC(-40, 44, 11, "#ffffff")}${CIRC(-8, 44, 11, "#ffffff")}${CIRC(24, 44, 11, "#ffffff")}${CIRC(52, 44, 11, "#ffffff")}
     <path d="M0 0v-34" stroke="${C.ink}" stroke-width="5"/>
     <path d="M-16-34h32v-14h-32z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></g>`;

const plumeCloud = (x, y, s = 1, big = false) =>
  `<g transform="translate(${x} ${y}) scale(${s})" opacity="0.85">
     <path d="M0 0c40-30 120-26 170-6 54 22 120 10 150-14" fill="none" stroke="#8a7f6d" stroke-width="${big ? 46 : 22}" stroke-linecap="round" opacity="0.55"/>
     <path d="M10 18c44-26 118-20 164-2 48 18 112 8 146-14" fill="none" stroke="#a79a85" stroke-width="${big ? 30 : 14}" stroke-linecap="round" opacity="0.5"/></g>`;

const ship = (x, y, s = 1, color = C.blue) =>
  `<g transform="translate(${x} ${y}) scale(${s})">
     <path d="M-60 0h120l-16 26h-88z" fill="${color}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M-24 0v-26h40v26" fill="#ffffff" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M30-26v-20" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/></g>`;

const chart = (x, y, up = false) =>
  `<g transform="translate(${x} ${y})">
     <path d="M0 0v-120M0 0h200" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
     <path d="${up ? "M10-20 60-50 110-46 160-100" : "M10-100 60-84 110-40 160-16"}"
        fill="none" stroke="${up ? C.teal : C.red}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="${up ? "M160-100l-4 18 20-4z" : "M160-16l-18-6 4 20z"}" fill="${up ? C.teal : C.red}" stroke="${C.ink}" stroke-width="3"/></g>`;

/* ------------------------------------------------------------ scenes */
const ART = {
  title: () => `
    ${sun(680, 86)}
    ${hill("M0 300c120-56 220-44 320 0s260 40 480-28V500H0z", C.sand)}
    ${S("M0 362c150 30 300-10 460 14s240 10 340-16", C.ink, 4)}
    ${sage(96, 322, 1.2)}${sage(190, 336, 0.9)}${sage(690, 318, 1.1)}
    ${oak(300, 320, 0.8)}
    <g>
      <path d="M470 500V392c0-28 24-50 54-50h120c30 0 54 22 54 50v108z" fill="#2b2622" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
      ${nodules(452, 6, 5)}
      ${fish(506, 424, 0.7, C.yellow)}
      ${fish(610, 468, 0.6, C.rose)}
    </g>
    ${fig(150, 318, 1, "stand")}
    ${fig(206, 330, 0.9, "point")}
    ${truck(600, 300, 0.8)}
  `,

  /* ---- 1. Thacker Pass ---- */
  thacker: (v) => {
    const dug = v === "A" || v === "C";
    const crater = v === "A" ? "M250 330q110 90 240 0" : v === "C" ? "M300 330q70 52 150 0" : "";
    let people;
    if (v === "A") {
      people = `${fig(130, 330, 1.25, "armsup", C.red)}${sign(196, 286, 92, 34, "#ffffff", "NO")}${fig(252, 338, 1.1, "sad")}`;
    } else if (v === "B") {
      people = `${fig(150, 330, 1.25, "stand")}${fig(206, 334, 1.15, "stand")}${fig(610, 326, 1.05, "walkaway", C.red)}`;
    } else if (v === "C") {
      people = `${fig(150, 330, 1.25, "stand")}${fig(206, 334, 1.15, "point")}${sign(340, 300, 128, 34, C.teal, "SHARED")}`;
    } else {
      people = `${fig(150, 330, 1.25, "point")}${fig(206, 336, 1.1, "stand")}`;
    }
    return `
      ${sun(690, 78)}${cloud(230, 110, 1.1)}${cloud(470, 72, 0.85)}${bird(120, 150, 1)}${bird(300, 186, 0.8)}
      ${hill("M0 316c130-62 230-50 330-4s250 42 470-26V500H0z", C.sand)}
      ${crater ? S(crater, C.ink, 5, "#c9b89a") : ""}
      ${sage(80, 330, 1.3)}${sage(690, 300, 1.2)}${v !== "A" ? sage(440, 318, 1) : ""}
      ${v === "B" ? "" : digger(560, 298, 1.05, dug)}
      ${dug ? puff(470, 296, 1.1) : ""}
      ${people}
    `;
  },

  /* ---- 2. Rhyolite Ridge / the buckwheat ---- */
  buckwheat: (v) => {
    const alive = v !== "A";
    return `
      ${sun(680, 76)}${cloud(200, 104, 1)}${bird(380, 120, 0.9)}
      ${hill("M0 340c160-40 260-30 360 6s280 20 440-30V500H0z", C.sand)}
      ${v === "A" ? `<g opacity="0.9">${truck(300, 322, 0.9, C.yellow)}</g>` : truck(700, 318, 0.75, C.yellow)}
      <g>
        ${flower(170, 336, 1.5, alive)}${flower(224, 344, 1.2, alive)}${flower(128, 348, 1.1, alive)}
        ${v === "B" ? `<path d="M96 356h176" stroke="${C.teal}" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/>
                        <path d="M96 356v-40M272 356v-40" stroke="${C.teal}" stroke-width="5" stroke-linecap="round"/>` : ""}
      </g>
      ${fig(430, 352, 1, v === "A" ? "sad" : "crouch", C.teal)}
      ${v === "A" ? `${puff(300, 300, 0.9, "#d8cdb5")}` : ""}
      ${S("M560 352c20-22 56-22 76 0", C.ink, 4)}
      ${sage(620, 352, 1)}
    `;
  },

  /* ---- 3. Oak Flat ---- */
  oakflat: (v) => {
    const gone = v === "A";
    return `
      ${sun(90, 82, C.red)}
      ${hill("M0 300h800v200H0z", C.sand)}
      ${S("M0 300h800", C.ink, 5)}
      ${gone
        ? `<path d="M140 300q240 190 480 0z" fill="#cbbb9d" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
           ${puff(380, 330, 1.3, "#d8cdb5")}`
        : `<g opacity="0.65">
             <path d="M180 320q210 150 420 0" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="14 12"/>
             <path d="M300 420h200v60h-200z" fill="#b9a98c" stroke="${C.ink}" stroke-width="4"/>
           </g>`}
      ${oak(390, 300, 1.1, !gone)}
      ${gone
        ? `${fig(660, 300, 1, "sad")}`
        : `${fig(300, 300, 0.9, "stand")}${fig(344, 300, 0.9, "armsup", C.teal)}${fig(452, 300, 0.9, "stand")}${fig(496, 300, 0.9, "stand")}`}
      ${v === "C" ? `<g>${S("M300 420h200v60h-200z", C.ink, 4, C.teal)}<text x="400" y="458" text-anchor="middle" font-size="22" font-weight="700" fill="${C.ink}">BACKFILL</text></g>` : ""}
    `;
  },

  /* ---- 4. The crash ---- */
  crash: (v) => `
    ${cloud(150, 90, 1)}${cloud(640, 64, 0.8)}${bird(420, 110, 0.9)}
    ${hill("M0 420h800v80H0z", C.sand)}
    ${chart(120, 400, v === "A" || v === "B")}
    ${v === "C" ? `${ship(620, 330, 0.9, C.red)}${S("M560 420h240", C.blue, 6)}` : truck(640, 398, 0.8, v === "A" ? C.yellow : "#cfc7b4")}
    ${fig(420, 420, 1.1, v === "C" ? "sad" : v === "A" ? "cheer" : "stand")}
    ${v === "B" ? `${sign(520, 392, 108, 34, C.teal, "TARIFF")}` : ""}
    ${v === "A" ? `${sign(520, 392, 120, 34, C.yellow, "FLOOR $")}` : ""}
  `,

  /* ---- 5. The deep ---- */
  deep: (v) => `
    <rect x="0" y="0" width="800" height="500" fill="${C.deep}"/>
    ${S("M0 120c120 30 220-20 340 6s260 34 460-10", "#2d5a85", 6)}
    ${fish(90, 120, 0.9, C.yellow)}${fish(640, 90, 0.8, C.rose)}
    <path d="M0 400h800v100H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
    ${nodules(392, 18, 2)}
    ${v === "C"
      ? `<g>${ship(400, 150, 1, C.teal)}${S("M400 176v210", "#9fd8cf", 4)}
         <rect x="300" y="300" width="200" height="56" rx="6" fill="#ffffff" stroke="${C.ink}" stroke-width="5"/>
         <text x="400" y="338" text-anchor="middle" font-size="26" font-weight="700" fill="${C.ink}">PAUSED</text></g>`
      : `${collector(400, 356, 1)}${plumeCloud(180, 330, 0.9, v === "B")}`}
    ${v === "B" ? `<g>${ship(140, 150, 0.8, C.red)}</g>` : ""}
    ${v === "A" ? `<g>${ship(140, 150, 0.8, C.blue)}${ship(640, 160, 0.7, C.teal)}</g>` : ""}
    ${v === "base" ? `${ship(400, 140, 0.9, C.blue)}${S("M400 166v180", "#9fd8cf", 3)}` : ""}
  `,

  /* ---- 6a. The plume ---- */
  plume: (v) => `
    <rect x="0" y="0" width="800" height="500" fill="${C.deep}"/>
    <path d="M0 400h800v100H0z" fill="#3b3326" stroke="${C.ink}" stroke-width="5"/>
    ${nodules(392, v === "B" ? 7 : 16, 4)}
    ${v === "B"
      ? `<g>${collector(240, 356, 0.9)}${collector(520, 356, 0.9)}
         ${plumeCloud(120, 300, 1.25, true)}${plumeCloud(360, 260, 1.1, true)}</g>`
      : v === "A"
      ? `<g>${collector(250, 356, 0.9)}<g opacity="0.5">${plumeCloud(300, 320, 0.7)}</g>
         ${ship(600, 150, 0.85, C.teal)}${S("M600 176v120", "#9fd8cf", 4)}
         ${CIRC(600, 320, 34, "#ffffff")}${fig(600, 340, 0.5, "stand")}</g>`
      : `<g>${collector(380, 356, 0.95)}${plumeCloud(200, 320, 0.95)}</g>`}
    ${fish(80, 150, 0.95, C.yellow)}${v === "B" ? "" : fish(700, 120, 0.85, C.rose)}
  `,

  /* ---- 6b. The vacuum ---- */
  vacuum: (v) => `
    <rect x="0" y="0" width="800" height="500" fill="#bcd8e6"/>
    ${S("M0 300h800v200H0z", C.ink, 5, C.blue)}
    ${S("M0 330c120 20 220-16 340 4s260 24 460-8", "#6fa8cf", 6)}
    ${ship(560, 268, 0.9, C.red)}
    ${v === "B" ? `${ship(300, 276, 0.8, C.teal)}${S("M330 250h200", C.ink, 4)}` : ""}
    <g>
      <path d="M60 300h190v-10H60z" fill="#d9c49a" stroke="${C.ink}" stroke-width="5"/>
      <path d="M78 300v40M232 300v40" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${fig(140, 290, 1, v === "A" ? "stand" : "point")}
    ${v === "A" ? sign(200, 262, 130, 34, "#ffffff", "WAIT") : ""}
    ${sun(700, 80, C.yellow)}
  `,

  /* ---- endings ---- */
  endGood: () => `
    ${sun(690, 80)}
    ${hill("M0 316c130-50 230-40 330 0s250 36 470-20V500H0z", C.sand)}
    ${oak(260, 320, 0.95)}${flower(430, 330, 1.3)}${sage(620, 300, 1.1)}
    ${fig(120, 326, 1, "cheer", C.teal)}${fig(176, 332, 0.95, "stand")}
    ${truck(640, 300, 0.7, C.yellow)}
    <g>${S("M470 500V400c0-24 20-44 46-44h110c26 0 46 20 46 44v100z", C.ink, 5, "#2b2622")}
       ${fish(520, 430, 0.7, C.yellow)}${nodules(466, 5, 1)}</g>
  `,
  endBad: () => `
    ${sun(690, 80, C.red)}
    ${hill("M0 330h800v170H0z", "#cbbb9d")}
    <path d="M120 330q260 170 520 0z" fill="#b5a489" stroke="${C.ink}" stroke-width="5"/>
    ${puff(360, 300, 1.4, "#d8cdb5")}
    ${fig(80, 330, 1, "sad")}
    ${truck(700, 318, 0.75, "#cfc7b4")}
  `,
  endMixed: () => `
    ${sun(690, 84)}
    ${hill("M0 324c130-40 230-30 330 4s250 26 470-16V500H0z", C.sand)}
    ${oak(250, 326, 0.85)}${flower(420, 336, 1.1, false)}
    <path d="M520 326q90 60 190 0z" fill="#c9b89a" stroke="${C.ink}" stroke-width="5"/>
    ${fig(120, 330, 1, "stand")}${fig(172, 336, 0.9, "sad")}
    ${truck(660, 310, 0.7, C.yellow)}
  `,
};

/** wrap a scene's inner markup in the svg shell (wobble + grain live here) */
function drawScene(key, variant = "base") {
  const fn = ART[key] || ART.title;
  return `
  <svg viewBox="0 0 ${VB.w} ${VB.h}" preserveAspectRatio="xMidYMid meet" class="scene-svg" role="img" aria-label="Illustration of the scene">
    <defs>
      <filter id="wob" x="-6%" y="-6%" width="112%" height="112%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <g filter="url(#wob)" font-family="'Shantell Sans', system-ui, sans-serif">${fn(variant)}</g>
  </svg>`;
}
