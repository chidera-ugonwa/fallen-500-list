import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Database } from 'lucide-react';

const Admin = () => {
  const { user, isEditor, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rank: '',
    name: '',
    peak_net_worth: '',
    current_net_worth: '',
    country: '',
    industry: '',
    summary: '',
    details_html: '',
    image_url: '',
    featured: false,
    published: true
  });

  useEffect(() => {
    if (!authLoading && (!user || !isEditor)) {
      navigate('/auth');
    }
  }, [user, isEditor, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('fallen_billionaires')
        .insert([{
          rank: parseInt(formData.rank),
          name: formData.name,
          peak_net_worth: parseFloat(formData.peak_net_worth),
          current_net_worth: parseFloat(formData.current_net_worth),
          country: formData.country,
          industry: formData.industry,
          summary: formData.summary,
          details_html: formData.details_html,
          image_url: formData.image_url || null,
          featured: formData.featured,
          published: formData.published,
          created_by: user?.id
        }]);

      if (error) throw error;

      toast({
        title: "Entry created successfully",
        description: `${formData.name} has been added to the database.`
      });

      // Reset form
      setFormData({
        rank: '',
        name: '',
        peak_net_worth: '',
        current_net_worth: '',
        country: '',
        industry: '',
        summary: '',
        details_html: '',
        image_url: '',
        featured: false,
        published: true
      });
    } catch (error: any) {
      toast({
        title: "Error creating entry",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button variant="default" onClick={() => navigate('/populate-database')}>
            <Database className="h-4 w-4 mr-2" />
            Bulk Population Tool
          </Button>
          <h1 className="text-3xl font-redressed">Admin Panel</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Fallen Billionaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rank">Rank *</Label>
                  <Input
                    id="rank"
                    type="number"
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="peak_net_worth">Peak Net Worth (USD billions) *</Label>
                  <Input
                    id="peak_net_worth"
                    type="number"
                    step="0.1"
                    value={formData.peak_net_worth}
                    onChange={(e) => setFormData({ ...formData, peak_net_worth: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_net_worth">Current Net Worth (USD billions) *</Label>
                  <Input
                    id="current_net_worth"
                    type="number"
                    step="0.1"
                    value={formData.current_net_worth}
                    onChange={(e) => setFormData({ ...formData, current_net_worth: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary *</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details_html">Detailed Story (HTML)</Label>
                <Textarea
                  id="details_html"
                  value={formData.details_html}
                  onChange={(e) => setFormData({ ...formData, details_html: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  <span>Published</span>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : 'Create Entry'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;