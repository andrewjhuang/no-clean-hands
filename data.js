/* ------------------------------------------------------------------
   NO CLEAN HANDS — two cases, eight rounds, one charter.

   The class forms an international resource council. Before it hears
   anything it adopts two governing principles. Then it decides two real
   extraction cases:

     CASE 1  Oak Flat / Resolution Copper   (Scheyder, "The War Below")
     CASE 2  Clarion-Clipperton Zone        (Heffernan, "The High Seas")

   The charter is the spine. Every option is tagged with the principles
   it upholds or breaks, and breaking one the council adopted costs far
   more than breaking one it didn't. The second case quotes the first
   one back. That is the whole game: it is easy to write a principle and
   expensive to keep it.

   Places, laws, companies, rulings and figures are real. Named
   individuals are fictional composites.
------------------------------------------------------------------- */

const START = { env: 50, econ: 50, comm: 50, trust: 50 };

const METERS = [
  { key: "env",   label: "Environment", full: "Habitat, water, seafloor, the things that do not grow back." },
  { key: "econ",  label: "Economy",     full: "Supply secured, cost carried, projects that survive." },
  { key: "comm",  label: "Communities", full: "The people who live on top of the deposit." },
  { key: "trust", label: "Trust",        full: "Whether anyone believes your council means what it writes." },
];

/* ----------------------------------------------------------- charter */
const PRINCIPLES = [
  { id: "consent", label: "Consent",
    rule: "No project proceeds over the objection of the people whose sacred or ancestral ground it occupies.",
    short: "No project over the objection of the people whose ground it is." },
  { id: "reversible", label: "Reversibility",
    rule: "No approval where the loss cannot be undone, and none where it cannot even be measured.",
    short: "Nothing irreversible, and nothing unmeasurable." },
  { id: "supply", label: "Supply",
    rule: "The transition comes first. A metal deficit is a harm too, and it lands on people who did not choose it.",
    short: "The transition comes first; a deficit is also a harm." },
  { id: "benefit", label: "Benefit",
    rule: "Whoever bears the cost receives a real, enforceable share of the gain.",
    short: "Whoever bears the cost gets a share of the gain." },
];

const PROLOGUE = {
  title: "No Clean Hands",
  sub: "Two deposits. One council. Your own words, used against you.",
  lines: [
    "You are an international resource council. You will hear two cases: a copper mine under Apache ceremonial ground in Arizona, and a nodule field four kilometres down in the Pacific that belongs to no one.",
    "First you write your charter. You may adopt <b>two</b> principles. They bind you in both cases, and the second case will quote the first one back at you.",
    "Nothing here has a clean answer. That is not a flaw in the game."
  ],
  note: "Real places, laws and rulings. The people you meet are composites written for this exercise."
};

/* ================================================================== */
const CHAPTERS = [
  /* ------------------------------------------------- the charter */
  {
    id: "charter", title: "The charter", sub: "Before you hear anything", realm: "land", art: "title",
    intro: "Councils that write nothing can be talked into anything. Councils that write too much get quoted. You may adopt two principles; the other two still exist, they just are not yours.",
    cast: [],
    beats: [
      {
        type: "charter", art: "title",
        place: "Adopt your charter", year: "Round 0",
        situation: "Pick two. Every later option is scored against what you adopt, and breaking your own rule costs far more than breaking one you never signed.",
        ask: "Choose exactly two.",
        pickCount: 2,
        detail: [
          "These four are drawn from the arguments both books actually record: free, prior and informed consent; the precautionary principle; security of supply; and benefit sharing.",
          "No charter survives contact with a real deposit intact. The question is which breach you are willing to own."
        ],
        discuss: [
          "Which of these would you defend in front of someone it costs?",
          "Which two, together, make the hardest council to sit on?",
          "What does a principle do that a preference doesn't?"
        ]
      }
    ]
  },

  /* ------------------------------------------------- CASE 1 : OAK FLAT */
  {
    id: "oakflat", title: "Case One: Oak Flat", sub: "Chí'chil Biłdagoteel, Arizona", realm: "land", art: "oakflat",
    intro: "A copper deposit seven thousand feet below ground that Apache people have used for ceremony for generations. Congress already authorised the land exchange. The method of extraction destroys the surface by design. Four rounds.",
    cast: [
      { who: "Ruth, 70", role: "Apache elder" },
      { who: "Marcus, 29", role: "ironworker, San Carlos" },
      { who: "Dana, 54", role: "Resolution Copper" },
      { who: "Hal, 48", role: "grid engineer" }
    ],
    beats: [
      {
        type: "choice", art: "oakflat",
        place: "The exchange", year: "Round 1",
        situation: "Section 3003 of the 2015 defence bill trades 2,422 acres at Oak Flat for 5,344 acres elsewhere. It is law. Block caving will collapse the surface into a crater roughly 1.8 miles across. The deposit could carry a quarter of US copper demand.",
        ask: "The exchange can be executed, paused, or rewritten.",
        voices: [
          { who: "Ruth, 70", role: "Apache elder", line: "You are asking what the ground is worth. It is not a number, and I think you know that, or you would have offered one by now." },
          { who: "Hal, 48", role: "grid engineer", line: "Every substation needs forty tonnes of copper. My queue is eleven states long and it does not get shorter because this is difficult." }
        ],
        detail: [
          "The exchange was attached to a must-pass defence bill rather than passed on its own merits, after a decade of standalone bills failing.",
          "Subsidence is not an accident here. Block caving is cheap precisely because the collapse is free.",
          "An Environmental Impact Statement was published in January 2021, withdrawn in March 2021, and re-issued years later."
        ],
        discuss: [
          "Congress already decided this. Does that settle it, or only explain it?",
          "Block it and the copper comes from Chile, Peru, or a coal-fired smelter in Indonesia. Say that cost out loud.",
          "Which of your two principles is already under pressure, in round one?"
        ],
        choices: [
          { key: "A", label: "Execute the exchange", sub: "It is the law. Transfer the title.",
            d: { econ: 18, env: -14, comm: -18 }, vio: ["consent", "reversible"], up: ["supply"], flag: "oak_executed",
            out: { t: "Title transfers", x: "The copper is real and it changes the national picture inside a decade. Ceremonies continue for as long as the surface holds, which engineers put at twelve to twenty years. Ruth does not attend the signing." } },
          { key: "B", label: "Suspend it", sub: "Withdraw the land and ask Congress to repeal.",
            d: { env: 12, comm: 18, econ: -16 }, up: ["consent", "reversible"], vio: ["supply"], flag: "oak_suspended",
            out: { t: "Withdrawn", x: "Oak Flat stays. Copper prices are not sentimental: the deficit fills from Chile, Peru and an Indonesian smelter burning captive coal, and your own grid build slips two years across eleven states." } },
          { key: "C", label: "Rewrite it", sub: "Approve the ore, forbid the crater. Backfill, at double cost.",
            d: { econ: 4, env: 4, comm: 6 }, up: ["reversible"], vio: [], flag: "oak_backfill",
            out: { t: "Half a mine, twice the price", x: "Paste backfill and selective mining recover about half the ore and leave the surface standing. The economics only work because you guarantee the price. One of the two joint-venture partners sells its stake rather than accept the terms." } }
        ]
      },

      {
        type: "spend", art: "oakflat",
        place: "Juukan Gorge", year: "Round 2",
        situation: "In 2020 the lead operator destroyed two rock shelters in Western Australia that held 46,000 years of continuous human occupation. It was legal. The chief executive resigned. That company is the one asking you for a permit.",
        ask: "Attach the conditions you can defend. Each costs the project.",
        voices: [
          { who: "Dana, 54", role: "Resolution Copper", line: "Different country, different decade, different management. I understand why you are bringing it up. I would also like you to notice that I cannot change it." },
          { who: "Marcus, 29", role: "ironworker", line: "I want the job. I also read what happened at Juukan Gorge. Do not make me choose by pretending the second thing didn't happen." }
        ],
        detail: [
          "Juukan Gorge was destroyed under a validly granted approval. The lesson most often drawn is that legality and legitimacy came apart, and the law was the thing that held.",
          "Conditions written into a permit outlive the executives who signed them. Promises made in press releases do not.",
          "Every condition here raises cost, and cost is what killed the last three American copper projects."
        ],
        discuss: [
          "Does a company's record elsewhere belong in this decision?",
          "Which of these conditions would still be enforceable in 2050?",
          "You are spending the project's margin. At what point have you killed it by conditions instead of by refusal?"
        ],
        options: [
          { id: "veto", cost: 0, label: "Cultural veto on disturbance", note: "Tribal sign-off required before any surface work. Binding.",
            d: { comm: 16, env: 6, econ: -12 }, up: ["consent"], flag: "oak_veto",
            yes: "A tribal body gets a real veto written into the permit, not a consultation line. The construction schedule becomes something they can stop.",
            no:  "Consultation stays advisory, which is the arrangement that produced Juukan Gorge." },
          { id: "bond", cost: 0, label: "Reclamation bond", note: "Cash held in escrow against the crater, before first ore.",
            d: { env: 12, econ: -10, trust: 6 }, up: ["reversible", "benefit"], flag: "oak_bond",
            yes: "Money sits in escrow that cannot follow a bankruptcy. It is the single most effective thing on this list and nobody will ever thank you for it.",
            no:  "If the operator fails, the hole is the public's problem. It usually is." },
          { id: "royalty", cost: 0, label: "Royalty to the tribe", note: "A share of revenue, not a one-time payment.",
            d: { comm: 14, econ: -8 }, up: ["benefit"], flag: "oak_royalty",
            yes: "A percentage of revenue, paid annually, for the life of the mine. Hardrock mining on federal land has never owed the public a royalty; you are inventing one.",
            no:  "The community gets wages while the shaft is sunk and nothing after it closes." },
          { id: "water", cost: 0, label: "Water cap and monitoring", note: "Hard limit in a drought basin, metered independently.",
            d: { env: 14, econ: -6 }, up: ["reversible"], flag: "oak_water",
            yes: "The draw is capped and independently metered, and the tailings facility is sited and bonded under the same rule.",
            no:  "Pumping proceeds under the operator's own modelling in a basin that is already in deficit." }
        ]
      },

      {
        type: "slider", art: "oakflat",
        place: "The Court declines", year: "Round 3",
        situation: "The Ninth Circuit has ruled against the Apache plaintiffs and the Supreme Court declines to take the case. Your legal exposure just disappeared. Every remaining protection is now discretionary, which means it is yours.",
        ask: "How many years of surface access do you guarantee before the cave begins?",
        slider: { key: "years", min: 0, max: 30, step: 5, start: 10, unit: " yrs", labelLow: "None", labelHigh: "Thirty years" },
        voices: [
          { who: "Ruth, 70", role: "Apache elder", line: "The court said you are allowed to do this. I notice nobody has said you have to." },
          { who: "Dana, 54", role: "Resolution Copper", line: "Every year you hold the surface is a year of capital sitting in a hole earning nothing. I am not being dramatic. I am being arithmetical." }
        ],
        detail: [
          "Losing the case removed the legal reason to be careful. Nothing removed the other reasons.",
          "Slowing the cave is technically straightforward and financially brutal: the capital is spent either way and the revenue arrives later.",
          "Thirty years is about a generation. A child at today's ceremony could bring their own child."
        ],
        discuss: [
          "When the law stops requiring restraint, what is left that produces it?",
          "Is a guaranteed delay a protection, or a slower version of the same ending?",
          "Who should hold this number: the regulator, the operator, or the families?"
        ],
        bands: [
          { max: 5, t: "Straight down", d: { econ: 14, comm: -16, env: -8 }, vio: ["consent"], flag: "cave_fast",
            x: "The cave runs at full rate. The surface begins moving in year four, visibly, and the ceremonies relocate to a site everyone agrees is not the same place. The copper arrives early and cheap." },
          { max: 15, t: "A decade", d: { econ: 6, comm: 2 }, vio: [], flag: "cave_decade",
            x: "Ten years of ceremonies, then the ground goes. Long enough for families to plan around it and short enough that nobody mistakes it for a reprieve. Both sides call it an insult, which is roughly what a compromise looks like." },
          { max: 30, t: "A generation", d: { econ: -8, comm: 16, env: 4 }, up: ["consent"], flag: "cave_generation",
            x: "Thirty years. Ruth's great-granddaughter has her ceremony on that ground. Two of your grid deadlines are already missed by the time the first concentrate ships, and your successor inherits the complaint." }
        ]
      },

      {
        type: "choice", art: "oakflat",
        place: "Skunk Camp", year: "Round 4",
        situation: "The tailings have to go somewhere. The proposed facility sits upstream of a drought-stressed basin, and the volume is measured in hundreds of millions of tonnes, held behind an embankment, permanently.",
        ask: "Approve the tailings plan, or make it someone's problem now rather than in 2070.",
        voices: [
          { who: "Hal, 48", role: "grid engineer", line: "Nobody has ever cancelled a mine over the tailings. They cancel them over copper prices." }
        ],
        detail: [
          "Tailings dams fail rarely and catastrophically; the failures that matter happened at facilities that were also compliant.",
          "A dry-stack facility costs substantially more and fails differently — it does not run downhill.",
          "This is the decision that is invisible in every photograph of the mine."
        ],
        discuss: [
          "Which risks get priced, and which get deferred to people not yet born?",
          "Is 'permanent storage' a plan or a euphemism?",
          "You have three rounds of decisions behind you. Are they consistent with this one?"
        ],
        choices: [
          { key: "A", label: "Approve as proposed", sub: "Conventional wet tailings. Cheapest.",
            d: { econ: 12, env: -16 }, vio: ["reversible"],
            out: { t: "Approved", x: "The embankment is engineered to standard and inspected annually. On the balance of probability it holds for the design life. The design life is shorter than the hazard." } },
          { key: "B", label: "Require dry stack", sub: "Filtered tailings. Far costlier, fails differently.",
            d: { env: 14, econ: -12, trust: 6 }, up: ["reversible"], flag: "drystack",
            out: { t: "Filtered and stacked", x: "The facility cannot liquefy and cannot run downhill. It costs enough that the project's internal rate of return drops below the threshold the board set, and they approve it anyway because you have left them nowhere to go." } },
          { key: "C", label: "Defer the decision", sub: "Permit the mine now, settle tailings later.",
            d: { econ: 8, env: -6, trust: -14 }, vio: ["reversible", "benefit"],
            out: { t: "Deferred", x: "Construction begins with the waste plan unresolved, which is how most of these proceed. By the time it returns to a council, the capital is sunk and the answer is effectively pre-decided." } }
        ]
      }
    ]
  },

  /* ------------------------------------------------- CASE 2 : THE DEEP */
  {
    id: "ccz", title: "Case Two: The Clarion-Clipperton Zone", sub: "Abyssal Pacific, 4,000–5,500 m", realm: "sea", art: "deep",
    intro: "Nickel, copper, cobalt and manganese lying loose on the abyssal floor across an area larger than India. No village, no sacred site, no tailings dam, and no sovereign. Your charter still applies. Four rounds.",
    cast: [
      { who: "Amb. Renga", role: "sponsoring state" },
      { who: "Dr Sørensen, 47", role: "deep-sea ecologist" },
      { who: "Tomas, 55", role: "tuna fleet owner" },
      { who: "Ivo, 44", role: "contractor" }
    ],
    beats: [
      {
        type: "choice", art: "deep",
        place: "The two-year rule", year: "Round 5",
        situation: "The seabed beyond national jurisdiction is the common heritage of mankind. In 2021 a sponsoring state triggered a clause forcing the Authority to finish its mining code in two years. The deadline passed in July 2023 with no code, so applications can now be filed into the gap.",
        ask: "Your council's position decides what gets filed into.",
        voices: [
          { who: "Amb. Renga", role: "sponsoring state", line: "Phosphate made us briefly rich and ate four-fifths of the island. We are now told to be careful with the only asset we have left, by countries that got rich being careless." },
          { who: "Dr Sørensen, 47", role: "ecologist", line: "We have described perhaps a tenth of the animals down there. A test track cut in 1989 is still visible. I cannot tell you it is catastrophic. I am telling you nobody can tell you anything." }
        ],
        detail: [
          "Arvid Pardo put 'common heritage of mankind' to the UN in 1967. UNCLOS made it law and created the Authority to license the seabed for everyone's benefit, with particular regard for developing states.",
          "More than thirty states now back a moratorium or precautionary pause, among them France, Germany, Chile, Palau and Vanuatu. BMW, Volvo, Google and Samsung SDI have pledged not to buy the metal.",
          "Nodules grow a few millimetres per million years. Whatever is removed is removed on a geological timescale, not a regulatory one."
        ],
        discuss: [
          "'Common heritage of mankind' — who is that, concretely, and who speaks for them?",
          "No village, no sacred site, no dam. Does the absence of a visible victim make this easier or only quieter?",
          "Compare this to Oak Flat. Did you apply the same test?"
        ],
        choices: [
          { key: "A", label: "Sponsor under the Authority", sub: "Work inside the treaty. Push for a strict code.",
            d: { econ: 14, env: -8, trust: 4 }, up: ["supply", "benefit"], vio: ["reversible"], flag: "sea_mine",
            out: { t: "Inside the room", x: "You get a strict-ish code, independent observers aboard, and a benefit-sharing fund that actually disburses. You also get the first commercial licence in history issued against an environmental baseline nobody has finished measuring." } },
          { key: "B", label: "Back a moratorium", sub: "Nothing proceeds until the science is in.",
            d: { env: 18, econ: -16, comm: 4 }, up: ["reversible"], vio: ["supply", "benefit"], flag: "moratorium",
            out: { t: "A pause, and an invoice", x: "The coalition holds at thirty-eight states and no licence issues this year. Renga votes against you on the floor, at length, with the phosphate numbers, and asks who is compensating the states that agreed to wait." } },
          { key: "C", label: "Abstain", sub: "Take no position. Let others carry it.",
            d: { econ: 2, trust: -16, env: -6 }, vio: ["consent", "reversible", "supply", "benefit"], flag: "abstained",
            out: { t: "No position", x: "Abstention reads as permission to everyone who wanted to proceed and as abandonment to everyone who wanted a pause. Both readings are correct, and your council is cited by each side within the year." } }
        ]
      },

      {
        type: "slider", art: "plume",
        place: "The plume and the oxygen", year: "Round 6", requires: "sea_mine",
        situation: "The collector trial worked. The sediment it discharges did not behave as modelled: predicted to settle within a few kilometres, it is detectable far further, drifting toward the band where tuna feed at night. Separately, a 2024 paper reports oxygen being produced at the seafloor by the nodules themselves. It is contested.",
        ask: "How deep do you require the discharge to be released?",
        slider: { key: "depth", min: 0, max: 100, step: 10, start: 20, unit: "%", labelLow: "Near surface — cheap", labelHigh: "At the seafloor — costly" },
        voices: [
          { who: "Tomas, 55", role: "tuna fleet owner", line: "Four economies eat off that water column. Nobody asked us anything, and we are not a party to anything, so nobody has to." },
          { who: "Ivo, 44", role: "contractor", line: "Every hundred metres of return pipe is eight million dollars and four percent uptime. You are welcome to require it. I am telling you what it costs." }
        ],
        detail: [
          "The 'dark oxygen' finding would mean the thing being mined is also producing the conditions for life around it. The industry funded a rebuttal. The argument is live and unresolved.",
          "Shallow discharge is dramatically cheaper: less pipe, less power, more uptime.",
          "Your charter was written before any of this was known. That is the normal condition of charters."
        ],
        discuss: [
          "What standard of evidence should stop something already running? Is it the same standard you needed to start it?",
          "At Oak Flat you could name the people harmed. Who do you name here?",
          "If the oxygen finding holds, does it change the decision or only the discomfort?"
        ],
        bands: [
          { max: 30, t: "Shallow and cheap", d: { econ: 16, env: -22, trust: -10 }, vio: ["reversible"], flag: "plume_shallow",
            x: "Production is excellent and the plume is a headline. The drift reaches the feeding band inside a year and four Pacific economies file against you, using your own observers' data. You cannot claim you were not told." },
          { max: 70, t: "Mid-water", d: { econ: 8, env: -7, trust: 2 }, vio: [], flag: "plume_mid",
            x: "Deepening the discharge helps, measurably and insufficiently. The tuna states withdraw their objection; the scientists do not. Production holds at about eighty percent of plan and everyone calls it a win in public." },
          { max: 100, t: "Returned to the floor", d: { econ: -6, env: 14, trust: 8 }, up: ["reversible"], flag: "plume_deep",
            x: "Near-seafloor discharge costs a third of the uptime and most of the contractor's margin. The impact stays inside the licence area, which is the first unambiguously good environmental news of your tenure, and the restructuring is somebody else's problem." }
        ]
      },

      {
        type: "choice", art: "vacuum",
        place: "The vacuum", year: "Round 6", requires: "moratorium",
        situation: "Your pause held for two years and then met the limit of a coalition with no veto. A consortium sponsored by states outside your coalition is collecting nodules in the eastern zone, under rules your scientists never saw, with no independent observers aboard. Renga's state has joined them.",
        ask: "Hold, bargain, or reverse.",
        voices: [
          { who: "Amb. Renga", role: "sponsoring state", line: "You asked us to wait. We waited. Then you went home to a country with electricity." },
          { who: "Dr Sørensen", role: "ecologist", line: "The worst outcome was never that mining happens. It is that mining happens and nobody independent is permitted to watch." }
        ],
        detail: [
          "A moratorium binds only its signatories. The Authority cannot compel a non-party, and the largest potential operator is not a party to UNCLOS at all.",
          "The contractor's environmental data belongs to the contractor.",
          "Holding the line and having no observers are, in practice, the same sentence."
        ],
        discuss: [
          "Is a moratorium others ignore better or worse than strict rules you help write?",
          "What is a principle worth if it only binds the people who already agreed?",
          "Renga waited and got nothing. What would have made waiting worth their while?"
        ],
        choices: [
          { key: "A", label: "Hold the line", sub: "Stay out. Fund the baseline science nobody else will.",
            d: { env: 10, trust: 8, econ: -10 }, up: ["reversible"], vio: ["supply"], flag: "held",
            out: { t: "Clean hands, no leverage", x: "Your survey becomes the authoritative independent baseline and is cited in every subsequent proceeding, including the ones that approve mining. You have no observers, no vote and no metal, and the best dataset in the world." } },
          { key: "B", label: "Trade recognition for rules", sub: "Recognise their licences. Demand observers and a real fund.",
            d: { econ: 10, env: 4, comm: 4, trust: -8 }, up: ["benefit", "supply"], vio: ["reversible"], flag: "bargained",
            out: { t: "The deal", x: "You get observers aboard, a discharge standard with teeth, and a fund that pays states with no contractor of their own. You also legitimise what you spent two years calling illegitimate, and the thirty-eight states who held the line with you learn what your word is worth." } },
          { key: "C", label: "Reverse and compete", sub: "The pause failed. Sponsor your own.",
            d: { econ: 18, env: -16, comm: -10, trust: -16 }, vio: ["reversible", "consent"], flag: "reversed",
            out: { t: "The turn", x: "Your licences issue within the year and the metal arrives in time to matter. Two of your coalition partners had passed domestic legislation on the strength of your assurances; they read the announcement at the same time as the press." } }
        ]
      },

      {
        type: "choice", art: "deep",
        place: "The other door", year: "Round 7",
        situation: "A major power that signed the Law of the Sea and never ratified it begins issuing seabed permits under its own 1980 statute, outside the Authority entirely. A contractor offers your council the same route: faster, cheaper, and legally untouchable by Kingston.",
        ask: "The door is open. It was always open.",
        voices: [
          { who: "Ivo, 44", role: "contractor", line: "Every box is ticked. I want to be precise that I am answering a different question than the one you asked me." }
        ],
        detail: [
          "The United States signed UNCLOS and never ratified it, so it holds no vote at the Authority and is not bound by it either. Its Deep Seabed Hard Mineral Resources Act dates from 1980 and was never repealed.",
          "If one state permits outside the regime, the common heritage principle does not fall over. It simply stops being the only option, which is how regimes end.",
          "Your charter was adopted in round zero. This is the round where you find out what you wrote."
        ],
        discuss: [
          "If the rules can be stepped around, what were they doing?",
          "Is taking the fast route different from buying from someone who did?",
          "Compare with Oak Flat round one: Congress had already decided that too."
        ],
        choices: [
          { key: "A", label: "Take the route", sub: "Permit outside the Authority. Fast and lawful.",
            d: { econ: 20, env: -12, trust: -20 }, vio: ["benefit", "reversible", "consent"], flag: "unilateral",
            out: { t: "Outside the regime", x: "Licences issue in four months and the metal moves. Thirty-one states call it a repudiation of the common heritage; two other powers announce their own permits on your reasoning, which you cannot object to without describing yourself." } },
          { key: "B", label: "Refuse and say why", sub: "Publicly. Even though it changes nothing.",
            d: { trust: 16, econ: -10, env: 4 }, up: ["benefit", "reversible"], flag: "refused_door",
            out: { t: "On the record", x: "Another buyer takes the cargo within a week at the same price. Your refusal changes the destination of the nickel and nothing else, which your critics point out and your own analysts confirm. The statement is quoted for twenty years." } },
          { key: "C", label: "Use it as leverage", sub: "Threaten to leave unless the Authority finishes the code.",
            d: { econ: 8, trust: -6, env: 6 }, up: ["supply"], vio: ["benefit"], flag: "leverage",
            out: { t: "The ultimatum", x: "The code is finished in fourteen months, faster than a decade of good-faith negotiation managed, and it is weaker than the draft you were arguing for. You got a rulebook by threatening to ignore rulebooks." } }
        ]
      },

      {
        type: "spend", art: "deep",
        place: "Who gets paid", year: "Round 8",
        situation: "Benefit sharing is the part of the common heritage principle that has never been implemented at scale. Your council sets what the fund pays for, and your term ends in March.",
        ask: "Fund what you can defend.",
        voices: [
          { who: "Amb. Renga", role: "sponsoring state", line: "Phosphate royalties built our hospital. Then the royalties stopped and the island was gone. Write this one carefully." },
          { who: "Dr Sørensen", role: "ecologist", line: "A baseline survey done before mining is worth more than any survey done after, and it can only be done once." }
        ],
        detail: [
          "Developing states without a contractor of their own get nothing from the seabed unless a mechanism pays them, which is what 'for the benefit of mankind as a whole' was supposed to mean.",
          "Sponsoring-state liability is the open question: if a contractor causes damage it cannot pay for, the small state that sponsored it may be left holding it.",
          "Nauru's phosphate wealth per capita was briefly among the highest on earth. Roughly four-fifths of the island is now uninhabitable."
        ],
        discuss: [
          "Who counts as a beneficiary of the common heritage of mankind, in practice?",
          "Which of these outlives your term, and which is a gesture?",
          "Did the people harmed in Case One get anything comparable?"
        ],
        options: [
          { id: "fund", cost: 0, label: "Benefit-sharing disbursement", note: "Annual payments to states with no contractor.",
            d: { comm: 16, econ: -8, trust: 8 }, up: ["benefit"], flag: "fund",
            yes: "The fund disburses for the first time in its history. Each share is smaller than Nauru's phosphate royalties were in 1975, and unlike those it arrives every year.",
            no:  "The common heritage of mankind remains a phrase in a treaty and a line in your minutes." },
          { id: "liability", cost: 0, label: "Liability backstop", note: "The regime covers damage a sponsor cannot pay for.",
            d: { comm: 12, env: 6, econ: -10 }, up: ["benefit", "reversible"], flag: "liability",
            yes: "Small sponsoring states stop carrying a risk they could never absorb. Two of them immediately sponsor contractors, which is either the point or the problem.",
            no:  "A small state that sponsors a contractor is one accident away from a liability larger than its national budget." },
          { id: "baseline", cost: 0, label: "Independent baseline survey", note: "Map it before it is mined. One chance.",
            d: { env: 16, econ: -6 }, up: ["reversible"], flag: "baseline",
            yes: "Sørensen gets her ship. The survey describes some 1,400 species, most of them new to science, and becomes the thing every later case is argued against.",
            no:  "Mining proceeds against a baseline nobody measured, so no damage can ever be proven, which is a result in itself." },
          { id: "nothing", cost: 0, label: "Leave it to the Authority", note: "Not your council's remit.",
            d: { trust: -12, comm: -8 }, vio: ["benefit"],
            yes: "You close the file. The phrase 'deferred to the competent body' appears in your own council's wind-up review two years later.",
            no:  "" }
        ]
      }
    ]
  }
];

/* --------------------------------------------------------- endings -- */
/* Hypocrisy is the failure condition, not low meters. */
const ENDINGS = [
  { id: "kept", art: "endGood",
    test: (s, b) => b === 0 && s.env >= 48 && s.comm >= 48 && s.econ >= 42,
    title: "You kept your word",
    text: "Two cases, eight rounds, and not one breach of the charter you adopted before you knew what it would cost. Nobody writes a song about this outcome; from outside it looks like a great many meetings and a slower supply chain. It is also the rarest result in this game, and the one your successors will be measured against whether they like it or not." },
  { id: "honest", art: "endMixed",
    test: (s, b) => b === 1,
    title: "One breach, owned",
    text: "You broke your charter once, in writing, with a reason attached. That is a different thing from drifting, and the record shows it. The principle survived as something the council can be held to rather than something it recites, which is more than most regimes manage in a decade." },
  { id: "hollow", art: "endBad",
    test: (s, b) => b >= 4,
    title: "The charter was decoration",
    text: "You adopted two principles and broke them four times or more. Every breach was defensible in the room and the sum of them is a council whose written commitments mean nothing to anybody who has read the minutes. Your charter is now cited in other people's filings as evidence that charters are theatre." },
  { id: "extractive", art: "endBad",
    test: (s) => s.econ >= 68 && (s.comm < 38 || s.env < 36),
    title: "Delivered, and nobody forgot how",
    text: "The copper and the nodules both arrive, on schedule, at scale. Behind the production chart: a crater where a ceremony ground was, an abyssal plain under contract before anyone finished counting what lived there, and two communities who were told their objection had been heard. All of that is true at once and the metal does not come back out." },
  { id: "paralysed", art: "endMixed",
    test: (s) => s.econ < 34,
    title: "Nothing moved",
    text: "You protected almost everything and approved almost nothing. The copper came from Chile and Indonesia, the nickel from a consortium you refused to regulate, and the emissions you avoided at home landed in somebody else's airshed. Your council is wound up and its powers distributed to bodies appointed precisely because they will not do what you did." },
  { id: "muddle", art: "endMixed", test: () => true,
    title: "The long compromise",
    text: "Some copper, some nodules, some damage, a great deal of litigation, and a charter you mostly kept. The transition proceeds at roughly three-quarters of the pace the models require, which is simultaneously a failure and better than anyone else managed this decade. The same arguments resume, about the next deposit and the next stretch of seafloor." }
];

const FATES = [
  { who: "Ruth", if: "cave_generation", yes: "watched her great-granddaughter's ceremony on ground that was still there to stand on.",
    no: "was told the ground would be available for as long as it lasted, which was true and was not an answer." },
  { who: "Marcus", if: "oak_royalty", yes: "works the project, and his community collects a share of it every year rather than wages that end when the shaft is sunk.",
    no: "works the project. When it closes, the money leaves with the company and his family stays." },
  { who: "Dana", if: "oak_backfill", yes: "delivered half the ore at twice the cost and defends the decision in industry panels she is no longer invited to.",
    no: "delivered the project as designed and was promoted." },
  { who: "Renga", if: "fund", yes: "collects a benefit-sharing payment every year. It is smaller than phosphate was, and it does not stop.",
    no: "stopped describing your council as a partner, in a floor speech that is still quoted." },
  { who: "Sørensen", if: "baseline", yes: "described 1,400 species before anyone mined them. Most were new, and the record exists.",
    no: "spent nine years documenting damage against a baseline nobody ever measured." },
  { who: "Tomas", if: "plume_deep", yes: "still fishes the same water column, and says so, loudly, at every hearing he can reach.",
    no: "watched the plume reach the feeding band and filed against a council that had assured him it would not." }
];

const DEBRIEF = {
  questions: [
    "You wrote the charter before you knew the facts. Would you adopt the same two now?",
    "Which breach felt necessary in the room and looks worst written down?",
    "Oak Flat had people in it. The abyssal plain did not. Did your council hold both to the same standard?",
    "Congress had already decided Oak Flat. The Authority had failed to decide the seabed. Which was harder to act against?",
    "Name the thing you would have needed to know, that nobody could have told you."
  ],
  real: [
    ["The land exchange", "Real. Section 3003 of the 2015 National Defense Authorization Act trades 2,422 acres at Oak Flat for 5,344 acres elsewhere, after a decade of standalone bills failing."],
    ["The crater", "Real. Block caving would subside the surface across roughly 1.8 miles. The collapse is the method, not an accident of it."],
    ["Juukan Gorge", "Real. In 2020 the lead operator destroyed rock shelters holding 46,000 years of occupation, under a valid approval. The chief executive resigned."],
    ["The courts", "Real. The Ninth Circuit ruled against the Apache plaintiffs and the Supreme Court declined to hear the case, leaving the remaining protections discretionary."],
    ["Common heritage", "Real. Arvid Pardo's 1967 speech, then UNCLOS and the International Seabed Authority, which licenses the seabed for everyone's benefit with particular regard to developing states."],
    ["The two-year rule", "Real. Triggered by a sponsoring state in 2021; the deadline passed in July 2023 with no mining code finished."],
    ["Dark oxygen", "Real and contested. A 2024 paper reported oxygen production at the abyssal seafloor associated with the nodules; industry funded a rebuttal."],
    ["The other door", "Real. The United States signed UNCLOS and never ratified it, and its 1980 deep seabed statute was never repealed."],
    ["Nauru", "Real. Phosphate briefly produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable."],
    ["The charter", "Invented, and the only invented mechanic here. Everything it costs you is drawn from arguments both books record."],
    ["The people", "Fictional composites written for this exercise."]
  ]
};
