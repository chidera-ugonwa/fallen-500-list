import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import { calculateReadingTime, getArticleImage } from "@/lib/articleUtils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  published_date: string;
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    checkSubscriptionAndFetchArticle();
  }, [user, id, navigate]);

  const checkSubscriptionAndFetchArticle = async () => {
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

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-4xl font-redressed mb-4">Subscribe to Read</h1>
            <p className="text-muted-foreground mb-6">
              This article is exclusive to subscribers.
            </p>
          </div>
        </div>
        <Footer />
        <SubscribeModal open={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-redressed mb-4">Article Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <article className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 md:p-12">
              <AspectRatio ratio={16 / 9} className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={getArticleImage(article.title)}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {article.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-8 pb-8 border-b">
                <span className="text-sm text-muted-foreground">
                  By <span className="font-medium text-foreground">{article.author}</span>
                </span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {calculateReadingTime(article.content)} min read
                  </span>
                  <span>
                    {new Date(article.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;