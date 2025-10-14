import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  imageUrl: string;
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/EIKE_BATISTA.jpg/440px-EIKE_BATISTA.jpg"
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Elizabeth_Holmes_of_Theranos_%2815186113882%29.jpg/440px-Elizabeth_Holmes_of_Theranos_%2815186113882%29.jpg"
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
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
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
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
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
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Allen_Stanford_mug_shot.jpg/440px-Allen_Stanford_mug_shot.jpg"
  }
].sort((a, b) => (b.formerNetWorth - b.currentNetWorth) - (a.formerNetWorth - a.currentNetWorth))
  .map((person, index) => ({ ...person, rank: index + 1 }));

type SortField = 'rank' | 'name' | 'formerNetWorth' | 'currentNetWorth' | 'country' | 'industry';
type SortDirection = 'asc' | 'desc';

export default function FallenList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const filteredAndSortedData = useMemo(() => {
    let filtered = mockData.filter(person =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "$0";
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${amount.toLocaleString()}`;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by name, industry, or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-3 p-4 bg-card/50 rounded-lg border border-border">
        <Button variant="ghost" onClick={() => handleSort('rank')} className="justify-start px-2">
          Rank <SortIcon field="rank" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('name')} className="justify-start">
          Name <SortIcon field="name" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('formerNetWorth')} className="justify-start">
          Former Worth <SortIcon field="formerNetWorth" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('currentNetWorth')} className="justify-start">
          Current Worth <SortIcon field="currentNetWorth" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('country')} className="justify-start">
          Country <SortIcon field="country" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('industry')} className="justify-start">
          Industry <SortIcon field="industry" />
        </Button>
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          Details
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {filteredAndSortedData.map((person) => (
          <Card key={person.id} className="overflow-hidden bg-card border-border hover:border-primary/20 transition-colors">
            <CardContent className="p-0">
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-3 p-4 items-center">
                <div className="flex items-center px-2">
                  <Badge variant="outline" className="text-destructive border-destructive/20">
                    #{person.rank}
                  </Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage src={person.imageUrl} alt={person.name} className="object-cover" />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium font-lato">{person.name}</div>
                </div>
                <div className="font-medium text-success">{formatCurrency(person.formerNetWorth)}</div>
                <div className="font-medium text-destructive flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{formatCurrency(person.currentNetWorth)}</span>
                </div>
                <div className="text-muted-foreground">{person.country}</div>
                <div className="text-muted-foreground text-sm">{person.industry}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedCard(expandedCard === person.id ? null : person.id)}
                  className="justify-start"
                >
                  {expandedCard === person.id ? 'Hide' : 'View'}
                </Button>
              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-14 w-14 border-2 border-border">
                      <AvatarImage src={person.imageUrl} alt={person.name} className="object-cover" />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium font-lato">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.country} • {person.industry}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-destructive border-destructive/20">
                    #{person.rank}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Peak Worth</p>
                    <p className="font-medium text-success">{formatCurrency(person.formerNetWorth)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Worth</p>
                    <p className="font-medium text-destructive flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>{formatCurrency(person.currentNetWorth)}</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedCard(expandedCard === person.id ? null : person.id)}
                  className="w-full"
                >
                  {expandedCard === person.id ? 'Hide Story' : 'View Story'}
                </Button>
              </div>

              {/* Expanded Story Section */}
              {expandedCard === person.id && (
                <div className="border-t border-border p-6 bg-muted/20 animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Peak: {person.yearOfPeak}</Badge>
                      <Badge variant="destructive">{person.reasonForFall}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed font-lato">{person.story}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-12">
          <TrendingDown className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No fallen billionaires match your search criteria.</p>
        </div>
      )}
    </div>
  );
}