-- Create profiles table that references auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- Allow admins to view all profiles
CREATE POLICY "profiles_select_all_for_admin"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', null),
    'member'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create admin user
-- Email: admin@gcuclub.com
-- Password: GCUAdmin2024!
-- Note: This creates the auth user. After running this script, 
-- you need to manually confirm the email in Supabase dashboard
-- or use the confirmation link sent to the email.

DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Insert admin user into auth.users (this is a simplified version)
  -- In production, you would use Supabase's signUp function
  -- For now, we'll create a profile entry that will be linked when admin signs up
  
  -- The admin should sign up normally with email: admin@gcuclub.com
  -- Then run this to upgrade their role:
  -- UPDATE public.profiles SET role = 'admin' WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@gcuclub.com');
END $$;

-- Instructions for creating admin account:
-- 1. Sign up normally at /auth/sign-up with:
--    Email: admin@gcuclub.com
--    Password: GCUAdmin2024!
--    Full Name: GCU Admin
-- 2. Confirm the email
-- 3. Run this SQL to upgrade to admin:
--    UPDATE public.profiles SET role = 'admin' 
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@gcuclub.com');
