import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Trash2, Key, CreditCard, FileText, Shield, Calendar, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openPaddleCheckout } from "@/lib/paddle";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Subscription {
  status: string;
  current_period_end: string | null;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check for payment success
    if (searchParams.get('payment') === 'success') {
      toast({
        title: "Payment Successful!",
        description: "Your subscription is now active. Enjoy exclusive articles!",
      });
      // Remove query param
      navigate('/profile', { replace: true });
    }

    fetchSubscription();
  }, [user, navigate, searchParams]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke('delete-account', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error('Delete account error:', error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCanceling(true);
    try {
      const { error } = await supabase.functions.invoke('cancel-subscription', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Subscription Canceled",
        description: "Your subscription has been canceled. You'll have access until the end of your billing period.",
      });
      
      await fetchSubscription();
    } catch (error) {
      console.error('Cancel subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCanceling(false);
    }
  };

  const handleSubscribe = () => {
    if (!user) return;
    try {
      openPaddleCheckout({
        email: user.email || "",
        userId: user.id,
        onSuccess: () => {
          toast({
            title: "Payment Successful!",
            description: "Your subscription is being activated.",
          });
          fetchSubscription();
        },
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to open checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isSubscribed = subscription?.status === 'active' && 
    subscription?.current_period_end && 
    new Date(subscription.current_period_end) > new Date();

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const getUserName = () => {
    return user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  };

  const getAccountAge = () => {
    if (!user?.created_at) return 'N/A';
    const createdDate = new Date(user.created_at);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays < 1) return 'Today';
    if (diffInDays === 1) return '1 day';
    if (diffInDays < 30) return `${diffInDays} days`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months`;
    return `${Math.floor(diffInDays / 365)} years`;
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-redressed text-3xl">Profile</CardTitle>
              <CardDescription>Manage your account and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 flex-shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-destructive/20 text-destructive text-2xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold truncate">{getUserName()}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-all">{user?.email}</p>
                  <div className="mt-2">
                    {isSubscribed ? (
                      <Badge variant="default" className="bg-success hover:bg-success/90">Subscribed</Badge>
                    ) : (
                      <Badge variant="secondary">Free Account</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-redressed text-2xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Member for</p>
                    <p className="text-sm font-medium">{getAccountAge()}</p>
                  </div>
                </div>
              </div>

              {isSubscribed && subscription?.current_period_end && (
                <>
                  <Separator />
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg border border-success/20">
                    <Shield className="h-5 w-5 text-success flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Subscription renews on</p>
                      <p className="text-sm font-medium text-success">
                        {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-redressed text-2xl">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isSubscribed && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate('/articles')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Articles
                </Button>
              )}

              {!isSubscribed ? (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleSubscribe}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe ($9.99/month)
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {canceling ? "Canceling..." : "Cancel Subscription"}
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/auth?mode=reset')}
              >
                <Key className="mr-2 h-4 w-4" />
                Change Password
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>

              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;