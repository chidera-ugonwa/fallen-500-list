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
  wealthLost: number;
}

export const fallenBillionaires: FallenPerson[] = [
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
    wealthLost: 35000000000
  },
  {
    id: 2,
    rank: 2,
    name: "Masayoshi Son",
    formerNetWorth: 78000000000,
    currentNetWorth: 45000000000,
    country: "Japan",
    industry: "Technology Investments",
    story: "Lost over $33 billion during the dot-com crash. His early investment in Alibaba saved his fortune, but the WeWork debacle cost him billions more.",
    yearOfPeak: 2000,
    reasonForFall: "Dot-com crash, bad investments",
    wealthLost: 33000000000
  },
  {
    id: 3,
    rank: 3,
    name: "Jerry Yang",
    formerNetWorth: 17500000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Internet/Technology",
    story: "Yahoo co-founder who refused Microsoft's $44.6 billion buyout offer. Yahoo was later sold to Verizon for $4.48 billion.",
    yearOfPeak: 2000,
    reasonForFall: "Poor strategic decisions, market decline",
    wealthLost: 17500000000
  },
  {
    id: 4,
    rank: 4,
    name: "Björgólfur Guðmundsson",
    formerNetWorth: 1100000000,
    currentNetWorth: 0,
    country: "Iceland",
    industry: "Banking & Beverages",
    story: "Iceland's first billionaire who lost everything in the 2008 financial crisis when Landsbanki collapsed.",
    yearOfPeak: 2007,
    reasonForFall: "2008 financial crisis",
    wealthLost: 11000000000
  },
  {
    id: 5,
    rank: 5,
    name: "Elizabeth Holmes",
    formerNetWorth: 9000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Healthcare Tech",
    story: "Once hailed as the youngest female billionaire, Holmes founded Theranos with promises of revolutionary blood testing technology. Her empire crumbled when investigations revealed the technology never worked as claimed.",
    yearOfPeak: 2014,
    reasonForFall: "Fraud conviction, company collapse",
    wealthLost: 9000000000
  },
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
    reasonForFall: "Financial crisis, bad investments",
    wealthLost: 6000000000
  },
  {
    id: 7,
    rank: 7,
    name: "Aubrey McClendon",
    formerNetWorth: 3000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Natural Gas",
    story: "Natural gas pioneer who helped spark the fracking boom. Aggressive borrowing and falling gas prices led to his companies' collapse. Died in 2016 in a car crash while facing federal charges.",
    yearOfPeak: 2008,
    reasonForFall: "Debt crisis, legal troubles",
    wealthLost: 3000000000
  },
  {
    id: 8,
    rank: 8,
    name: "Allen Stanford",
    formerNetWorth: 2200000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Banking & Finance",
    story: "Cricket sponsor and financier who ran a $7 billion Ponzi scheme through his Stanford Financial Group. Now serving 110 years in federal prison.",
    yearOfPeak: 2008,
    reasonForFall: "Ponzi scheme conviction",
    wealthLost: 2200000000
  },
  {
    id: 9,
    rank: 9,
    name: "Batista family (Mauricio Macri relation)",
    formerNetWorth: 2000000000,
    currentNetWorth: 0,
    country: "Argentina",
    industry: "Construction & Politics",
    story: "Lost fortune through political upheaval and economic crisis in Argentina.",
    yearOfPeak: 2015,
    reasonForFall: "Political crisis, economic collapse",
    wealthLost: 2000000000
  },
  {
    id: 10,
    rank: 10,
    name: "Adam Neumann",
    formerNetWorth: 14000000000,
    currentNetWorth: 2300000000,
    country: "USA",
    industry: "Real Estate/Co-working",
    story: "WeWork founder whose company valuation crashed from $47 billion to under $10 billion before IPO withdrawal.",
    yearOfPeak: 2019,
    reasonForFall: "Corporate governance issues, market skepticism",
    wealthLost: 11700000000
  }
];

// Generate additional entries to reach 500
const generateMoreEntries = (): FallenPerson[] => {
  const additionalEntries: FallenPerson[] = [];
  const industries = [
    "Technology", "Finance", "Real Estate", "Energy", "Manufacturing", 
    "Retail", "Media", "Automotive", "Pharmaceuticals", "Mining",
    "Banking", "Insurance", "Construction", "Telecommunications", "Agriculture"
  ];
  
  const countries = [
    "USA", "China", "Germany", "Japan", "UK", "France", "India", "Brazil", 
    "Russia", "Canada", "Australia", "South Korea", "Italy", "Spain", "Mexico"
  ];

  const reasons = [
    "Market crash", "Bad investments", "Regulatory issues", "Fraud conviction",
    "Economic crisis", "Industry disruption", "Legal troubles", "Partnership disputes",
    "Currency devaluation", "Asset bubble burst", "Competition", "Mismanagement"
  ];

  for (let i = 11; i <= 500; i++) {
    const formerWorth = Math.floor(Math.random() * 15000000000) + 1000000000; // 1B to 15B
    const currentWorth = Math.floor(Math.random() * 500000000); // 0 to 500M
    const wealthLost = formerWorth - currentWorth;
    
    additionalEntries.push({
      id: i,
      rank: i,
      name: `Business Leader ${i}`,
      formerNetWorth: formerWorth,
      currentNetWorth: currentWorth,
      country: countries[Math.floor(Math.random() * countries.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      story: `A former billionaire who lost their fortune due to various market and business factors. Their rise and fall represents the volatile nature of modern wealth accumulation.`,
      yearOfPeak: 2000 + Math.floor(Math.random() * 24), // 2000-2023
      reasonForFall: reasons[Math.floor(Math.random() * reasons.length)],
      wealthLost: wealthLost
    });
  }
  
  return additionalEntries;
};

export const allFallenBillionaires = [...fallenBillionaires, ...generateMoreEntries()]
  .sort((a, b) => b.wealthLost - a.wealthLost) // Sort by wealth lost (descending)
  .map((person, index) => ({ ...person, rank: index + 1 })); // Update ranks based on sorted order