import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, Calendar, MapPin, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FallenPerson {
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

const mockData: FallenPerson[] = [
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
    currentStatus: "Released from prison in 2019, currently attempting business comebacks with limited success. Lives a modest lifestyle compared to his billionaire days.",
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
      "Culture of secrecy prevented early detection of problems",
      "Charismatic leadership masked fundamental business flaws"
    ],
    currentStatus: "Currently serving an 11-year prison sentence. Required to pay $452 million in restitution to investors. Her case became a cautionary tale about Silicon Valley hype.",
    lessonsLearned: [
      "Technology claims must be verifiable and transparent",
      "Strong governance requires relevant expertise on boards",
      "Due diligence is essential before investing in revolutionary claims",
      "Charisma cannot substitute for actual product functionality"
    ]
  },
  {
    id: 3,
    rank: 3,
    name: "Sean Quinn",
    formerNetWorth: 6000000000,
    currentNetWorth: 0,
    country: "Ireland",
    industry: "Construction & Insurance",
    story: "Ireland's richest man built an empire from cement and insurance. Risky investments in Anglo Irish Bank shares during the 2008 financial crisis led to his spectacular downfall.",
    yearOfPeak: 2007,
    reasonForFall: "Financial crisis, bad investments",
    detailedTimeline: [
      { year: 1973, event: "Started quarry business with £100 loan" },
      { year: 2007, event: "Named Ireland's richest person with €6 billion fortune" },
      { year: 2008, event: "Anglo Irish Bank investments became toxic during financial crisis" },
      { year: 2011, event: "Quinn Group placed into administration" },
      { year: 2012, event: "Declared bankrupt with debts of €2.8 billion" }
    ],
    keyFactors: [
      "Concentrated 25% of wealth in Anglo Irish Bank shares using CFDs",
      "Global financial crisis destroyed bank share values",
      "Borrowed heavily against illiquid assets",
      "Refused to sell positions despite mounting losses",
      "Irish property market collapse compounded problems"
    ],
    currentStatus: "Discharged from bankruptcy in 2018. Attempted to rebuild business interests but never regained former wealth. Remains a controversial figure in Ireland.",
    lessonsLearned: [
      "Never concentrate wealth in a single investment",
      "Avoid excessive leverage, especially in volatile assets",
      "Financial crisis can destroy even the most established fortunes",
      "Pride and stubbornness can prevent cutting losses early"
    ]
  },
  {
    id: 4,
    rank: 4,
    name: "Aubrey McClendon",
    formerNetWorth: 3000000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Natural Gas",
    story: "Natural gas pioneer who helped spark the fracking boom. Aggressive borrowing and falling gas prices led to his companies' collapse. Died in 2016 in a car crash while facing federal charges.",
    yearOfPeak: 2008,
    reasonForFall: "Debt crisis, legal troubles",
    detailedTimeline: [
      { year: 1989, event: "Co-founded Chesapeake Energy with $50,000" },
      { year: 2008, event: "Net worth peaks at $3 billion during natural gas boom" },
      { year: 2008, event: "Forced to sell most Chesapeake shares to cover margin calls" },
      { year: 2013, event: "Stepped down as CEO amid governance controversies" },
      { year: 2016, event: "Indicted on bid-rigging charges, died in car crash next day" }
    ],
    keyFactors: [
      "Borrowed billions against Chesapeake shares for personal investments",
      "Natural gas price collapse from $13 to $2 destroyed equity value",
      "Aggressive land acquisition strategy required constant capital",
      "Corporate governance issues eroded investor confidence",
      "Legal troubles from anticompetitive practices"
    ],
    currentStatus: "Died in single-car crash in 2016, one day after federal indictment. Circumstances remain disputed. Legacy is mixed - both visionary and cautionary.",
    lessonsLearned: [
      "Commodity price volatility requires conservative leverage",
      "Personal and corporate finances should remain separate",
      "Growth-at-all-costs strategies can backfire spectacularly",
      "Corporate governance matters for long-term success"
    ]
  },
  {
    id: 5,
    rank: 5,
    name: "Allen Stanford",
    formerNetWorth: 2200000000,
    currentNetWorth: 0,
    country: "USA",
    industry: "Banking & Finance",
    story: "Cricket sponsor and financier who ran a $7 billion Ponzi scheme through his Stanford Financial Group. Now serving 110 years in federal prison.",
    yearOfPeak: 2008,
    reasonForFall: "Ponzi scheme conviction",
    detailedTimeline: [
      { year: 1985, event: "Founded Stanford Financial Group in Montserrat" },
      { year: 2008, event: "Reached billionaire status with $2.2 billion fortune" },
      { year: 2009, event: "SEC charges Stanford with running $7 billion Ponzi scheme" },
      { year: 2012, event: "Convicted on 13 of 14 fraud charges" },
      { year: 2012, event: "Sentenced to 110 years in federal prison" }
    ],
    keyFactors: [
      "Fabricated investment returns for decades",
      "Used new investor money to pay existing investors",
      "Bribed regulators in Antigua to avoid scrutiny",
      "Lived lavishly on investor funds while lying about returns",
      "Complex offshore structure obscured fraud"
    ],
    currentStatus: "Currently incarcerated at FCI Coleman, Florida. Ordered to pay $7 billion in restitution. Lost all assets including properties, aircraft, and cricket investments.",
    lessonsLearned: [
      "If returns seem too good to be true, they probably are",
      "Offshore financial structures can hide massive fraud",
      "Regulatory oversight is crucial for investor protection",
      "Due diligence must go beyond promised returns"
    ]
  }
];

export default function BillionaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const person = mockData.find(p => p.id === Number(id));

  if (!person) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Person not found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "$0";
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-8">
        {/* Header */}
        <div>
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-destructive border-destructive/20">
                  #{person.rank}
                </Badge>
                <h1 className="text-4xl font-bold font-lato">{person.name}</h1>
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{person.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{person.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Peak: {person.yearOfPeak}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Worth Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Peak Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-success">{formatCurrency(person.formerNetWorth)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                  <p className="text-3xl font-bold text-destructive">{formatCurrency(person.currentNetWorth)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{person.story}</p>
              <Badge variant="destructive" className="text-sm">{person.reasonForFall}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        {person.detailedTimeline && (
          <Card>
            <CardHeader>
              <CardTitle>Timeline of Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {person.detailedTimeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Badge variant="secondary">{event.year}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{event.event}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Factors */}
        {person.keyFactors && (
          <Card>
            <CardHeader>
              <CardTitle>Key Factors in Their Downfall</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {person.keyFactors.map((factor, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-destructive mt-1">•</span>
                    <span className="text-sm leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Current Status */}
        {person.currentStatus && (
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{person.currentStatus}</p>
            </CardContent>
          </Card>
        )}

        {/* Lessons Learned */}
        {person.lessonsLearned && (
          <Card>
            <CardHeader>
              <CardTitle>Lessons Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {person.lessonsLearned.map((lesson, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-sm leading-relaxed">{lesson}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
