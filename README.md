# No Clean Hands

A 30-minute classroom decision game about critical minerals. The class runs a
mining project and has exactly one resource: **social licence**. Every decision
spends it. Stakeholders whose needs are met pay it back each round; anyone left
starving drains it. At zero the project is stopped — not by a regulator, by the
people standing around it.

## The argument is the structure

**Act One** is a lithium mine under a farming valley in Serbia. **Act Two** is a
cobalt nodule field on the Pacific seafloor. They have the **same six
stakeholders** and the **same four questions, in the same order**:

| Round | Shape | Act One (Jadar) | Act Two (Cook Islands) |
|---|---|---|---|
| 1 / 5 | A permit | Ratify the restored decree, re-run it, or refuse | Use the park's open 84%, close the zone, or go block by block |
| 2 / 6 | How much, how fast | Years to first ore | Share of the open zone licensed |
| 3 / 7 | What you require | Conditions on the Drina | Conditions before anything is lifted |
| 4 / 8 | Who gets paid | What the valley is owed | What the ocean is owed |

That mirroring is the whole point. A fisher and a farmer want the same thing; so
do a ship's crew and a mining town. The product is cleaner than coal. **The
process is still a mine** — and it is the same bargain coal, gas and oil made
first, with the same cast in the room.

## One number

Social licence starts at 70. Each decision has a visible price and a visible
list of who it feeds and who it starves. Then the round runs:

- every interest whose need is **met** pays you its **clout**
- every interest left at **zero** drains twice its clout

The six do not weigh the same, because they don't. The people on the deposit
carry the most (5) and the buyers carry the least (1) — a carmaker can neither
grant a social licence nor withdraw one. Pleasing investors while starving a
community is a losing line, and the game is arithmetically arranged so that the
best outcome comes from topping up whoever is worst off.

There are no principles to adopt, no second currency and no branching. Every
class plays all eight rounds; decisions change the needs and the licence, never
which rounds exist.

### Playtested lines

| Strategy | Ends on | Met | Outcome |
|---|---|---|---|
| Fund whoever is lowest | 52 | 6/6 | best available |
| Round-robin the allocation | 33 | 4/6 | the long compromise |
| Cheap options, pay investors | 8 | 4/6 | survives, barely |
| Buy every protection | 0 by round 7 | 3/6 | **project stopped** |

## The art moves

Both case scenes read the same two inputs — how far through the act you are, and
how each interest is faring — and draw **the same six figures in the same order**
along the bottom, colour-matched to the chips beneath the picture. The valley and
the seafloor are deliberately the same composition with the water raised.

Everything ambient animates: clouds drift, the river and the sea breathe, the
excavator digs, the plume spreads, fish swim. The pit deepens and the collector
descends as the act progresses, so the picture changes while the class is still
arguing. Each figure's posture is its need — met figures cheer, starving ones
turn and walk away.

## Running it in class

Open the page, pick a discussion clock (90s / 2 min / 3 min / none), project it.

- `space` advances
- `1`–`6` select a choice or toggle a condition
- `t` opens the discussion timer
- `r` restarts from the ending screen

Read the situation aloud, hit **Talk it over**, let the room argue, then commit.
The clock is a prompt, not a rule; there is a **+1 min** button.

Timing: two act cards, eight decisions at ~2 min, ~5 min debrief ≈ 28 minutes.

## Accuracy

Places, laws, companies, rulings, dates and figures are real and itemised on the
**Debrief** screen, which separates what is documented from what is invented.
The stakeholders are composites — the interests are real, the figures on screen
are not individuals. Social licence is a real industry concept and an invented
number: nobody scores it out of a hundred, and everybody loses projects to it.

Sources: Ernest Scheyder, *The War Below* (2024); Olive Heffernan, *The High
Seas* (2024); RMI, *The Battery Mineral Loop* (July 2024).

## Editing

- `data.js` — the six stakeholders and their clout, both acts, every option's
  price and need deltas, and the endings.
- `game.js` — the engine. `land()` is the whole economy: spend, move the needs,
  then pay and drain.
- `art.js` — scenes composed from primitives (`fig`, `stakeFig`, `rasp`, `atoll`,
  `nodules`, `collector`…). `stakeLine()` draws the line-up both acts share.
- `fonts/` — Inter, self-hosted so a projector never waits on Google Fonts.

## Local and deploy

```
python3 -m http.server 8090   # http://127.0.0.1:8090
npx vercel --prod             # static, no build step
```

`.shots/play.js` plays a full game with a named strategy and prints the licence
trajectory; `.shots/of2.js` reports panel overflow per screen, which is how the
one-viewport rule is enforced.

```
node .shots/play.js broad
FIX=0 node .shots/of2.js 1512 820
```
