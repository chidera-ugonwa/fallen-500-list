import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import FallenList from "@/components/FallenList";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Introduction */}
      <IntroSection />
      
      {/* Main List Section */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-redressed text-foreground mb-6">
              The <span className="text-destructive">Fallen</span> 500
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-lato">
              Browse, search, and explore the comprehensive list of those who lost it all. 
              Each story is a reminder that no fortune is guaranteed to last.
            </p>
          </div>
          
          <FallenList />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
