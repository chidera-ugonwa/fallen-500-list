-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a more restrictive policy - users can only view their own profile
-- Admins can view all profiles for management purposes
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
);