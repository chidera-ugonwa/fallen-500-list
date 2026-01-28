import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  published_date: string;
}

const Articles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    checkSubscription();
  }, [user, navigate]);

  const checkSubscription = async () => {
    try {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user?.id)
        .maybeSingle();

      const subscribed = subscription?.status === 'active' && 
        subscription?.current_period_end && 
        new Date(subscription.current_period_end) > new Date();

      setIsSubscribed(subscribed);

      if (!subscribed) {
        setShowSubscribeModal(true);
        setLoading(false);
        return;
      }

      fetchArticles();
    } catch (error) {
      console.error('Error checking subscription:', error);
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, subtitle, author, published_date')
        .order('published_date', { ascending: false });

      if (error) throw error;
      
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (articleId: string) => {
    if (!isSubscribed) {
      setShowSubscribeModal(true);
      return;
    }
    navigate(`/articles/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-redressed mb-4">Exclusive Articles</h1>
            <p className="text-muted-foreground mb-6">
              Subscribe to access in-depth stories about fallen billionaires.
            </p>
          </div>
        </div>
        <Footer />
        <SubscribeModal open={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-redressed text-foreground mb-4">
              Exclusive <span className="text-destructive">Articles</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              In-depth stories and analysis of the world's fallen billionaires
            </p>
          </div>

          <div className="space-y-6">
            {articles.map((article) => (
              <Card 
                key={article.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleArticleClick(article.id)}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tracking-tight">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {article.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{new Date(article.published_date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Articles;