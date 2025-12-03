import { TrendingDown } from "lucide-react";
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
            © 2025 Fallen500. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}