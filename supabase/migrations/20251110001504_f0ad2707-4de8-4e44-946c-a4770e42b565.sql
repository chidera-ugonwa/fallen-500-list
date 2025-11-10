-- Add display_picture to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_picture TEXT;

-- Update subscriptions table to work with Paystack
ALTER TABLE public.subscriptions 
  DROP COLUMN IF EXISTS stripe_customer_id,
  DROP COLUMN IF EXISTS stripe_subscription_id,
  ADD COLUMN IF NOT EXISTS payment_reference TEXT,
  ADD COLUMN IF NOT EXISTS payment_provider TEXT DEFAULT 'paystack',
  ADD COLUMN IF NOT EXISTS amount NUMERIC DEFAULT 9.99,
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policy: Only subscribed users can view articles
CREATE POLICY "Subscribed users can view articles"
ON public.articles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = auth.uid()
    AND status = 'active'
    AND current_period_end > now()
  )
);

-- Policy: Admins and editors can manage articles
CREATE POLICY "Admins and editors can insert articles"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

CREATE POLICY "Admins and editors can update articles"
ON public.articles
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'editor'::app_role)
);

CREATE POLICY "Admins can delete articles"
ON public.articles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert dummy articles
INSERT INTO public.articles (title, subtitle, content, author) VALUES
(
  'The Fall of Tech Titan: How $10B Turned Into $10M',
  'Inside the unraveling of John Doe''s empire.',
  E'In the fast-paced world of technology, fortunes can be made and lost in the blink of an eye. This is the story of John Doe, a visionary entrepreneur who built a $10 billion empire, only to watch it crumble to mere millions.\n\nThe rise was meteoric. Starting in a garage with nothing but a laptop and a dream, John revolutionized the way we interact with technology. His company grew from a scrappy startup to a global powerhouse in just five years.\n\nBut success breeds complacency. As the company expanded, John lost touch with the core values that made it great. Reckless acquisitions, inflated valuations, and a toxic work culture began to take their toll.\n\nThe fall was equally swift. Regulatory scrutiny, competition from nimble startups, and a series of PR disasters eroded investor confidence. Within two years, the company''s value plummeted, taking John''s personal fortune with it.\n\nToday, John serves as a cautionary tale for aspiring entrepreneurs: success is fleeting, and hubris can be fatal.',
  'Sarah Mitchell'
),
(
  'From Billionaire to Bankruptcy: The Story of a Crypto King',
  'How greed and volatility destroyed a digital dynasty.',
  E'The cryptocurrency world has seen its share of spectacular rises and falls, but few are as dramatic as the story of Marcus Chen, the self-proclaimed "Crypto King."\n\nMarcus made his billions by betting big on Bitcoin in its early days. By 2021, he was worth over $3 billion, with a diverse portfolio of digital assets and a reputation as a crypto sage.\n\nBut Marcus''s success went to his head. He began making increasingly risky bets, leveraging his entire portfolio to chase higher returns. When the crypto market crashed in 2022, Marcus was caught with massive debts and dwindling assets.\n\nDesperate to recover, he launched his own cryptocurrency, promising revolutionary technology and guaranteed returns. It was a scam, and regulators quickly caught on. Legal fees and settlements drained what little wealth remained.\n\nIn 2024, Marcus filed for bankruptcy, owing creditors over $500 million. His fall from grace serves as a stark reminder: in the volatile world of crypto, fortunes can evaporate overnight.',
  'David Zhang'
),
(
  'The High Life Collapse: A Fashion Mogul''s Downfall',
  'When luxury met liquidation.',
  E'Isabella Romano was the queen of fashion. Her luxury brand, Romano Couture, dressed celebrities, royalty, and the ultra-wealthy. At its peak, the company was valued at $5 billion, and Isabella''s personal fortune exceeded $2 billion.\n\nBut behind the glamorous runway shows and red carpet moments, the business was crumbling. Isabella had overextended, opening flagship stores in every major city while ignoring the shift to online retail.\n\nThe pandemic was the final blow. With stores closed and fashion weeks canceled, Romano Couture''s revenue plummeted. Isabella''s lavish lifestyle—yachts, private jets, multiple mansions—drained her personal wealth.\n\nIn 2023, Romano Couture filed for bankruptcy. Isabella was forced to sell her homes, her art collection, and even her personal jewelry. Today, she lives a modest life, a shadow of her former self.\n\nHer story is a reminder that even in the world of high fashion, staying relevant requires adaptation and financial discipline.',
  'Emily Laurent'
),
(
  'The Oil Baron''s Curse: When Black Gold Turned to Dust',
  'A century-old fortune lost in a single generation.',
  E'The Harrington family had been oil barons for three generations. Their wealth, built on Texas oil fields, seemed untouchable. By the 1990s, patriarch William Harrington III was worth over $4 billion.\n\nBut William''s son, Jack, had different ideas. When he inherited control of the company, he dismissed warnings about renewable energy and doubled down on fossil fuels. He made massive investments in oil exploration just as the world began transitioning to clean energy.\n\nThe company''s value plummeted. Environmental lawsuits piled up. Investors fled. Within a decade, Harrington Oil went from industry leader to bankruptcy.\n\nJack''s personal fortune evaporated. The family mansions were sold, the art collection auctioned off. Today, the Harrington name is synonymous with failure to adapt.\n\nThe lesson is clear: even the mightiest fortunes can fall when their owners refuse to evolve with the times.',
  'Robert Kane'
),
(
  'The Social Media Superstar Who Lost It All',
  'How virality turned into financial ruin.',
  E'At the height of her fame, Sophia Martinez had 100 million followers across social media platforms. Her influencer empire generated $50 million annually through sponsorships, merchandise, and her own product lines.\n\nBut Sophia made a critical mistake: she believed her fame would last forever. She spent lavishly—mansions in LA and Miami, a fleet of luxury cars, designer wardrobes that cost millions.\n\nWhen a scandal emerged about fake followers and undisclosed sponsorships, brands abandoned her. Her followers dwindled. Revenue dried up. But her expenses remained astronomical.\n\nWithin two years, Sophia was millions in debt. She filed for bankruptcy in 2024, selling off her properties and possessions. Today, she works as a marketing consultant, a far cry from her days as a social media queen.\n\nHer story highlights the danger of building wealth on fleeting fame. Without sustainable business practices and financial planning, even the most popular influencers can lose everything.',
  'Jennifer Lopez'
);

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION public.has_active_subscription(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.subscriptions
    WHERE user_id = _user_id
      AND status = 'active'
      AND current_period_end > now()
  )
$$;

-- Add trigger for articles updated_at
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();