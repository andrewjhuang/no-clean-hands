/* ------------------------------------------------------------------
   NO CLEAN HANDS — two live permits, one charter, and a loop.

   The class forms an international resource council sitting in 2026.
   Before it hears anything it adopts two governing principles. Then it
   decides two real cases that the real world has NOT decided:

     CASE 1  Jadar, Serbia        — jadarite lithium, Rio Tinto.
                                    Revoked 2022, revived by decree
                                    2024, care and maintenance 2025.
     CASE 2  Cook Islands EEZ     — cobalt-rich nodules in national
                                    waters. Exploration extended to
                                    2032. No ISA, no high seas, no
                                    "common heritage" to argue about.

   Neither project appears in Scheyder's "The War Below" (US-focused:
   Thacker Pass, Rhyolite Ridge, Resolution Copper, Piedmont, Idaho
   antimony, Pebble, Bolivia) or in Heffernan's "The High Seas" (the
   Area, the CCZ, Solwara 1, the vents). The books supply the method —
   consent, irreversibility, benefit, the Juukan Gorge precedent, the
   common-heritage argument — and the class applies it to ground it has
   not read about. That is the point.

   THE LOOP is the second half of the game, drawn from RMI's "The
   Battery Mineral Loop" (July 2024): six solutions that reduce how much
   has to be mined at all. The council funds them out of the same money
   it would spend on a mine, and they mature on a delay. Meanwhile a
   demand forecast is revised, round by round, in the direction it has
   actually been revised. A mine takes years to build. The forecast
   moves faster than the shaft does.

   Places, laws, companies, rulings, dates and figures are real and
   sourced in the debrief. Named individuals are fictional composites.
------------------------------------------------------------------- */

const START = { env: 50, econ: 50, comm: 50, trust: 50 };

const METERS = [
  { key: "env",   label: "Environment", full: "Water, seafloor, topsoil — the things that do not grow back on a permit cycle." },
  { key: "econ",  label: "Economy",     full: "Supply secured, capital spent, projects that survive contact with a price." },
  { key: "comm",  label: "Communities", full: "The people who live on top of the deposit, or fish above it." },
  { key: "trust", label: "Trust",       full: "Whether anyone believes your council means what it writes down." },
];

/* ----------------------------------------------------------- charter */
/* Five principles. The council adopts two. Sufficiency is the new one,
   and it is the only one that can be satisfied without saying no. */
const PRINCIPLES = [
  { id: "consent", label: "Consent",
    rule: "No project proceeds over the settled objection of the people who live on it.",
    short: "Nothing over the settled objection of the people who live on it." },
  { id: "reversible", label: "Reversibility",
    rule: "No approval where the loss cannot be undone, and none where it cannot even be measured.",
    short: "Nothing irreversible, and nothing unmeasurable." },
  { id: "supply", label: "Supply",
    rule: "The transition comes first. A metal deficit is a harm too, and it lands on people who did not choose it.",
    short: "The transition comes first; a deficit is also a harm." },
  { id: "benefit", label: "Benefit",
    rule: "Whoever bears the cost receives a real, enforceable share of the gain.",
    short: "Whoever bears the cost gets an enforceable share of the gain." },
  { id: "sufficiency", label: "Sufficiency",
    rule: "Open nothing that circularity and efficiency can supply instead. The cheapest tonne is the one never needed.",
    short: "Open nothing the loop can supply instead." },
];

/* -------------------------------------------------------------- loop */
/* RMI's six solutions, in the report's own rough order of impact so
   far. `lead` is how many rounds until it shows up in the forecast —
   the whole cruelty of the mechanic. `cut` is what it takes off
   projected demand when it matures. */
const LOOP = [
  { id: "chem",     letter: "A", label: "Change the chemistry", lead: 1, cut: 7,
    note: "LFP and sodium-ion need no nickel and no cobalt at all.",
    matured: "The chemistry mix shifts. Cobalt comes out of the cathode, and out of your forecast." },
  { id: "density",  letter: "B", label: "Raise energy density", lead: 1, cut: 5,
    note: "More kilowatt-hours per kilogram is less mineral per car.",
    matured: "Average pack density improves again. Same range, less rock." },
  { id: "recycle",  letter: "C", label: "Recycle the stock", lead: 2, cut: 9,
    note: "Recovery runs 90–94%. End-of-life batteries become the ore body.",
    matured: "Recovered mineral starts arriving as supply. The ore body is now a scrapyard." },
  { id: "life",     letter: "D", label: "Extend the lifetime", lead: 2, cut: 6,
    note: "Ten to fifteen years, then a second life in grid storage.",
    matured: "Packs stay in service longer and come back later. Demand flattens." },
  { id: "vehicle",  letter: "E", label: "Make vehicles efficient", lead: 3, cut: 6,
    note: "Lighter, sleeker, right-sized. A smaller pack for the same range.",
    matured: "Right-sized vehicles land. Every kilogram of car was kilograms of mine." },
  { id: "mobility", letter: "F", label: "Make mobility efficient", lead: 3, cut: 7,
    note: "Transit, micromobility, and not needing the trip at all.",
    matured: "Mode shift shows up in the fleet model. The cars you never built need nothing." },
];

const PROLOGUE = {
  title: "No Clean Hands",
  sub: "Two permits nobody has decided. One charter. A forecast that will not hold still.",
  lines: [
    "You are an international resource council, sitting now. Two live cases: a lithium deposit under a farming valley in western Serbia, and a cobalt-rich nodule field inside the Cook Islands' own waters, where no international authority can tell you anything.",
    "You also hold a second budget. It buys none of that. It buys <b>the loop</b> — the six ways to need less mined metal in the first place. Both come out of the same hand.",
    "First, your charter: adopt <b>two</b> principles of five. They bind you in both cases, and the second case will quote the first one back at you.",
    "Watch the forecast. It has been revised downward every year anyone has been forecasting. Your mine takes six years to build."
  ],
  note: "Real projects, laws, rulings and dates. The people you meet are composites written for this exercise."
};

/* ================================================================== */
const CHAPTERS = [
  /* ------------------------------------------------- the charter */
  {
    id: "charter", title: "The charter", sub: "Before you hear anything", realm: "land", art: "title",
    intro: "You will be asked for four kinds of thing: a permit, a set of conditions, a share of the proceeds, and money for the loop. Before any of it, write down what you will not do. Two principles. You may not add a third later, and you may not quietly drop one.",
    cast: [],
    beats: [
      {
        type: "charter", pickCount: 2, art: "title",
        place: "Adopt your charter", year: "Round 0",
        situation: "Five principles. Every one is defensible and no two are compatible in every case. Adopt two. From this round forward every option on screen is tagged with the principles it keeps and the principles it breaks — and breaking one you signed costs you far more than breaking one you never did.",
        ask: "Pick two. The room has to live with both.",
        voices: [
          { who: "Secretariat note", role: "circulated before the sitting", line: "Councils that adopt Consent and Benefit approve slowly and pay well. Councils that adopt Supply and Sufficiency approve little and build fast. Nobody has adopted all four and survived the minutes." }
        ],
        detail: [
          "Sufficiency is the only principle here that can be satisfied by doing something rather than by refusing something. It is also the only one that costs money in the round you adopt it and pays out three rounds later.",
          "Consent is the principle both books spend the most pages on and the hardest to define. Who is the people? A tribal council, a referendum, a village, a parliament, a nation of fifteen thousand?",
          "Reversibility is the precautionary principle with the vagueness removed: not 'be careful' but 'no approval where the loss cannot even be measured'."
        ],
        discuss: [
          "Which of the five would you be most embarrassed to break in public?",
          "Supply and Sufficiency both answer 'we need the metal', in opposite directions. Which is yours?",
          "If you adopt Consent, say now whose consent counts. You will be held to the definition."
        ]
      }
    ]
  },

  /* =============================================== CASE 1 — JADAR */
  {
    id: "jadar", title: "Case One: Jadar", sub: "Loznica, western Serbia · lithium and boron", realm: "land", art: "jadar",
    ore: { label: "first ore", years: 6 },
    intro: "In 2004, drillers in the Jadar valley hit a white mineral that matched nothing in the catalogue. It was named jadarite, and it has never been found anywhere else on Earth. The USGS put the deposit at 118 million tonnes of ore at 1.8% lithium oxide — on the operator's plan, enough lithium carbonate each year for around 1.1 million electric cars, plus boron. The valley above it grows raspberries for export and drains into the Drina.",
    cast: [
      { who: "Vesna Tadić, 61", role: "raspberry grower, Gornje Nedeljice" },
      { who: "Dr Milena Pavlović, 44", role: "hydrogeologist, Drina basin" },
      { who: "Nikola Đorđević", role: "ministry of mining and energy" }
    ],
    beats: [
      {
        type: "choice", art: "jadar",
        place: "The restored decree", year: "Round 1",
        situation: "Serbia revoked the spatial plan in January 2022, after the largest environmental protests in its recent history. In July 2024 the Constitutional Court held that the revocation itself was unconstitutional. The ruling did not restore the plan — the government did that by decree four days later, with no public debate and no strategic assessment. The permit is legally alive, politically radioactive, and opposed by over 60% of the country.",
        ask: "The decree is on your table. Ratify, re-run, or refuse.",
        voices: [
          { who: "Nikola Đorđević", role: "ministry of mining and energy", line: "The court found the revocation unlawful. Restoring the prior state is not a favour to the company, it is what a ruling means. You are being asked to treat obedience to a court as a scandal." },
          { who: "Vesna Tadić, 61", role: "raspberry grower, Gornje Nedeljice", line: "They cancelled it and we believed them. Then a court we never heard from uncancelled it over a weekend. I am not against lithium. I am against finding out what happens to my valley from the television." }
        ],
        detail: [
          "The Constitutional Court ruled on 11 July 2024 that the 2022 revocation decree did not conform to the constitution or to the laws on government and on environmental impact assessment. The court was explicit that its ruling did not itself reinstate the 2020 spatial plan.",
          "The government adopted a decree on 16 July 2024 restoring the legal position that existed before the revocation. One week later Serbia's mining minister signed a memorandum with European Commission Vice-President Maroš Šefčovič on critical raw materials, battery value chains and electric vehicles. Chancellor Scholz called it 'a good project for Serbia'.",
          "Rio Tinto had warned Serbia it would pursue international arbitration to protect its investment. Refusal is not free; it has a filing number."
        ],
        discuss: [
          "A court ruled the cancellation unlawful. Does that oblige you to approve, or only to decide properly?",
          "Over 60% of the country is against. Is that a settled objection, or a poll?",
          "Who is 'the people who live on it' here — the valley, Loznica, or Serbia?"
        ],
        choices: [
          { key: "A", label: "Ratify the decree as it stands", sub: "Obey the ruling, proceed on the restored plan.",
            d: { econ: 14, comm: -14, trust: -6, env: -4 }, up: ["supply"], vio: ["consent"], flag: "jadar_live,jadar_fast",
            out: { t: "Lawful and hated", x: "The plan is restored, the arbitration threat evaporates, and the project clock starts. Loznica learns about it from the same television as last time. Your council is now the body that reinstated a mine without a public hearing, which will be the first line of every article written about you for six years." } },
          { key: "B", label: "Re-run the plan properly", sub: "Full strategic assessment, public inquiry, then decide.",
            d: { comm: 12, trust: 12, econ: -10, env: 4 }, up: ["consent", "reversible"], vio: ["supply"], flag: "jadar_live,jadar_slow",
            out: { t: "Two more years", x: "You order the assessment the decree skipped. The valley gets hearings, the hydrology gets published, and the company gets a two-year delay it costs into the capital budget. Every month of that delay is a month the forecast keeps moving, which nobody in the room has thought about yet." } },
          { key: "C", label: "Refuse and take the arbitration", sub: "Cancel for good. Defend it in a tribunal.",
            d: { comm: 18, env: 10, econ: -20, trust: 2 }, up: ["consent", "reversible"], vio: ["supply", "benefit"], flag: "jadar_dead",
            out: { t: "See you in tribunal", x: "The valley holds. The claim is filed within the quarter and the figure in it is larger than anything your council has ever disbursed. Europe's lithium plan loses its only domestic deposit of a mineral found nowhere else, and the investors who were watching Serbia go and watch somewhere with no court at all." } }
        ]
      },

      {
        type: "spend", art: "drina", requires: "jadar_live",
        place: "The Drina", year: "Round 2",
        situation: "Processing jadarite is wet chemistry. Critics say the tailings and wastewater plan puts the Drina and Sava basins at risk — the rivers that supply Belgrade. The Serbian Academy of Sciences and Arts wrote to the prime minister about irregularities. The company says it will meet EU standards. Neither statement is a monitoring regime.",
        ask: "Attach conditions. Each is real money, and each is unattachable later if you do not write it now.",
        voices: [
          { who: "Dr Milena Pavlović, 44", role: "hydrogeologist, Drina basin", line: "I am not telling you the river dies. I am telling you nobody has measured it well enough to prove anything afterwards. Build the monitoring first and you can be contradicted. Build it second and you cannot be." },
          { who: "Nikola Đorđević", role: "ministry of mining and energy", line: "Every condition you attach, you attach to the only operator who answers for it publicly. Attach nothing and you were captured. Attach everything and it moves somewhere that publishes nothing." }
        ],
        detail: [
          "Rio Tinto is the operator here, and is the same company that destroyed the Juukan Gorge rock shelters in 2020 under a valid approval — 46,000 years of occupation, legally. Its chief executive resigned. That is the record these conditions are written against, and the precedent Scheyder's reporting keeps returning to: a lawful permit is not a safe one.",
          "The European Union has granted Jadar Strategic Project status under its critical raw materials framework, which carries permitting and environmental expectations of its own. Some conditions you decline here, Brussels may impose anyway — later, and without you getting the credit.",
          "Dry-stack tailings cost more per tonne and fail differently. Wet impoundments fail catastrophically and rarely; dry stacks fail slowly and often. 'Safer' is a choice about which failure you would rather explain."
        ],
        discuss: [
          "Which single condition would you refuse to approve the project without?",
          "The company says it will meet EU standards. What is the difference between a standard and an enforceable condition?",
          "If Brussels will require it anyway, is there any point in you requiring it?"
        ],
        options: [
          { id: "nodischarge", cost: 0, label: "No-discharge covenant", note: "Zero process water to the Drina. Closed circuit or nothing.",
            d: { env: 12, econ: -8 }, up: ["reversible"],
            yes: "The no-discharge covenant goes in, and the capital cost goes up by roughly a tenth.",
            no: "Without the covenant the discharge limits are the ones in the general permit, which was written for a different industry." },
          { id: "drystack", cost: 0, label: "Dry-stack tailings", note: "No impoundment above Belgrade's water.",
            d: { env: 10, econ: -7 }, up: ["reversible"],
            yes: "Dry stacking is specified, which removes the dam-failure case entirely and adds a decade of haulage.",
            no: "Conventional wet tailings are permitted, upstream of Belgrade's water, which is how it was always planned." },
          { id: "baseline", cost: 0, label: "Published water baseline", note: "Independent, pre-construction, public.",
            d: { env: 6, trust: 12 }, up: ["reversible", "consent"],
            yes: "The baseline is measured and published before first works, so the argument afterwards can be settled by data.",
            no: "No independent baseline exists, so every future claim about the river is one expert's word against another's, forever." },
          { id: "sanu", cost: 0, label: "Academy review panel", note: "The Academy nominates the reviewers, not you.",
            d: { trust: 10, comm: 6, econ: -4 }, up: ["consent"],
            yes: "The Academy nominates the panel, so the review can no longer be dismissed as the ministry marking its own homework.",
            no: "The review panel is appointed by the ministry, which is lawful, normal, and believed by nobody in the valley." },
          { id: "bond", cost: 0, label: "Closure bond in escrow", note: "Cash held for rehabilitation, before first ore.",
            d: { econ: -6, env: 6, comm: 6 }, up: ["benefit", "reversible"],
            yes: "The bond is lodged, so the valley is funded for closure even if the operator is not here to fund it.",
            no: "No bond is lodged. If the project is abandoned mid-life, rehabilitation is a line item in somebody's future budget." }
        ]
      },

      {
        type: "spend", art: "loop",
        place: "The loop", year: "Round 3",
        situation: "A separate paper, the same budget. Six known ways to need less mined metal. Together they have already cut what the world mines: without them, 2023 lithium demand would have been 58% higher, nickel 127%, cobalt 138%. None of them produces a tonne this year.",
        ask: "Fund the loop. Each solution matures on a delay, and the delay is the whole problem.",
        voices: [
          { who: "Secretariat note", role: "attached to the paper", line: "Between 2019 and 2023 one major outlook raised its 2030 battery demand by 1.8× while projected cobalt per battery fell by more than 3.6×. The error has run in one direction for a decade." },
          { who: "Nikola Đorđević", role: "ministry of mining and energy", line: "I have no objection to any of this. I object to being told it replaces a mine in a year when it replaces nothing. Recycling returns the metal in the 2030s. The deficit, if there is one, is now." }
        ],
        detail: [
          "Chemistry and density mature fastest (one round), recycling and lifetime take two, and the vehicle and mobility solutions take three — you will be deciding the second case before they show up. That ordering is not arbitrary: it is roughly how fast each has actually moved.",
          "Recovery rates for recycled battery minerals run 90–94% and better. A battery lasts ten to fifteen years, so improving overall system efficiency by 6–10% per decade is enough to cover the losses. That is what closing the loop means: mining becomes a one-off, not a flow.",
          "RMI's figure for how much must be mined before the system is self-sufficient is about 125 million tonnes of battery minerals, roughly $1.08 trillion at today's prices. The world extracts and burns over seventeen times that tonnage in oil for road transport every single year, and has to do it again the next year."
        ],
        discuss: [
          "If the loop closes in the 2040s, who supplies the 2030s? Name them.",
          "Is funding recycling instead of a mine a Sufficiency decision or a Supply decision? It scores as either.",
          "Three of these six are not mining policy at all. Does this council have any business funding bike lanes?"
        ],
        options: [
          { id: "L_chem", loop: "chem", cost: 0, label: "A · Change the chemistry", note: "LFP and sodium-ion. No nickel, no cobalt. Matures in 1 round.",
            d: { econ: -5, env: 4 }, up: ["sufficiency"],
            yes: "Chemistry support is funded.", no: "Chemistry support is declined, and the cathode mix stays where the market puts it." },
          { id: "L_density", loop: "density", cost: 0, label: "B · Raise energy density", note: "More range per kilogram of rock. Matures in 1 round.",
            d: { econ: -4, env: 3 }, up: ["sufficiency"],
            yes: "Density research is funded.", no: "Density research is declined." },
          { id: "L_recycle", loop: "recycle", cost: 0, label: "C · Recycle the stock", note: "90–94% recovery. Matures in 2 rounds.",
            d: { econ: -7, env: 6 }, up: ["sufficiency", "reversible"],
            yes: "Collection and recovery capacity is funded.", no: "Recovery capacity is declined, and the end-of-life packs go wherever packs go." },
          { id: "L_life", loop: "life", cost: 0, label: "D · Extend the lifetime", note: "Longer first life, then grid storage. Matures in 2 rounds.",
            d: { econ: -4, env: 4 }, up: ["sufficiency"],
            yes: "Lifetime and second-life rules are funded.", no: "Lifetime extension is declined." },
          { id: "L_vehicle", loop: "vehicle", cost: 0, label: "E · Make vehicles efficient", note: "Right-sized cars, smaller packs. Matures in 3 rounds.",
            d: { econ: -5, env: 5 }, up: ["sufficiency"],
            yes: "Vehicle efficiency standards are funded.", no: "Vehicle efficiency is declined, and the fleet keeps getting heavier." },
          { id: "L_mobility", loop: "mobility", cost: 0, label: "F · Make mobility efficient", note: "Transit and the trips not taken. Matures in 3 rounds.",
            d: { econ: -6, env: 5, comm: 5 }, up: ["sufficiency"],
            yes: "Mobility programmes are funded.", no: "Mobility programmes are declined." }
        ]
      },

      {
        type: "slider", art: "refinery", requires: "jadar_live",
        place: "Where the value lands", year: "Round 4",
        situation: "The ore can leave Serbia as concentrate, or as battery-grade lithium carbonate. Refining at home keeps the margin, the jobs and the tax base in Loznica. It also puts the chemical plant in this valley rather than somebody else's, upstream of the same water. Benefit and Reversibility are the same lever here, pointing opposite ways.",
        ask: "How much of the chain stays in country?",
        voices: [
          { who: "Vesna Tadić, 61", role: "raspberry grower, Gornje Nedeljice", line: "Everyone asks whether we want the mine. Nobody asks whether we want the factory. They are not the same question, and the factory is the one next to the school." },
          { who: "Nikola Đorđević", role: "ministry of mining and energy", line: "Shipping concentrate is how a country stays poor politely. We have been the quarry before. If the processing goes to Germany then so does the complaint about the processing, and so does the money." }
        ],
        detail: [
          "This is the extractive-periphery argument both books make from opposite ends: Scheyder on US towns that host the hole and import the battery, Heffernan on Pacific states that sponsor a contractor and receive a royalty. Jadar is the European version of the same bargain.",
          "Boron is the quiet half of this deposit. Jadarite yields boric acid as well as lithium, with a market unrelated to batteries — and one that does not care at all what happens to lithium demand. A refinery built for both is a different risk than a mine built for one.",
          "A refinery is a twenty-year asset in a valley that has said it does not want one. It is also the only version of this project in which Serbia is not simply the source."
        ],
        discuss: [
          "Is 'the benefit' the tax base, the jobs, or the right to refuse?",
          "If you believe the mine is unsafe, can you consistently want the refinery?",
          "Who did you just decide bears the chemical risk? Say their name."
        ],
        slider: { key: "refine", min: 0, max: 100, step: 25, start: 50, unit: "%", labelLow: "ship concentrate", labelHigh: "refine at home" },
        bands: [
          { max: 0, t: "A quarry with good manners", d: { econ: -6, comm: -10, env: 6, trust: -4 }, vio: ["benefit"], flag: "jadar_quarry",
            x: "The concentrate leaves on the train and the value is added two borders away. The valley carries the hole and none of the margin, which is an arrangement it has been in before and recognises immediately." },
          { max: 50, t: "Half a chain", d: { econ: 6, comm: 4, env: -4 }, up: ["benefit"], flag: "jadar_half",
            x: "Primary processing stays, final refining goes. Loznica gets a plant, some jobs and a modest share of the margin, and nobody is satisfied — which in this file is the sound of a workable compromise." },
          { max: 100, t: "The whole chain, in the valley", d: { econ: 14, comm: 8, env: -14, trust: 4 }, up: ["benefit", "supply"], vio: ["reversible"], flag: "jadar_refine",
            x: "Serbia keeps the lithium carbonate, the boric acid, the tax base and the chemical plant. All of it is in the Jadar valley, upstream of Belgrade's water, and all of it will still be there when the ore runs out — which is either industrial policy or a second deposit of risk, depending who you ask." }
        ]
      },

      {
        type: "choice", art: "parked", requires: "jadar_live",
        place: "Care and maintenance", year: "Round 5",
        situation: "In November 2025 the operator put Jadar into care and maintenance, citing no progress on permits. Not cancelled — parked. Staff retained, obligations met, nothing built. Lithium prices had come off an eighteen-month spike and never went back. The valley is neither mined nor released, and the forecast has moved three times since you signed the decree.",
        ask: "A parked mine is still a decision. Make it.",
        voices: [
          { who: "Vesna Tadić, 61", role: "raspberry grower, Gornje Nedeljice", line: "Four years we have not known whether to plant. You cannot sell a farm with a mine on it and you cannot sell a farm with a maybe on it. Say yes or say no. The maybe is the thing that is actually taking the valley." },
          { who: "Dr Milena Pavlović, 44", role: "hydrogeologist, Drina basin", line: "Care and maintenance means the monitoring budget is the first line cut. Whatever baseline you ordered, check this year whether anyone is still reading it." }
        ],
        detail: [
          "'Care and maintenance' is the industry's term for a project held in suspension: legal obligations met, assets preserved, no production. It is reversible on the company's timetable and not on the community's.",
          "This is the volatility RMI warns about at the end of the report: as the six solutions bite, mineral prices fall and the system 'rings like a bell' — fewer new mines, and less incentive to recycle at exactly the moment recycling must carry the load.",
          "The European Commission's Strategic Project designation remains in force. In 2026 environmental groups brought proceedings before the Court of Justice of the European Union challenging it. Nothing about this file is finished."
        ],
        discuss: [
          "Is a parked project a kept promise or a broken one?",
          "The company can wait twenty years. The valley cannot. Should a permit expire?",
          "If you ratified in round 1 and the project is parked in round 5, what exactly did your approval buy?"
        ],
        choices: [
          { key: "A", label: "Let it sit", sub: "Suspension is lawful. Review it in five years.",
            d: { comm: -16, trust: -10, econ: -2 }, vio: ["consent", "benefit"], flag: "jadar_parked",
            out: { t: "The maybe", x: "Nothing is built and nothing is released. The valley enters its fifth year of not knowing, land values stay where uncertainty puts them, and the monitoring you ordered quietly loses its funding line. Your council has achieved the one outcome everybody in the room agreed was the worst." } },
          { key: "B", label: "Sunset the permit", sub: "Build inside four years or the plan lapses for good.",
            d: { comm: 16, trust: 14, econ: -8 }, up: ["consent", "reversible"], vio: ["supply"], flag: "jadar_sunset",
            out: { t: "A clock on the permit", x: "You put an expiry on it. The valley can plan, the company has to commit or walk, and every mining ministry in Europe writes in to object that you have made their permits worth less. They are right. That was the mechanism." } },
          { key: "C", label: "Take it into public hands", sub: "Buy the asset. The state carries it, and the risk.",
            d: { econ: -14, comm: 6, trust: -4, env: 4 }, up: ["benefit"], vio: ["supply"], flag: "jadar_public",
            out: { t: "Yours now", x: "The state acquires a parked lithium project at a price set while lithium is cheap. If demand returns you look visionary. If the loop closes first you have bought the world's only jadarite deposit at the exact moment nobody needs it, with public money, in a valley that did not ask for it." } }
        ]
      }
    ]
  },

  /* ====================================== CASE 2 — COOK ISLANDS EEZ */
  {
    id: "cook", title: "Case Two: The Cook Islands", sub: "National waters · cobalt-rich nodules at 5,000 m", realm: "sea", art: "lagoon",
    ore: { label: "first production", years: 6 },
    intro: "Fifteen thousand people hold an exclusive economic zone of 1.9 million square kilometres, and an estimated 6.7 billion tonnes of wet nodules lie on the floor of it — unusually rich in cobalt, and in titanium and rare earths. Because this is national water, the International Seabed Authority has no say, there is no common heritage of mankind to invoke, and no two-year rule to argue about. Rarotonga licenses this under its own law. Nobody outside can tell them no.",
    cast: [
      { who: "Teremoana Ngatokorua, 58", role: "fisher, Marae Moana advisory group" },
      { who: "Dr Rangi Tupou, 39", role: "marine biologist, returned from Auckland" },
      { who: "Mata Henry", role: "seabed minerals authority" }
    ],
    beats: [
      {
        type: "choice", art: "lagoon",
        place: "Eighty-four percent", year: "Round 6",
        situation: "The whole exclusive economic zone — 1.9 million square kilometres — was declared a marine park, Marae Moana, by Act in 2017. The Act bars fishing and seabed minerals within fifty nautical miles of each of the fifteen islands: about 16%. In the other 84% the same Act permits mining, subject to study. The park is not a wall. It is a door with conditions on it.",
        ask: "The door is open and it is their door. Do you walk through it?",
        voices: [
          { who: "Mata Henry", role: "seabed minerals authority", line: "People hear 'marine park' and assume we banned it. We zoned it. The no-go rings are where our people live and fish; we left the abyss open on purpose. We are fifteen thousand people with one export and a sea-level problem we did not cause." },
          { who: "Teremoana Ngatokorua, 58", role: "fisher, Marae Moana advisory group", line: "I sat on the committee that drew those rings. We drew them around home. I did not understand at the time that I was also drawing a line around the part we were giving away." }
        ],
        detail: [
          "The Marae Moana Act 2017 covers the whole EEZ. The fifty-nautical-mile exclusion zones around the fifteen islands amount to roughly 324,000 km², about 16%, and prohibit both large-scale commercial fishing and seabed minerals activity. Outside them the Act expressly contemplates mining subject to assessment.",
          "Heffernan's book is about the Area — the seabed beyond national jurisdiction, where the common-heritage argument lives. None of it applies here. Every argument this council might make about 'who speaks for mankind' is unavailable: the answer is a parliament in Rarotonga, elected by the people whose water it is.",
          "Three exploration licences were granted in February 2022, to Moana Minerals Limited (a subsidiary of the US-based Ocean Minerals), Cobalt (CIC) Limited, and CIIC Seabed Resources Limited, a partnership between the Cook Islands government and the Belgian company GSR. The government is a licence holder as well as the regulator."
        ],
        discuss: [
          "You invoked Consent for a Serbian valley. Does Consent here mean the Cook Islands' right to say yes?",
          "A marine park that permits mining in 84% of itself — compromise, or brand?",
          "The government regulates one licence and co-owns another. Name the conflict, then say whether it disqualifies them."
        ],
        choices: [
          { key: "A", label: "Respect the zoning as written", sub: "The rings hold, the abyss is open. Their law, their call.",
            d: { comm: 10, econ: 10, env: -14, trust: 4 }, up: ["consent", "benefit", "supply"], vio: ["reversible"], flag: "cook_open",
            out: { t: "Their door, their decision", x: "You take the Act at its word and the zoning as sovereign. A nation of fifteen thousand has made a lawful choice about its own water and your council declines to second-guess it. You have also just approved mining across an area the size of western Europe on a baseline nobody has finished measuring, and said 'they asked for it' out loud." } },
          { key: "B", label: "Press to close the whole zone", sub: "Extend the no-mining area to the entire EEZ.",
            d: { env: 18, comm: -12, econ: -12, trust: -8 }, up: ["reversible"], vio: ["consent", "benefit", "supply"], flag: "cook_closed",
            out: { t: "Protection, unasked for", x: "You push to close the whole zone. Environmental groups abroad are delighted. Rarotonga points out that a council of wealthy states has just told the Pacific what it may do with its own seabed, having missed its own climate finance commitments, and the quote travels further than your resolution does." } },
          { key: "C", label: "Zone by zone, after baseline", sub: "Nothing opens until its own block is surveyed.",
            d: { env: 10, trust: 10, econ: -6, comm: -2 }, up: ["reversible", "consent"], vio: ["supply"], flag: "cook_blocks",
            out: { t: "Block by block", x: "Each block opens only once it has been described. It is slower than the licence holders want and faster than the ecologists want, and it has the single virtue that in twenty years someone will be able to say what changed. That is not nothing. It is also not a decision about whether to mine." } }
        ]
      },

      {
        type: "choice", art: "abyss",
        place: "The extension", year: "Round 7",
        situation: "The three exploration licences were due to expire in February 2027. In November 2025 the authority extended all three by five years, pushing any mining decision to 2032 at the earliest. The stated reason was that nobody yet knows enough. Five years of exploration is also five more years of sunk cost arguing for approval at the end of it.",
        ask: "Extend, decide, or let them lapse.",
        voices: [
          { who: "Dr Rangi Tupou, 39", role: "marine biologist, returned from Auckland", line: "Every survey makes the case for the next survey, and the next survey is paid for by the people who want to mine. At some point 'we need more research' stops being science and starts being a way of not deciding." },
          { who: "Mata Henry", role: "seabed minerals authority", line: "The alternative to extending was deciding in 2027 on what we knew in 2027, which was less. I would rather be accused of delay than of approving blind. The licences cost the holders money every year they run." }
        ],
        detail: [
          "The authority's own geologist has put it plainly in public: one day someone will have to make a decision about what to do, and it is clear today that we don't know enough to make a decision.",
          "Te Ipukarea Society, the Cook Islands environmental organisation, has called for at least ten more years of meaningful research before any decision. Greenpeace has called for a ban outright.",
          "Exploration licences create a constituency. Five more years of survey spending means five more years of jobs, contracts and local investment attached to the proposition that the survey ends in a mine. Scheyder's reporting finds the same ratchet on land, every time."
        ],
        discuss: [
          "Does more data make this decision easier, or only later?",
          "Who pays for the research, and does that change what the research is for?",
          "If the answer in 2032 is no, what did the five years cost the people who were waiting?"
        ],
        choices: [
          { key: "A", label: "Extend five years", sub: "What they actually did. Decide in 2032.",
            d: { env: 6, trust: 4, econ: -4 }, up: ["reversible"], vio: ["sufficiency"], flag: "cook_extended",
            out: { t: "2032", x: "The licences run on. The baseline gets better, the sunk cost gets bigger, and the decision moves to a council that will not be this one. You bought five years of knowledge and five years of momentum with the same signature, and only one of those was on the paper." } },
          { key: "B", label: "Decide now, on what you have", sub: "No more extensions. Grant or refuse in this sitting.",
            d: { trust: 12, econ: 4, env: -8 }, up: ["supply"], vio: ["reversible"], flag: "cook_now",
            out: { t: "On the record, now", x: "You refuse to launder the decision through another survey. Whatever you choose is made on an admittedly incomplete baseline, in public, by people who can be named. Dr Tupou thanks you, and says you were wrong to, in the same sentence." } },
          { key: "C", label: "Let them lapse", sub: "No extension. The licences expire in 2027.",
            d: { env: 14, econ: -14, comm: -8, trust: -4 }, up: ["reversible", "sufficiency"], vio: ["benefit", "supply"], flag: "cook_lapsed",
            out: { t: "Expired", x: "The licences run out and are not renewed. The survey vessels leave, taking the only funded science about this seafloor with them, and the contracts that employed forty people end. The nodules stay where they are, undescribed, which is both the most protective and the least informed outcome available to you." } }
        ]
      },

      {
        type: "choice", art: "flags", requires: "cook_open,cook_blocks",
        place: "Whose flag", year: "Round 8",
        situation: "A country of fifteen thousand does not process nodules. Somebody else's refinery, somebody else's navy, somebody else's development budget. Washington agreed seabed research cooperation in 2025 and a critical minerals memorandum in 2026. Beijing has an action plan of its own, after which New Zealand — whose passports Cook Islanders hold — froze part of its aid.",
        ask: "Who does the Cook Islands take this to?",
        voices: [
          { who: "Mata Henry", role: "seabed minerals authority", line: "We are told to diversify our economy, and told which partners we may diversify it with. Our citizens carry New Zealand passports and our aid was frozen over a document we are entitled to sign. You will understand if we are not sentimental about who the good patron is." },
          { who: "Teremoana Ngatokorua, 58", role: "fisher, Marae Moana advisory group", line: "My grandfather was told phosphate would make Nauru rich. It did, for a while. Then it ate four-fifths of the island and the money went. I am not asking whose flag. I am asking what happens here in sixty years." }
        ],
        detail: [
          "Nauru is the precedent everyone in the Pacific cites and almost nobody outside it does: phosphate mining produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable. Heffernan's account of Nauru's later sponsorship of a seabed contractor is the same story asking for a second chance.",
          "In April 2026 Ocean Minerals, which holds interests in two of the three licensed areas, announced a merger valued at around a billion dollars. The asset being valued is a licence to explore, not a mine.",
          "The Cook Islands is a self-governing state in free association with New Zealand and its people are New Zealand citizens. That relationship is why the aid freeze had force, and why it was felt as something closer to a family argument than a diplomatic one."
        ],
        discuss: [
          "Is choosing a patron an exercise of sovereignty or a limit on it?",
          "New Zealand froze aid over a signature. Leverage, or governance?",
          "Benefit means an enforceable share. Enforceable in whose court?"
        ],
        choices: [
          { key: "A", label: "Hedge: take all three", sub: "Research from one, capital from another, passports from the third.",
            d: { econ: 12, trust: -10, comm: 4 }, up: ["benefit"], vio: ["consent"], flag: "cook_hedge",
            out: { t: "Everybody's partner", x: "Rarotonga signs with everyone and commits to no one, which is the rational play for a small state and reads from outside as unreliability. The money arrives. So does a permanent position in somebody else's strategic framing, and a seat at a table where the Cook Islands is an agenda item rather than a participant." } },
          { key: "B", label: "A sovereign fund, conditions attached", sub: "One partner, a published royalty, a fund that pays residents.",
            d: { econ: 6, comm: 14, trust: 12, env: -4 }, up: ["benefit", "consent"], flag: "cook_fund",
            out: { t: "Written down", x: "A single partnership, a published royalty rate, and a sovereign fund that disburses to residents annually and is audited where anyone can read it. It is less money than the hedge. It is money that still exists in 2070, which is the only test Teremoana asked you to apply." } },
          { key: "C", label: "Keep it domestic for now", sub: "No minerals agreements with any outside power.",
            d: { econ: -12, trust: 8, comm: -4, env: 6 }, up: ["reversible"], vio: ["supply", "benefit"], flag: "cook_domestic",
            out: { t: "No agreements", x: "The Cook Islands signs nothing and keeps every option. It also keeps one export, a tourism season, and a sea level rising on a schedule set elsewhere. Sovereignty is intact and the development problem that started this is exactly where it was." } }
        ]
      },

      {
        type: "choice", art: "ledger",
        place: "The number nobody wants", year: "Round 9",
        situation: "A study commissioned by an environmental organisation found the return on Cook Islands nodule mining would, more likely than not, be negative. The government rejected it and asked for independent checking. Both responses are reasonable. Meanwhile the headline metal here is cobalt — and projected cobalt per battery has fallen more than threefold in four years, because the fastest-growing chemistry contains none.",
        ask: "Commission the economics. Decide now whether you will publish it.",
        voices: [
          { who: "Dr Rangi Tupou, 39", role: "marine biologist, returned from Auckland", line: "We have spent four years arguing about whether it is safe. Nobody has seriously asked whether it is worth anything. If the answer is no, then every risk we have been weighing was weighed against a benefit that was not there." },
          { who: "Mata Henry", role: "seabed minerals authority", line: "I will not accept a number commissioned by people who had already written the press release. Check it independently and I will live with it. But understand what you are asking: you are asking a country to publish, in advance, the finding that its only asset is worthless." }
        ],
        detail: [
          "Cobalt is the clearest case in RMI's report. Chemistry change — principally the growth of lithium iron phosphate, which needs no nickel and no cobalt — is the single largest reason 2023 cobalt demand was not 138% higher than it was. The Cook Islands' nodules are valued for cobalt.",
          "RMI finds announced mining projects already cover most of projected peak demand. There is no gap at all for nickel and cobalt; only lithium shows one, and only in the fastest battery-uptake case, at around 23%. Every mine in this game is competing against supply that has already been announced.",
          "If this council funded the chemistry solution in round 3, this council is part of why the cobalt case is collapsing. The forecast at the top of your screen is not weather. Some of it is you."
        ],
        discuss: [
          "If the economics are negative, does any of the environmental argument still matter?",
          "Who should be allowed to commission the study that decides whether a country has an asset?",
          "You may have made this deposit worthless by funding the loop. Is that a success?"
        ],
        choices: [
          { key: "A", label: "Commission it, publish regardless", sub: "Independent, pre-committed, whatever it says.",
            d: { trust: 16, econ: -6, comm: -4 }, up: ["reversible", "benefit", "sufficiency"], flag: "cook_published",
            out: { t: "Whatever it says", x: "You pre-commit to publication and the number comes back weak. It is the most useful document anyone has produced about this seabed, and it costs the Cook Islands the negotiating position it had been building for four years. Dr Tupou calls it the first honest thing in the file. Nobody in Rarotonga thanks you." } },
          { key: "B", label: "Commission it, keep it internal", sub: "Advice to government. Not for release.",
            d: { econ: 8, trust: -14, comm: 2 }, vio: ["benefit", "consent"], flag: "cook_internal",
            out: { t: "Advice to government", x: "The study is done properly and seen by eleven people. Rarotonga negotiates with better information than its counterparties, which is worth real money. It leaks in year three, as these do, and the leak is worse than the finding would have been." } },
          { key: "C", label: "Don't commission it", sub: "The economics are the licence holders' problem.",
            d: { econ: -4, trust: -10, env: -6 }, vio: ["sufficiency", "reversible"], flag: "cook_blind",
            out: { t: "Their problem", x: "You leave the economics to the people with an interest in the answer. Four more years of environmental assessment proceed, carefully and at considerable expense, measuring the risk side of a cost-benefit calculation whose benefit side nobody has checked." } }
        ]
      },

      {
        type: "spend", art: "loop",
        place: "The loop, closing", year: "Round 10",
        situation: "Second paper, last money. What you funded in round 3 has begun to show up; what you declined has not. The argument is that mining is a one-off: mine enough once, recover it at ninety-odd percent, and the system runs for centuries on the stock. About 125 million tonnes gets the world there — against 2,150 million tonnes of oil burned for road transport every year.",
        ask: "Close what you can. This is the last round that pays out.",
        voices: [
          { who: "Secretariat note", role: "final paper", line: "China's largest battery manufacturer expects recycling to deliver mineral independence there by 2042. Whatever this council decides, somebody is closing a loop. The only open question is whether the metal in it was mined with your conditions attached or somebody else's." },
          { who: "Dr Rangi Tupou, 39", role: "marine biologist, returned from Auckland", line: "The sea floor will still be there in 2042. Nodules grow a few millimetres per million years, so there is no version of this where we lose the option by waiting. There are many where we lose it by not." }
        ],
        detail: [
          "After ten to fifteen years of service a battery's mineral content can be collected and recycled at 90–94% or better. Improving overall battery and transport efficiency by 6–10% per decade covers the remaining losses. That is the arithmetic that turns mining from a flow into a one-off.",
          "Known reserves of lithium, cobalt and nickel are about twice the total virgin demand even the high cases require. Under accelerated circularity the battery sector needs less than 40% of current lithium reserves, 50% of cobalt and 60% of nickel to reach self-sufficiency.",
          "The honest caveat, which the report makes itself: as prices fall, the incentive to recover and recycle falls with them. A closing loop undermines the economics of closing the loop. It needs rules, not hope."
        ],
        discuss: [
          "Three rounds ago these were abstractions. Which would you fund first if you started again?",
          "If the loop closes, what happens to the countries whose development plan was a mine?",
          "Nodules grow millimetres per million years. Does that make waiting free, or make waiting an excuse?"
        ],
        options: [
          { id: "L2_chem", loop: "chem", cost: 0, label: "A · Change the chemistry", note: "Still the largest single lever. Matures in 1 round.",
            d: { econ: -5, env: 4 }, up: ["sufficiency"],
            yes: "Chemistry support is funded.", no: "Chemistry support is declined again." },
          { id: "L2_density", loop: "density", cost: 0, label: "B · Raise energy density", note: "Up about 25% since 2015. Matures in 1 round.",
            d: { econ: -4, env: 3 }, up: ["sufficiency"],
            yes: "Density research is funded.", no: "Density research is declined again." },
          { id: "L2_recycle", loop: "recycle", cost: 0, label: "C · Recycle the stock", note: "Most lithium-ion already is. Matures in 2 rounds.",
            d: { econ: -7, env: 6 }, up: ["sufficiency", "reversible"],
            yes: "Collection and recovery capacity is funded.", no: "Recovery capacity is declined again, with the first big retirement wave arriving." },
          { id: "L2_life", loop: "life", cost: 0, label: "D · Extend the lifetime", note: "Second life in grid storage. Matures in 2 rounds.",
            d: { econ: -4, env: 4 }, up: ["sufficiency"],
            yes: "Lifetime and second-life rules are funded.", no: "Lifetime extension is declined again." },
          { id: "L2_vehicle", loop: "vehicle", cost: 0, label: "E · Make vehicles efficient", note: "Right-size the fleet. Matures in 3 rounds.",
            d: { econ: -5, env: 5 }, up: ["sufficiency"],
            yes: "Vehicle efficiency standards are funded.", no: "Vehicle efficiency is declined again." },
          { id: "L2_mobility", loop: "mobility", cost: 0, label: "F · Make mobility efficient", note: "The broadest benefits, the slowest payout.",
            d: { econ: -6, env: 5, comm: 5 }, up: ["sufficiency"],
            yes: "Mobility programmes are funded.", no: "Mobility programmes are declined again." }
        ]
      }
    ]
  }
];

/* ---------------------------------------------------------- floors -- */
/* A meter hitting zero inserts an emergency decision. Both options are
   bad; that is what zero means. */
const FLOORS = {
  env: {
    place: "The injunction", year: "Emergency",
    situation: "A court has suspended works on the application of parties you declined to hear, citing the absence of the baseline you declined to order. The suspension is indefinite and the reasoning quotes your own minutes back at you.",
    ask: "You are out of environmental credit. Pay in something else.",
    voices: [{ who: "Dr Milena Pavlović, 44", role: "hydrogeologist", line: "I offered you this measurement for the price of a month. You will now buy it for the price of a year, under oath, with a judge deciding what it means." }],
    detail: ["Emergency rounds are inserted, not substituted. The crisis costs you a decision slot you had not budgeted for, which is exactly what crises do."],
    discuss: ["Which earlier decision put you here? Name the round."],
    choices: [
      { key: "A", label: "Fund the full remediation", sub: "Stop everything. Measure. Pay for it out of the project.",
        d: { env: 26, econ: -18, trust: 4 }, up: ["reversible"],
        out: { t: "Bought at the worst price", x: "The work stops and the survey happens properly, two years late and at four times the cost, and the environment meter comes back off the floor. Every other programme in your budget absorbs the difference." } },
      { key: "B", label: "Appeal and keep working", sub: "Contest the injunction. Carry on under the old permit.",
        d: { env: 6, econ: 4, trust: -18, comm: -10 }, vio: ["reversible", "consent"],
        out: { t: "Under appeal", x: "You contest it and keep the machines running. You win the procedural point eighteen months later, by which time the phrase 'working under appeal' has attached itself permanently to your council's name." } }
    ]
  },
  comm: {
    place: "The withdrawal", year: "Emergency",
    situation: "The community bodies have withdrawn from the process entirely and issued a joint statement explaining why. They are not negotiating. They are leaving, publicly, with dates and quotations.",
    ask: "There is no consultation left to consult. Decide without it.",
    voices: [{ who: "Vesna Tadić, 61", role: "raspberry grower", line: "We came to eleven meetings. I can tell you what was decided before each of them. We are not coming to the twelfth so you can write down that we were consulted." }],
    detail: ["A withdrawal is not an absence of a view. It is the strongest available statement of one, and it removes your ability to claim process."],
    discuss: ["What would have had to be true for them to still be in the room?"],
    choices: [
      { key: "A", label: "Suspend until they return", sub: "No decisions taken in their absence. Indefinite.",
        d: { comm: 24, trust: 10, econ: -16 }, up: ["consent"],
        out: { t: "Adjourned", x: "The file stops moving. The valley is not consulted into a result it rejected, and three of your deadlines pass. The company's lawyers begin using the word 'expropriation' in correspondence." } },
      { key: "B", label: "Proceed on the record as it stands", sub: "The consultation happened. Their absence is their choice.",
        d: { comm: 4, econ: 10, trust: -20 }, vio: ["consent", "benefit"],
        out: { t: "Deemed consulted", x: "You proceed on eleven meetings' worth of minutes and a withdrawal letter, and the phrase 'deemed consulted' enters the record. It will be read out at every subsequent hearing your council holds, in any jurisdiction, for years." } }
    ]
  },
  econ: {
    place: "The financing collapses", year: "Emergency",
    situation: "The price has gone. Lenders have repriced the project, the equity partner has written down its stake, and the conditions you attached are being blamed for a collapse the commodity cycle caused. Both halves of that sentence are being quoted selectively.",
    ask: "There is no money. Choose which promise you break.",
    voices: [{ who: "Nikola Đorđević", role: "ministry of mining and energy", line: "I warned you the conditions had a price. I did not tell you the price would arrive in a year when the metal had none. Nobody did. That is the part nobody models." }],
    detail: ["RMI's closing warning: as the six solutions bite, prices fall and the system rings like a bell — fewer new mines, and less incentive to recycle at the moment recycling must carry the load."],
    discuss: ["Was this the conditions, or the cycle? Can you tell from inside the room?"],
    choices: [
      { key: "A", label: "Strip the conditions to save the project", sub: "Keep the jobs. Drop what the jobs were conditional on.",
        d: { econ: 22, env: -16, comm: -14, trust: -8 }, vio: ["reversible", "benefit"],
        out: { t: "Saved, and hollowed", x: "The financing closes and the project survives with the protections removed. Everything your council spent four rounds attaching is gone in one, and the minutes show it was always the first thing available to trade." } },
      { key: "B", label: "Let it fail and fund the loop", sub: "The project dies. The money goes to circularity.",
        d: { econ: -6, env: 14, trust: 12 }, up: ["sufficiency", "reversible"], flag: "loop_pivot",
        out: { t: "Redirected", x: "You let the project go and move what is left into recovery and efficiency. It produces no metal this decade and a great deal in the next one, and you will not be in office to collect the credit. The region that was promised the mine is told about the loop." } }
    ]
  },
  trust: {
    place: "The charter is struck", year: "Emergency",
    situation: "The secretariat has formally noted that your council's adopted principles no longer bear any relationship to its decisions, and has moved to strike the charter from the record rather than leave a document in the file that the minutes contradict.",
    ask: "Your own words are being withdrawn from you. Respond.",
    voices: [{ who: "Secretariat note", role: "tabled without debate", line: "The charter is a commitment or it is a letterhead. It has been cited in four of your decisions and contradicted in more. Leaving it in the file is the greater dishonesty." }],
    detail: ["Once struck, breaches stop scoring — which sounds like relief and is the worst thing that can happen to you in this game. You can buy one principle back. Only one."],
    discuss: ["Is a charter you cannot keep worse than no charter at all?"],
    choices: [
      { key: "A", label: "Let it be struck", sub: "Remove the charter. Decide case by case from here.",
        d: { trust: 14, comm: -8 }, flag: "charter_void",
        out: { t: "Unbound", x: "The charter comes out of the file. Nothing you do from here can breach it, and nothing you do from here can be held to it. The room feels lighter. That feeling is the problem, and it will be in the ending." } },
      { key: "B", label: "Buy one principle back", sub: "Keep one. Fund the thing it demands, properly, now.",
        d: { trust: 22, econ: -20, comm: 6 }, flag: "charter_rebought",
        out: { t: "One, kept", x: "You surrender one principle and pay, in public and in cash, for the other. It is the most expensive round in the game and the only one that buys back credibility rather than spending it." } }
    ]
  }
};

/* --------------------------------------------------------- endings -- */
/* Scored on breaches, on whether the loop closed, and on whether you
   bought something the world stopped needing. Not on meters alone. */
const ENDINGS = [
  { id: "loop", art: "endGood",
    test: (s, b, L) => !L.stranded && L.closed >= 4 && b <= 1 && s.econ >= 38,
    title: "You mined once",
    text: "Four of the six solutions funded and running, a charter broken at most once, and a supply chain that will be feeding itself long after this council is dissolved. You approved less than your successors wanted and spent more than your treasury wanted, and the result is the only outcome in this game where the metal keeps arriving without anything new being opened. Nobody will be able to point at the thing you built, because the thing you built is an absence of mines." },
  { id: "kept", art: "endGood",
    test: (s, b, L) => !L.stranded && b === 0 && s.env >= 48 && s.comm >= 48 && s.econ >= 40,
    title: "You kept your word",
    text: "Ten rounds and not one breach of a charter you adopted before you knew what it would cost. From outside this looks like a great many meetings and a slow permit. It is also the rarest result available here, and your successors will be measured against it whether they find that fair or not." },
  { id: "stranded", art: "endBad",
    test: (s, b, L) => L.stranded,
    title: "A mine with nowhere to go",
    text: "You approved it, the valley gave up what it was asked to give up, and the metal arrived into a market that had been quietly engineering its way out of needing it for a decade. The write-down is public. The hole is permanent. Every forecast that said this would happen was on your screen the whole time, revised in the same direction round after round, and the room read it as noise." },
  { id: "hollow", art: "endBad",
    test: (s, b) => b >= 4,
    title: "The charter was decoration",
    text: "Two principles, adopted in public, broken four times or more. Every breach was defensible in the room and the sum of them is a council whose written commitments mean nothing to anyone who has read the minutes. Your charter is now cited in other people's filings as evidence that charters are theatre." },
  { id: "extractive", art: "endBad",
    test: (s) => s.econ >= 68 && (s.comm < 38 || s.env < 36),
    title: "Delivered, and nobody forgot how",
    text: "The lithium and the nodules both arrive, on schedule, at scale. Behind the production chart: a chemical plant upstream of a capital city's water, an abyssal plain under contract before anyone finished counting what lived on it, and two communities who were told their objection had been heard. All of that is true at once, and neither deposit comes back." },
  { id: "paralysed", art: "endMixed",
    test: (s, b, L) => s.econ < 34 && L.closed <= 1,
    title: "Nothing moved, and nothing changed",
    text: "You approved almost nothing and funded almost nothing. The lithium came from brine fields with no hearings, the cobalt from a supply chain you declined to regulate, and the loop that might have made both unnecessary went unbuilt because it was never urgent in the round you were in. Refusing a mine is not the same as not needing one. Your council is wound up and its powers given to bodies chosen for their willingness to decide." },
  { id: "muddle", art: "endMixed", test: () => true,
    title: "The long compromise",
    text: "Some metal, some damage, a partly funded loop, a great deal of litigation, and a charter you mostly kept. The transition proceeds at roughly three-quarters of the pace the models require, which is simultaneously a failure and better than anyone else managed this decade. The same arguments resume, about the next valley and the next stretch of seafloor." }
];

const FATES = [
  { who: "Vesna", if: "jadar_sunset", yes: "knows, for the first time in five years, what her land is going to be. She plants.",
    no: "is still waiting to find out whether she lives on a farm or on a deposit." },
  { who: "Milena", if: "baseline", yes: "measured the Drina before anything touched it, and the record exists whatever happens next.",
    no: "spends her career arguing about a river nobody measured first." },
  { who: "Nikola", if: "jadar_refine", yes: "got the refinery, the tax base and the chemical plant, and defends all three in Brussels.",
    no: "watches the value added two borders away, and files the report about it himself." },
  { who: "Teremoana", if: "cook_fund", yes: "collects from a fund audited where anyone can read it. It is smaller than the hedge would have been, and it is still there.",
    no: "was consulted, thoroughly, and is not named in the agreement." },
  { who: "Rangi", if: "cook_published", yes: "has the one honest document in the file, and the distinction of being thanked for it by nobody at home.",
    no: "is still being asked whether it is safe, by people who never established whether it was worth anything." },
  { who: "Mata", if: "cook_lapsed", yes: "watched the survey vessels leave with the only funded science about her country's seabed.",
    no: "is still regulating one licence and co-owning another, and has stopped being asked about it." }
];

const DEBRIEF = {
  questions: [
    "You wrote the charter before you knew the facts. Would you adopt the same two now?",
    "Serbia had a court order telling it to proceed. The Cook Islands had a law of its own permitting it. Which was harder to act against, and why?",
    "You invoked Consent for a valley of farmers. Did it mean the same thing for a nation of fifteen thousand exercising it to say yes?",
    "The loop paid out after the round that needed it. Did that change what you funded, or only how you felt about it?",
    "If funding circularity made a deposit worthless, did you protect the seabed or devalue somebody's only asset? Can it be both?",
    "Name the thing you would have needed to know, that nobody in 2026 could have told you."
  ],
  real: [
    ["Jadarite", "Real. Discovered in the Jadar valley in 2004 and found nowhere else on Earth. USGS put the deposit at 118 million tonnes of ore at 1.8% lithium oxide."],
    ["The revocation and the ruling", "Real. Serbia revoked the spatial plan in January 2022 after mass protests. On 11 July 2024 the Constitutional Court held the revocation unconstitutional, and noted it was not itself reinstating the 2020 plan. The government restored it by decree on 16 July."],
    ["The memorandum", "Real. One week after the ruling, Serbia's mining minister and European Commission Vice-President Maroš Šefčovič signed a memorandum on critical raw materials, battery value chains and electric vehicles."],
    ["Care and maintenance", "Real. The operator moved Jadar into care and maintenance in November 2025, citing no progress on permits. The project retains EU Strategic Project status, which was itself challenged before the Court of Justice in 2026."],
    ["Marae Moana", "Real. The Marae Moana Act 2017 covers the whole 1.9 million km² EEZ. Fifty-nautical-mile exclusion zones around the fifteen islands — about 16%, some 324,000 km² — bar large-scale fishing and seabed minerals activity. The Act permits mining beyond them, subject to assessment."],
    ["The licences", "Real. Three exploration licences granted February 2022 — Moana Minerals, Cobalt (CIC), and CIIC Seabed Resources, a government partnership with Belgium's GSR — extended five years in November 2025, putting any mining decision at 2032 or later."],
    ["The economics", "Real and contested. A study commissioned by an environmental organisation concluded returns would more likely than not be negative; the government rejected it and called for independent checking."],
    ["The loop", "Real. RMI, 'The Battery Mineral Loop', July 2024: six solutions, peak mined demand in the mid-2030s, near-zero mining demand achievable before 2050, around 125 million tonnes of one-off extraction against the 2,150 million tonnes of oil burned for road transport every year."],
    ["The forecast you watched", "Real in direction. Without the chemistry, density and recycling gains since 2015, 2023 demand would have been 58% higher for lithium, 127% for nickel and 138% for cobalt. Announced projects already cover most of projected peak demand; only lithium shows a gap, around 23%, and only in the fastest-uptake case."],
    ["Nauru", "Real. Phosphate produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable."],
    ["Juukan Gorge", "Real. In 2020 the operator of Jadar destroyed rock shelters holding 46,000 years of occupation, under a valid approval. Its chief executive resigned."],
    ["The charter", "Invented, and the only invented mechanic here. Everything it costs you is drawn from arguments both books record."],
    ["The people", "Fictional composites written for this exercise. Quotations attributed to officials in the 'What else is true' panels are real and published; the voices in the scenes are not."]
  ]
};
