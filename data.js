/* ------------------------------------------------------------------
   NO CLEAN HANDS — four chapters, three decisions each.

   THE ECONOMY
   You have ten coins for the whole game and you never get more. Nearly
   everything that protects a person or a place costs coins; nearly
   everything that harms them is free. That is the argument the two books
   are actually making, so it is the rule the game runs on.

   You also owe the grid 60 units of metal by 2034. You cannot reach it
   by being careful everywhere. You will have to pick who absorbs it.

   Sources: Ernest Scheyder, "The War Below" (2024); Olive Heffernan,
   "The High Seas" (2024), ch. 1, 4, 12.

   Places, laws, companies, rulings and dates are real and current to
   October 2026. The people are fictional composites; no quotation is
   attributed to a real person or government.
------------------------------------------------------------------- */

const START = { coins: 10, trust: 50, nature: 50, metal: 0 };
const METAL_TARGET = 70;

const METERS = [
  { key: "trust",  label: "Trust",  full: "Do the people nearest the hole believe you?" },
  { key: "nature", label: "Nature", full: "Habitat, water, species, seafloor." },
  { key: "metal",  label: "Metal",  full: `Units secured. You owe the grid ${METAL_TARGET} by 2034.` },
];

const PROLOGUE = {
  title: "No Clean Hands",
  sub: "Lithium, copper, and the battle for the deep",
  lines: [
    "You run the council that decides where the metal comes from. You have eight years, ten coins, and a number you have to hit.",
    `The grid needs <b>${METAL_TARGET} units of metal</b> by 2034. Every mine gets you closer. Every protection costs a coin, and there are only ten.`,
    "Harming people is free. That is not a bug in the game. That is the finding."
  ],
  note: "Real places and laws. The people are composites written for this game."
};

/* ================================================================== */
const CHAPTERS = [
  {
    id: "nevada", title: "Nevada", sub: "The lithium rush", realm: "land", art: "thacker",
    intro: "Two deposits, two hundred miles apart. One sits on a massacre site. The other sits on the only patch of a flower that exists nowhere else. A law from 1872 says dig, and pay the public nothing.",
    cast: [
      { who: "Lena, 58", role: "tribal council" },
      { who: "Ray, 44", role: "laid-off haul driver" },
      { who: "Dana, 51", role: "project developer" },
      { who: "Alvin, 63", role: "state water engineer" }
    ],
    beats: [
      {
        type: "spend", art: "thacker",
        place: "Thacker Pass", year: "2026",
        situation: "Four people want four things. Three of them cost money you may not have later.",
        ask: "Buy what you can live with.",
        voices: [
          { who: "Lena, 58", role: "tribal council", line: "You can call this climate action. Say it to my face first." },
          { who: "Dana, 51", role: "developer", line: "I can build it here, or in Argentina in half the time." }
        ],
        detail: [
          "Federal land. Under the 1872 Mining Law hardrock mining is the highest and best use of it, and there is no federal royalty — so nothing is paid to the public unless you make it happen.",
          "This is not a proposal. Over 1,600 people are on site, the Department of Energy has lent $2.23bn against it, and General Motors holds 38% of the joint venture plus offtake on most of phase one.",
          "That money was committed before any of this was decided, which is most of why it is hard to condition now.",
          "Three nearby tribes say the consultation closed before it reached them."
        ],
        discuss: [
          "Who did you not buy, and what does that cost them?",
          "Notice that letting the company proceed is the free option. Is that an accident?",
          "If not here, where does the lithium come from — and who lives there?"
        ],
        options: [
          { id: "lena", cost: 3, label: "Fence the burial ground", note: "Co-management written into the permit.",
            d: { trust: 16, nature: 6, metal: -5 }, flag: "lena_backed",
            yes: "The burial ground comes out of the mine plan and a tribal monitoring board gets real authority over it.",
            no:  "The plan goes over the burial ground. Lena stops answering your office's calls in March." },
          { id: "ray", cost: 2, label: "Local hiring and training", note: "Jobs that actually reach this county.",
            d: { trust: 10, metal: 2 }, flag: "ray_backed",
            yes: "Ray is in the first intake. He buys a used truck and stops looking at listings in Reno.",
            no:  "The crews are bussed in from out of state. Ray gets eleven weeks and then nothing." },
          { id: "alvin", cost: 2, label: "Cap the groundwater", note: "Hard limit, metered by the state.",
            d: { nature: 14, metal: -3 }, flag: "alvin_backed",
            yes: "The draw is capped and independently metered. The ranchers downstream stop calling.",
            no:  "The basin drops faster than modelled. It is a closed basin, so it does not come back." },
          { id: "dana", cost: 0, label: "Give the developer certainty", note: "Free. No new conditions after financing.",
            d: { metal: 16, trust: -8, nature: -6 }, flag: "dana_backed",
            yes: "Financing closes in weeks. First lithium lands two years ahead of any other American project.",
            no:  "The board moves the capital abroad, to a project with weaker rules and a shorter timeline." }
        ]
      },
      {
        type: "choice", art: "thacker",
        place: "The camp", year: "2027",
        situation: "A protest camp has held the access road for eleven weeks. Winter is coming and somebody is going to get hurt.",
        ask: "The sheriff wants an answer tonight.",
        voices: [
          { who: "Lena, 58", role: "tribal council", line: "My granddaughter is out there. She is nineteen. Do not make me watch this on television." }
        ],
        detail: [
          "Courts allowed construction to proceed while tribal claims were still being litigated. The camp is the only remaining leverage anyone has.",
          "Clearing it is lawful, cheap and fast. It is also the image that follows this project for twenty years."
        ],
        discuss: [
          "What is the difference between a legal action and a legitimate one?",
          "Who pays the cost of a protest — the protesters, the company, or the next community?",
          "Would you answer differently if the cameras were not there?"
        ],
        choices: [
          { key: "A", label: "Clear the road", cost: 0, sub: "Free. Tonight.",
            d: { metal: 6, trust: -18, nature: -2 }, flag: "camp_cleared",
            out: { t: "Fourteen arrests", x: "It takes two hours. Lena's granddaughter is nineteen and had never been arrested before. The footage runs nationally for three days and gets used against every mine permit in the state for a decade." } },
          { key: "B", label: "Negotiate", cost: 2, sub: "Mediator, real concessions, slow.",
            d: { trust: 10, metal: -3 },
            out: { t: "Six weeks of talks", x: "The camp comes down on its own. You give up the northern haul road and a seasonal work pause. The company calls it extortion in a filing and signs it anyway." } },
          { key: "C", label: "Halt work for the winter", cost: 0, sub: "Free, but nothing moves.",
            d: { trust: 6, nature: 4, metal: -8 },
            out: { t: "Five months of nothing", x: "Nobody gets hurt. The schedule slips past the battery plant's deadline, the offtake contract moves to a Chilean supplier, and the company's share price takes the difference out of its workforce." } }
        ]
      },
      {
        type: "slider", art: "buckwheat",
        place: "Rhyolite Ridge", year: "2027",
        situation: "The second deposit. On top of it grows Tiehm's buckwheat: ten acres, a few thousand plants, nowhere else on Earth. You draw the fence.",
        ask: "How much of the habitat do you leave alone?",
        slider: { key: "keep", min: 0, max: 100, step: 10, start: 50, unit: "%", labelLow: "Mine all of it", labelHigh: "Touch none of it" },
        voices: [
          { who: "Priya, 39", role: "botanist", line: "Extinction is a small thing. Right up until it's permanent." }
        ],
        detail: [
          "Listed endangered in 2022. About 40% of the known population was destroyed in 2020; investigators eventually blamed ground squirrels in a drought.",
          "A federal court upheld the mine's approval in March 2026 over exactly this objection. It is on appeal; the company does not expect a delay.",
          "Translocation has never worked here. The first 35 greenhouse plants went into the ground in April 2026 — greenhouse survival is good, field survival has run under a fifth.",
          "This one is free either way. The only currency here is the trade itself."
        ],
        discuss: [
          "Is one plant species worth slowing a battery supply chain?",
          "Does that change if the replacement metal comes from a country with no endangered species law?",
          "Nothing here costs a coin. Did that make the decision easier or harder?"
        ],
        bands: [
          { max: 20, t: "The ridge gets levelled", d: { metal: 16, nature: -20, trust: -6 }, flag: "flower_gone",
            x: "The waste pile goes over the patches. Greenhouse propagation goes beautifully and the transplants die anyway — under a fifth survive their first field season. Priya keeps counting. The number keeps going down." },
          { max: 60, t: "Most of it, and a promise", d: { metal: 13, nature: -10, trust: -2 },
            x: "You keep a token margin and approve the rest. Two patches survive, four don't. The recovery plan is extended twice and the mine makes money, which is the only part anyone predicted correctly." },
          { max: 90, t: "A more expensive mine", d: { metal: 5, nature: 10, trust: 5 }, flag: "flower_saved",
            x: "All six patches sit behind fencing. The mine opens eighteen months late into a worse market, and executives tell investors the delay was a government cost. Priya calls her stable count “not yet a loss”." },
          { max: 100, t: "The deposit stays in the ground", d: { metal: -2, nature: 16, trust: 6 }, flag: "flower_saved",
            x: "The species is safe and the lithium is not produced. The battery maker signs a ten-year supply deal abroad that you cannot inspect. Your own analysts put the substitute at roughly three times the carbon intensity." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    id: "arizona", title: "Arizona", sub: "Oak Flat", realm: "land", art: "oakflat",
    intro: "Copper for a quarter of the country, seven thousand feet down. The only economic way to reach it is block caving: you undercut the ore and let the surface fall into the hole. Apache families hold ceremonies on that surface, and as of March 2026 they do it on land that belongs to the mining company.",
    cast: [
      { who: "Marcus, 29", role: "ironworker" },
      { who: "Ruth, 70", role: "grandmother" },
      { who: "Hal, 48", role: "grid engineer" }
    ],
    beats: [
      {
        type: "choice", art: "oakflat",
        place: "Oak Flat", year: "2028",
        situation: "The land is already gone. Title passed to Resolution Copper on 16 March 2026 and in September the appeals court refused to look at it again. The crater will be about two miles across. Nothing left on your desk decides whether — only how fast, and what comes back the other way.",
        ask: "Subsidence is not a risk here. It is the method working as designed.",
        voices: [
          { who: "Ruth, 70", role: "grandmother", line: "My granddaughter had her ceremony on that ground. You are asking what it is worth. It isn't a number." },
          { who: "Hal, 48", role: "grid engineer", line: "Every substation I build needs forty tonnes of copper. My queue is eleven states long." }
        ],
        detail: [
          "The exchange was authorised in 2014 by a rider attached to a must-pass defence bill, rather than passed on its own merits.",
          "The religious-freedom case ran for years and lost: declined by the Supreme Court in May 2025, injunction refused by a divided appeals panel in March 2026, rehearing refused that September.",
          "A repeal bill — the Save Oak Flat from Foreign Mining Act — was introduced in December 2025 and has not moved. Repeal is the only remaining lever that reaches the land itself.",
          "Block caving is cheap precisely because the subsidence is free."
        ],
        discuss: [
          "Can a sacred place be compensated? What would that look like?",
          "Every court said this was lawful. Does that settle anything about whether it was right?",
          "Does it matter that this passed inside a defence bill, and that it took twelve years to finish?"
        ],
        choices: [
          { key: "A", label: "Let the plan stand", cost: 0, sub: "Free. Every court has already agreed.",
            d: { metal: 20, trust: -16, nature: -14 }, flag: "oakflat_lost",
            out: { t: "Nothing happens, which is the decision", x: "You do not have to sign anything. The copper is real and it genuinely changes the national picture. Ceremonies continue for as long as the surface holds, which engineers put at twelve to twenty years." } },
          { key: "B", label: "Back the repeal", cost: 2, sub: "Undo the 2014 rider. Slow, and it may fail.",
            d: { metal: -6, trust: 16, nature: 12 }, flag: "oakflat_saved",
            out: { t: "Taken back, at the eleventh hour", x: "The repeal passes on its fourth attempt and the land returns to the public. Copper prices are not sentimental: the gap fills from Chile, Peru and a smelter in Indonesia burning captive coal. Your grid build slips two years in eleven states, and two senators who voted with you lose their seats over it." } },
          { key: "C", label: "Backfill it", cost: 3, sub: "No crater. Half the copper, twice the cost.",
            d: { metal: 13, nature: 4, trust: 6 }, flag: "oakflat_backfill",
            out: { t: "Half a mine", x: "The engineering works; the economics only work because you pay for them. One of the two companies sells its stake rather than accept the terms. Marcus says it is the first offer anyone made that wasn't an insult." } }
        ]
      },
      {
        type: "spend", art: "oakflat",
        place: "What you owe", year: "2029",
        situation: "Whatever you decided, people here now want something from you. Each of these is a real programme with a real price.",
        ask: "Buy what you can live with.",
        voices: [
          { who: "Marcus, 29", role: "ironworker", line: "You can't move a church by moving the pews. And I weld for a living. Both things are true." }
        ],
        detail: [
          "Compensation for a sacred site is contested on its own terms: accepting payment can be read as agreeing it had a price.",
          "Apprenticeships are the one thing both sides have ever asked for at the same time."
        ],
        discuss: [
          "Is a payment for a sacred site compensation, or a receipt?",
          "Which of these would the community have chosen if you'd asked first?",
          "You are spending from the same ten coins as Nevada. Did that change what you picked?"
        ],
        options: [
          { id: "easement", cost: 3, label: "Permanent cultural easement", note: "Legal protection for the ceremony ground, forever.",
            d: { trust: 16, nature: 6 }, flag: "easement",
            yes: "The easement holds in law regardless of who owns the mine next. Ruth attends the signing and does not speak.",
            no:  "There is no durable protection. The next administration can and does revisit it." },
          { id: "appr", cost: 2, label: "Apprenticeships", note: "Paid training, hiring preference, local.",
            d: { trust: 10, metal: 3 }, flag: "appr",
            yes: "Marcus runs the first cohort. Nineteen of twenty-two finish.",
            no:  "The skilled roles go to contractors who leave when the shaft is sunk." },
          { id: "monitor", cost: 2, label: "Independent subsidence monitoring", note: "Data the community owns.",
            d: { nature: 10, trust: 6 }, flag: "monitor",
            yes: "The survey data is public and community-held, which turns out to matter more than anyone expected in 2033.",
            no:  "The only subsidence data belongs to the company. Nobody else can check it." },
          { id: "nothing", cost: 0, label: "Nothing further", note: "Free. The decision was the decision.",
            d: { trust: -10 },
            yes: "You close the file. The phrase “consultation fatigue” appears in your own agency's review two years later.",
            no:  "" }
        ]
      },
      {
        type: "slider", art: "oakflat",
        place: "The schedule", year: "2030",
        situation: "If the mine is going ahead, you can slow the caving. Every year you delay subsidence is a year of ceremonies, and a year of copper the grid doesn't get.",
        ask: "How many years of surface access do you guarantee?",
        slider: { key: "years", min: 0, max: 30, step: 5, start: 10, unit: " yrs", labelLow: "None", labelHigh: "Thirty years" },
        voices: [
          { who: "Hal, 48", role: "grid engineer", line: "Every year you hold that surface is a year I can't energise the western interconnect." }
        ],
        detail: [
          "Slowing the cave is technically straightforward and financially brutal: the capital is spent either way, the revenue arrives later.",
          "Thirty years is roughly a generation. Ruth's great-granddaughter would have her ceremony there."
        ],
        discuss: [
          "Is a guaranteed delay a protection, or just a slower version of the same ending?",
          "Who should hold this decision — the regulator, the company, or the families?",
          "What is the honest way to describe this to someone who will be alive in 2060?"
        ],
        bands: [
          { max: 5, t: "Straight down", d: { metal: 10, trust: -12, nature: -6 },
            x: "The cave runs at full rate. The surface starts moving in the fourth year, visibly, and the ceremonies move to a site that everyone agrees is not the same." },
          { max: 15, t: "A decade", d: { metal: 8, trust: 2 },
            x: "Ten years of ceremonies, then the ground goes. Long enough that the families plan around it, short enough that nobody pretends it is a reprieve." },
          { max: 30, t: "A generation", d: { metal: -4, trust: 14, nature: 4 }, flag: "generation",
            x: "Thirty years. Ruth's great-granddaughter has her ceremony on that ground. The copper arrives late enough that two of your grid deadlines are already missed by the time it does." }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    id: "market", title: "The market", sub: "Everything gets cheaper, and worse", realm: "land", art: "crash",
    intro: "Lithium falls eighty percent. Indonesia floods the market with nickel smelted on captive coal — the cheapest in the world and the dirtiest. Everything you approved is suddenly worth less than it costs to run.",
    cast: [
      { who: "Ray, 46", role: "haul driver" },
      { who: "Mei, 42", role: "trade counsel" },
      { who: "Dana, 51", role: "developer" }
    ],
    beats: [
      {
        type: "budget", art: "crash",
        place: "The crash", year: "2031",
        situation: "You can hold the line with money, or you can let the cheapest producer on Earth set the terms.",
        ask: "Spend up to four coins.",
        budget: {
          max: 4,
          lines: [
            { id: "floor", label: "Floor price", note: "Keeps the mines open. Never ends quietly.", per: { metal: 5, trust: 3 } },
            { id: "tariff", label: "Carbon tariff", note: "Tax dirty imports. Expect retaliation.", per: { metal: 4, nature: 4, trust: 1 } },
            { id: "refine", label: "Refining", note: "The real chokepoint, and it isn't yours.", per: { metal: 6, nature: -1 } }
          ]
        },
        voices: [
          { who: "Mei, 42", role: "trade counsel", line: "Tariff them and they will find the one export your senators care about. They always do." }
        ],
        detail: [
          "China refines somewhere between 60 and 90 percent of global supply depending on the metal. You can open every mine in Nevada and still ship the ore to a competitor to make it useful.",
          "Western mines are not failing because they are bad mines. They are failing because someone else will lose money for longer and call it industrial policy.",
          "Coins you keep here are coins available in the deep. Coins you keep forever are coins wasted."
        ],
        discuss: [
          "Is a mine that survives only on subsidy worth subsidising? For how long?",
          "Which of these three still matters in twenty years?",
          "You are bidding against a state that does not need to make a profit. What is your actual theory of winning?"
        ],
        outcomes: {
          floor:  "The mines stay open. The cost becomes a budget line your opponents read aloud every year, and within eighteen months two more companies arrive asking why they didn't get the same deal.",
          tariff: "Battery prices rise and it is instantly blamed on climate policy by people who oppose climate policy. A trading partner hits your farm exports. The carbon-intensity rule quietly turns out to be the most durable thing you build.",
          refine: "The least popular and most useful thing on the list. Refineries don't care whether the feed is mined or recycled, which makes this the one asset still earning in 2040.",
          none:   "You let the market do it. Prices fall, adoption genuinely accelerates, your mines close, and the whole chain now runs through one country's refineries."
        }
      },
      {
        type: "choice", art: "crash",
        place: "The layoff", year: "2031",
        situation: "Second layoff in four years, from a mine your council called strategic. Nine hundred people, one county.",
        ask: "Ray is in the third row of the meeting.",
        voices: [
          { who: "Ray, 46", role: "haul driver", line: "You people used the word strategic. I would like to know what it buys me." }
        ],
        detail: [
          "Transition funding for mining communities has a bad record: the money usually arrives after the people have left.",
          "This is the moment the politics of the energy transition is actually decided, and it is not decided in a capital city."
        ],
        discuss: [
          "Who owes these workers anything — the company, the state, or the people who wanted the mine?",
          "What is the difference between a severance cheque and a plan?",
          "If you skip this, what do you expect the next mining town to do when you arrive?"
        ],
        choices: [
          { key: "A", label: "Fund retraining", cost: 2, sub: "Two years, locally run.",
            d: { trust: 14 }, flag: "ray_retrained",
            out: { t: "Two years of classes", x: "About half the cohort lands somewhere better. Ray gets a maintenance certification and a job forty minutes away that does not disappear when lithium does. He is the reason three neighbours enrol." } },
          { key: "B", label: "Severance only", cost: 1, sub: "A cheque and a handshake.",
            d: { trust: 2 },
            out: { t: "Eleven weeks of pay", x: "It covers the winter. By March the question of what happens next is entirely Ray's problem, which is how these things are usually arranged." } },
          { key: "C", label: "Nothing", cost: 0, sub: "Free. The market did this, not you.",
            d: { trust: -14, metal: 2 },
            out: { t: "The meeting ends early", x: "You are technically correct that the price crash was not your decision. The Castellanos family moves to Reno in August. Ray does not vote for anyone who mentions the energy transition again." } }
        ]
      },
      {
        type: "choice", art: "crash",
        place: "The cheap tonne", year: "2032",
        situation: "A supplier offers all the nickel you need at two-thirds the price. It is smelted on captive coal, and the tailings go into a bay that three villages fish.",
        ask: "Nobody in your country will ever see it.",
        voices: [
          { who: "Mei, 42", role: "trade counsel", line: "Legally this is clean. Every box is ticked. I want to be precise that I am answering a different question than the one you asked." }
        ],
        detail: [
          "Deep-sea tailings placement is banned or abandoned in most jurisdictions and still used in a few.",
          "Refusing raises your costs and lowers nobody's emissions unless others refuse too.",
          "This is the same trade as every earlier chapter, with the affected people moved offshore where you will never meet them."
        ],
        discuss: [
          "Is there a moral difference between digging a hole and buying from someone who digs it?",
          "You protected a flower in Nevada. Is this consistent?",
          "Who would have to refuse, together, for refusing to work?"
        ],
        choices: [
          { key: "A", label: "Buy it", cost: 0, sub: "Free, fast, cheap.",
            d: { metal: 16, nature: -14, trust: -8 }, flag: "bought_dirty",
            out: { t: "The tonnage arrives", x: "Your numbers recover in a single quarter and vehicle prices fall, which genuinely accelerates adoption. The bay is someone else's jurisdiction, someone else's fishery and, as your legal team notes in writing, someone else's problem." } },
          { key: "B", label: "Refuse", cost: 0, sub: "Free, and it costs you the number.",
            d: { metal: -4, nature: 8, trust: 8 }, flag: "refused_dirty",
            out: { t: "You pass", x: "Two other buyers take the cargo within a week at the same price. Your refusal changes the destination of the nickel and nothing else, which your critics point out and your own analysts confirm." } },
          { key: "C", label: "Buy it with conditions", cost: 2, sub: "Audited standards, paid for by you.",
            d: { metal: 14, nature: -4, trust: 2 }, flag: "conditioned",
            out: { t: "An audit regime nobody asked for", x: "You pay for inspectors the supplier would never have hired. Two of three villages see the discharge rerouted. It is a real improvement and a long way from clean, and it only happened because you spent money on people who cannot vote for you." } }
        ]
      }
    ]
  },

  /* ================================================================ */
  {
    id: "deep", title: "The deep", sub: "Four kilometres down", realm: "sea", art: "deep",
    intro: "Metal lies loose on the abyssal floor: nickel, cobalt, copper, in lumps that took ten million years to grow. Nobody owns it. It is the common heritage of mankind, and the rulebook for mining it was never finished.",
    cast: [
      { who: "Amb. Renga", role: "a sponsoring state" },
      { who: "Dr Sørensen, 47", role: "deep-sea ecologist" },
      { who: "Tomas, 55", role: "tuna fleet owner" }
    ],
    beats: [
      {
        type: "choice", art: "deep",
        place: "Clarion-Clipperton Zone", year: "2032",
        situation: "A sponsoring state triggered the two-year rule in June 2021. It lapsed in July 2023 with no mining code finished, and there is still none. Applications can now be filed into a legal vacuum, and one has been — not at the Authority, but in a national capital.",
        ask: "The contractor files in six weeks. You are not in the room where it is ruled on.",
        voices: [
          { who: "Amb. Renga", role: "a sponsoring state", line: "Phosphate built our hospital and ate four-fifths of our island. Now you tell us to be careful with the only thing we have left." },
          { who: "Dr Sørensen, 47", role: "ecologist", line: "We've named maybe a tenth of the animals down there. A track scraped in 1989 is still visible." }
        ],
        detail: [
          "“Common heritage of mankind” — Arvid Pardo, UN, 1967. UNCLOS made it law and built the International Seabed Authority to license the seabed for everyone's benefit.",
          "Your country signed UNCLOS and never ratified it: no vote at the Authority, and not bound by it either. It has had its own seabed statute since 1980, unused for forty-six years.",
          "In 2026 a contractor used it rather than wait — certified in May, a decision due early 2027. The same month, a tribunal ordered the Authority to respect that contractor's due process; its Council renewed the contract anyway.",
          "Thirty-plus states want a moratorium. BMW, Google, Samsung and Volvo have pledged not to buy the metal."
        ],
        discuss: [
          "“Common heritage of mankind” — who is that, exactly, and who speaks for them?",
          "No village, no sacred site, no tailings dam. Is the seabed therefore the better option?",
          "What do wealthy states owe a small one for asking it to wait?"
        ],
        choices: [
          { key: "A", label: "Mine it by the rules", cost: 1, sub: "Work inside the treaty you never ratified.",
            d: { metal: 17, nature: -8, trust: -2 }, flag: "sea_mine",
            out: { t: "A seat you aren't entitled to", x: "You get a strict-ish code, a benefit-sharing fund and observers aboard. You are also accused of writing rules for a club you refuse to join, which is accurate." } },
          { key: "B", label: "Licence it alone", cost: 0, sub: "Free. The 1980 statute, your own regulator, no waiting.",
            d: { metal: 22, nature: -16, trust: -12 }, flag: "sea_mine, unilateral",
            out: { t: "Outside the room", x: "Licences issue in four months and the metal moves fast. Thirty-one states call it a repudiation of the common heritage. Two other powers announce their own licences on your reasoning, which you cannot object to without describing yourself." } },
          { key: "C", label: "Lead a moratorium", cost: 2, sub: "Hold the coalition together. It isn't free.",
            d: { metal: -6, nature: 16, trust: 8 }, flag: "moratorium",
            out: { t: "A pause, and a bill for it", x: "Thirty-eight states hold the line and no ISA licence issues this year. Renga votes against you on the floor, at length, with the phosphate numbers. “You bought a delay,” says Renga, “and sent us the invoice.”" } }
        ]
      },
      {
        type: "slider", art: "plume", requires: "sea_mine",
        place: "The plume", year: "2033",
        situation: "The collector works. The sediment it doesn't want has to go back in the water, and where you put it is now the whole argument.",
        ask: "How deep do you discharge?",
        slider: { key: "depth", min: 0, max: 100, step: 10, start: 20, unit: "%", labelLow: "Near the surface (cheap)", labelHigh: "At the seafloor (costly)" },
        voices: [
          { who: "Tomas, 55", role: "tuna fleet owner", line: "Four economies eat off that water column. Nobody asked us anything." },
          { who: "Dr Sørensen", role: "ecologist", line: "You want a number. I can get you one in nine years. The ship sails next month either way." }
        ],
        detail: [
          "Shallow discharge is far cheaper: less pipe, less power, more uptime. It also drifts into the band where tuna feed at night.",
          "A 2024 paper reports oxygen being produced at the abyssal seafloor, associated with the nodules themselves. It is contested, and nobody looked for it until now.",
          "The contractor has spent 1.4 billion dollars and investors are asking when the metal arrives."
        ],
        discuss: [
          "What evidence should be enough to stop something already running?",
          "Should the 1.4 billion already spent matter to your decision? Does it?",
          "Every earlier chapter had someone in the room. Who speaks for this one?"
        ],
        bands: [
          { max: 30, t: "Cheap, shallow, everywhere", d: { metal: 16, nature: -20, trust: -12 }, flag: "plume_shallow",
            x: "Production is excellent and the plume is a headline. The drift reaches the feeding band within the year and four Pacific economies file against you at the ISA, using your own observers' data." },
          { max: 70, t: "Mid-water compromise", d: { metal: 12, nature: -7, trust: 2 },
            x: "Deepening the discharge helps, measurably and insufficiently. The tuna states withdraw their objection and the scientists don't. Production holds at about eighty percent of plan." },
          { max: 100, t: "Returned to the floor", d: { metal: 2, nature: 10, trust: 8 }, flag: "plume_deep",
            x: "Near-seafloor discharge costs a third of your uptime and most of the contractor's margin. The benthic impact stays inside the licence area, which is the first unambiguously good environmental news of your tenure." }
        ]
      },
      {
        type: "choice", art: "vacuum", requires: "moratorium",
        place: "The vacuum", year: "2033",
        situation: "Your pause held two years, then met the limits of a coalition with no veto. Another consortium is working the eastern zone under a domestic permit, with no independent observers aboard. Renga's state has joined them.",
        ask: "Hold, bargain, or turn.",
        voices: [
          { who: "Amb. Renga", role: "a sponsoring state", line: "You asked us to wait. We waited. Then you went home to a country with electricity." }
        ],
        detail: [
          "A moratorium only binds the states that join it. The ISA cannot compel a non-party, and you are already outside UNCLOS.",
          "The Authority's own leverage is thinner than it looks: when it opened an inquiry into a contractor in 2026, a tribunal ordered it to respect that contractor's due-process rights and the Council renewed the contract anyway.",
          "The contractor's environmental data belongs to the contractor.",
          "Your metal number has not improved while you were being right."
        ],
        discuss: [
          "Is a moratorium others ignore better or worse than strict rules you help write?",
          "Renga's state waited and got nothing for it. What would have made waiting worth their while?",
          "What is a principle worth if it only binds the people who already agreed?"
        ],
        choices: [
          { key: "A", label: "Hold the line", cost: 1, sub: "Stay out. Fund the science nobody else will.",
            d: { nature: 10, trust: 8, metal: -4 }, flag: "held",
            out: { t: "Clean hands, no leverage", x: "Your research becomes the authoritative baseline, cited in every proceeding — including the ones that approve mining. You have no observers, no vote and no metal." } },
          { key: "B", label: "Trade recognition for rules", cost: 2, sub: "Recognise their licences. Demand observers and a real fund.",
            d: { metal: 11, nature: 4, trust: -4 }, flag: "bargained",
            out: { t: "The deal", x: "You get observers aboard, a discharge standard with teeth and a fund that pays states with no contractor of their own. You also legitimise what you spent two years calling illegitimate." } },
          { key: "C", label: "Reverse and compete", cost: 0, sub: "Free. The pause failed.",
            d: { metal: 18, nature: -16, trust: -16 }, flag: "reversed",
            out: { t: "The turn", x: "Your licences issue within the year. The thirty-eight states that joined your coalition read the announcement at the same time as the press; two had passed domestic laws on the strength of your assurances." } }
        ]
      },
      {
        type: "spend", art: "deep",
        place: "The last of it", year: "2034",
        situation: "Your term ends in March. Whatever coins are left buy exactly three things, and nobody will fund any of them after you go.",
        ask: "Spend it or lose it.",
        voices: [
          { who: "Dr Sørensen", role: "ecologist", line: "Whatever you leave unspent goes back to a treasury that has never once sent it back down here." }
        ],
        detail: [
          "Benefit sharing is the part of the common heritage principle that has never actually been implemented at scale.",
          "A baseline survey done before mining is worth more than any survey done after, and can only be done once.",
          "Unspent coins are not savings. They are things you decided not to do."
        ],
        discuss: [
          "If you have coins left, what does that say about the earlier chapters?",
          "Which of these outlives your term, and which is a gesture?",
          "Who benefits from the common heritage of mankind, in practice?"
        ],
        options: [
          { id: "fund", cost: 3, label: "Benefit-sharing fund", note: "Pays states with no contractor of their own.",
            d: { trust: 16 }, flag: "fund",
            yes: "The fund pays out for the first time in 2035. Renga's share is smaller than his country's phosphate royalties were in 1975, and it is real money that arrives every year.",
            no:  "The common heritage of mankind remains a phrase in a treaty." },
          { id: "baseline", cost: 2, label: "Baseline survey", note: "Map it before it is mined. One chance.",
            d: { nature: 14 }, flag: "baseline",
            yes: "Sørensen gets her ship. The survey describes 1,400 species, most of them new, and becomes the thing every later case is argued against.",
            no:  "Mining proceeds against a baseline nobody measured, so no damage can ever be proven." },
          { id: "recycle", cost: 2, label: "Recycling capacity", note: "The mine above ground. Slow, boring, compounding.",
            d: { metal: 6, nature: 8 }, flag: "recycle",
            yes: "It closes almost none of the gap by 2034 and a meaningful share of it by 2045, which is either too late or exactly on time depending on who you ask.",
            no:  "The fleet keeps growing and every tonne still comes out of the ground." }
        ]
      }
    ]
  }
];

/* ================================================================== */
/* Endings read the whole run: the number, the damage, and who you paid */

const ENDINGS = [
  { id: "delivered_clean", art: "endGood",
    test: (s) => s.metal >= METAL_TARGET && s.trust >= 55 && s.nature >= 50,
    title: "You hit the number, and you paid for it",
    text: "The grid gets built. So does a tribal monitoring board, an easement that outlives three administrations, and a seabed baseline that every later case is argued against. You spent almost everything you had and you spent it on people who could not pay you back. It is the rarest outcome in this game and the hardest to explain to a committee." },
  { id: "delivered_dirty", art: "endBad",
    test: (s) => s.metal >= METAL_TARGET && (s.trust < 40 || s.nature < 38),
    title: "You hit the number",
    text: "On the production chart it is the most successful programme in two generations. Behind the chart: a crater, a flower that exists only in greenhouses, a bay three villages used to fish, and a legal order for the ocean floor that you broke and others copied. Nobody will take the metal back. Nobody will give the rest of it back either." },
  { id: "delivered", art: "endMixed",
    test: (s) => s.metal >= METAL_TARGET,
    title: "You hit the number, more or less honestly",
    text: "The grid gets built roughly on time, at a cost that is visible if you look for it and invisible if you don't. Some people got protected because you could afford them that month. That is not a principle, it is a budget, and everyone involved can tell the difference." },
  { id: "short_clean", art: "endMixed",
    test: (s) => s.nature >= 50 && s.trust >= 55,
    title: `Short of the number, and clean about it`,
    text: "Almost nothing was destroyed on your watch, and the grid is late in a decade where late is measured in degrees. The metal you refused was mined anyway, somewhere with weaker law and no reporters. You can defend every individual decision. The sum of them is a slower transition and a quieter conscience, and you will spend the rest of your career being asked whether that was a trade you were entitled to make." },
  { id: "short_broke", art: "endBad",
    test: (s) => s.metal < METAL_TARGET - 18,
    title: "You missed it badly",
    text: "Eleven states miss their grid deadlines. The programme is wound up, its powers split three ways, and the next council is appointed specifically because it will not do what you did. Several of the things you protected stay protected, mostly by inertia, for about four years." },
  { id: "short", art: "endMixed", test: () => true,
    title: "Short",
    text: "Some metal, some damage, some trust, a great deal of litigation, and a number you did not reach. The transition runs at about three-quarters of the pace the models need — both a failure and roughly what everyone else managed this decade. The same arguments begin again, about the next valley and the next stretch of seafloor." }
];

/* who got what, assembled from the flags you set along the way */
const FATES = [
  { who: "Lena", if: "lena_backed", yes: "sits on the monitoring board she was promised, and still calls the agreement a settlement rather than consent.",
    no: "stopped returning your office's calls in 2026. Her granddaughter's arrest record is still there." },
  { who: "Ray", if: "ray_retrained", yes: "has a maintenance job forty minutes away that did not disappear when lithium did.",
    no: "left for Reno. He does not vote for anyone who mentions the energy transition." },
  { who: "Priya", if: "flower_saved", yes: "has counted a stable population for six years running. She still will not call it a win.",
    no: "publishes the final count in 2033. The species persists in two greenhouses and nowhere else." },
  { who: "Ruth", if: "easement", yes: "watched her great-granddaughter's ceremony on ground that is now protected in law.",
    no: "was told the ground would be available for as long as it lasted, which was true." },
  { who: "Renga", if: "fund", yes: "collects a benefit-sharing payment every year. It is smaller than phosphate was, and it is real.",
    no: "stopped describing your country as a partner in 2033, in a speech that is still quoted." },
  { who: "Sørensen", if: "baseline", yes: "described 1,400 species before anyone mined them. Most of them were new.",
    no: "spent nine years documenting damage against a baseline nobody ever measured." }
];

const DEBRIEF = {
  questions: [
    "You had ten coins and harm was always free. Did that change what you chose, or only how you felt about it?",
    "Name the person you never spent anything on. Why them?",
    "Did “the common good” mean the same thing in Nevada and in the Pacific?",
    "Which decision would you defend in front of the person it affected?",
    "What would have to be true for there to be a clean option?"
  ],
  real: [
    ["Thacker Pass", "Real, and no longer hypothetical. Largest known US lithium resource, contested on sacred-site grounds while construction went ahead anyway: over 1,600 workers on site in 2026, a $2.23bn federal loan, GM holding 38%. The 1872 Mining Law really does charge no federal royalty."],
    ["Tiehm's buckwheat", "Real, listed endangered in 2022. Ten acres, nowhere else. About 40% of the population was destroyed in 2020 — investigators blamed ground squirrels in a drought. A federal court upheld the mine's approval in March 2026; the appeal is pending."],
    ["Oak Flat", "Real, and already decided. The 2014 land exchange rider, the Supreme Court declining the religious-freedom appeal in May 2025, title transferring to Resolution Copper on 16 March 2026, the full appeals court refusing to rehear it that September. Block caving really would subside the surface."],
    ["The crash", "Real. Lithium fell roughly 80% from its peak and Indonesian nickel reshaped the market. Refining concentration is the structural fact underneath it."],
    ["Common heritage", "Real. Arvid Pardo's 1967 speech, then UNCLOS and the International Seabed Authority. The US signed UNCLOS and never ratified it, so it cannot sponsor a contractor at the Authority at all."],
    ["The two-year rule", "Real. Nauru triggered it in June 2021 for its sponsored contractor. It lapsed in July 2023 with no mining code finished, and there is still none."],
    ["The second door", "Real, and the newest thing in this game. In 2026 a contractor applied under the 1980 US seabed statute instead of waiting for the Authority. NOAA certified the exploration application in May and opened an environmental impact statement in August; a decision is expected in early 2027."],
    ["A weaker Authority", "Real. In July 2026 the Seabed Disputes Chamber ordered the ISA to respect a contractor's due-process rights, and the Council extended that contractor's exploration contract five years days later, with a compliance inquiry still open."],
    ["Dark oxygen", "Real and contested. A 2024 paper reported oxygen production at the abyssal seafloor associated with nodules."],
    ["Nauru", "Real. Phosphate made it briefly rich and left four-fifths of the island stripped. It is also the state that opened the door to the seabed."],
    ["The ten coins", "Invented, and the most honest thing in the game. In the books, protection is the thing that has to be funded and harm is the default."],
    ["The people", "Fictional composites. Every place, law, company, ruling and date is real and current to October 2026; no words are put in a real person's or government's mouth."]
  ]
};
