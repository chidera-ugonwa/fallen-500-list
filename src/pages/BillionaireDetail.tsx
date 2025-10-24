import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, MapPin, Briefcase, Loader2, AlertCircle, BookOpen, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useFallenBillionaires } from "@/hooks/useFallenBillionaires";

export default function BillionaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fallenBillionaires, loading, error } = useFallenBillionaires();
  
  const person = fallenBillionaires.find(p => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error loading data</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
        </div>
      </div>
    );
  }

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
                  <span>{person.country || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{person.industry || 'N/A'}</span>
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
                <p className="text-3xl font-bold text-success">{formatCurrency(person.peak_net_worth)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                  <p className="text-3xl font-bold text-destructive">{formatCurrency(person.current_net_worth)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Image */}
        {person.image_url && (
          <Card>
            <CardContent className="p-0">
              <img 
                src={person.image_url} 
                alt={person.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{person.summary}</p>
            </div>
          </CardContent>
        </Card>

        {/* Key Factors */}
        {person.key_factors && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Key Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: person.key_factors }}
              />
            </CardContent>
          </Card>
        )}

        {/* Current Status */}
        {person.current_status && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: person.current_status }}
              />
            </CardContent>
          </Card>
        )}

        {/* Lessons Learned */}
        {person.lessons_learned && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lessons Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: person.lessons_learned }}
              />
            </CardContent>
          </Card>
        )}

        {/* Full Story / Timeline */}
        {person.details_html && (
          <Card>
            <CardHeader>
              <CardTitle>Full Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: person.details_html }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
