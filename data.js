/* ------------------------------------------------------------------
   NO CLEAN HANDS — scene data
   A classroom decision game on critical minerals and the deep sea.

   Sources behind the scenarios:
     Ernest Scheyder, "The War Below: Lithium, Copper, and the Global
       Battle to Power Our Lives" (2024)
     Olive Heffernan, "The High Seas: Greed, Power and the Battle for
       the Unclaimed Ocean" (2024), ch. 1, 4, 12

   Places, laws, companies, court cases and figures are real and
   documented. Named individuals are FICTIONAL COMPOSITES written for
   this exercise. The Republic of Mareva is fictional; it is modelled on
   Nauru's real sponsorship of a seabed contractor and on Nauru's real
   history with phosphate.
------------------------------------------------------------------- */

const METERS = [
  { key: "trust",  label: "Community trust", hint: "Do the people nearest the hole believe you?" },
  { key: "eco",    label: "Living world",    hint: "Habitat, water, species, seafloor." },
  { key: "supply", label: "Secured supply",  hint: "Metal actually moving toward the grid." },
  { key: "cap",    label: "Political capital", hint: "What you can still spend in Washington." },
];

const PROLOGUE = {
  year: "March 2026",
  realm: "land",
  title: "No Clean Hands",
  sub: "Lithium, copper, and the battle for the deep",
  body: [
    "You chair the National Critical Materials Council. You have eight years.",
    "Every climate target your government has signed depends on metal that is currently underground, or lying on the floor of an ocean that belongs to no one. An electric car needs roughly six times the mineral input of a petrol car. An offshore wind farm needs about nine times more mineral per megawatt than a gas plant. Under a net-zero pathway the world needs something like forty times more lithium by 2040 than it mined in 2020.",
    "None of it is clean. Every tonne comes from somewhere, and someone lives there.",
    "You will make seven decisions. There is no option that costs nothing. Argue it out."
  ],
  note: "Real places, real laws, real cases. The people you will meet are composites written for this exercise."
};

const SCENES = [
  /* ---------------------------------------------------------------- 1 */
  {
    id: "thacker",
    act: 1,
    realm: "land",
    year: "March 2026",
    place: "Thacker Pass · Peehee Mu'huh",
    where: "Humboldt County, Nevada",
    headline: "The largest lithium deposit in the country sits on a massacre site",
    brief: [
      "The caldera holds the biggest known lithium resource in the United States. On paper: batteries for millions of cars a year, for decades. The permits are signed. The courts have cleared the way twice. Equipment is staged at the gate and the first blast is scheduled for Monday.",
      "Peehee Mu'huh means rotten moon. Paiute oral history places a massacre here in 1865. The Bureau of Land Management ran a consultation and says it was adequate; three of the nearest tribes say it never reached them before the record closed.",
      "The land is federal. Under the General Mining Law of 1872 — still in force, still charging no federal royalty on the metal taken out — hardrock mining is the highest and best use of it.",
      "Humboldt County's median household income runs below the state's. The project promises about a thousand construction jobs and three hundred permanent ones in a county of twenty thousand people."
    ],
    humans: [
      { name: "Lena Birdsong", age: 58, role: "tribal council member", quote: "You can dig a battery out of the ground my grandmother was buried in and call it climate action. I would like to watch you say that sentence out loud, slowly." },
      { name: "Ray Castellanos", age: 44, role: "haul truck driver, laid off", quote: "The gold mine closed in October. I drive four hours each way for shifts that might not exist next month. My kids think we're moving to Reno. Tell me which part of that is good for the planet." }
    ],
    stake: "The gate opens Monday unless you close it.",
    discuss: [
      "Who counts as a stakeholder here, and who decides that?",
      "Is there a price at which a sacred site becomes negotiable? If not, what do you owe Ray?",
      "If this lithium is not mined in Nevada, where does it come from instead — and who carries that cost?"
    ],
    context: [
      "The 1872 Mining Law lets a company take hardrock minerals from federal land without paying the public a royalty. Reform bills have failed for over a century.",
      "Courts allowed construction at Thacker Pass to proceed while tribal claims were still being litigated."
    ],
    choices: [
      {
        key: "A", label: "Let the shovels move",
        detail: "The permits are lawful. Delay costs the climate more than it costs the county.",
        deltas: { supply: 14, cap: 6, trust: -18, eco: -10 },
        flags: ["fasttrack"],
        outcome: {
          title: "First blast, Monday, 6:04 a.m.",
          text: "Construction starts on schedule. A protest camp forms at the gate and holds for eleven weeks. Fourteen people are arrested, including Lena's granddaughter, who is nineteen and had never been arrested before. A federal judge declines to halt the work. The company's share price rises four percent on the ruling.",
          human: { name: "Ray Castellanos", line: "Ray is hired in week three. He buys a used truck and stops looking at listings in Reno." }
        }
      },
      {
        key: "B", label: "Order a full re-consultation",
        detail: "Eighteen months. Nothing moves until every affected tribe is properly in the record.",
        deltas: { trust: 14, cap: -10, supply: -8, eco: 2 },
        flags: ["delay"],
        outcome: {
          title: "Eighteen months",
          text: "The consultation is real this time: ethnographic survey, oral history, a tribal monitoring program written into the plan. It also produces a document, not a decision. Two investors move capital to a project in Argentina with a shorter timeline and weaker rules. The battery plant that was to be built downstate is announced in another state instead.",
          human: { name: "Ray Castellanos", line: "Ray takes a job at a distribution warehouse outside Reno. The family moves in August." }
        }
      },
      {
        key: "C", label: "Shrink it, share it",
        detail: "Cut the footprint away from the burial area. Co-management, and a royalty paid to the tribes.",
        deltas: { trust: 9, eco: 6, cap: -12, supply: 4 },
        flags: ["comanage"],
        outcome: {
          title: "A smaller hole, and an argument about money",
          text: "You spend most of a year's political capital forcing a royalty that the 1872 law does not require. The company accepts a reduced footprint and a tribal monitoring board. Roughly a third of the resource is left in the ground.",
          human: { name: "Lena Birdsong", line: "Lena votes against the agreement and signs it anyway. 'They will call this consent,' she says. 'Write down that I called it a settlement.'" }
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 2 */
  {
    id: "buckwheat",
    act: 2,
    realm: "land",
    year: "September 2026",
    place: "Rhyolite Ridge",
    where: "Esmeralda County, Nevada",
    headline: "A flower that grows on ten acres, and nowhere else on Earth",
    brief: [
      "Lithium and boron, in a deposit good enough to supply a battery plant for decades. The chemistry is unusually easy: this one could actually make money at today's prices, which is more than most American projects can say.",
      "Tiehm's buckwheat grows on about ten acres of this ridge and on no other ground in the world. A few tens of thousands of plants, total, in six small patches. In 2020 roughly forty percent of them were destroyed; the company was accused of sabotage, investigators eventually blamed ground squirrels in a drought. It was listed as endangered in 2022.",
      "The deposit and the only population of the species are on top of each other."
    ],
    humans: [
      { name: "Dr. Priya Raman", age: 39, role: "botanist", quote: "I have counted every one of these plants by hand, twice a year, for six years. I know what that sounds like. It sounds like a small thing. Extinction is always a small thing, right up until it is permanent." }
    ],
    stake: "The mine plan on your desk puts a waste pile on patch four.",
    discuss: [
      "Is one plant species worth a delay in decarbonisation? Who is qualified to answer that?",
      "Does it change your answer if the alternative supply comes from a country with no endangered species law at all?",
      "What would make a translocation plan trustworthy rather than a formality?"
    ],
    context: [
      "Tiehm's buckwheat was listed as endangered in December 2022 — the kind of listing that can stop a federal permit.",
      "Scheyder's reporting shows both sides using the same word, 'existential', and meaning completely different things."
    ],
    choices: [
      {
        key: "A", label: "Approve with a translocation plan",
        detail: "Greenhouse propagation, transplant to prepared ground, monitored for ten years.",
        deltas: { supply: 12, cap: 3, eco: -14, trust: -4 },
        flags: [],
        outcome: {
          title: "Year three of ten",
          text: "The greenhouse work goes well. The transplants do not. Survival in the field runs under a fifth, and the surviving plants do not set seed at the rate the wild patches do. The mine is producing. The recovery plan is extended, then extended again.",
          human: { name: "Dr. Priya Raman", line: "Priya keeps counting. The number keeps going down." }
        }
      },
      {
        key: "B", label: "Redesign around the patches",
        detail: "Move the waste pile and the haul road. Costs about 18 months and a fifth of the margin.",
        deltas: { eco: 10, trust: 5, supply: 4, cap: -8 },
        flags: ["redesign"],
        outcome: {
          title: "A more expensive mine",
          text: "The redesign works. All six patches stay in place behind fencing, and the mine opens eighteen months late into a weaker market. Executives tell investors the delay was a government-imposed cost. They are not wrong.",
          human: { name: "Dr. Priya Raman", line: "Priya's count is stable for the first time in four years. She does not call it a win. She calls it 'not yet a loss'." }
        }
      },
      {
        key: "C", label: "Deny the permit",
        detail: "The only population of a listed species is not a negotiable cost.",
        deltas: { eco: 16, trust: 6, supply: -16, cap: -10 },
        flags: ["denied_rr"],
        outcome: {
          title: "The deposit stays in the ground",
          text: "The species is safe. The boron and lithium are not produced, and the battery maker signs a ten-year offtake with a supplier abroad whose operations you cannot inspect. Your own agency's analysis estimates the substituted supply carries roughly three times the carbon intensity.",
          human: { name: "Dr. Priya Raman", line: "Priya is asked on television whether a flower is worth it. She says, 'You are asking the wrong person. Ask whoever decided those were the only two options.'" }
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 3 */
  {
    id: "oakflat",
    act: 3,
    realm: "land",
    year: "May 2027",
    place: "Oak Flat · Chi'chil Biłdagoteel",
    where: "Tonto National Forest, Arizona",
    headline: "A quarter of the country's copper, under a place where people pray",
    brief: [
      "The ore body sits seven thousand feet down. Block caving is the only way to reach it economically: you undercut the deposit and let gravity collapse it into the void. Over decades the surface follows the ore down. The crater is projected at roughly 1.8 miles across and a thousand feet deep.",
      "Oak Flat is on top of it. Apache people hold ceremonies there — coming-of-age ceremonies that cannot, they say, be moved, because the place is not a backdrop to the ritual but a participant in it.",
      "Congress authorised the land exchange in 2014, attached to a must-pass defence bill. Litigation has run ever since on religious freedom grounds.",
      "The grid needs copper. Every mile of transmission line, every transformer, every charger. Analysts put this one deposit at up to a quarter of US copper demand."
    ],
    humans: [
      { name: "Marcus Teller", age: 29, role: "ironworker", quote: "I was married at Oak Flat. My sister had her ceremony there. People keep offering us a different piece of land, like you could move a church by moving the pews. And I weld for a living. I know exactly what copper is for. Both of those are true at the same time and I am tired of being told to pick one." }
    ],
    stake: "The exchange can be completed, halted, or rewritten. Your recommendation goes to the President on Friday.",
    discuss: [
      "Can a sacred site be compensated? What would adequate compensation even look like?",
      "A rider on a defence bill created this. What does that say about how these decisions actually get made?",
      "If you block it, you still need the copper. Name where it comes from and say the consequence out loud."
    ],
    context: [
      "The 2014 land exchange was attached to the National Defense Authorization Act rather than passed on its own merits.",
      "Block caving is cheap because subsidence is free. The crater is not a risk — it is the method working as designed."
    ],
    choices: [
      {
        key: "A", label: "Complete the exchange",
        detail: "Congress decided this in 2014. Execute it.",
        deltas: { supply: 16, cap: 4, trust: -16, eco: -12 },
        flags: ["oakflat_go"],
        outcome: {
          title: "Title transfers on a Tuesday",
          text: "Construction begins. The copper is real: first concentrate inside the decade, at a scale that genuinely changes the national picture. The ceremonies continue at the site for as long as the surface holds, which engineers estimate is somewhere between twelve and twenty years.",
          human: { name: "Marcus Teller", line: "Marcus takes a job on the project. He does not tell his sister for four months." }
        }
      },
      {
        key: "B", label: "Halt it",
        detail: "Withdraw the land. Ask Congress to repeal the exchange.",
        deltas: { trust: 16, eco: 12, supply: -18, cap: -14 },
        flags: ["oakflat_stop"],
        outcome: {
          title: "Withdrawn",
          text: "The site is protected. Copper prices are not sentimental: the deficit is filled by expansions in Chile and Peru and by a smelter in Indonesia running on captive coal. Your own grid build-out slips two years on transformer and cable shortages.",
          human: { name: "Marcus Teller", line: "Marcus drives out to Oak Flat the weekend the announcement lands. He writes that it is the first time in nine years he has slept through the night." }
        }
      },
      {
        key: "C", label: "Underground only, with backfill",
        detail: "No subsidence. Paste backfill, selective mining. Recovers maybe half the ore at nearly double the cost.",
        deltas: { supply: 6, eco: 4, trust: 4, cap: -12 },
        flags: ["backfill"],
        outcome: {
          title: "Half a mine",
          text: "The engineering works. The economics barely do, and only because you guarantee a price floor. Half the copper, at nearly twice the cost, with the surface intact. One of the two mining companies sells its stake rather than accept the terms.",
          human: { name: "Marcus Teller", line: "Marcus calls it 'the first offer anybody made that wasn't an insult.' He also says he does not believe the surface will hold. Nobody can prove him wrong for thirty years." }
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 4 */
  {
    id: "crash",
    act: 4,
    realm: "land",
    year: "February 2028",
    place: "The price crash",
    where: "Global markets",
    headline: "Everything you approved is now worth less than it costs to dig",
    brief: [
      "Lithium has fallen roughly eighty percent from its peak. Nickel followed, pushed down by an enormous build-out of Chinese-financed Indonesian capacity running on captive coal power. The cheapest nickel in the world is also among the dirtiest, and it is winning.",
      "Refining is the real chokepoint, and it is not yours. Depending on the metal, China processes somewhere between sixty and ninety percent of global supply. You can open every mine in Nevada and still ship the ore to a competitor to make it useful.",
      "Two of the projects you cleared are now suspending work. Western mines are not failing because they are bad mines. They are failing because somebody else is willing to lose money for longer, and call it industrial policy."
    ],
    humans: [
      { name: "Ray Castellanos", age: 46, role: "haul truck driver", quote: "Second layoff in four years, from a mine the government told me was strategic. You people keep using that word. I would like to know what it buys me." }
    ],
    stake: "Both projects shut down within ninety days unless you intervene.",
    discuss: [
      "Is a mine that can only survive on subsidy worth subsidising? For how long?",
      "Cheap imports lower the cost of the energy transition for consumers. Who pays the difference, and where do they live?",
      "Is this a market failure, or a market working exactly as designed?"
    ],
    context: [
      "Scheyder's account repeatedly shows price as the decisive actor — the force that closes mines no protest could close.",
      "Processing, not extraction, is where the leverage actually sits."
    ],
    choices: [
      {
        key: "A", label: "Price floor contracts",
        detail: "Guarantee a floor price for domestic output. Expensive, and it never ends quietly.",
        deltas: { supply: 12, trust: 6, cap: -16, eco: -2 },
        flags: ["floor"],
        outcome: {
          title: "The cheque clears",
          text: "The mines stay open and the workers stay employed. The cost lands in a budget line that your opponents will read aloud every year from now on. Within eighteen months two more companies arrive asking why they did not get the same deal.",
          human: { name: "Ray Castellanos", line: "Ray is recalled. He does not believe it will last, and keeps the warehouse manager's number." }
        }
      },
      {
        key: "B", label: "Tariff the imports",
        detail: "Tariffs and carbon-intensity rules at the border. The cheap nickel stops being cheap.",
        deltas: { supply: 10, cap: -8, eco: 6, trust: 2 },
        flags: ["tariff"],
        outcome: {
          title: "Retaliation, on schedule",
          text: "Domestic projects restart. Battery and vehicle prices rise, and the rise is immediately attributed to climate policy by people who oppose climate policy. A trading partner retaliates against your agricultural exports. The carbon-intensity rule, quietly, turns out to be the most durable thing you have built.",
          human: { name: "Ray Castellanos", line: "Ray keeps his job. His brother, who farms, loses a contract." }
        }
      },
      {
        key: "C", label: "Let them fail and buy cheap",
        detail: "Imports are cheaper. Decarbonise faster with other people's metal.",
        deltas: { supply: -6, cap: 10, trust: -14, eco: -10 },
        flags: ["import"],
        outcome: {
          title: "A faster, cheaper, more fragile transition",
          text: "EV prices fall and adoption accelerates — genuinely, measurably. Your mines close. The emissions you avoided at home show up in somebody else's airshed, and the supply chain now runs through exactly one country's refineries.",
          human: { name: "Ray Castellanos", line: "Ray does not get a third call. The Castellanos family moves to Reno after all, four years later than planned." }
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 5 */
  {
    id: "deep",
    act: 5,
    realm: "sea",
    year: "July 2029",
    place: "The Clarion-Clipperton Zone",
    where: "Abyssal Pacific · 4,000–5,500 m",
    headline: "There is no sovereign here, and the metal is lying loose on the floor",
    brief: [
      "Polymetallic nodules the size of potatoes carpet an area of abyssal plain larger than India. Nickel, cobalt, manganese, copper, sitting on the surface of the mud. No blasting, no overburden, no tailings dam. They took something like ten million years to form, growing a few millimetres per million years.",
      "The seabed beyond national jurisdiction is the common heritage of mankind — a phrase Arvid Pardo put before the UN in 1967 and that UNCLOS made law. The International Seabed Authority in Kingston is supposed to license it for the benefit of everyone, with particular regard for developing states.",
      "In 2021 a sponsoring state triggered a rule forcing the ISA to finish its mining code within two years. The deadline passed in July 2023 with no code. Applications can now be filed into a legal vacuum.",
      "Your country signed UNCLOS and never ratified it. You have your own 1980 statute that lets you issue seabed licences entirely outside the ISA. More than thirty states are calling for a moratorium. Several large carmakers and tech firms have pledged not to buy the metal at all."
    ],
    humans: [
      { name: "Ambassador Ilaita Renga", age: 61, role: "Republic of Mareva", quote: "Phosphate built our hospital and ate four-fifths of our island. We are told to be careful now, by countries that got rich being careless, about the only asset we have left. I am not asking you to admire the position. I am asking you to notice who is in it." },
      { name: "Dr. Hana Sørensen", age: 47, role: "deep-sea ecologist", quote: "We have described maybe ten percent of the animals down there. A test track scraped in 1989 is still visible, still barely recolonised. I am not telling you it is catastrophic. I am telling you we do not know, and that 'we do not know' is the actual finding." }
    ],
    stake: "Mareva's sponsored contractor files its application in six weeks. Your position determines whether it has a legal universe to file into.",
    discuss: [
      "'Common heritage of mankind' — who is that, concretely, and who speaks for them?",
      "Nodule mining has no tailings dam, no displaced village, no sacred site. Is it therefore better than Thacker Pass? What is the honest comparison?",
      "If a small state's best path out of poverty is the seabed, what do wealthy states owe it for a moratorium?"
    ],
    context: [
      "The 'two-year rule' was triggered in June 2021 and lapsed in July 2023 without a finished mining code.",
      "The United States has never ratified UNCLOS, which means it holds no vote at the ISA — and is not bound by it either.",
      "Nauru's phosphate history is the real precedent behind Mareva: enormous per-capita wealth, then a gutted island and a collapsed economy."
    ],
    choices: [
      {
        key: "A", label: "Back the ISA process and sponsor",
        detail: "Work inside the treaty you never ratified. Push for a strict code, and sponsor a contractor under it.",
        deltas: { supply: 12, cap: -4, eco: -8, trust: -2 },
        flags: ["sea_mine", "via_isa"],
        outcome: {
          title: "A seat you are not entitled to",
          text: "You get a strict-ish code: environmental thresholds, a benefit-sharing fund, observers aboard. You also get accused of writing rules for a club you refuse to join, which is accurate. The first commercial collector sails in eighteen months.",
          human: { name: "Ambassador Ilaita Renga", line: "Mareva signs. The benefit-sharing fund's first disbursement is smaller than the island's annual phosphate royalties were in 1975." }
        }
      },
      {
        key: "B", label: "Licence it unilaterally",
        detail: "Use your own 1980 statute. Do not wait for Kingston.",
        deltas: { supply: 18, cap: -18, eco: -14, trust: -10 },
        flags: ["sea_mine", "unilateral"],
        outcome: {
          title: "Outside the room",
          text: "The licences issue in four months and the metal moves fast. Thirty-one states issue a joint statement calling it a repudiation of the common heritage principle. Two other powers announce they will now issue their own licences on the same reasoning, which you cannot object to without describing yourself.",
          human: { name: "Dr. Hana Sørensen", line: "Hana's ship is denied a berth in the licence area. 'We are the only people who wanted to look,' she writes, 'and we are the ones who got excluded.'" }
        }
      },
      {
        key: "C", label: "Lead the moratorium",
        detail: "No mining until the science is in. Spend your credibility assembling the coalition.",
        deltas: { eco: 16, trust: 8, supply: -14, cap: -6 },
        flags: ["moratorium"],
        outcome: {
          title: "A pause, and a bill for it",
          text: "The coalition holds at thirty-eight states. No commercial licence is issued this year. Mareva votes against you and says so on the floor, at length, with the phosphate numbers.",
          human: { name: "Ambassador Ilaita Renga", line: "'You have purchased a delay,' the Ambassador tells the chamber, 'and sent us the invoice.'" }
        }
      }
    ]
  },

  /* -------------------------------------------------------- 6 (branch) */
  {
    id: "plume",
    act: 6,
    realm: "sea",
    year: "November 2031",
    requires: "sea_mine",
    place: "NORI-D collector trial",
    where: "Clarion-Clipperton Zone",
    headline: "The plume went further than the model said",
    brief: [
      "The collector works. It drives along the seafloor, lifts the nodules, and discharges the sediment it does not want. That discharge is the problem.",
      "The modelled plume was supposed to settle within a few kilometres. Observed, it is detectable at thirty, and the midwater discharge is drifting into the depth band where the tuna that four Pacific economies depend on feed at night.",
      "A paper published last year reports that the nodules themselves may generate oxygen in the dark, on the seafloor, by a process nobody had documented. It is contested. If it holds, the thing being mined is also producing the conditions for life around it.",
      "Your contractor has spent 1.4 billion dollars and has investors who would like to know when the metal arrives."
    ],
    humans: [
      { name: "Dr. Hana Sørensen", age: 49, role: "deep-sea ecologist", quote: "You asked me for a number. I can give you a number in nine years. The ship leaves next month either way, and I think you already know that is the whole story here." }
    ],
    stake: "Commercial production starts in ninety days unless you change the terms.",
    discuss: [
      "What standard of evidence should stop an operation that is already running? Is it the same standard you would need to start it?",
      "Who should bear the burden of proof at the bottom of the ocean — and who pays for the research either way?",
      "The contractor has spent 1.4 billion dollars. Should that matter to your decision? Does it?"
    ],
    context: [
      "Tracks cut by a 1989 seafloor disturbance experiment were still visible, and barely recolonised, decades later.",
      "The 2024 'dark oxygen' finding is genuinely contested — which is itself the point about how little is settled down there."
    ],
    choices: [
      {
        key: "A", label: "Pause and re-model",
        detail: "Stop. Two years of plume science before any commercial run.",
        deltas: { eco: 14, trust: 6, supply: -12, cap: -8 },
        flags: ["paused"],
        outcome: {
          title: "Two years",
          text: "The science comes back mixed, which is the honest result: the midwater discharge is worse than modelled, the seafloor impact roughly as expected, and recovery still unmeasurable on any timescale that matters to a licence. The contractor's investors force a restructuring. The data you bought becomes the basis of the ISA's discharge standard.",
          human: { name: "Dr. Hana Sørensen", line: "Hana gets her nine years, compressed into two, and says it was not enough. She publishes anyway." }
        }
      },
      {
        key: "B", label: "Continue, with monitoring",
        detail: "Raise the discharge depth, put observers on every vessel, publish the data.",
        deltas: { supply: 10, eco: -8, trust: -2, cap: -2 },
        flags: ["monitored"],
        outcome: {
          title: "Production, and a dataset",
          text: "The metal flows. Deepening the discharge helps measurably; it does not solve it. The observer data is published in full, which earns you real credibility and also hands your critics the best evidence they have ever had.",
          human: { name: "Dr. Hana Sørensen", line: "Hana takes a berth as an observer. 'I am now being paid by the thing I am trying to assess,' she notes in her first report, 'and you should all factor that in.'" }
        }
      },
      {
        key: "C", label: "Scale up before the rules tighten",
        detail: "Four more collectors. Get the tonnage out while the code is still unfinished.",
        deltas: { supply: 20, eco: -22, trust: -14, cap: -12 },
        flags: ["landrush"],
        outcome: {
          title: "The land rush",
          text: "You get the metal, faster than any mine on land could have delivered it. Three other consortia read your move correctly and file within the year. By the time a binding code exists, the most nodule-dense blocks of the CCZ are under contract and the baseline against which damage would have been measured no longer exists anywhere unmined.",
          human: { name: "Ambassador Ilaita Renga", line: "Mareva's royalty income triples. The Ambassador stops returning calls from the scientists." }
        }
      }
    ]
  },

  /* -------------------------------------------------- 6 (alt branch) */
  {
    id: "vacuum",
    act: 6,
    realm: "sea",
    year: "November 2031",
    requires: "moratorium",
    place: "The vacuum",
    where: "Kingston, Jamaica",
    headline: "Someone is mining anyway, and you are not in the room",
    brief: [
      "Your moratorium held for two years and then met the limits of what a coalition without a veto can do. A consortium sponsored by two states outside your coalition has begun commercial collection in the eastern CCZ.",
      "They are operating under a code your scientists did not help write. There are no independent observers aboard. The environmental data, such as it is, belongs to the contractor.",
      "Meanwhile your own numbers have not improved. The copper you did not mine at Oak Flat and the nickel you did not buy from Indonesia have to come from somewhere, and the grid build-out is behind schedule in eleven states.",
      "Mareva has joined the consortium as a sponsoring state."
    ],
    humans: [
      { name: "Ambassador Ilaita Renga", age: 63, role: "Republic of Mareva", quote: "You asked us to wait. We waited. Then you went home to a country with electricity. We have joined the people who answered the phone." },
      { name: "Dr. Hana Sørensen", age: 49, role: "deep-sea ecologist", quote: "The worst version of this was never 'mining happens'. It was 'mining happens and nobody independent is allowed to watch'. That is where we are." }
    ],
    stake: "You can hold the line, trade for influence, or reverse yourself.",
    discuss: [
      "Is a moratorium that others ignore better or worse than a strict regime you help write?",
      "What is the moral difference between mining and buying metal from someone who mines?",
      "Mareva waited and got nothing for it. What would have made waiting worth their while?"
    ],
    context: [
      "A moratorium only binds those who join it; the ISA cannot compel a non-party, and the US is already outside UNCLOS.",
      "Heffernan's account of the high seas keeps returning to this: rules for the commons fail at the point of enforcement, not the point of agreement."
    ],
    choices: [
      {
        key: "A", label: "Hold the line, fund the science",
        detail: "Stay out. Put real money into the baseline research nobody else will pay for.",
        deltas: { eco: 10, trust: 8, supply: -10, cap: -4 },
        flags: ["held"],
        outcome: {
          title: "Clean hands, no leverage",
          text: "Your research programme becomes the authoritative independent baseline, and is cited in every subsequent proceeding — including the ones that approve mining. You have no observers, no vote, and no metal. You also have the only honest dataset, which turns out to matter more than you expected and less than you hoped.",
          human: { name: "Dr. Hana Sørensen", line: "Hana finally gets her nine years of funding. She spends them documenting, in detail, damage she has no power to stop." }
        }
      },
      {
        key: "B", label: "Trade recognition for rules",
        detail: "Recognise their licences in exchange for binding standards, observers, and a real benefit-sharing fund.",
        deltas: { supply: 8, eco: 4, cap: 8, trust: -4 },
        flags: ["bargain"],
        outcome: {
          title: "The deal",
          text: "You get independent observers aboard, a discharge standard with teeth, and a benefit-sharing fund that actually pays out to states with no contractor of their own. You also legitimise an operation you spent two years calling illegitimate, and every government that held the line with you learns what your word is worth.",
          human: { name: "Ambassador Ilaita Renga", line: "Mareva's first payment from the fund arrives in March. The Ambassador attends the signing and declines to be photographed." }
        }
      },
      {
        key: "C", label: "Reverse and sponsor your own",
        detail: "The moratorium failed. Compete.",
        deltas: { supply: 16, eco: -16, trust: -16, cap: -10 },
        flags: ["reversed"],
        outcome: {
          title: "The turn",
          text: "Your licences issue within the year, and the metal arrives in time to matter for the grid. The thirty-eight states that joined your coalition read the announcement at the same time as the press. Two of them had passed domestic legislation on the strength of your assurances.",
          human: { name: "Dr. Hana Sørensen", line: "Hana resigns from the advisory board by email, in one sentence, and does not elaborate." }
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 7 */
  {
    id: "lastdollar",
    act: 7,
    realm: "land",
    year: "June 2033",
    place: "The last appropriation",
    where: "Washington",
    headline: "One budget left. Four ways to spend it.",
    brief: [
      "This is the last appropriation your council will control. The fleet is bigger than it was in 2026 and the grid is still short of copper. Everything you approved is either producing, contested, or both.",
      "Four proposals are on the table and the committee wants one number, by Friday."
    ],
    humans: [
      { name: "Ray Castellanos", age: 51, role: "", quote: "Whatever you pick, somebody's going to say it was the only option. It never was. I've watched you have six of these." }
    ],
    stake: "Choose where the last dollar goes.",
    discuss: [
      "Which of these actually reduces the total amount of rock that has to be moved?",
      "Recycling is the obvious answer. Why is it not sufficient on its own?",
      "Demand reduction is the cheapest option on this list and the hardest to pass. Why?"
    ],
    context: [
      "You cannot recycle your way out of a growing fleet: the metal has to be in circulation before it can be recovered, and batteries last 10–20 years.",
      "Scheyder gives recycling real weight — the 'mine above ground' — while being clear about that arithmetic."
    ],
    choices: [
      {
        key: "A", label: "Recycling at national scale",
        detail: "Collection mandates, refinery capacity, battery passports.",
        deltas: { eco: 12, supply: 6, trust: 8, cap: -6 },
        flags: ["recycle"],
        outcome: {
          title: "The mine above ground",
          text: "By 2040 recycled material supplies a meaningful and growing share of demand, and the refining capacity you built turns out to be the most strategic asset in the entire programme, because it works on recycled and mined feed alike. In 2033, it closes almost none of the gap. Both of those sentences are true.",
          human: { name: "", line: "" }
        }
      },
      {
        key: "B", label: "Demand reduction",
        detail: "Transit, smaller batteries, right-sized vehicles, efficiency standards.",
        deltas: { eco: 16, trust: 4, supply: 10, cap: -18 },
        flags: ["demand"],
        outcome: {
          title: "The cheapest tonne is the one you never need",
          text: "Smaller battery standards and a transit package cut projected 2040 lithium demand by nearly a fifth — more than any mine on your list would have added. It is the single most effective thing you do. It also costs you the committee, two allies, and most of what remained of your standing with the car makers.",
          human: { name: "", line: "" }
        }
      },
      {
        key: "C", label: "One more mine",
        detail: "Fast-track the next domestic deposit on the list.",
        deltas: { supply: 14, eco: -10, trust: -8, cap: -4 },
        flags: ["onemore"],
        outcome: {
          title: "The next valley",
          text: "It is permitted in record time, which is the achievement and also the complaint. The community nearest to it reads the Thacker Pass coverage from 2026 and arrives at the first hearing already knowing exactly how this goes.",
          human: { name: "", line: "" }
        }
      },
      {
        key: "D", label: "The seabed, at scale",
        detail: "Commit the budget to nodule collection and the refining to match.",
        deltas: { supply: 18, eco: -18, trust: -6, cap: -8 },
        flags: ["seascale"],
        outcome: {
          title: "All in, four kilometres down",
          text: "The tonnage arrives and the grid gets built. The abyssal plain under contract grows by an area the size of a mid-sized country, and the question of what was living there is now permanently unanswerable, because the baseline and the mining happened at the same time.",
          human: { name: "", line: "" }
        }
      }
    ]
  }
];

/* --------------------------------------------------------- endings -- */
const ENDINGS = [
  {
    id: "just",
    test: (s) => s.trust >= 58 && s.eco >= 58 && s.supply >= 55 && s.cap >= 30,
    title: "The Narrow Path",
    kicker: "2034",
    text: "You got the metal and you did not break the people who live on top of it. Nobody writes a song about this outcome: it looks, from the outside, like a lot of meetings. The grid is being built roughly on schedule. Two communities co-manage mines on their own land. The seabed code is strict and enforced, and the abyssal plain is mostly still there. Historians will argue about whether you were skilful or lucky. The honest answer is that you spent everything you had and the price of lithium cooperated."
  },
  {
    id: "clean",
    test: (s) => s.eco >= 62 && s.supply < 45,
    title: "Clean Hands, Empty Grid",
    kicker: "2034",
    text: "Almost nothing was destroyed on your watch. The buckwheat survives, Oak Flat is intact, the CCZ is untouched by your flag. And the transition is behind — not abandoned, but late, in a decade where late has a cost measured in degrees. The metal you refused still got mined, in places with weaker law and no reporters. Your successor inherits the same decisions with less time and fewer options."
  },
  {
    id: "cost",
    test: (s) => s.supply >= 68 && (s.trust < 40 || s.eco < 38),
    title: "Metal at Any Cost",
    kicker: "2034",
    text: "The numbers are extraordinary. Domestic lithium, domestic copper, nodules landing at a port you built. On the production chart it is the most successful industrial programme in two generations. Behind the chart: a crater in Arizona, a plant that exists in greenhouses, a legal order for the ocean floor that you broke and others copied. You solved the supply problem and left the legitimacy problem to whoever comes next."
  },
  {
    id: "sacrifice",
    test: (s) => s.trust < 35 && s.eco < 42,
    title: "The Sacrifice Zone",
    kicker: "2034",
    text: "Every decision was defensible in isolation. Together they drew a map, and on that map the same kinds of places keep getting chosen: rural, poor, Indigenous, or underwater and therefore voiceless. Nobody set out to build a sacrifice zone. It was assembled one reasonable trade-off at a time, which is how they always are."
  },
  {
    id: "paralysis",
    test: (s) => s.cap < 28 && s.supply < 50,
    title: "Out of Capital",
    kicker: "2034",
    text: "You ran out of the one resource you could not mine. The council is folded into a different agency in the reorganisation, its authorities split three ways. The projects you slowed are being re-permitted under rules written by people who read your tenure as a cautionary tale about caring too much. Some of the things you protected stay protected, mostly by inertia."
  },
  {
    id: "compromise",
    test: () => true,
    title: "The Long Compromise",
    kicker: "2034",
    text: "No disaster, no triumph. Some metal, some damage, some trust, a great deal of litigation. The transition proceeds at roughly three-quarters of the pace the models require, which is both a failure and the best anyone managed this decade. The arguments you had are now being had again, in the same words, about the next valley and the next stretch of seafloor."
  }
];

const DEBRIEF = {
  title: "What was real",
  items: [
    { h: "Thacker Pass / Peehee Mu'huh", t: "Real. The largest known US lithium resource, on federal land, contested on sacred-site and consultation grounds while construction proceeded. The General Mining Law of 1872 really does govern it, and really does charge no federal royalty." },
    { h: "Tiehm's buckwheat", t: "Real, and listed as endangered in 2022. It grows on about ten acres in Esmeralda County and nowhere else. A large fraction of the population was destroyed in 2020; investigators eventually attributed it to rodents." },
    { h: "Oak Flat / Chi'chil Biłdagoteel", t: "Real. The land exchange was authorised in a 2014 defence bill; block caving would subside the surface; the religious-freedom litigation is real and ongoing." },
    { h: "The price crash", t: "Real. Lithium fell roughly 80% from its 2022 peak, and Indonesian nickel reshaped the global market. Refining concentration in China is the structural fact underneath all of it." },
    { h: "Common heritage of mankind", t: "Real. Arvid Pardo's 1967 speech, then UNCLOS Part XI and the International Seabed Authority. The United States signed UNCLOS and never ratified it." },
    { h: "The two-year rule", t: "Real. Triggered in 2021 by a sponsoring state, lapsed in July 2023 with no mining code finished. Applications can be filed into that gap." },
    { h: "Nauru and phosphate", t: "Real, and the model for Mareva: phosphate mining produced extraordinary per-capita wealth and left roughly four-fifths of the island uninhabitable." },
    { h: "Dark oxygen", t: "Real and contested. A 2024 paper reported oxygen production at the abyssal seafloor associated with nodules. The scientific argument is live." },
    { h: "The people", t: "Fictional. Lena Birdsong, Ray Castellanos, Priya Raman, Marcus Teller, Ilaita Renga and Hana Sørensen are composites written for this exercise. The Republic of Mareva is fictional." }
  ],
  questions: [
    "Which decision was hardest, and was it hardest because of the facts or because of the values?",
    "Did your council ever choose an option because it was right, knowing it would lose on the meters?",
    "Scheyder's subjects and Heffernan's both use the language of the commons. Did 'the common good' mean the same thing on land and at sea?",
    "Every scenario offered three options. Name a fourth that nobody at your table proposed.",
    "Who in this game had the least power, and did any of your choices change that?"
  ]
};
