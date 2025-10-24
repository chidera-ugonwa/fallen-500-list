import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown, ChevronUp, TrendingDown, ArrowRight, Loader2 } from "lucide-react";
import { useFallenBillionaires } from "@/hooks/useFallenBillionaires";

type SortField = 'rank' | 'name' | 'peak_net_worth' | 'current_net_worth' | 'country' | 'industry';
type SortDirection = 'asc' | 'desc';

export default function FallenList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { data: fallenBillionaires, loading, error } = useFallenBillionaires();

  const filteredAndSortedData = useMemo(() => {
    let filtered = fallenBillionaires.filter(person =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (person.industry?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (person.country?.toLowerCase() || '').includes(searchQuery.toLowerCase())
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
  }, [fallenBillionaires, searchQuery, sortField, sortDirection]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        Error loading data: {error.message}
      </div>
    );
  }

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
      <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-card/50 rounded-lg border border-border">
        <Button variant="ghost" onClick={() => handleSort('rank')} className="justify-start">
          Rank <SortIcon field="rank" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('name')} className="justify-start">
          Name <SortIcon field="name" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('peak_net_worth')} className="justify-start">
          Peak Worth <SortIcon field="peak_net_worth" />
        </Button>
        <Button variant="ghost" onClick={() => handleSort('current_net_worth')} className="justify-start">
          Current Worth <SortIcon field="current_net_worth" />
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
              <div className="hidden md:grid grid-cols-7 gap-4 p-4 items-center">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-destructive border-destructive/20">
                    #{person.rank}
                  </Badge>
                </div>
                <div className="font-medium font-lato">{person.name}</div>
                <div className="font-medium text-success">{formatCurrency(person.peak_net_worth)}</div>
                <div className="font-medium text-destructive flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{formatCurrency(person.current_net_worth)}</span>
                </div>
                <div className="text-muted-foreground">{person.country || 'N/A'}</div>
                <div className="text-muted-foreground text-sm">{person.industry || 'N/A'}</div>
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
                  <div>
                    <h3 className="font-medium font-lato">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">{person.country || 'N/A'} • {person.industry || 'N/A'}</p>
                  </div>
                  <Badge variant="outline" className="text-destructive border-destructive/20">
                    #{person.rank}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Peak Worth</p>
                    <p className="font-medium text-success">{formatCurrency(person.peak_net_worth)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Worth</p>
                    <p className="font-medium text-destructive flex items-center space-x-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>{formatCurrency(person.current_net_worth)}</span>
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
                    <p className="text-sm leading-relaxed font-lato">{person.summary}</p>
                    <Button 
                      onClick={() => navigate(`/billionaire/${person.id}`)}
                      className="mt-4"
                    >
                      See More Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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