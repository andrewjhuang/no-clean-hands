# No Clean Hands

A 30-minute classroom decision game. The class forms an international
resource council sitting in 2026 and decides **two real cases that the real
world has not decided**:

- **Jadar, Serbia** — jadarite lithium, the only deposit of the mineral on
  Earth, under a raspberry-farming valley that drains into the Drina.
  Revoked in 2022, ruled unconstitutional in July 2024, revived by decree,
  granted EU Strategic Project status, and put into **care and maintenance in
  November 2025** for lack of permits.
- **The Cook Islands EEZ** — cobalt-rich nodules at 5,000 m in *national*
  waters, where the International Seabed Authority has no say and there is no
  "common heritage of mankind" to argue about. The whole 1.9 million km² zone
  is the Marae Moana marine park, which bars mining in 50-nautical-mile rings
  around the islands — about 16% — and **permits it in the other 84%**.

Neither project appears in either source book. That is deliberate: the class
applies the books' method — consent, irreversibility, benefit, the
lawful-permit problem, the common-heritage argument — to ground it has not
read about, which tests transfer rather than recall.

## Three things are tracked at once

**The charter is the spine.** Before hearing anything the council adopts
**two of five** principles — Consent, Reversibility, Supply, Benefit,
**Sufficiency**. Every later option is tagged with the principles it keeps or
breaks, and breaking one you adopted costs far more than breaking one you
never signed. The ending is scored on breaches, not on meters: hypocrisy is
the failure condition.

**The loop is the second budget.** RMI's *Battery Mineral Loop* (July 2024)
gives six solutions that reduce how much has to be mined at all — change the
chemistry, raise the density, recycle the stock, extend the lifetime, make
vehicles efficient, make mobility efficient. The council funds them out of the
same money it would spend on a mine. Each matures on a delay of one to three
rounds, so you pay in the round that can't use it and collect in the round
that no longer needs it.

**The forecast is the anxiety.** A projected net demand index sits inside the
picture and is revised down every round — partly by the market, partly by
whatever the council just funded. Beside it, a countdown of years to first
ore. A mine takes six years to build. If demand crosses under the plan before
the shaft is finished, the council has approved a stranded asset, the valley
gave up its water for nothing, and there is an ending that says so.

**Floor events.** When a meter hits zero an emergency decision is *inserted*
into the running order rather than a round being skipped: the crisis costs you
a slot you didn't plan for and both options are bad. Environment zero brings
an injunction, Communities zero a formal withdrawal, Economy zero a financing
collapse, and Trust zero strikes the charter from the record — after which
breaches stop scoring at all, unless you buy a single principle back. Capped
at one per case.

Hand-inked SVG art that reacts to each decision, Inter for all text,
everything inside one viewport.

## Running it in class

Open the page, pick a discussion clock (90s / 2 min / 3 min / none), project it.

- `space` advances
- `1`–`6` select a choice or toggle a card
- `t` opens the discussion timer
- `r` restarts from the ending screen

Read the scene aloud, hit **Open the case**, let the room argue, then click the
option they land on. The clock is a prompt, not a rule; there is a **+1 min**
button.

Timing: ~2 min for the title and charter, three case cards, eleven decisions at
~2 min, ~5 min debrief ≈ 32 minutes. Each floor event adds about two. Set the
talk clock to 90s to bring a reckless council back under 30.

## Structure

| Round | Decision | Themes |
|----|-------|--------|
| 0 | Adopt two of five principles | Consent, precaution, supply, benefit, sufficiency |
| 1 | Ratify, re-run or refuse the restored decree | A court ordering you to proceed; 60% opposition; arbitration risk |
| 2 | Conditions on the Drina | Tailings, an unmeasured baseline, who appoints the reviewers |
| 3 | Fund the loop | Six solutions, lead times, the cost of supply you can't use yet |
| 4 | How much of the chain stays in Serbia | Benefit vs. reversibility as one lever |
| 5 | What a parked mine means | Care and maintenance; should a permit expire? |
| 6 | The other 84% of a marine park | Sovereign consent used to say *yes* |
| 7 | Extend the licences, decide, or let them lapse | Research as a way of not deciding |
| 8 | Whose flag | Patronage, an aid freeze, Nauru's precedent |
| 9 | Commission the economics, and publish or not | A deposit that may be worth nothing |
| 10 | Close the loop | Mining as a one-off; the volatility it causes |

## Accuracy

Places, laws, companies, rulings, dates and figures are real and itemised on
the **Debrief** screen, which separates what is documented from what is
invented. Named individuals are fictional composites; quotations attributed to
officials inside the "What else is true" panels are real and published, and
the voices in the scenes are not. The charter is the only invented mechanic.

Sources: Ernest Scheyder, *The War Below* (2024); Olive Heffernan, *The High
Seas* (2024); RMI, *The Battery Mineral Loop* (July 2024).

## Editing

- `data.js` — every scene, choice, meter delta, loop solution and ending. A
  beat with a `requires` field appears once any one of those flags is set.
- `art.js` — the drawings, composed from primitives (`fig`, `rasp`, `rig`,
  `atoll`, `nodules`, `ship`…). Each scene takes a variant: `"base"` before the
  decision, then the chosen option's key, plus live `p` for sliders and spend
  boards. The `loop` scene draws the six arcs and fills them as they are picked.
- `game.js` — the engine. `creditLoop` and `tickRound` run the forecast;
  `committed()` and `underwater()` decide whether you have stranded something.
- `fonts/` — Inter, self-hosted so a classroom projector never waits on Google
  Fonts.

## Local

```
python3 -m http.server 8090
# http://127.0.0.1:8090
```

`.shots/of2.js` plays the whole game with Puppeteer and reports panel overflow
per screen, which is how the one-viewport rule is enforced:

```
node .shots/of2.js 1512 820      # rotate through options
FIX=0 node .shots/of2.js 1280 720 # always take option A
```

## Deploy

Static. No build step.

```
npx vercel --prod
```
