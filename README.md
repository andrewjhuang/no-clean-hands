# No Clean Hands

A 25-minute classroom decision game about critical minerals and the deep sea,
built on Ernest Scheyder's *The War Below* (2024) and Olive Heffernan's
*The High Seas* (2024), ch. 1, 4 and 12.

A class plays as one body: the council that decides where the metal comes
from. **Four chapters, three decisions each.**

**The economy is the argument.** You get ten coins for the whole game and
never get more. Nearly everything that protects a person or a place costs
coins; nearly everything that harms them is free. You also owe the grid
**70 units of metal by 2034**, and compromising in every chapter lands you
around 35. Being moderate everywhere fails. You have to decide where the
harm goes, which is the thing both books are actually about.

Four shapes of decision — pick one of three, buy what you can afford from
four competing demands, a continuous slider, and a budget split. The
drawing reacts live as you choose, before anything is locked in: the fence
slides and the flowers die as you drag, coin stacks rise, the people you
funded get a tag over their heads and the ones you didn't walk off.

Six endings, keyed on whether you hit the number and what it cost. The last
screen names what happened to each of the six people by the flags you set.

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

| Chapter | Decisions | Themes |
|----|-------|--------|
| Nevada | Who you pay for at Thacker Pass · the protest camp · the buckwheat fence | Sacred sites, the 1872 Mining Law, jobs, groundwater, endangered species |
| Arizona | The Oak Flat swap · what you owe afterwards · the subsidence schedule | Religious freedom, block caving, compensation, copper for the grid |
| The market | Six billion three ways · the layoff · the cheap dirty tonne | Industrial policy, refining concentration, offshored harm |
| The deep | ISA or alone or moratorium · the plume *or* the vacuum · the last coins | Common heritage, UNCLOS, small-state development, benefit sharing |

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
