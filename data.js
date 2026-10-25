/* ------------------------------------------------------------------
   NO CLEAN HANDS — scenes.

   Six decisions, four shapes of decision:
     choice        pick one of three
     stakeholders  four people want four things; you can satisfy two
     slider        a continuous call, with the drawing moving as you drag
     budget        six units of money, three places to put them

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
  /* ---------------------------------------------------- 1. stakeholders */
  {
    id: "thacker", art: "thacker", realm: "land", type: "stakeholders",
    place: "Thacker Pass, Nevada", year: "2026",
    situation: "The biggest lithium deposit in the country sits on ground where Paiute people say a massacre happened in 1865. A law from 1872 says dig, and pay the public nothing. Four people are in your office and all four are right.",
    ask: "You can satisfy two of them. Pick two.",
    pickCount: 2,
    detail: [
      "Federal land. Under the General Mining Law of 1872 hardrock mining is the highest and best use of it, and there is no federal royalty.",
      "Humboldt County's median income is below the state's. The mine promises ~1,000 construction jobs and ~300 permanent, in a county of 20,000.",
      "Three nearby tribes say the consultation closed before it reached them."
    ],
    discuss: [
      "Who did you leave out, and what does that cost them?",
      "Is there a price at which a sacred site becomes negotiable?",
      "If not here, where does the lithium come from — and who lives there?"
    ],
    stakeholders: [
      { id: "tribe", who: "Lena, 58", role: "tribal council",
        ask: "No digging on the burial ground. Co-management, written down.",
        line: "You can call this climate action. Say it to my face first.",
        d: { trust: 16, eco: 6, supply: -6, cap: -6 },
        win: "The burial ground is fenced out of the plan and a tribal monitoring board gets real authority.",
        lose: "Lena's granddaughter is arrested at the gate in week six. She is nineteen and had never been arrested before." },
      { id: "county", who: "Ray, 44", role: "laid-off haul driver",
        ask: "Jobs. This year, not after an appeal.",
        line: "My kids think we're moving to Reno. Tell me which part of that helps the planet.",
        d: { trust: 8, supply: 6, cap: 4, eco: -6 },
        win: "Hiring starts in week three. Ray buys a used truck and stops looking at listings in Reno.",
        lose: "The Castellanos family moves to Reno in August. Ray takes warehouse work at two-thirds the pay." },
      { id: "company", who: "Dana, 51", role: "project developer",
        ask: "Permit certainty. No new conditions after financing closes.",
        line: "I can build this here, or I can build it in Argentina in half the time. Those are the options.",
        d: { supply: 16, cap: 6, trust: -10, eco: -8 },
        win: "Financing closes. First lithium lands two years ahead of any other American project.",
        lose: "The board moves the capital to a project abroad with weaker rules and a shorter timeline." },
      { id: "state", who: "Alvin, 63", role: "state water engineer",
        ask: "A hard cap on groundwater draw, and monitoring wells we control.",
        line: "This is a closed basin. Whatever you take out doesn't come back in my lifetime.",
        d: { eco: 14, trust: 4, supply: -4, cap: -6 },
        win: "The draw is capped and independently metered. The ranchers downstream stop calling your office.",
        lose: "The basin drops faster than modelled. Two ranching families sue in 2029 and the footage is very good television." }
    ],
    pairTitles: {
      "company|tribe":  "A smaller hole, and an argument about money",
      "county|tribe":   "Jobs and a fence line",
      "state|tribe":    "The slowest, most defensible mine in America",
      "company|county": "The gate opens Monday",
      "company|state":  "Built fast, metered tight",
      "county|state":   "A mine nobody financed"
    }
  },

  /* --------------------------------------------------------- 2. slider */
  {
    id: "buckwheat", art: "buckwheat", realm: "land", type: "slider",
    place: "Rhyolite Ridge, Nevada", year: "2026",
    situation: "Lithium and boron, cheap enough to actually make money. On top of it grows Tiehm's buckwheat: ten acres, a few thousand plants, nowhere else on Earth. You get to draw the fence.",
    ask: "How much of the habitat do you leave alone?",
    slider: { key: "keep", min: 0, max: 100, step: 5, start: 50, unit: "%", labelLow: "Mine all of it", labelHigh: "Touch none of it" },
    detail: [
      "Listed endangered in December 2022. About 40% of the known population was destroyed in 2020; investigators blamed ground squirrels in a drought, after months of accusations.",
      "Translocation has never worked for this species. Greenhouse survival is good; field survival runs under a fifth.",
      "Every acre you fence off is lithium that someone buys from somewhere else."
    ],
    discuss: [
      "Is one plant species worth slowing a battery supply chain?",
      "Does that change if the replacement metal comes from a country with no endangered species law?",
      "Who should draw this line — the regulator, the company, or a botanist?"
    ],
    voices: [
      { who: "Priya, 39", role: "botanist", line: "Extinction is a small thing. Right up until it's permanent." },
      { who: "Dana, 51", role: "developer", line: "Every acre you fence costs me margin I don't have at this lithium price." }
    ],
    bands: [
      { max: 15, t: "The ridge gets levelled",
        x: "The waste pile goes straight over the patches. Greenhouse propagation goes beautifully and the transplants die anyway — under a fifth survive their first field season. Priya keeps counting. The number keeps going down.",
        d: { supply: 16, cap: 4, eco: -20, trust: -8 } },
      { max: 45, t: "Most of it, and a promise",
        x: "You keep a token margin and approve the rest. Two patches survive, four don't. The recovery plan is extended twice. The mine makes money, which is the only part of this anyone predicted correctly.",
        d: { supply: 11, cap: 2, eco: -11, trust: -3 } },
      { max: 75, t: "A more expensive mine",
        x: "The redesign works. All six patches sit behind fencing and the mine opens eighteen months late into a worse market. Executives tell investors the delay was a government cost, which is true. Priya calls her stable count “not yet a loss”.",
        d: { eco: 11, trust: 6, supply: 4, cap: -8 } },
      { max: 100, t: "The deposit stays in the ground",
        x: "The species is safe and the lithium is not produced. The battery maker signs a ten-year supply deal abroad that you have no power to inspect. Your own analysts put the substituted material at roughly three times the carbon intensity.",
        d: { eco: 18, trust: 7, supply: -17, cap: -11 } }
    ]
  },

  /* --------------------------------------------------------- 3. choice */
  {
    id: "oakflat", art: "oakflat", realm: "land", type: "choice",
    place: "Oak Flat, Arizona", year: "2027",
    situation: "Copper for a quarter of the country, seven thousand feet down. Block caving is the only economic way to reach it, and block caving means the surface collapses into a crater two miles across. Apache families hold ceremonies on that surface.",
    ask: "Your recommendation goes to the President on Friday.",
    detail: [
      "Congress authorised the land exchange in 2014, attached to a must-pass defence bill rather than passed on its own.",
      "Subsidence is not a risk here. It is the method working as designed.",
      "Litigation has run for years on religious-freedom grounds."
    ],
    discuss: [
      "Can a sacred place be compensated? What would that look like?",
      "Block it and you still need the copper. Say out loud where it comes from instead.",
      "Does it matter that this passed inside a defence bill?"
    ],
    voices: [
      { who: "Marcus, 29", role: "ironworker", line: "You can't move a church by moving the pews. And I weld for a living. Both things are true." },
      { who: "Ruth, 70", role: "grandmother", line: "My granddaughter had her ceremony on that ground. You are asking what it is worth. It isn't a number." },
      { who: "Hal, 48", role: "grid engineer", line: "Every substation I build needs forty tonnes of copper. I have a queue eleven states long." }
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

  /* --------------------------------------------------------- 4. budget */
  {
    id: "crash", art: "crash", realm: "land", type: "budget",
    place: "The crash", year: "2028",
    situation: "Lithium falls eighty percent. Indonesia floods the market with nickel smelted on captive coal — the cheapest in the world and the dirtiest. Everything you approved is now worth less than it costs to run.",
    ask: "Six billion. Put it somewhere.",
    budget: {
      units: 6, unitLabel: "$1bn",
      lines: [
        { id: "floor", label: "Floor price", note: "Keep the mines open. Never ends quietly.",
          per: { supply: 3, trust: 2, cap: -3 } },
        { id: "tariff", label: "Carbon tariff", note: "Tax dirty imports. Expect retaliation.",
          per: { supply: 2, eco: 2, cap: -2, trust: 1 } },
        { id: "refine", label: "Refining", note: "The real chokepoint, and it isn't yours.",
          per: { supply: 3, cap: -1, eco: -1 } }
      ]
    },
    detail: [
      "Depending on the metal, China refines somewhere between 60 and 90 percent of global supply. You can open every mine in Nevada and still ship the ore to a competitor to make it useful.",
      "Western mines are not failing because they are bad mines. They are failing because someone else will lose money for longer and call it industrial policy.",
      "Whatever you don't spend, you keep as political capital."
    ],
    discuss: [
      "Is a mine that survives only on subsidy worth subsidising? For how long?",
      "Cheap imports make the transition faster. Who pays for that, and where do they live?",
      "Which of these three still matters in twenty years?"
    ],
    voices: [
      { who: "Ray, 46", role: "haul driver", line: "Second layoff in four years. From a mine you people called strategic." },
      { who: "Mei, 42", role: "trade counsel", line: "Tariff them and they will find the one export your senators care about. They always do." }
    ],
    outcomes: {
      floor:  "The mines stay open and Ray is recalled. The cost becomes a budget line your opponents read aloud every year, and within eighteen months two more companies arrive asking why they didn't get the same deal.",
      tariff: "Projects restart and battery prices rise, which is instantly blamed on climate policy by people who oppose climate policy. A trading partner hits your farm exports. The carbon-intensity rule quietly turns out to be the most durable thing you build.",
      refine: "The least popular and most useful thing on the list. Refineries don't care whether the feed is mined or recycled, which makes this the one asset still earning its keep in 2040.",
      none:   "You hold the money and let the market do it. EV prices fall and adoption genuinely accelerates. Your mines close, and the whole chain now runs through one country's refineries. Ray doesn't get a third call."
    }
  },

  /* --------------------------------------------------------- 5. choice */
  {
    id: "deep", art: "deep", realm: "sea", type: "choice",
    place: "The Clarion-Clipperton Zone", year: "2029",
    situation: "Four kilometres down, metal lies loose on the floor: nickel, cobalt, copper, in lumps that took ten million years to grow. Nobody owns it. It is the common heritage of mankind, and the rulebook for mining it was never finished.",
    ask: "Mareva's contractor files in six weeks. Your position decides what it files into.",
    detail: [
      "Arvid Pardo put “common heritage of mankind” to the UN in 1967. UNCLOS made it law and created the International Seabed Authority to license the seabed for everyone's benefit.",
      "A sponsoring state triggered the two-year rule in 2021. It lapsed in July 2023 with no mining code finished. Applications can be filed into that gap.",
      "Your country signed UNCLOS and never ratified it — no vote at the ISA, and not bound by it either. You have your own 1980 statute.",
      "Thirty-plus states want a moratorium. BMW, Google, Samsung and Volvo have pledged not to buy the metal."
    ],
    discuss: [
      "“Common heritage of mankind” — who is that, exactly, and who speaks for them?",
      "No village, no sacred site, no tailings dam. Is the seabed therefore the better option?",
      "What do wealthy states owe a small one for asking it to wait?"
    ],
    voices: [
      { who: "Amb. Renga", role: "Rep. of Mareva", line: "Phosphate built our hospital and ate four-fifths of our island. Now you tell us to be careful with the only thing we have left." },
      { who: "Dr Sørensen, 47", role: "deep-sea ecologist", line: "We've named maybe a tenth of the animals down there. A track scraped in 1989 is still visible." },
      { who: "Tomas, 55", role: "tuna fleet owner", line: "Four economies eat off that water column. Nobody asked us anything." }
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

  /* ------------------------------------------------------- 6a. slider */
  {
    id: "plume", art: "plume", realm: "sea", type: "slider", requires: "sea_mine",
    place: "The plume", year: "2031",
    situation: "The collector works. The sediment it doesn't want has to go back in the water, and where you put it is now the entire argument. Modelled to settle within a few kilometres, the shallow plume is detectable at thirty.",
    ask: "How deep do you discharge the waste sediment?",
    slider: { key: "depth", min: 0, max: 100, step: 5, start: 20, unit: "%", labelLow: "Near the surface (cheap)", labelHigh: "At the seafloor (costly)" },
    detail: [
      "Shallow discharge is far cheaper: less pipe, less power, more uptime. It also drifts into the band where tuna feed at night.",
      "A 2024 paper reports oxygen being produced at the abyssal seafloor, associated with the nodules themselves. It is contested, and it is the kind of thing nobody looked for until now.",
      "Your contractor has spent 1.4 billion dollars and has investors asking when the metal arrives."
    ],
    discuss: [
      "What evidence should be enough to stop something already running?",
      "Should the 1.4 billion already spent matter to your decision? Does it?",
      "Who should pay for the science — the contractor, the regulator, or the states downstream?"
    ],
    voices: [
      { who: "Dr Sørensen", role: "ecologist", line: "You want a number. I can get you one in nine years. The ship sails next month either way." },
      { who: "Ivo, 44", role: "contractor CEO", line: "Every hundred metres of pipe is eight million dollars and four percent uptime. I'm not being dramatic, I'm being arithmetical." }
    ],
    bands: [
      { max: 30, t: "Cheap, shallow, and everywhere",
        x: "Production is excellent and the plume is a headline. The drift reaches the feeding band within the year, four Pacific economies file at the ISA, and your own observers' data is the evidence they use. You cannot claim you weren't told.",
        d: { supply: 18, eco: -22, trust: -14, cap: -10 } },
      { max: 65, t: "Mid-water compromise",
        x: "Deepening the discharge helps, measurably and insufficiently. The tuna states withdraw their objection and the scientists don't. Production holds at about eighty percent of plan, which everyone describes as a win in public.",
        d: { supply: 10, eco: -8, trust: 2, cap: -4 } },
      { max: 100, t: "Returned to the floor",
        x: "Near-seafloor discharge costs you a third of your uptime and most of the contractor's margin. The benthic impact stays inside the licence area, which is the first genuinely good environmental news of your tenure. The restructuring is somebody else's problem.",
        d: { supply: 2, eco: 12, trust: 8, cap: -8 } }
    ]
  },

  /* ------------------------------------------------------- 6b. choice */
  {
    id: "vacuum", art: "vacuum", realm: "sea", type: "choice", requires: "moratorium",
    place: "The vacuum", year: "2031",
    situation: "Your pause held two years, then met the limits of a coalition with no veto. Another consortium is mining the eastern zone under rules your scientists never saw, with no independent observers aboard. Mareva has joined them.",
    ask: "Hold, bargain, or turn.",
    detail: [
      "A moratorium only binds the states that join it. The ISA cannot compel a non-party, and you are already outside UNCLOS.",
      "Your own copper and nickel gap has not improved. Grid build-out is behind in eleven states.",
      "The contractor's environmental data belongs to the contractor."
    ],
    discuss: [
      "Is a moratorium others ignore better or worse than strict rules you help write?",
      "What's the moral difference between mining and buying from someone who mines?",
      "Mareva waited and got nothing for it. What would have made waiting worth their while?"
    ],
    voices: [
      { who: "Amb. Renga", role: "Rep. of Mareva", line: "You asked us to wait. We waited. Then you went home to a country with electricity." },
      { who: "Dr Sørensen", role: "ecologist", line: "The worst version was never ‘mining happens’. It was ‘mining happens and nobody independent is allowed to watch’." }
    ],
    choices: [
      { key: "A", label: "Hold the line", sub: "Stay out. Fund the science nobody else will.",
        d: { eco: 10, trust: 8, supply: -10, cap: -4 },
        out: { t: "Clean hands, no leverage", x: "Your research becomes the authoritative baseline, cited in every proceeding — including the ones that approve mining. You have no observers, no vote and no metal. Sørensen spends nine funded years documenting damage she has no power to stop." } },
      { key: "B", label: "Trade recognition for rules", sub: "Recognise their licences. Demand observers and a real fund.",
        d: { supply: 8, eco: 4, cap: 8, trust: -4 },
        out: { t: "The deal", x: "You get observers aboard, a discharge standard with teeth and a fund that pays states with no contractor of their own. You also legitimise what you spent two years calling illegitimate, and every government that held the line learns what your word is worth." } },
      { key: "C", label: "Reverse and compete", sub: "The pause failed. Sponsor your own.",
        d: { supply: 16, eco: -16, trust: -16, cap: -10 },
        out: { t: "The turn", x: "Your licences issue within the year and the metal arrives in time to matter. The thirty-eight states that joined your coalition read the announcement at the same time as the press. Two had passed domestic laws on the strength of your assurances." } }
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
    ["Dark oxygen", "Real and contested. A 2024 paper reported oxygen production at the abyssal seafloor associated with nodules."],
    ["Nauru", "Real, and the model for Mareva: phosphate made it briefly rich and left most of the island uninhabitable."],
    ["The people", "Fictional composites, and Mareva is a fictional state."]
  ]
};
