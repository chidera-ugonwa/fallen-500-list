import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, MapPin, Briefcase, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useFallenBillionaires } from "@/hooks/useFallenBillionaires";
import { formatPeakWorth, formatCurrentWorth } from "@/lib/formatters";
import SubscribeModal from "@/components/SubscribeModal";

export default function BillionaireDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fallenBillionaires, loading, error } = useFallenBillionaires();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  const person = fallenBillionaires.find(p => p.id === id);

  // Show subscribe modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubscribeModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showSubscribeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSubscribeModal]);

  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('fallen500_scroll_position');
    if (savedPosition) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }, 0);
    }
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

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


  return (
    <div className="min-h-screen bg-background">
      <SubscribeModal open={showSubscribeModal} />
      
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-8">
        {/* Header */}
        <div>
          <Button variant="ghost" onClick={handleGoBack} className="mb-6">
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
                <p className="text-3xl font-bold text-success">{formatPeakWorth(person.peak_net_worth)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                  <p className="text-3xl font-bold text-destructive">{formatCurrentWorth(person.current_net_worth)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Image */}
        {person.image_url && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
                <img 
                  src={person.image_url} 
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
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
              <CardTitle>Key Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                {person.key_factors.split('\n').filter(line => line.trim()).map((factor, index) => (
                  <li key={index} className="text-foreground">{factor.replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Current Status */}
        {person.current_status && (
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                {person.current_status.split('\n').filter(line => line.trim()).map((status, index) => (
                  <li key={index} className="text-foreground">{status.replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Lessons Learned */}
        {person.lessons_learned && (
          <Card>
            <CardHeader>
              <CardTitle>Lessons Learned</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                {person.lessons_learned.split('\n').filter(line => line.trim()).map((lesson, index) => (
                  <li key={index} className="text-foreground">{lesson.replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Key Timelines */}
        {person.key_timelines && (
          <Card>
            <CardHeader>
              <CardTitle>Key Timelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside text-base leading-relaxed">
                {person.key_timelines.split('\n').filter(line => line.trim()).map((timeline, index) => (
                  <li key={index} className="text-foreground">{timeline.replace(/^[-•]\s*/, '')}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
