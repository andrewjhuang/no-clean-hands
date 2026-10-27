/* ------------------------------------------------------------------
   NO CLEAN HANDS — one currency, six stakeholders, two deposits.

   The class runs a critical-minerals project. There is exactly one
   number: SOCIAL LICENCE. Every decision spends it. Stakeholders whose
   needs are met pay it back each round; stakeholders left starving
   drain it. At zero the project is stopped — not by a regulator, by the
   people standing around it.

   THE POINT OF THE STRUCTURE: Act One is a lithium mine in a Serbian
   farming valley. Act Two is a cobalt nodule field on the Pacific
   seafloor. They have the SAME six stakeholders and the SAME four
   question shapes, in the same order, because they are the same
   industry with the same bargain — and it is the bargain coal, gas and
   oil made first. The product is cleaner. The process is a mine.

   Round shapes, deliberately mirrored:
     1 / 5  a permit          (choice)
     2 / 6  how much, how fast (slider)
     3 / 7  what you require   (conditions)
     4 / 8  who gets paid      (allocate)

   Places, laws, companies, rulings, dates and figures are real and
   itemised in the debrief.
------------------------------------------------------------------- */

const START_LICENCE = 70;
const MET = 3;          // need at or above this is "met" and pays

/* Not all six weigh the same, and pretending they did made starving the
   community the winning line. Social licence is granted by the people
   standing on the deposit and by the state that answers to them; a
   carmaker can neither grant it nor withdraw it. So each interest has
   CLOUT — what its state is worth to you each round. Met pays clout.
   Starved drains clout twice over, because losing a community is not
   the inverse of pleasing one. */
const STARVE_MULT = 2;

/* The same six interests, named for whichever deposit you are standing
   on. A fisher and a farmer want the identical thing. */
const STAKEHOLDERS = [
  { id: "site", clout: 5, label: "On site", icon: "home",
    land: "Jadar valley", sea: "Island fishers",
    landWant: "To know whether they live on a farm or on a deposit.",
    seaWant: "A reef and a tuna season that are still there in sixty years." },
  { id: "work", clout: 2, label: "Workforce", icon: "helmet",
    land: "Loznica jobs", sea: "Crew and port",
    landWant: "Work that lasts longer than the construction phase.",
    seaWant: "Berths on the survey ships, and the port that services them." },
  { id: "money", clout: 2, label: "Investors", icon: "coin",
    land: "The operator", sea: "Licence holders",
    landWant: "A permit that cannot be revoked by the next government.",
    seaWant: "A date when the exploration licence becomes a mining one." },
  { id: "state", clout: 3, label: "The state", icon: "flag",
    land: "Belgrade", sea: "Rarotonga",
    landWant: "Tax base, EU standing, and a project it can defend on television.",
    seaWant: "An economy that is not only tourism, and partners who respect the choice." },
  { id: "science", clout: 2, label: "Science", icon: "flask",
    land: "Drina hydrology", sea: "Abyssal survey",
    landWant: "A measured baseline before anything moves, not after.",
    seaWant: "Time to describe what lives down there before it is lifted." },
  { id: "buyer", clout: 1, label: "Buyers", icon: "car",
    land: "European carmakers", sea: "The same carmakers",
    landWant: "Tonnes, on a contract, inside this decade.",
    seaWant: "Tonnes, on a contract, inside this decade." },
];

const PROLOGUE = {
  title: "No Clean Hands",
  sub: "Two deposits. Six interests. One licence, and it is spent.",
  lines: [
    "Every battery, turbine and grid needs lithium, cobalt, nickel and copper, and the countries building them have decided this is a race. It is the same race, run by the same companies, under the same ministries, that coal and oil ran first.",
    "The product is cleaner than what it replaces. <b>The process is still a mine.</b> A valley is still a valley and a seafloor is still a seafloor.",
    "You hold one thing: <b>social licence</b>. Every decision costs some. Stakeholders whose needs are met pay it back each round; anyone you leave starving drains it. At zero, the project stops.",
    "Act One is a farming valley in Serbia. Act Two is five thousand metres of Pacific. Watch how little the questions change."
  ],
  note: "Real projects, laws, rulings and dates, itemised at the end."
};

/* ================================================================== */
const ACTS = [
  {
    id: "jadar", title: "Act One: Jadar", sub: "Loznica, western Serbia · lithium",
    realm: "land", art: "jadar", side: "land",
    intro: "In 2004 drillers in the Jadar valley hit a white mineral that matched nothing in the catalogue. It was named jadarite and has never been found anywhere else on Earth. The USGS put the deposit at 118 million tonnes of ore at 1.8% lithium oxide — enough lithium each year, on the operator's plan, for around 1.1 million electric cars. The valley above it grows raspberries for export and drains into the Drina.",
    beats: [
      {
        type: "choice", shape: "A permit",
        place: "The restored decree", year: "Round 1",
        situation: "Serbia revoked the project's spatial plan in January 2022 after the largest environmental protests in its recent history. In July 2024 the Constitutional Court held that the revocation itself was unconstitutional, and the government restored the plan by decree four days later — with no public debate and no strategic assessment. The permit is legally alive. Over 60% of the country opposes it.",
        ask: "Ratify the decree, re-run it properly, or refuse.",
        detail: [
          "The Constitutional Court ruled on 11 July 2024 that the 2022 revocation did not conform to the constitution or to the laws on government and environmental impact assessment. It was explicit that the ruling did not itself reinstate the 2020 plan; the government did that by decree on 16 July.",
          "A week later Serbia's mining minister signed a memorandum with European Commission Vice-President Maroš Šefčovič on critical raw materials, battery value chains and electric vehicles. The project now holds EU Strategic Project status.",
          "Rio Tinto, the operator, had warned Serbia it would pursue international arbitration to protect its investment. Refusing is not free."
        ],
        discuss: [
          "A court ruled the cancellation unlawful. Does that oblige you to approve, or only to decide properly?",
          "Sixty percent of a country is against it. Is that an objection or a poll?",
          "Coal projects were approved this way for a century. What is different now?"
        ],
        choices: [
          { key: "A", label: "Ratify the decree", sub: "Obey the ruling. Start the clock.", cost: 6,
            need: { money: 2, buyer: 1, state: 1, site: -2, science: -1 }, flag: "live,fast",
            out: { t: "Lawful and hated", x: "The plan is restored and the arbitration threat evaporates. Loznica finds out from the television, again. Your council is now the body that reinstated a mine without a hearing, and that is the first line of everything written about you from here." } },
          { key: "B", label: "Re-run the plan properly", sub: "Full assessment and a public inquiry first.", cost: 14,
            need: { site: 2, science: 2, state: 1, money: -2, buyer: -1 }, flag: "live,slow",
            out: { t: "Two more years", x: "You order the assessment the decree skipped. The valley gets hearings and the hydrology gets published. The operator costs two years of delay into its budget and says so in every quarterly call." } },
          { key: "C", label: "Refuse it outright", sub: "Cancel for good and defend it in a tribunal.", cost: 16,
            need: { site: 3, science: 1, money: -2, buyer: -2, state: -1, work: -1 }, flag: "refused",
            out: { t: "See you in tribunal", x: "The valley holds and the claim is filed inside the quarter, for a number larger than anything you have ever disbursed. Note what did not happen: the file did not close. The decree still stands, the ministry still has a plan, and you will spend the next three rounds setting conditions on a project you voted against. That is the normal condition of this work." } }
        ]
      },
      {
        type: "slider", shape: "How much, how fast",
        place: "The schedule", year: "Round 2",
        situation: "You set the build. Fast means first ore this decade, the contracts honoured and the jobs now. Slow means the hydrology is finished first, the valley can plan, and the carmakers go shopping elsewhere. Nobody in the room disputes the trade. They dispute where on it to stand.",
        ask: "How many years until first ore?",
        detail: [
          "The mine is not expected to open before 2028 at the earliest, and in November 2025 the operator moved it into care and maintenance citing no progress on permits — so the real-world answer so far has been 'slower than anyone planned'.",
          "Lithium prices came off an eighteen-month spike in late 2023 and did not go back. A fast build into a soft price is how mines end up suspended; a slow build into a tight price is how countries end up importing.",
          "This is the oldest decision in extraction. The Appalachian coal fields, the North Sea and the Permian were all built on the fast answer, and the communities that hosted them are still arguing about it."
        ],
        discuss: [
          "Who benefits from speed? Name them, then check whether they live there.",
          "If the price falls while you build, whose problem is that?",
          "Is there a speed at which everyone's need is met? Say so out loud if there isn't."
        ],
        slider: { key: "years", min: 3, max: 12, step: 3, start: 6, unit: " yrs", labelLow: "build now", labelHigh: "measure first" },
        bands: [
          { max: 3, t: "Three years", cost: 16, need: { money: 2, buyer: 2, work: 2, site: -2, science: -2 }, flag: "rush",
            x: "You build at the fastest schedule anyone has costed. The contracts are honoured, the jobs arrive, and the baseline survey is running behind the excavators — which means every future argument about the river is one expert's word against another's, permanently." },
          { max: 6, t: "Six years", cost: 10, need: { money: 1, buyer: 1, work: 1, science: 1 }, flag: "mid",
            x: "The standard build. Fast enough that the money stays and the crews are hired, slow enough that the hydrology is finished before the second phase. Nobody gets what they asked for, which is what a schedule is." },
          { max: 9, t: "Nine years", cost: 8, need: { science: 2, site: 1, state: 1, buyer: -2, money: -1 }, flag: "slow",
            x: "You put the science in front of the shaft. The valley is measured, published and arguable. Two of the three offtake contracts lapse and are signed in Chile and Australia instead, where nobody asked these questions at all." },
          { max: 12, t: "Twelve years", cost: 6, need: { science: 3, site: 2, money: -2, buyer: -2, work: -2 }, flag: "glacial",
            x: "A twelve-year build is a decision not to build, taken in a way that nobody has to defend. The valley is safe, the crews leave for Germany, and the lithium is bought from somewhere that will not be in this debrief." }
        ]
      },
      {
        type: "conditions", shape: "What you require",
        place: "The Drina", year: "Round 3",
        situation: "Processing jadarite is wet chemistry. Critics say the tailings and wastewater plan puts the Drina and Sava basins at risk — the rivers that supply Belgrade. The Serbian Academy of Sciences and Arts wrote to the prime minister about irregularities. The company says it will meet EU standards. Neither statement is a monitoring regime.",
        ask: "Attach what you require. Each one is licence you do not get back.",
        detail: [
          "Rio Tinto is the operator here and is the company that destroyed the Juukan Gorge rock shelters in 2020 — 46,000 years of occupation, under a valid approval. Its chief executive resigned. A lawful permit is not a safe one.",
          "Dry-stack tailings cost more and fail differently: wet impoundments fail catastrophically and rarely, dry stacks fail slowly and often. 'Safer' is a choice about which failure you would rather explain.",
          "Tailings dams are not a battery-minerals problem. Brumadinho in 2019 killed 270 people at an iron ore mine. The engineering is the same; only the end product has changed."
        ],
        discuss: [
          "Which single condition would you refuse to approve without?",
          "What is the difference between a standard and an enforceable condition?",
          "Everything here costs licence. What did you decide the river was worth?"
        ],
        options: [
          { id: "nodischarge", label: "No-discharge covenant", note: "Zero process water to the Drina. Closed circuit or nothing.", cost: 7,
            need: { science: 1, site: 2, money: -1 },
            yes: "The covenant goes in and the capital cost rises about a tenth.",
            no: "Discharge runs to the limits in the general permit, which was written for a different industry." },
          { id: "drystack", label: "Dry-stack tailings", note: "No impoundment above Belgrade's water.", cost: 8,
            need: { site: 2, science: 1, money: -2 },
            yes: "Dry stacking is specified, which deletes the dam-failure case and adds a decade of haulage.",
            no: "Conventional wet tailings are permitted upstream of a capital city's water supply." },
          { id: "baseline", label: "Published water baseline", note: "Independent, before construction, public either way.", cost: 6,
            need: { science: 3, site: 1 },
            yes: "The river is measured and published before first works, so the argument afterwards can be settled by data.",
            no: "No independent baseline exists, so nothing about the river can ever be proved in either direction." },
          { id: "local", label: "Local hiring floor", note: "A fixed share of jobs and contracts from the valley.", cost: 6,
            need: { work: 3, site: 1, money: -1 },
            yes: "A hiring floor is written in, so the work goes to people who have to live with the result.",
            no: "Crews are hired on the open market, as they were in every coal town that is now empty." },
          { id: "bond", label: "Closure bond in escrow", note: "Cash held for rehabilitation, before first ore.", cost: 9,
            need: { site: 2, state: 1, science: 1, money: -2 },
            yes: "The bond is lodged, so closure is funded even if the operator is not here to fund it.",
            no: "No bond is lodged. If this is abandoned mid-life, rehabilitation is a line in somebody's future budget." }
        ]
      },
      {
        type: "allocate", shape: "Who gets paid", pool: 10,
        place: "What the valley is owed", year: "Round 4",
        situation: "The project will produce revenue, jobs and a tax base. Where it lands is a decision, not a consequence. Every point you move here is a point of licence spent, and there are not enough points for six interests — which is the actual finding of this exercise and the reason it is set up this way.",
        ask: "Distribute what you have. You will not have enough.",
        detail: [
          "Shipping concentrate and refining elsewhere is how a country stays poor politely. Serbia has been the quarry before, and so have West Virginia, the Niger Delta and the Bolivian altiplano.",
          "Jadarite yields boric acid as well as lithium, and boron has a market that does not care what happens to battery demand. A plant built for both is a different proposition than a mine built for one.",
          "Benefit sharing that is not written down, audited and enforceable is called goodwill, and goodwill has never once survived a change of chief executive."
        ],
        discuss: [
          "You could not fund everyone. Say plainly who you chose not to.",
          "Is a job a benefit, or the price of the benefit?",
          "Would this split survive the project closing early?"
        ]
      }
    ]
  },

  {
    id: "cook", title: "Act Two: The Cook Islands", sub: "National waters · cobalt-rich nodules at 5,000 m",
    realm: "sea", art: "lagoon", side: "sea",
    intro: "Same six interests. Same four questions, in the same order. Fifteen thousand people hold an exclusive economic zone of 1.9 million square kilometres, with an estimated 6.7 billion tonnes of wet nodules on the floor of it — unusually rich in cobalt. This is national water: no International Seabed Authority, no common heritage of mankind, nobody outside who can say no. Watch how little the questions change.",
    beats: [
      {
        type: "choice", shape: "A permit",
        place: "The other 84%", year: "Round 5",
        situation: "The entire zone was declared a marine park — Marae Moana — by Act in 2017. The Act bars fishing and seabed minerals within fifty nautical miles of each of the fifteen islands: about 16%. In the other 84% the same Act permits mining, subject to study. The park is not a wall. It is a door with conditions on it, and it is their door.",
        ask: "Walk through it, close it, or open it block by block.",
        detail: [
          "The exclusion zones total roughly 324,000 km². Outside them the Act expressly contemplates seabed mining. A marine park that permits mining across most of itself is not a contradiction — it is a zoning decision, made by the people who live there.",
          "Three exploration licences were granted in February 2022 — Moana Minerals, Cobalt (CIC), and CIIC Seabed Resources, a partnership between the Cook Islands government and Belgium's GSR. The government regulates one licence and co-owns another.",
          "Every argument available in Act One about 'who speaks for these people' is unavailable here. The answer is a parliament in Rarotonga, elected by them."
        ],
        discuss: [
          "In Act One you may have invoked consent to stop a mine. Here consent is being used to start one. Same principle?",
          "A council of wealthy states telling the Pacific what to do with its own seabed — how does that sound said out loud?",
          "Oil was found off small states before. How did that go, and who decided?"
        ],
        choices: [
          { key: "A", label: "Respect the zoning as written", sub: "The rings hold, the abyss opens. Their law.", cost: 6,
            need: { state: 2, money: 2, work: 1, science: -2, site: -2 }, flag: "open",
            out: { t: "Their door, their decision", x: "You take the Act at its word and the zoning as sovereign. You have also approved mining across an area the size of western Europe on a baseline nobody has finished, and said 'they asked for it' out loud, which is exactly what was said about every concession ever signed by a small state." } },
          { key: "B", label: "Press to close the whole zone", sub: "Extend the no-mining rings to the entire EEZ.", cost: 14,
            need: { science: 3, site: 2, state: -2, money: -2, work: -1 }, flag: "closed",
            out: { t: "Protection, unasked for", x: "Environmental groups abroad are delighted. Rarotonga notes that the countries telling it to leave its seabed alone are the ones that burned the carbon, missed the finance commitments, and still have an economy — and then proceeds, because this is their water and your resolution is advice. You will spend the next two rounds setting conditions on a project you tried to stop." } },
          { key: "C", label: "Block by block, after survey", sub: "Nothing opens until its own block is described.", cost: 12,
            need: { science: 2, site: 1, state: 1, money: -1, buyer: -1 }, flag: "blocks",
            out: { t: "Block by block", x: "Each block opens only once it has been described. Slower than the licence holders want, faster than the ecologists want, and it has the one virtue that in twenty years somebody will be able to say what changed." } }
        ]
      },
      {
        type: "slider", shape: "How much, how fast",
        place: "How much of the floor", year: "Round 6",
        situation: "Same shape as the schedule in Act One, with area in place of years. Nodules grow a few millimetres per million years, so whatever is lifted is lifted on a geological timescale. There is no version of this where waiting loses you the option. There are many where not waiting does.",
        ask: "What share of the open zone do you licence?",
        detail: [
          "In November 2025 the authority extended all three exploration licences by five years, pushing any commercial mining decision to 2032 at the earliest. The stated reason was that nobody yet knows enough.",
          "A study commissioned by an environmental organisation found the return would more likely than not be negative. The government rejected it and asked for independent checking. Both responses are reasonable.",
          "Cobalt is the weakest case in the whole sector: the fastest-growing battery chemistry contains none, and projected cobalt per battery has fallen more than threefold in four years. The headline metal here is the one the market is leaving."
        ],
        discuss: [
          "Is a smaller licence area a compromise, or a slower version of the same thing?",
          "If the economics are negative, does the environmental argument still matter?",
          "Compare your answer here to your answer in round 2. Were you consistent?"
        ],
        slider: { key: "area", min: 0, max: 100, step: 25, start: 50, unit: "%", labelLow: "survey only", labelHigh: "the whole open zone" },
        bands: [
          { max: 0, t: "Survey only", cost: 8, need: { science: 3, site: 2, money: -2, work: -2, buyer: -1 }, flag: "surveyonly",
            x: "Nothing is licensed to produce. The vessels keep mapping and the nodules stay where they are, undescribed in commercial terms and increasingly well described in scientific ones. The development problem that started this is precisely where it was." },
          { max: 25, t: "A quarter", cost: 11, need: { science: 1, site: 1, state: 1, money: -1 }, flag: "quarter",
            x: "A small licence area, which gives you a real test at a real scale and a result you can act on. It also establishes that production is a question of how much rather than whether, which everyone in the room understood when they voted for it." },
          { max: 50, t: "Half", cost: 14, need: { money: 2, state: 2, work: 1, science: -1, site: -1 }, flag: "half",
            x: "Half the open zone goes under licence. It is the number that looks moderate on a map and is larger than most countries. The revenue is real, the baseline is partial, and both of those will be true for a long time." },
          { max: 100, t: "All of it", cost: 18, need: { money: 3, state: 2, work: 2, buyer: 2, science: -2, site: -2 }, flag: "all",
            x: "The whole open zone. The Cook Islands becomes a mineral economy inside a decade, which is what Nauru became, and the comparison is made at every forum either country attends from now on." }
        ]
      },
      {
        type: "conditions", shape: "What you require",
        place: "Before anything is lifted", year: "Round 7",
        situation: "Same shape as the Drina. Different water, same question: what has to be true before a machine goes down, and who pays for it being true. Each condition is licence you do not get back, and the ones you decline here are the ones that will be quoted at you.",
        ask: "Attach what you require.",
        detail: [
          "A collector test cut in 1989 is still visible on the seafloor. Recovery, where it has been measured, is on the order of decades to never.",
          "Te Ipukarea Society, the national environmental organisation, has called for at least ten more years of research before any decision. The authority's own geologist has said publicly that nobody yet knows enough to decide.",
          "Offshore oil required exactly these conditions and mostly got them after the first blowout rather than before. The regulatory history of the Gulf of Mexico is a list of things that are now required."
        ],
        discuss: [
          "Which of these would you have required of an oil rig? Why is this different?",
          "Who should pay for the baseline — the licence holder, the state, or the buyer?",
          "You required things of a Serbian river. Did you require the same here?"
        ],
        options: [
          { id: "seabaseline", label: "Independent baseline survey", note: "Describe it before it is lifted. One chance.", cost: 8,
            need: { science: 3, site: 1, money: -1 },
            yes: "The baseline is funded and independent, so in twenty years somebody can say what was there.",
            no: "No independent baseline. Whatever is down there is now a matter of opinion, forever." },
          { id: "plume", label: "Plume discharge limits", note: "Release at depth, with enforceable thresholds.", cost: 7,
            need: { science: 2, site: 2, money: -1 },
            yes: "Discharge depth and sediment thresholds are written in and monitored.",
            no: "Sediment is released wherever the vessel finds convenient, which models say is further than models said." },
          { id: "observers", label: "Independent observers aboard", note: "Not employed by the licence holder.", cost: 6,
            need: { science: 1, site: 2, state: 1, money: -2 },
            yes: "Observers sail on every campaign and report to the authority, not the operator.",
            no: "Compliance is self-reported, which is how fisheries were run until it stopped working." },
          { id: "crew", label: "Cook Islands crew requirement", note: "A share of berths and shore contracts, by law.", cost: 6,
            need: { work: 3, site: 1, state: 1, money: -1 },
            yes: "Berths and port contracts are reserved, so the work exists on the islands and not only off them.",
            no: "Crews are hired internationally and the port handles transits. The deposit is local; the jobs are not." },
          { id: "fund", label: "Audited sovereign fund", note: "Royalties to a published, audited fund. Not the budget.", cost: 9,
            need: { state: 2, site: 2, money: -2 },
            yes: "Royalties go to a fund that is published and audited, so the money still exists after the deposit does not.",
            no: "Royalties go to general revenue, where they are indistinguishable from any other year's money." }
        ]
      },
      {
        type: "allocate", shape: "Who gets paid", pool: 10,
        place: "What the ocean is owed", year: "Round 8",
        situation: "Last distribution. Same six interests you have been failing to satisfy since round one, now with less licence than you had then. Nauru is in this room whether or not anyone says the word: phosphate made it briefly rich and left four-fifths of the island uninhabitable, and the money is gone.",
        ask: "Distribute what is left.",
        detail: [
          "Nauru's phosphate produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable. Every Pacific state cites it; almost nobody outside the Pacific does.",
          "In April 2026 one licence holder with interests in two of the three areas announced a merger valued at around a billion dollars. The asset being valued is a licence to explore, not a mine.",
          "The Cook Islands is self-governing in free association with New Zealand and its people are New Zealand citizens. When Wellington froze part of its aid over a minerals agreement with Beijing, the leverage was real and so was the resentment."
        ],
        discuss: [
          "Compare this split with round 4. Did you treat a fisher like a farmer?",
          "If the deposit turns out to be worth nothing, which of these allocations still mattered?",
          "Sixty years from now, who is still being paid?"
        ]
      }
    ]
  }
];

/* --------------------------------------------------------- endings -- */
/* Scored on the one number, on how many interests you actually met, and
   on whether anything got built. */
const ENDINGS = [
  { id: "stopped", art: "endBad", test: (L) => L.licence <= 0,
    title: "The project is stopped",
    text: "Not by a regulator and not by a court. You ran out of the only thing that was holding this together: the willingness of the people around it to let it continue. Work halts, the money leaves, and the deposit stays exactly where it was — which some of the room wanted, achieved in the one way that teaches nobody anything and leaves the next project to be decided by people who watched this." },
  { id: "all", art: "endGood", test: (L) => L.met === 6 && L.licence >= 30,
    title: "All six, and still standing",
    text: "Every one of the six interests ended with enough to stay in the room, and the licence to operate survived. This is the hardest result available and the dullest to describe: no side won, nothing was sacrificed to make a point, and the project is still arguable in public. It took more licence than any other line of play and it is the only one where the people on the deposit, the people who need the metal, and the people who have to measure the damage are all still talking to each other." },
  { id: "balanced", art: "endGood", test: (L) => L.met >= 5 && L.licence >= 30,
    title: "Five of six, and still standing",
    text: "You met five of the six interests and kept the licence to operate. Nobody got what they asked for and everybody got enough to stay in the room, which is the only definition of success this exercise permits. It cost more and moved slower than any version where you picked a side, and it is the only outcome where the argument can continue after you leave." },
  { id: "extractive", art: "endBad", test: (L) => L.starved.includes("site") && L.licence >= 30,
    title: "Delivered, over the people who live there",
    text: "The metal arrives. Behind the production chart is a valley that was told its objection had been heard and a fishing ground that was zoned around rather than asked. You held the licence by paying everyone except the people standing on the deposit, which is precisely the arrangement coal made, and oil after it, and it held for both of them for about a generation." },
  { id: "blocked", art: "endMixed", test: (L) => L.built === 0,
    title: "Nothing was built",
    text: "Two deposits, eight rounds, and no project. The valley keeps its water and the seafloor keeps its nodules. The lithium came from a brine field with no hearings and the cobalt from a supply chain nobody in this room regulates, and the emissions you avoided at home landed in an airshed you will never visit. Refusing a mine is not the same as not needing one." },
  { id: "starved", art: "endBad", test: (L) => L.starved.length >= 3,
    title: "Three interests abandoned",
    text: "You kept the project alive by starving half the room. Each of those decisions was defensible on the day and the sum of them is a project that exists on sufferance, held together by a licence that is one bad quarter from gone. Ask whose need you never once funded, and then ask why that was the easy one to skip." },
  { id: "muddle", art: "endMixed", test: () => true,
    title: "The long compromise",
    text: "Some metal, some damage, some money in the right hands, a licence that held. The transition proceeds at roughly three-quarters of the pace the models require, which is simultaneously a failure and better than anyone else managed this decade. The same six interests will be in the room for the next deposit, and so will the same arithmetic." }
];

const DEBRIEF = {
  questions: [
    "The two acts had the same six stakeholders and the same four questions. Did you answer them the same way? Where didn't you, and why?",
    "Name the interest you funded least. Was that a decision or a habit?",
    "The product is cleaner than coal. The process is a mine. Does the first fact buy the second any leeway at all?",
    "You never had enough licence for six interests. Is that a flaw in the game or a description of the job?",
    "Both of these projects are, in reality, suspended or undecided. Was that the right answer all along, or just the one nobody had to defend?"
  ],
  real: [
    ["Jadarite", "Real. Found in the Jadar valley in 2004 and nowhere else on Earth. USGS: 118 million tonnes of ore at 1.8% lithium oxide."],
    ["The ruling and the decree", "Real. Serbia revoked the spatial plan in January 2022; the Constitutional Court held that revocation unconstitutional on 11 July 2024; the government restored the plan by decree on 16 July."],
    ["Care and maintenance", "Real. The operator moved Jadar into care and maintenance in November 2025, citing no progress on permits. It holds EU Strategic Project status, challenged before the Court of Justice in 2026."],
    ["Juukan Gorge", "Real. In 2020 the operator of Jadar destroyed rock shelters holding 46,000 years of occupation under a valid approval. Its chief executive resigned."],
    ["Brumadinho", "Real. A tailings dam failure at an iron ore mine killed 270 people in 2019. Same engineering, different end product."],
    ["Marae Moana", "Real. The 2017 Act covers the whole 1.9 million km² EEZ. Fifty-nautical-mile exclusion zones around the fifteen islands — about 16%, some 324,000 km² — bar fishing and seabed minerals. The Act permits mining beyond them, subject to assessment."],
    ["The licences", "Real. Three exploration licences granted February 2022 — Moana Minerals, Cobalt (CIC), and CIIC Seabed Resources, a government partnership with Belgium's GSR — extended five years in November 2025, putting any decision at 2032 or later."],
    ["The economics", "Real and contested. A study commissioned by an environmental organisation found the return would more likely than not be negative; the government rejected it and asked for independent checking."],
    ["Cobalt", "Real. The fastest-growing battery chemistry, lithium iron phosphate, contains no cobalt and no nickel. Projected cobalt per battery has fallen more than threefold in four years."],
    ["Nauru", "Real. Phosphate produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable."],
    ["Social licence", "Real as a concept and invented as a number. The industry phrase is 'social licence to operate'. Nobody scores it out of a hundred; everybody loses projects to it."],
    ["The stakeholders", "Composites. The interests are real and documented; the figures on screen are not individuals."]
  ],
  sources: [
    "Ernest Scheyder, The War Below (2024)",
    "Olive Heffernan, The High Seas (2024)",
    "RMI, The Battery Mineral Loop (July 2024)"
  ]
};
