-- Fix search_path for recalculate_rankings function
DROP FUNCTION IF EXISTS recalculate_rankings();

CREATE OR REPLACE FUNCTION recalculate_rankings()
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;