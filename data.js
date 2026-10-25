/* ------------------------------------------------------------------
   NO CLEAN HANDS — scenes.

   Short on purpose. Everything here gets read aloud in a classroom, so a
   situation is about 40 words, a voice is a line or two, and a choice is
   a handful. The arguing happens in the room, not on the screen.

   Built on: Ernest Scheyder, "The War Below" (2024); Olive Heffernan,
   "The High Seas" (2024), ch. 1, 4, 12.

   Places, laws, companies and cases are real. People are fictional
   composites. The Republic of Mareva is fictional, modelled on Nauru.
------------------------------------------------------------------- */

const METERS = [
  { key: "trust",  label: "Trust",  full: "Community trust" },
  { key: "eco",    label: "Nature", full: "Living world" },
  { key: "supply", label: "Metal",  full: "Secured supply" },
  { key: "cap",    label: "Clout",  full: "Political capital" },
];

const PROLOGUE = {
  title: "No Clean Hands",
  sub: "Lithium, copper, and the battle for the deep",
  lines: [
    "You run the council that decides where the metal comes from.",
    "An electric car needs six times the minerals of a petrol one. The grid needs copper by the mountain. None of it is clean, and someone lives on top of all of it.",
    "Six decisions. No free options. Argue it out."
  ],
  note: "Real places and laws. The people are composites written for this game."
};

const SCENES = [
  {
    id: "thacker", art: "thacker", realm: "land",
    place: "Thacker Pass, Nevada", year: "2026",
    situation: "The biggest lithium deposit in the country sits on ground where Paiute people say a massacre happened. A law from 1872 says dig, and pay the public nothing. The county needs the jobs. Bulldozers start Monday.",
    voice: { who: "Lena, 58, tribal council", line: "You can call this climate action. Say it to my face first." },
    voice2: { who: "Ray, 44, laid off", line: "My kids think we're moving to Reno. Tell me which part of that helps the planet." },
    discuss: [
      "Is there a price at which a sacred site becomes negotiable?",
      "If not here, where does the lithium come from — and who lives there?"
    ],
    choices: [
      { key: "A", label: "Dig Monday", sub: "The permits are legal.",
        d: { supply: 14, cap: 6, trust: -18, eco: -10 },
        out: { t: "The gate opens", x: "Construction starts. A protest camp holds eleven weeks and fourteen people are arrested, one of them Lena's granddaughter. Ray is hired in week three and stops looking at listings in Reno." } },
      { key: "B", label: "Pause 18 months", sub: "Consult properly this time.",
        d: { trust: 14, cap: -10, supply: -8, eco: 2 },
        out: { t: "Eighteen months", x: "You get a real record and a tribal monitoring plan. You also get a document instead of a decision. Two investors move to a project abroad with weaker rules. Ray's family moves to Reno in August." } },
      { key: "C", label: "Shrink it, share it", sub: "Smaller pit. Royalties to the tribes.",
        d: { trust: 9, eco: 6, cap: -12, supply: 4 },
        out: { t: "A smaller hole", x: "You force a royalty the 1872 law never required, and a third of the lithium stays in the ground. Lena votes against the deal and signs it anyway: “They'll call this consent. Write down that I called it a settlement.”" } }
    ]
  },

  {
    id: "buckwheat", art: "buckwheat", realm: "land",
    place: "Rhyolite Ridge, Nevada", year: "2026",
    situation: "Another lithium deposit, cheaper and easier than the last. On top of it grows Tiehm's buckwheat: ten acres, a few thousand plants, nowhere else on Earth. The waste pile is drawn right across them.",
    voice: { who: "Priya, 39, botanist", line: "Extinction is a small thing. Right up until it's permanent." },
    discuss: [
      "Is one plant species worth slowing a battery supply chain?",
      "Does that change if the replacement metal comes from a country with no endangered species law?"
    ],
    choices: [
      { key: "A", label: "Move the flowers", sub: "Transplant them, then mine.",
        d: { supply: 12, cap: 3, eco: -14, trust: -4 },
        out: { t: "Year three of ten", x: "The greenhouse work goes beautifully. The transplants die anyway — under a fifth survive in the field. The mine is producing. Priya keeps counting, and the number keeps going down." } },
      { key: "B", label: "Move the mine", sub: "Redesign around them. 18 months, a fifth of the profit.",
        d: { eco: 10, trust: 5, supply: 4, cap: -8 },
        out: { t: "A more expensive mine", x: "All six patches survive behind fencing. The mine opens late into a worse market and executives tell investors the delay was a government cost, which is true. Priya calls her stable count “not yet a loss.”" } }
    ]
  },

  {
    id: "oakflat", art: "oakflat", realm: "land",
    place: "Oak Flat, Arizona", year: "2027",
    situation: "Copper for a quarter of the country, seven thousand feet down. Reaching it means letting the surface collapse into a crater two miles wide. Apache families hold ceremonies on that surface. Congress approved the swap inside a defence bill.",
    voice: { who: "Marcus, 29, ironworker", line: "You can't move a church by moving the pews. And I weld for a living. Both things are true." },
    discuss: [
      "Can a sacred place be compensated? What would that look like?",
      "Block it and you still need the copper. Say out loud where it comes from instead."
    ],
    choices: [
      { key: "A", label: "Approve the swap", sub: "Congress already decided this.",
        d: { supply: 16, cap: 4, trust: -16, eco: -12 },
        out: { t: "Title transfers", x: "The copper is real and genuinely changes the national picture. Ceremonies continue for as long as the surface holds — engineers say twelve to twenty years. Marcus takes a job on the project and doesn't tell his sister for four months." } },
      { key: "B", label: "Kill it", sub: "Withdraw the land.",
        d: { trust: 16, eco: 12, supply: -18, cap: -14 },
        out: { t: "Withdrawn", x: "Oak Flat stays. Copper prices are not sentimental: the gap fills from Chile, Peru and a smelter in Indonesia burning captive coal. Your grid build slips two years. Marcus writes that he slept through the night for the first time in nine years." } },
      { key: "C", label: "Backfill it", sub: "No crater. Half the copper, twice the cost.",
        d: { supply: 6, eco: 4, trust: 4, cap: -12 },
        out: { t: "Half a mine", x: "The engineering works; the economics only work because you guarantee the price. One of the two companies sells its stake rather than accept. Marcus calls it the first offer that wasn't an insult — and says he still doesn't believe the surface will hold." } }
    ]
  },

  {
    id: "crash", art: "crash", realm: "land",
    place: "The crash", year: "2028",
    situation: "Lithium falls eighty percent. Indonesia floods the market with nickel smelted on captive coal — the cheapest in the world and the dirtiest. Every mine you approved is suddenly worth less than it costs to run.",
    voice: { who: "Ray, 46", line: "Second layoff in four years. From a mine you people called strategic." },
    discuss: [
      "Is a mine that survives only on subsidy worth subsidising?",
      "Cheap imports make the transition faster. Who pays for that, and where do they live?"
    ],
    choices: [
      { key: "A", label: "Prop them up", sub: "Guarantee a floor price.",
        d: { supply: 12, trust: 6, cap: -16, eco: -2 },
        out: { t: "The cheque clears", x: "The mines stay open and Ray is recalled. The cost becomes a budget line your opponents read aloud every year. Within eighteen months two more companies arrive asking why they didn't get the same deal." } },
      { key: "B", label: "Tariff the dirty metal", sub: "Tax imports by carbon intensity.",
        d: { supply: 10, cap: -8, eco: 6, trust: 2 },
        out: { t: "Retaliation, on schedule", x: "Projects restart and battery prices rise, instantly blamed on climate policy by people who oppose climate policy. A trading partner hits your farm exports. Ray keeps his job; his brother, who farms, loses a contract." } },
      { key: "C", label: "Buy cheap abroad", sub: "Let them fail. Decarbonise faster.",
        d: { supply: -6, cap: 10, trust: -14, eco: -10 },
        out: { t: "Faster, cheaper, fragile", x: "EV prices drop and adoption really does accelerate. Your mines close. The emissions you avoided show up in someone else's air, and the supply chain now runs through one country's refineries. Ray doesn't get a third call." } }
    ]
  },

  {
    id: "deep", art: "deep", realm: "sea",
    place: "The Clarion-Clipperton Zone", year: "2029",
    situation: "Four kilometres down, metal lies loose on the floor: nickel, cobalt, copper, in lumps that took ten million years to grow. Nobody owns it. It is the common heritage of mankind, and the rulebook for mining it was never finished.",
    voice: { who: "Amb. Renga, Rep. of Mareva", line: "Phosphate built our hospital and ate four-fifths of our island. Now you tell us to be careful with the only thing we have left." },
    voice2: { who: "Dr Sørensen, ecologist", line: "We've named maybe a tenth of the animals down there. A track scraped in 1989 is still visible." },
    discuss: [
      "“Common heritage of mankind” — who is that, exactly, and who speaks for them?",
      "No village, no sacred site, no tailings dam. Is the seabed therefore the better option?"
    ],
    choices: [
      { key: "A", label: "Mine it by the rules", sub: "Work inside the treaty you never ratified.",
        d: { supply: 12, cap: -4, eco: -8, trust: -2 }, flags: ["sea_mine"],
        out: { t: "A seat you aren't entitled to", x: "You get a strict-ish code, a benefit-sharing fund and observers aboard. You are also accused of writing rules for a club you refuse to join, which is accurate. Mareva's first payment is smaller than its phosphate royalties were in 1975." } },
      { key: "B", label: "Mine it alone", sub: "Use your own 1980 law. Don't wait for anyone.",
        d: { supply: 18, cap: -18, eco: -14, trust: -10 }, flags: ["sea_mine"],
        out: { t: "Outside the room", x: "Licences issue in four months and the metal moves fast. Thirty-one states call it a repudiation of the common heritage. Two other powers announce their own licences on your reasoning — which you can't object to without describing yourself." } },
      { key: "C", label: "Lead a moratorium", sub: "Nothing moves until the science is in.",
        d: { eco: 16, trust: 8, supply: -14, cap: -6 }, flags: ["moratorium"],
        out: { t: "A pause, and a bill for it", x: "Thirty-eight states hold the line and no licence issues this year. Mareva votes against you on the floor, at length, with the phosphate numbers. “You bought a delay,” says Renga, “and sent us the invoice.”" } }
    ]
  },

  {
    id: "plume", art: "plume", realm: "sea", requires: "sea_mine",
    place: "The plume", year: "2031",
    situation: "The collector works. The sediment cloud behind it does not behave: modelled to settle within a few kilometres, it is detectable at thirty, drifting into the water where tuna feed. Your contractor has spent 1.4 billion dollars.",
    voice: { who: "Dr Sørensen", line: "You want a number. I can get you one in nine years. The ship sails next month either way." },
    discuss: [
      "What evidence should be enough to stop something already running?",
      "Should the 1.4 billion already spent matter to your decision? Does it?"
    ],
    choices: [
      { key: "A", label: "Stop and study", sub: "Two years before any commercial run.",
        d: { eco: 14, trust: 6, supply: -12, cap: -8 },
        out: { t: "Two years", x: "The science comes back honestly mixed: the midwater plume is worse than modelled, the seafloor about as expected, recovery still unmeasurable on any timescale a licence cares about. Investors force a restructuring. Your data becomes the global discharge standard." } },
      { key: "B", label: "Keep going", sub: "Four more collectors, before the rules tighten.",
        d: { supply: 20, eco: -22, trust: -14, cap: -12 },
        out: { t: "The land rush", x: "You get the metal faster than any mine on land could deliver it. Three other consortia read your move correctly and file within the year. By the time binding rules exist the densest seabed is under contract, and there's no unmined baseline left to measure the damage against." } }
    ]
  },

  {
    id: "vacuum", art: "vacuum", realm: "sea", requires: "moratorium",
    place: "The vacuum", year: "2031",
    situation: "Your pause held two years, then met the limits of a coalition with no veto. Another consortium is mining the eastern zone under rules your scientists never saw, with no independent observers aboard. Mareva has joined them.",
    voice: { who: "Amb. Renga", line: "You asked us to wait. We waited. Then you went home to a country with electricity." },
    discuss: [
      "Is a moratorium others ignore better or worse than strict rules you help write?",
      "What's the moral difference between mining and buying from someone who mines?"
    ],
    choices: [
      { key: "A", label: "Hold the line", sub: "Stay out. Fund the science nobody else will.",
        d: { eco: 10, trust: 8, supply: -10, cap: -4 },
        out: { t: "Clean hands, no leverage", x: "Your research becomes the authoritative baseline, cited in every proceeding — including the ones that approve mining. You have no observers, no vote and no metal. Sørensen spends nine funded years documenting damage she has no power to stop." } },
      { key: "B", label: "Trade recognition for rules", sub: "Recognise their licences. Demand observers and a real fund.",
        d: { supply: 8, eco: 4, cap: 8, trust: -4 },
        out: { t: "The deal", x: "You get observers aboard, a discharge standard with teeth and a fund that pays states with no contractor of their own. You also legitimise what you spent two years calling illegitimate, and every government that held the line learns what your word is worth." } }
    ]
  }
];

const ENDINGS = [
  { id: "narrow", art: "endGood",
    test: (s) => s.trust >= 56 && s.eco >= 56 && s.supply >= 52 && s.cap >= 28,
    title: "The Narrow Path",
    text: "You got the metal without breaking the people living on top of it. From outside it looks like a lot of meetings. Two communities co-manage mines on their own land, the seabed code has teeth, and the grid is roughly on schedule." },
  { id: "clean", art: "endMixed",
    test: (s) => s.eco >= 60 && s.supply < 44,
    title: "Clean Hands, Empty Grid",
    text: "Almost nothing was destroyed on your watch. The transition is also late, in a decade where late gets measured in degrees. The metal you refused was mined anyway, somewhere with weaker law and no reporters watching." },
  { id: "cost", art: "endBad",
    test: (s) => s.supply >= 66 && (s.trust < 40 || s.eco < 38),
    title: "Metal at Any Cost",
    text: "On the production chart, the most successful industrial programme in two generations. Behind the chart: a crater in Arizona, a flower that exists only in greenhouses, and an order for the ocean floor that you broke and others copied." },
  { id: "sacrifice", art: "endBad",
    test: (s) => s.trust < 34 && s.eco < 42,
    title: "The Sacrifice Zone",
    text: "Every decision was defensible on its own. Together they drew a map, and the same kinds of places keep getting picked: rural, poor, Indigenous, or underwater and therefore voiceless. Sacrifice zones get assembled one reasonable trade-off at a time." },
  { id: "broke", art: "endMixed",
    test: (s) => s.cap < 26 && s.supply < 50,
    title: "Out of Clout",
    text: "You ran out of the one resource you couldn't mine. The council is folded into another agency, its powers split three ways. The projects you slowed are re-permitted by people who read your tenure as a warning about caring too much." },
  { id: "long", art: "endMixed", test: () => true,
    title: "The Long Compromise",
    text: "No disaster, no triumph. Some metal, some damage, some trust, a great deal of litigation. The transition runs at about three-quarters of the pace the models need — both a failure and the best anyone managed this decade." }
];

const DEBRIEF = {
  questions: [
    "Which decision was hardest — because of the facts, or because of the values?",
    "Did you ever pick the option you knew would lose on the meters?",
    "Did “the common good” mean the same thing on land and at sea?",
    "Name a fourth option nobody at your table proposed."
  ],
  real: [
    ["Thacker Pass", "Real. Largest known US lithium resource, contested on sacred-site grounds while construction went ahead. The 1872 Mining Law really does charge no federal royalty."],
    ["Tiehm's buckwheat", "Real, listed endangered in 2022. Ten acres, nowhere else. Much of the population was destroyed in 2020 — investigators blamed rodents in a drought."],
    ["Oak Flat", "Real. The land exchange was authorised in a 2014 defence bill, block caving really would subside the surface, and the religious-freedom case is real."],
    ["The crash", "Real. Lithium fell roughly 80% from its peak and Indonesian nickel reshaped the market. Refining concentration is the structural fact underneath it."],
    ["Common heritage", "Real. Arvid Pardo's 1967 speech, then UNCLOS and the International Seabed Authority. The US signed UNCLOS and never ratified it."],
    ["The two-year rule", "Real. Triggered in 2021, lapsed in July 2023 with no mining code finished."],
    ["Nauru", "Real, and the model for Mareva: phosphate made it briefly rich and left most of the island uninhabitable."],
    ["The people", "Fictional composites, and Mareva is a fictional state."]
  ]
};
