# No Clean Hands

A 25-minute classroom decision game about critical minerals and the deep sea,
built on Ernest Scheyder's *The War Below* (2024) and Olive Heffernan's
*The High Seas* (2024), ch. 1, 4 and 12.

A class plays as one body: the council that decides where the metal comes
from. Six decisions, each with an optional discussion phase on a visible
clock. Four meters — trust, nature, metal, clout — carry state forward, and
the last decision branches on whether the council authorised seabed mining or
led a moratorium. Six endings.

It is drawn, not photographed: hand-inked SVG with stick figures, risograph
spot colour on paper, and a wobble filter so the vectors read as ink. **The
drawing reacts to the decision** — the pit opens, the flowers die or get
fenced, the plume spreads — so consequences land visually before anyone reads
the text. Everything fits in one viewport; nothing scrolls.

## Running it in class

Open the page, pick a discussion clock (90s / 2min / 3min / none), project it.

- `space` advances
- `1`–`3` select a choice
- `t` opens the discussion timer
- `r` restarts from the ending screen

Read the scene aloud, hit **Open the floor**, let the room argue, then click the
option they land on. The clock is a prompt, not a rule; there is a **+1 min**
button.

Timing: ~1 min intro, ~3 min per decision, ~5 min debrief ≈ 24 minutes.

## Structure

| # | Scene | Themes |
|----|-------|--------|
| 1 | Thacker Pass | Sacred sites, consultation, the 1872 Mining Law, rural jobs |
| 2 | Rhyolite Ridge | Endangered species, substitution, offshoring harm |
| 3 | Oak Flat | Religious freedom, block caving, copper for the grid |
| 4 | The crash | Industrial policy, refining concentration, tariffs, subsidy |
| 5 | Clarion-Clipperton Zone | Common heritage, the ISA, UNCLOS, small-state development |
| 6a | The plume | Precaution, burden of proof, sunk cost |
| 6b | The vacuum | Enforcing commons rules; the cost of a partial moratorium |

## Accuracy

Places, laws, companies, cases and figures are real and documented. Individual
characters are fictional composites; the Republic of Mareva is fictional and
modelled on Nauru's real sponsorship of a seabed contractor and its real
phosphate history. The closing **Debrief** screen separates the two for students.

## Editing

- `data.js` — every scene, choice, meter delta and ending. A scene with a
  `requires` field only appears once an earlier choice sets that flag.
- `art.js` — the drawings, composed from primitives (`fig`, `truck`, `flower`,
  `collector`…). Each scene function takes a variant: `"base"` before the
  decision, then the chosen option's key. Add a case and the art reacts.
- `game.js` — the engine. It reads both generically.
- `fonts/` — Shantell Sans, self-hosted so a classroom projector never waits on
  Google Fonts.

## Local

```
python3 -m http.server 8090
# http://127.0.0.1:8090
```

`.shots/walk.js` plays the game automatically with Puppeteer and reports the
ending, final meters and any console errors:

```
node .shots/walk.js 3,2,3,2,3,2,1
```

## Deploy

Static. No build step.

```
npx vercel --prod
```
