import { TrendingDown, Users, DollarSign } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import logoWhite from "@/assets/logo-white.png";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Logo/Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <img src={logoWhite} alt="Fallen500 Logo" className="w-20 h-20 md:w-32 md:h-32 mr-4" />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-redressed text-foreground tracking-wider">
              Fallen<span className="text-destructive">500</span>
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl text-muted-foreground font-lato">
            <TrendingDown className="w-6 h-6 text-destructive" />
            <span className="italic">"The once mighty, now fallen."</span>
            <TrendingDown className="w-6 h-6 text-destructive" />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-slide-up">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-lato">500</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide flex items-center justify-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Fallen Billionaires</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-lato">$2.1T</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide flex items-center justify-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>Total Lost Wealth</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-lato">95%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide flex items-center justify-center space-x-1">
              <TrendingDown className="w-4 h-4" />
              <span>Average Wealth Lost</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mx-auto absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Scroll to Explore</p>
        </div>
      </div>
    </div>
  );
}