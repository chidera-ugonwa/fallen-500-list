-- Create a function to convert text to proper title case
-- Handles spaces, hyphens, and apostrophes correctly
CREATE OR REPLACE FUNCTION public.to_title_case(input_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  result TEXT := '';
  word TEXT;
  words TEXT[];
  i INT;
  char_val TEXT;
  capitalize_next BOOLEAN := TRUE;
BEGIN
  IF input_text IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Process character by character to handle hyphens and apostrophes
  FOR i IN 1..length(input_text) LOOP
    char_val := substring(input_text FROM i FOR 1);
    
    IF char_val = ' ' OR char_val = '-' THEN
      result := result || char_val;
      capitalize_next := TRUE;
    ELSIF char_val = '''' THEN
      result := result || char_val;
      capitalize_next := TRUE;
    ELSIF capitalize_next THEN
      result := result || upper(char_val);
      capitalize_next := FALSE;
    ELSE
      result := result || lower(char_val);
    END IF;
  END LOOP;
  
  RETURN result;
END;
$$;

-- Create a trigger function to normalize name before insert/update
CREATE OR REPLACE FUNCTION public.normalize_billionaire_name()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.name := to_title_case(NEW.name);
  RETURN NEW;
END;
$$;

-- Create trigger on fallen_billionaires table
DROP TRIGGER IF EXISTS normalize_name_trigger ON public.fallen_billionaires;
CREATE TRIGGER normalize_name_trigger
  BEFORE INSERT OR UPDATE OF name ON public.fallen_billionaires
  FOR EACH ROW
  EXECUTE FUNCTION public.normalize_billionaire_name();

-- Update all existing records to Title Case
UPDATE public.fallen_billionaires
SET name = to_title_case(name)
WHERE name IS NOT NULL;