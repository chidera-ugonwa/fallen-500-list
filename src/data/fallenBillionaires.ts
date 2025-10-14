export interface FallenPerson {
  id: number;
  rank: number;
  name: string;
  formerNetWorth: number;
  currentNetWorth: number;
  country: string;
  industry: string;
  story: string;
  yearOfPeak: number;
  reasonForFall: string;
  detailedTimeline?: { year: number; event: string }[];
  keyFactors?: string[];
  currentStatus?: string;
  lessonsLearned?: string[];
}

export const fallenBillionaires: FallenPerson[] = [
  // Top 10 - Biggest Falls
  {
    id: 1,
    rank: 1,
    name: "Eike Batista",
    formerNetWorth: 35000000000,
    currentNetWorth: 0,
    country: "Brazil",
    industry: "Mining & Oil",
    story: "Once Brazil's richest person and among the world's wealthiest, Batista's commodity empire collapsed due to falling prices, debt, and operational failures across his companies.",
    yearOfPeak: 2012,
    reasonForFall: "Commodity crash, debt spiral",
    detailedTimeline: [
      { year: 2008, event: "Forbes estimates net worth at $8 billion" },
      { year: 2012, event: "Reaches peak net worth of $35 billion, ranked 7th richest in the world" },
      { year: 2013, event: "Lost $25 billion in 12 months, the fastest wealth destruction in history" },
      { year: 2014, event: "Declared bankruptcy with debts exceeding $1 billion" },
      { year: 2017, event: "Arrested for allegedly bribing Rio de Janeiro governor" }
    ],
    keyFactors: [
      "Over-leveraged business model with massive debt burdens",
      "Falling commodity prices devastated mining and oil operations",
      "Failed promises and missed production targets eroded investor confidence",
      "Complex corporate structure with interconnected failing companies",
      "Brazilian economic recession amplified business challenges"
    ],
    currentStatus: "Released from prison in 2019, currently attempting business comebacks with limited success.",
    lessonsLearned: [
      "Excessive leverage can amplify losses as much as gains",
      "Commodity-dependent businesses are vulnerable to price cycles",
      "Overpromising and underdelivering destroys credibility",
      "Diversification is crucial for wealth preservation"
    ]
  },
  {
    id: 2,
    rank: 2,
    name: "Sam Bankman-Fried",
    formerNetWorth: 26000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Cryptocurrency",
    story: "Crypto wunderkind who built FTX into the world's second-largest exchange. His empire collapsed when it was revealed he misused billions in customer funds to prop up his trading firm Alameda Research.",
    yearOfPeak: 2021,
    reasonForFall: "Fraud, misuse of customer funds",
    detailedTimeline: [
      { year: 2019, event: "Founded FTX cryptocurrency exchange" },
      { year: 2021, event: "Net worth reaches $26 billion, becomes crypto's richest person" },
      { year: 2022, event: "FTX collapses in days after bank run, files for bankruptcy" },
      { year: 2023, event: "Convicted on 7 counts of fraud and conspiracy" },
      { year: 2024, event: "Sentenced to 25 years in prison" }
    ],
    keyFactors: [
      "Used customer deposits to make risky bets through Alameda Research",
      "Lacked proper financial controls and corporate governance",
      "Created false financial statements to hide losses",
      "Lavish spending on real estate, political donations, and endorsements",
      "Market downturn exposed unsustainable business practices"
    ],
    currentStatus: "Currently serving 25-year prison sentence. Ordered to forfeit $11 billion.",
    lessonsLearned: [
      "Customer funds must be kept separate from business operations",
      "Regulatory compliance is essential in financial services",
      "Rapid growth without controls leads to disaster",
      "Transparency is crucial in maintaining trust"
    ]
  },
  {
    id: 3,
    rank: 3,
    name: "Elizabeth Holmes",
    formerNetWorth: 9000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Healthcare Tech",
    story: "Once hailed as the youngest female billionaire, Holmes founded Theranos with promises of revolutionary blood testing technology. Her empire crumbled when investigations revealed the technology never worked as claimed.",
    yearOfPeak: 2014,
    reasonForFall: "Fraud conviction, company collapse",
    detailedTimeline: [
      { year: 2003, event: "Founded Theranos at age 19 after dropping out of Stanford" },
      { year: 2014, event: "Valued at $9 billion with $700M+ funding raised" },
      { year: 2015, event: "Wall Street Journal investigation exposes technology failures" },
      { year: 2018, event: "Theranos officially dissolved, charged with massive fraud" },
      { year: 2022, event: "Found guilty on 4 counts of fraud, sentenced to 11+ years in prison" }
    ],
    keyFactors: [
      "Core technology never actually worked as advertised",
      "Systematic deception of investors, partners, and patients",
      "Board of directors lacked medical and scientific expertise",
      "Culture of secrecy prevented early detection of problems"
    ],
    currentStatus: "Currently serving an 11-year prison sentence. Required to pay $452 million in restitution.",
    lessonsLearned: [
      "Technology claims must be verifiable and transparent",
      "Strong governance requires relevant expertise on boards",
      "Due diligence is essential before investing",
      "Charisma cannot substitute for product functionality"
    ]
  },
  {
    id: 4,
    rank: 4,
    name: "Bernard Ebbers",
    formerNetWorth: 8000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Telecommunications",
    story: "Built WorldCom into a telecom giant through aggressive acquisitions. The $11 billion accounting fraud led to the largest bankruptcy in US history at the time.",
    yearOfPeak: 1999,
    reasonForFall: "Accounting fraud, bankruptcy"
  },
  {
    id: 5,
    rank: 5,
    name: "Adolf Merckle",
    formerNetWorth: 9200000000,
    currentNetWorth: 0,
    country: "Germany",
    industry: "Pharmaceuticals & Trading",
    story: "German industrialist who lost billions in bad bets against Volkswagen stock. Tragically took his own life in 2009 as his empire crumbled.",
    yearOfPeak: 2007,
    reasonForFall: "Bad investments, market crash"
  },
  // Continue expanding with verified real fallen billionaires...
  {
    id: 6,
    rank: 6,
    name: "Sean Quinn",
    formerNetWorth: 6000000000,
    currentNetWorth: 0,
    country: "Ireland",
    industry: "Construction & Insurance",
    story: "Ireland's richest man built an empire from cement and insurance. Risky investments in Anglo Irish Bank shares during the 2008 financial crisis led to his spectacular downfall.",
    yearOfPeak: 2007,
    reasonForFall: "Financial crisis, bad investments"
  },
  {
    id: 7,
    rank: 7,
    name: "Allen Stanford",
    formerNetWorth: 2200000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Banking & Finance",
    story: "Cricket sponsor and financier who ran a $7 billion Ponzi scheme through his Stanford Financial Group. Now serving 110 years in federal prison.",
    yearOfPeak: 2008,
    reasonForFall: "Ponzi scheme conviction"
  },
  {
    id: 8,
    rank: 8,
    name: "Aubrey McClendon",
    formerNetWorth: 3000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Natural Gas",
    story: "Natural gas pioneer who helped spark the fracking boom. Aggressive borrowing and falling gas prices led to his companies' collapse.",
    yearOfPeak: 2008,
    reasonForFall: "Debt crisis, legal troubles"
  },
  {
    id: 9,
    rank: 9,
    name: "Bjorgolfur Gudmundsson",
    formerNetWorth: 1100000000,
    currentNetWorth: 0,
    country: "Iceland",
    industry: "Banking",
    story: "Iceland's first billionaire saw his Landsbanki empire collapse during the 2008 financial crisis. Iceland's banking system meltdown destroyed his fortune.",
    yearOfPeak: 2007,
    reasonForFall: "Banking crisis, Iceland collapse"
  },
  {
    id: 10,
    rank: 10,
    name: "Patricia Kluge",
    formerNetWorth: 1000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Media & Real Estate",
    story: "Socialite and media heiress who lost everything through lavish spending and failed vineyard ventures. Filed for bankruptcy in 2011.",
    yearOfPeak: 2003,
    reasonForFall: "Overspending, bad investments"
  }
].sort((a, b) => (b.formerNetWorth - b.currentNetWorth) - (a.formerNetWorth - a.currentNetWorth))
  .map((person, index) => ({ ...person, rank: index + 1 }));
