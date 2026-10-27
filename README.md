# No Clean Hands

A 30-minute classroom decision game about critical minerals. One storyline runs
from a Nevada lithium pit to the abyssal plain of the Pacific: **four chapters,
three decisions each, twelve decisions in all**, and the same purse the whole way
down.

## The economy is the argument

You get **ten coins for the whole game and you never get more.** Nearly
everything that protects a person or a place costs coins. Nearly everything that
harms them is free.

That is not a balancing choice — it is what both books are actually describing,
so it is the rule the game runs on. Three meters read out the consequences:

| | |
|---|---|
| **Trust** | Do the people nearest the hole believe you? |
| **Nature** | Habitat, water, species, seafloor. |
| **Metal** | Units secured. You owe the grid 70 by 2034. |

You cannot reach the metal target by being careful everywhere. You will have to
pick who absorbs it, and the game is arranged so that you notice yourself doing it.

### Playtested lines

| Strategy | Metal | Trust | Nature | Ending |
|---|---|---|---|---|
| Always the cheap option | 109/70 | 18 | **0** | "You hit the number" |
| Always the middle option | 66/70 | 69 | 35 | Short, more or less honest |
| Always buy the protection | 38/70 | 79 | 88 | "Short of the number, and clean about it" |

Every run spends all ten coins. There is no line that protects everyone, and
there is no line that hits the number without a cost you can name.

## The four chapters

| | Where | The three decisions |
|---|---|---|
| 1 | **Nevada** | Who you pay for at Thacker Pass · the protest camp · how much of Tiehm's buckwheat you fence |
| 2 | **Arizona** | Oak Flat, after the land is already gone · what you owe afterwards · how many years of surface you guarantee |
| 3 | **The market** | The crash · the layoff · the cheap tonne |
| 4 | **The deep** | The Clarion-Clipperton Zone · then the plume, or the vacuum your own moratorium leaves |

Chapter 4 branches once: mine the seabed and you spend the next round deciding
where the sediment goes; lead a moratorium and you spend it watching the
moratorium fail. Either way the chapter is three decisions long.

## Accuracy

**Every place, law, company, ruling and date is real and current to October 2026.**
The **Debrief** screen itemises twelve of them and separates what is documented
from what is invented. The people are fictional composites — no words are put in
a real person's or government's mouth.

Three things changed in the real record while this was being built, and the game
now opens on all three:

- **Oak Flat is not a pending question.** Title passed to Resolution Copper on
  16 March 2026; the Supreme Court declined the religious-freedom appeal in May
  2025 and the full appeals court refused to rehear the injunction that
  September. The chapter starts from "the land is already gone," and the only
  lever that still reaches it is a repeal bill.
- **The seabed found a second door.** With no ISA mining code finished — the
  two-year rule Nauru triggered in June 2021 lapsed in July 2023 and there is
  still none — a contractor applied in 2026 under a 1980 national statute
  instead, with a decision expected in early 2027. The "licence it alone" option
  in this game is not a hypothetical.
- **The Authority is weaker than the chapter used to assume.** In July 2026 a
  tribunal ordered the ISA to respect a contractor's due-process rights, and its
  Council renewed that contractor's contract days later with a compliance
  inquiry still open.

Sources: Ernest Scheyder, *The War Below* (2024); Olive Heffernan, *The High
Seas* (2024), ch. 1, 4, 12.

## The art moves

Hand-inked SVG scenes composed from primitives, animated on CSS keyframes: sun,
drifting cloud, flapping bird, digging excavator, dust, swimming fish, drifting
plume. The scenes also *react* — the pit opens when you give the developer
certainty, the fence and the flower patches move with the slider, the figures of
the people you paid for stand up and cheer.

Repainting the plate used to restart every keyframe, so a cloud mid-drift
snapped back to its starting position on every click. Each animated element is
now stamped with a negative `animation-delay` equal to the time since load, so
it resumes at the phase it had reached. Measured: an 18px snap became 0.17px of
continued motion.

## Running it in class

Open the page, pick a discussion clock (90s / 2 min / 3 min / none), project it.

- `space` advances
- `1`–`4` pick an option or toggle a card
- `t` opens the discussion timer
- `r` restarts from the ending screen

Read the situation aloud, hit **Talk it over**, let the room argue, then commit.
**More detail** holds the sourced facts for that decision. The clock is a prompt,
not a rule; there is a **+1 min** button.

Timing: four chapter cards, twelve decisions at ~2 min, ~5 min debrief ≈ 30 minutes.

## Editing

- `data.js` — the prologue, four chapters, every option's price and deltas, the
  endings, the fates, and the debrief facts.
- `game.js` — the engine. Four beat types (`choice`, `spend`, `slider`,
  `budget`), and `land()` applies the deltas.
- `art.js` — scenes composed from primitives (`fig`, `cloud`, `digger`,
  `nodules`, `collector`…). `inPhase()` is what keeps the sky moving.
- `fonts/` — Shantell Sans, self-hosted (OFL, licence included), so a projector
  never waits on Google Fonts. It is the hand-drawn face the art is drawn to
  match; without it the page falls back to Comic Sans.

## Local and deploy

```
python3 -m http.server 8090   # http://127.0.0.1:8090
npx vercel --prod             # static, no build step
```

`.shots/walk.js` plays a complete run through all four beat types and reports
both JS errors and any container that overflows — the page, the panel, the inner
scroller and the sheets. That is how the one-viewport rule is enforced.

```
PICK=0 node .shots/walk.js 1366 768    # cheap options
PICK=2 node .shots/walk.js 1280 720    # buy everything
```
