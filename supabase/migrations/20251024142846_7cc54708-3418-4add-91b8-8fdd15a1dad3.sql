-- Add new fields for better structure
ALTER TABLE public.fallen_billionaires
ADD COLUMN IF NOT EXISTS key_factors text,
ADD COLUMN IF NOT EXISTS current_status text,
ADD COLUMN IF NOT EXISTS lessons_learned text;

-- Update ranking to be based on peak net worth (highest = rank 1)
-- This will be a function that can be called to recalculate rankings
CREATE OR REPLACE FUNCTION recalculate_rankings()
RETURNS void AS $$
BEGIN
  WITH ranked_billionaires AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY peak_net_worth DESC) as new_rank
    FROM fallen_billionaires
  )
  UPDATE fallen_billionaires fb
  SET rank = rb.new_rank
  FROM ranked_billionaires rb
  WHERE fb.id = rb.id;
END;
$$ LANGUAGE plpgsql;

-- Run the ranking recalculation
SELECT recalculate_rankings();