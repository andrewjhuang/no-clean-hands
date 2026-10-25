# No Clean Hands

A 25-minute classroom decision game about critical minerals and the deep sea,
built on Ernest Scheyder's *The War Below* (2024) and Olive Heffernan's
*The High Seas* (2024), ch. 1, 4 and 12.

A class plays as one body: the National Critical Materials Council. Seven
decisions, each with an explicit discussion phase on a visible clock. Four
meters — community trust, living world, secured supply, political capital —
carry state forward, and act 6 branches on whether the council authorised
seabed mining or led a moratorium. Six endings.

## Running it in class

Open the page, pick a discussion clock (90s / 2min / 3min / none), project it.

- `space` advances (convene → open the floor → next decision)
- `1`–`4` select a choice
- `r` restarts from the ending screen

Read the scene aloud, hit **Open the floor**, let the room argue, then click the
option they land on. The clock is a prompt, not a rule; there is a **+1 min**
button.

Timing: ~1 min prologue, ~3 min per decision, ~5 min debrief ≈ 27 minutes.

## Structure

| Act | Scene | Themes |
|----|-------|--------|
| 1 | Thacker Pass / Peehee Mu'huh | Sacred sites, tribal consultation, the 1872 Mining Law, rural jobs |
| 2 | Rhyolite Ridge | Endangered species, substitution, offshoring harm |
| 3 | Oak Flat / Chi'chil Biłdagoteel | Religious freedom, block caving, copper for the grid |
| 4 | The price crash | Industrial policy, refining concentration, tariffs, subsidy |
| 5 | Clarion-Clipperton Zone | Common heritage, the ISA, UNCLOS, small-state development |
| 6a | The plume | Precaution, burden of proof, sunk cost |
| 6b | The vacuum | Enforcement of commons rules, moral hazard of a partial moratorium |
| 7 | The last appropriation | Recycling, demand reduction, more mining, the seabed at scale |

## Accuracy

Places, laws, companies, cases and figures are real and documented. Individual
characters are fictional composites; the Republic of Mareva is fictional and
modelled on Nauru's real sponsorship of a seabed contractor and its real
phosphate history. The closing **Debrief** screen separates the two for students.

## Editing

All scene text, choices, meter deltas and endings live in `data.js`. The engine
(`game.js`) reads them generically — add a scene object to `SCENES` and it
appears. A scene with a `requires` field only shows when that flag has been set
by an earlier choice.

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
