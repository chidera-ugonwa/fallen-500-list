-- Add wealth_lost computed column and update ranking logic
-- First, add a stored wealth_lost column for easier querying
ALTER TABLE public.fallen_billionaires 
ADD COLUMN IF NOT EXISTS wealth_lost numeric GENERATED ALWAYS AS (peak_net_worth - current_net_worth) STORED;

-- Update the recalculate_rankings function to rank by wealth_lost (highest first)
-- Ties broken by peak_net_worth (highest first), then alphabetically by name
CREATE OR REPLACE FUNCTION public.recalculate_rankings()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  WITH ranked_billionaires AS (
    SELECT id, 
           ROW_NUMBER() OVER (
             ORDER BY (peak_net_worth - current_net_worth) DESC, 
                      peak_net_worth DESC, 
                      name ASC
           ) as new_rank
    FROM fallen_billionaires
  )
  UPDATE fallen_billionaires fb
  SET rank = rb.new_rank
  FROM ranked_billionaires rb
  WHERE fb.id = rb.id;
END;
$$;

-- Recalculate all rankings based on new logic
SELECT recalculate_rankings();