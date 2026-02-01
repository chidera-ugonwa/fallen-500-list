import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TrendingDown, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <TrendingDown className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Error Text */}
        <h1 className="text-6xl font-redressed text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2 font-lato">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 font-lato">
          Looks like this fortune has fallen off the map. The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
