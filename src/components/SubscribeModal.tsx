import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface SubscribeModalProps {
  open: boolean;
}

export default function SubscribeModal({ open }: SubscribeModalProps) {
  const handleSubscribe = () => {
    // Navigate to subscription page or external signup
    window.location.href = "/auth?mode=signup";
  };

  return (
    <Dialog open={open} modal>
      <DialogContent 
        className="sm:max-w-md bg-gradient-to-br from-background via-background to-destructive/5 border-destructive/20"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <Crown className="w-6 h-6 text-destructive" />
          </div>
          <DialogTitle className="text-2xl text-center font-redressed">
            Subscribe to Fallen500
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            Subscribe to Fallen500 to unlock the full story and exclusive insights on the world's fallen billionaires.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Button 
            onClick={handleSubscribe}
            className="w-full bg-destructive hover:bg-destructive/90 text-white"
            size="lg"
          >
            Subscribe Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
