import { TrendingDown, AlertTriangle, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function IntroSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Intro */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-redressed text-foreground mb-6">
            A Chronicle of <span className="text-destructive">Financial Ruin</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-lato">
            Fortune is fleeting. Power is temporary. Here lies the comprehensive record of 500 individuals who once commanded 
            billions, shaped industries, and influenced nations— only to fall off. From tech moguls to real estate tycoons, 
            these are the stories of spectacular rises and even more spectacular falls.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
          <Card className="bg-card border-border hover:border-destructive/20 transition-colors group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-destructive/20 transition-colors">
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-bold font-lato mb-4">Spectacular Falls</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-lato">
                From billions to bankruptcy. Witness the dramatic collapses that shocked the financial world 
                and changed lives forever.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-destructive/20 transition-colors group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-warning/20 transition-colors">
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold font-lato mb-4">Cautionary Tales</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-lato">
                Learn from the mistakes, frauds, and miscalculations that brought down empires 
                and destroyed generational wealth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-destructive/20 transition-colors group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors">
                <History className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold font-lato mb-4">Historical Record</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-lato">
                A meticulously documented archive spanning decades of financial history, 
                market crashes, and personal downfalls.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Methodology */}
        <div className="mt-20 text-center">
          <div className="bg-card/50 border border-border rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-lato mb-4 text-foreground">Our Methodology</h3>
            <p className="text-muted-foreground leading-relaxed font-lato mb-4">
              Each entry is carefully researched and verified. We track individuals who reached a peak net worth 
              of $1 billion and subsequently fell to under $1 billion due to various factors including 
              market crashes, poor investments, legal troubles, fraudulent activities, and other circumstances.
            </p>
            <p className="text-sm text-muted-foreground italic font-lato">
              "The higher they rise, the harder they fall." - Financial wisdom through the ages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}