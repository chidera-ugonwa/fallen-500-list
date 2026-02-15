import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { openDodoCheckout } from "@/lib/dodo";
import { useToast } from "@/hooks/use-toast";

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGetStarted = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    try {
      const url = await openDodoCheckout();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to open checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-redressed text-foreground mb-4">Pricing</h1>
        <p className="text-muted-foreground font-lato mb-12 max-w-2xl">
          Unlock the full stories behind the world's most dramatic financial downfalls.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {/* Free Tier */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-redressed text-2xl">Free</CardTitle>
              <p className="text-3xl font-bold text-foreground font-lato">
                $0<span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 font-lato text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                  Browse the Fallen 500 rankings
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                  View basic profile summaries
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-primary shrink-0" />
                  Read featured articles
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-destructive relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-lato font-semibold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="font-redressed text-2xl">Premium</CardTitle>
              <p className="text-3xl font-bold text-foreground font-lato">
                $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 font-lato text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-destructive shrink-0" />
                  Everything in Free
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-destructive shrink-0" />
                  Full detailed profiles with timelines
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-destructive shrink-0" />
                  Key factors &amp; lessons learned
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-destructive shrink-0" />
                  Exclusive in-depth articles
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-1 text-destructive shrink-0" />
                  Cancel anytime
                </li>
              </ul>
              <Button className="w-full mt-6" onClick={handleGetStarted}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
