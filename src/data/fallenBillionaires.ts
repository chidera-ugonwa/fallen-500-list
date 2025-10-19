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
  // VERIFIED FALLEN BILLIONAIRES - All entries are people who were billionaires but NO LONGER are
  {
    id: 1,
    rank: 1,
    name: "Eike Batista",
    formerNetWorth: 35000000000,
    currentNetWorth: 0,
    country: "Brazil",
    industry: "Mining & Oil",
    story: "Once Brazil's richest person and among the world's wealthiest, Batista's commodity empire collapsed due to falling prices, debt, and operational failures.",
    yearOfPeak: 2012,
    reasonForFall: "Commodity crash, debt spiral",
    detailedTimeline: [
      { year: 2012, event: "Reaches peak net worth of $35 billion, ranked 7th richest in the world" },
      { year: 2013, event: "Lost $25 billion in 12 months, the fastest wealth destruction in history" },
      { year: 2014, event: "Declared bankruptcy with debts exceeding $1 billion" }
    ],
    keyFactors: [
      "Over-leveraged business model with massive debt",
      "Falling commodity prices devastated operations",
      "Failed promises destroyed investor confidence"
    ],
    currentStatus: "Released from prison in 2019, attempting comebacks with limited success."
  },
  {
    id: 2,
    rank: 2,
    name: "Hui Ka Yan",
    formerNetWorth: 42000000000,
    currentNetWorth: 0,
    country: "China",
    industry: "Real Estate",
    story: "Founder of Evergrande Group, once China's largest property developer. Company's $327 billion debt crisis wiped out his fortune entirely.",
    yearOfPeak: 2017,
    reasonForFall: "Real estate crisis, debt default",
    detailedTimeline: [
      { year: 2017, event: "Peak net worth of $42 billion" },
      { year: 2021, event: "Evergrande debt crisis begins" },
      { year: 2024, event: "Hong Kong court orders Evergrande liquidation, banned for life from securities market in China" }
    ],
    keyFactors: [
      "$327 billion in liabilities",
      "Chinese property market collapse",
      "Regulatory crackdown on over-leveraged developers"
    ],
    currentStatus: "Fell off Forbes 2024 billionaire list, facing legal proceedings, fortune completely wiped out."
  },
  {
    id: 3,
    rank: 3,
    name: "Anil Ambani",
    formerNetWorth: 42000000000,
    currentNetWorth: 0,
    country: "India",
    industry: "Telecommunications",
    story: "Once world's 6th richest person, lost everything in telecom wars and defaults. Court declared him bankrupt in 2020.",
    yearOfPeak: 2008,
    reasonForFall: "Business collapse, debt default",
    detailedTimeline: [
      { year: 2008, event: "Net worth peaks at $42 billion, 6th richest globally" },
      { year: 2016, event: "Jio's entry triggers telecom price wars" },
      { year: 2020, event: "Declared bankrupt in UK court" }
    ],
    keyFactors: [
      "Reliance Communications collapsed under debt",
      "Jio's disruptive pricing destroyed telecom margins",
      "Multiple business failures across group companies"
    ],
    currentStatus: "Bankrupt, one of the most dramatic wealth destructions in Indian business history."
  },
  {
    id: 4,
    rank: 4,
    name: "Sam Bankman-Fried",
    formerNetWorth: 26000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Cryptocurrency",
    story: "Crypto wunderkind who built FTX into the world's second-largest exchange. His empire collapsed when it was revealed he misused billions in customer funds.",
    yearOfPeak: 2021,
    reasonForFall: "Fraud, misuse of customer funds",
    detailedTimeline: [
      { year: 2021, event: "Net worth reaches $26 billion" },
      { year: 2022, event: "FTX collapses in days, files for bankruptcy" },
      { year: 2024, event: "Sentenced to 25 years in prison" }
    ],
    keyFactors: [
      "Used customer deposits for risky bets through Alameda Research",
      "Lacked proper financial controls",
      "Created false financial statements"
    ],
    currentStatus: "Serving 25-year prison sentence. Ordered to forfeit $11 billion."
  },
  {
    id: 5,
    rank: 5,
    name: "Elizabeth Holmes",
    formerNetWorth: 9000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Healthcare Tech",
    story: "Once hailed as the youngest female billionaire, Holmes founded Theranos with promises of revolutionary blood testing technology that never worked.",
    yearOfPeak: 2014,
    reasonForFall: "Fraud conviction, company collapse",
    detailedTimeline: [
      { year: 2014, event: "Valued at $9 billion" },
      { year: 2015, event: "Wall Street Journal investigation exposes technology failures" },
      { year: 2022, event: "Found guilty on 4 counts of fraud, sentenced to 11+ years in prison" }
    ],
    keyFactors: [
      "Core technology never worked as advertised",
      "Systematic deception of investors and patients",
      "Culture of secrecy prevented early detection"
    ],
    currentStatus: "Serving 11-year prison sentence. Required to pay $452 million in restitution."
  },
  {
    id: 6,
    rank: 6,
    name: "Rene Benko",
    formerNetWorth: 6000000000,
    currentNetWorth: 0,
    country: "Austria",
    industry: "Real Estate",
    story: "Signa Holding founder whose retail and real estate empire collapsed in 2023 with €26 billion in debt. Arrested for fraud in 2025.",
    yearOfPeak: 2019,
    reasonForFall: "Company collapse, insolvency, fraud charges",
    detailedTimeline: [
      { year: 2019, event: "Net worth peaks at $6 billion" },
      { year: 2023, event: "Signa Holding files for insolvency with €26 billion debt" },
      { year: 2025, event: "Arrested in Austria for suspected fraud and asset hiding" }
    ],
    keyFactors: [
      "Overleveraged real estate empire",
      "Failed retail investments",
      "Pandemic impact on commercial properties"
    ],
    currentStatus: "Bankrupt and facing fraud charges. Fell off Forbes 2024 billionaire list."
  },
  {
    id: 7,
    rank: 7,
    name: "Adolf Merckle",
    formerNetWorth: 9200000000,
    currentNetWorth: 0,
    country: "Germany",
    industry: "Pharmaceuticals & Trading",
    story: "German industrialist who lost billions shorting Volkswagen stock during the 2008 financial crisis. Tragically took his own life in 2009.",
    yearOfPeak: 2007,
    reasonForFall: "Bad investments, market crash",
    detailedTimeline: [
      { year: 2007, event: "Ranked 94th richest person globally with $9.2 billion" },
      { year: 2008, event: "Loses over $5 billion shorting Volkswagen" },
      { year: 2009, event: "Unable to cover debts, takes his own life" }
    ],
    keyFactors: [
      "Massive short position on Volkswagen backfired",
      "Financial crisis made it impossible to cover margin calls",
      "Personal guarantee on company debts"
    ],
    currentStatus: "Deceased (2009). Family retained and rebuilt parts of business empire."
  },
  {
    id: 8,
    rank: 8,
    name: "Bernard Ebbers",
    formerNetWorth: 8000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Telecommunications",
    story: "Built WorldCom into a telecom giant through aggressive acquisitions. The $11 billion accounting fraud led to the largest bankruptcy in US history at the time.",
    yearOfPeak: 1999,
    reasonForFall: "Accounting fraud, bankruptcy",
    detailedTimeline: [
      { year: 1999, event: "Net worth peaks at $8 billion" },
      { year: 2002, event: "$11 billion accounting fraud exposed, company files for bankruptcy" },
      { year: 2005, event: "Sentenced to 25 years in prison" }
    ],
    keyFactors: [
      "Systematic accounting fraud to inflate earnings",
      "Over-leveraged from aggressive acquisitions",
      "Dot-com bubble burst exposed unsustainable growth"
    ],
    currentStatus: "Died in 2020 while serving sentence."
  },
  {
    id: 9,
    rank: 9,
    name: "Sean Quinn",
    formerNetWorth: 6000000000,
    currentNetWorth: 0,
    country: "Ireland",
    industry: "Construction & Insurance",
    story: "Ireland's richest man built an empire from cement and insurance. Risky investments in Anglo Irish Bank shares led to his spectacular downfall.",
    yearOfPeak: 2007,
    reasonForFall: "Financial crisis, bad investments",
    detailedTimeline: [
      { year: 2007, event: "Named Ireland's richest person with €6 billion" },
      { year: 2008, event: "Massive stake in Anglo Irish Bank collapses" },
      { year: 2012, event: "Declared bankrupt with debts of €2.8 billion" }
    ],
    keyFactors: [
      "28% stake in Anglo Irish Bank wiped out",
      "Used insurance company premiums to invest in bank",
      "Irish financial crisis destroyed property values"
    ],
    currentStatus: "Discharged from bankruptcy in 2015, attempting to rebuild."
  },
  {
    id: 10,
    rank: 10,
    name: "Allen Stanford",
    formerNetWorth: 2200000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Banking & Finance",
    story: "Cricket sponsor and financier who ran a $7 billion Ponzi scheme through his Stanford Financial Group.",
    yearOfPeak: 2008,
    reasonForFall: "Ponzi scheme conviction",
    detailedTimeline: [
      { year: 2008, event: "Net worth estimated at $2.2 billion" },
      { year: 2009, event: "Charged with running $7 billion Ponzi scheme" },
      { year: 2012, event: "Convicted and sentenced to 110 years in prison" }
    ],
    keyFactors: [
      "Ran massive Ponzi scheme for decades",
      "Fraudulent certificates of deposit",
      "Used investor money for personal expenses"
    ],
    currentStatus: "Serving 110 years in federal prison."
  },
  {
    id: 11,
    rank: 11,
    name: "Aubrey McClendon",
    formerNetWorth: 3000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Natural Gas",
    story: "Natural gas pioneer who helped spark the fracking boom. Aggressive borrowing and falling gas prices led to his companies' collapse.",
    yearOfPeak: 2008,
    reasonForFall: "Debt crisis, legal troubles",
    detailedTimeline: [
      { year: 2008, event: "Net worth peaks at $3 billion" },
      { year: 2013, event: "Forced out of Chesapeake Energy amid scandals" },
      { year: 2016, event: "Died in car crash while facing federal charges" }
    ],
    keyFactors: [
      "Falling natural gas prices",
      "Personal debt from margin calls",
      "Allegations of bid rigging and fraud"
    ],
    currentStatus: "Deceased (2016)."
  },
  {
    id: 12,
    rank: 12,
    name: "Bjorgolfur Gudmundsson",
    formerNetWorth: 1100000000,
    currentNetWorth: 0,
    country: "Iceland",
    industry: "Banking",
    story: "Iceland's first billionaire saw his Landsbanki empire collapse during the 2008 financial crisis when Iceland's banking system imploded.",
    yearOfPeak: 2007,
    reasonForFall: "Banking crisis, Iceland collapse",
    detailedTimeline: [
      { year: 2007, event: "Becomes Iceland's first billionaire" },
      { year: 2008, event: "Iceland's banking system collapses" },
      { year: 2009, event: "Declared bankrupt with debts exceeding assets" }
    ],
    keyFactors: [
      "Iceland's banking system meltdown",
      "Landsbanki collapsed and nationalized",
      "Global financial crisis"
    ],
    currentStatus: "Bankrupt, fortune completely wiped out."
  },
  {
    id: 13,
    rank: 13,
    name: "Patricia Kluge",
    formerNetWorth: 1000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Media & Real Estate",
    story: "Socialite and media heiress who lost everything through lavish spending and failed vineyard ventures.",
    yearOfPeak: 2003,
    reasonForFall: "Overspending, bad investments",
    detailedTimeline: [
      { year: 2003, event: "Divorce settlement worth over $1 billion" },
      { year: 2010, event: "Failed vineyard business accumulates massive debt" },
      { year: 2011, event: "Filed for bankruptcy, lost estate and assets" }
    ],
    keyFactors: [
      "Lavish lifestyle spending",
      "Failed vineyard investments",
      "Real estate market crash"
    ],
    currentStatus: "Bankrupt, remarried in 2014."
  },
  {
    id: 14,
    rank: 14,
    name: "Mikhail Khodorkovsky",
    formerNetWorth: 15000000000,
    currentNetWorth: 100000000,
    country: "Russia",
    industry: "Oil & Gas",
    story: "Once Russia's richest man, his Yukos Oil company was seized by the government. Spent 10 years in prison before exile.",
    yearOfPeak: 2003,
    reasonForFall: "Political persecution, asset seizure",
    detailedTimeline: [
      { year: 2003, event: "16th richest person in world with $15 billion, arrested for fraud" },
      { year: 2005, event: "Found guilty, sentenced to 9 years" },
      { year: 2013, event: "Pardoned and exiled after 10 years in prison" }
    ],
    keyFactors: [
      "Putin ordered Yukos shares frozen",
      "Political conflict with Kremlin",
      "Company assets seized and sold to state entities"
    ],
    currentStatus: "Exiled in London with estimated $100 million, vocal Putin critic."
  },
  {
    id: 15,
    rank: 15,
    name: "Vijay Mallya",
    formerNetWorth: 1200000000,
    currentNetWorth: 0,
    country: "India",
    industry: "Aviation & Alcohol",
    story: "Flamboyant businessman whose Kingfisher Airlines collapsed under $1 billion debt. Fled to UK to avoid fraud charges.",
    yearOfPeak: 2011,
    reasonForFall: "Business failure, debt default",
    detailedTimeline: [
      { year: 2011, event: "Net worth peaks at $1.2 billion" },
      { year: 2012, event: "Kingfisher Airlines suspended operations" },
      { year: 2016, event: "Fled to UK to avoid arrest" }
    ],
    keyFactors: [
      "Kingfisher Airlines accumulated massive losses",
      "Failed to compete with low-cost carriers",
      "Couldn't service $1 billion+ in debts"
    ],
    currentStatus: "Fugitive in UK, facing extradition to India for fraud charges."
  },
  {
    id: 16,
    rank: 16,
    name: "Oscar Wyatt",
    formerNetWorth: 1500000000,
    currentNetWorth: 200000000,
    country: "USA",
    industry: "Oil & Gas",
    story: "Oil tycoon convicted in UN Oil-for-Food scandal. Lost company and fortune, served prison time.",
    yearOfPeak: 2005,
    reasonForFall: "Criminal conviction, asset seizure",
    detailedTimeline: [
      { year: 2005, event: "Net worth estimated at $1.5 billion" },
      { year: 2007, event: "Pleaded guilty to conspiracy in Oil-for-Food scandal" },
      { year: 2008, event: "Sentenced to one year in prison" }
    ],
    keyFactors: [
      "Paid illegal kickbacks to Saddam Hussein's government",
      "Company reputation destroyed",
      "Asset forfeitures and fines"
    ],
    currentStatus: "Lost billionaire status, estimated worth now $200 million."
  },
  {
    id: 17,
    rank: 17,
    name: "Geoffrey Edelsten",
    formerNetWorth: 1000000000,
    currentNetWorth: 0,
    country: "Australia",
    industry: "Healthcare",
    story: "Medical entrepreneur who lost fortune through fraud convictions and failed business ventures. Died bankrupt in 2021.",
    yearOfPeak: 1980,
    reasonForFall: "Fraud conviction, business failures",
    detailedTimeline: [
      { year: 1980, event: "Built medical clinic empire worth over $1 billion" },
      { year: 1988, event: "Convicted of fraud, lost medical license" },
      { year: 2014, event: "Declared bankrupt" }
    ],
    keyFactors: [
      "Medicare fraud conviction",
      "Lost medical license",
      "Failed business ventures"
    ],
    currentStatus: "Deceased (2021), died bankrupt."
  },
  {
    id: 18,
    rank: 18,
    name: "Tony Fernandes",
    formerNetWorth: 2500000000,
    currentNetWorth: 400000000,
    country: "Malaysia",
    industry: "Aviation",
    story: "AirAsia founder lost billions during COVID-19 pandemic as airline industry collapsed.",
    yearOfPeak: 2019,
    reasonForFall: "Pandemic impact, airline crisis",
    detailedTimeline: [
      { year: 2019, event: "Net worth peaks at $2.5 billion" },
      { year: 2020, event: "COVID-19 pandemic grounds airlines globally" },
      { year: 2021, event: "AirAsia reports record losses" }
    ],
    keyFactors: [
      "Global travel shutdown",
      "Massive losses across airline operations",
      "Debt burden from aircraft leases"
    ],
    currentStatus: "Below billionaire threshold, estimated $400 million."
  },
  {
    id: 19,
    rank: 19,
    name: "Wang Jianlin",
    formerNetWorth: 30000000000,
    currentNetWorth: 800000000,
    country: "China",
    industry: "Real Estate & Entertainment",
    story: "Dalian Wanda Group founder forced to sell assets under Chinese government pressure and debt obligations.",
    yearOfPeak: 2015,
    reasonForFall: "Government pressure, forced sales",
    detailedTimeline: [
      { year: 2015, event: "Asia's richest person with $30 billion" },
      { year: 2017, event: "Chinese government restricts overseas investments" },
      { year: 2018, event: "Forced to sell major assets including hotels" }
    ],
    keyFactors: [
      "Government crackdown on capital outflows",
      "Forced to sell overseas assets",
      "Debt reduction requirements"
    ],
    currentStatus: "Below billionaire threshold, estimated $800 million."
  },
  {
    id: 20,
    rank: 20,
    name: "Gerald Grosvenor",
    formerNetWorth: 13000000000,
    currentNetWorth: 900000000,
    country: "UK",
    industry: "Real Estate",
    story: "Duke of Westminster estate lost billions in property value crashes during financial crisis.",
    yearOfPeak: 2007,
    reasonForFall: "Real estate crash",
    detailedTimeline: [
      { year: 2007, event: "Estate valued at $13 billion" },
      { year: 2008, event: "Financial crisis crashes property values" },
      { year: 2016, event: "Died with reduced estate value" }
    ],
    keyFactors: [
      "2008 financial crisis",
      "London property market crash",
      "Commercial real estate devaluations"
    ],
    currentStatus: "Deceased (2016), estate now below billionaire threshold."
  }
];
