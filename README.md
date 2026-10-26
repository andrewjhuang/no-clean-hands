# No Clean Hands

A 30-minute classroom decision game. The class forms an international
resource council and hears **two real extraction cases**: the Resolution
Copper project under Apache ceremonial ground at Oak Flat, from Ernest
Scheyder's *The War Below*; and nodule mining in the Clarion-Clipperton
Zone, from Olive Heffernan's *The High Seas*.

**The charter is the spine.** Before hearing anything, the council adopts
**two of four principles** — Consent, Reversibility, Supply, Benefit. Every
later option is tagged with the principles it keeps or breaks, and breaking
one you adopted costs far more than breaking one you never signed. The
second case quotes the first one back. The ending is scored on breaches,
not on meters: hypocrisy is the failure condition.

Four meters carry across both cases — environment, economy, communities,
trust. Nine decisions: the charter, four rounds on Oak Flat, four on the
seabed. Round 6 branches on whether the council sponsored mining or backed
a moratorium; abstaining in round 5 skips it entirely, which is its own
consequence.

Hand-inked SVG art that reacts to each decision, Inter for all text,
everything inside one viewport.
## Running it in class

Open the page, pick a discussion clock (90s / 2min / 3min / none), project it.

- `space` advances
- `1`–`4` select a choice or toggle a card
- `t` opens the discussion timer
- `r` restarts from the ending screen

Read the scene aloud, hit **Open the floor**, let the room argue, then click the
option they land on. The clock is a prompt, not a rule; there is a **+1 min**
button.

Timing: ~1 min intro, four chapter cards, twelve decisions at ~2 min, ~5 min debrief ≈ 32 minutes. Set the talk clock to 90s to bring it under 30.

## Structure

| Round | Decision | Themes |
|----|-------|--------|
| 0 | Adopt two of four principles | Consent, precaution, supply security, benefit sharing |
| 1 | Execute, suspend or rewrite the land exchange | A 2014 defence-bill rider; block caving; 25% of US copper |
| 2 | Conditions after Juukan Gorge | Operator record, enforceable permits vs. press releases |
| 3 | Years of surface access guaranteed | Discretion after the courts stop requiring restraint |
| 4 | The tailings facility | Deferred risk, dry stack vs. conventional |
| 5 | Sponsor, pause, or abstain at the Authority | Common heritage, the lapsed two-year rule |
| 6 | The plume *or* the vacuum | Precaution, dark oxygen, enforcement of a partial pause |
| 7 | The route outside the Authority | US non-ratification, the 1980 statute, regime collapse |
| 8 | Who the benefit fund pays | Sponsoring-state liability, Nauru's phosphate precedent |

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
