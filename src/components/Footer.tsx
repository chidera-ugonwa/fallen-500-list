import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img src={logo} alt="Fallen500" className="h-8 w-8" />
            <span className="text-2xl font-redressed text-foreground">
              Fallen<span className="text-destructive">500</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground italic font-lato">
            "Fortune's wheel turns for all"
          </p>
        </div>

        {/* Legal Links */}
        <div className="mb-6 flex items-center justify-center gap-6">
          <Link 
            to="/pricing" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-lato"
          >
            Pricing
          </Link>
          <span className="text-muted-foreground/50">•</span>
          <Link 
            to="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-lato"
          >
            Privacy Policy
          </Link>
          <span className="text-muted-foreground/50">•</span>
          <Link 
            to="/terms" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-lato"
          >
            Terms of Service
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed font-lato">
            This site is for educational and historical purposes. All financial figures are estimates based on 
            publicly available information and may not reflect current exact values. Stories are compiled from 
            verified news sources and public records.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground font-lato">
            © {new Date().getFullYear()} Fallen500. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}