import { Button } from "@/components/ui/button";
import { Crown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { openDodoCheckout } from "@/lib/dodo";

interface SubscribeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ open, onClose }: SubscribeModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const url = await openDodoCheckout();
      window.location.href = url;
    } catch (error) {
      console.error("Dodo checkout error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to open checkout. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      <div
        className="fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 ease-out"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          height: "60vh",
          top: "40vh",
        }}
      >
        <div className="h-full bg-gradient-to-br from-background via-background to-destructive/10 border-t-2 border-destructive/30 rounded-t-3xl shadow-2xl overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <Crown className="w-8 h-8 text-destructive" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-center font-redressed">
                Subscribe to Fallen500
              </h2>

              <p className="text-center text-lg leading-relaxed text-muted-foreground max-w-lg">
                Subscribe to Fallen500 for $9.99/month to unlock the full story
                and exclusive insights on the world's fallen billionaires.
              </p>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-destructive hover:bg-destructive/90 text-white py-6 text-lg"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : user ? (
                  "Continue to Payment"
                ) : (
                  "Sign In to Subscribe"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
