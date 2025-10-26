-- Fix infinite recursion in RLS policies
-- The issue: policies were querying the profiles table to check admin role,
-- which triggered the same policies again, causing infinite recursion.

-- Solution: Create a function that bypasses RLS to check admin status,
-- then use that function in policies.

-- Drop all existing policies that cause recursion
DROP POLICY IF EXISTS "profiles_select_all_for_admin" ON public.profiles;
DROP POLICY IF EXISTS "personal_bests_admin_all" ON public.member_personal_bests;
DROP POLICY IF EXISTS "specialties_admin_all" ON public.member_specialties;
DROP POLICY IF EXISTS "collection_admin_all" ON public.member_collection;
DROP POLICY IF EXISTS "blog_posts_admin_all" ON public.blog_posts;
DROP POLICY IF EXISTS "events_admin_all" ON public.events;
DROP POLICY IF EXISTS "resources_admin_all" ON public.resources;
DROP POLICY IF EXISTS "gallery_admin_all" ON public.gallery_images;
DROP POLICY IF EXISTS "blog_posts_select_published" ON public.blog_posts;

-- Create a function to check if current user is admin (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Recreate profiles policies without recursion
-- Allow everyone to view all profiles (member directory is public)
CREATE POLICY "profiles_select_all"
  ON public.profiles FOR SELECT
  USING (true);

-- Admin policies using the is_admin() function
CREATE POLICY "profiles_admin_update"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "profiles_admin_delete"
  ON public.profiles FOR DELETE
  USING (public.is_admin());

-- Personal bests admin policies
CREATE POLICY "personal_bests_admin_all"
  ON public.member_personal_bests FOR ALL
  USING (public.is_admin());

-- Specialties admin policies
CREATE POLICY "specialties_admin_all"
  ON public.member_specialties FOR ALL
  USING (public.is_admin());

-- Collection admin policies
CREATE POLICY "collection_admin_all"
  ON public.member_collection FOR ALL
  USING (public.is_admin());

-- Blog posts policies
CREATE POLICY "blog_posts_select_all"
  ON public.blog_posts FOR SELECT
  USING (published = true OR auth.uid() = author_id OR public.is_admin());

CREATE POLICY "blog_posts_admin_all"
  ON public.blog_posts FOR ALL
  USING (public.is_admin());

-- Events admin policies
CREATE POLICY "events_admin_all"
  ON public.events FOR ALL
  USING (public.is_admin());

-- Resources admin policies
CREATE POLICY "resources_admin_all"
  ON public.resources FOR ALL
  USING (public.is_admin());

-- Gallery admin policies
CREATE POLICY "gallery_admin_all"
  ON public.gallery_images FOR ALL
  USING (public.is_admin());

-- Update admin email to cubing_hyeonwoo@naver.com
-- Instructions:
-- 1. Sign up at /auth/sign-up with:
--    Email: cubing_hyeonwoo@naver.com
--    Password: cubinghyeonwoo12
--    Full Name: Hyeonwoo (Admin)
-- 2. Confirm the email
-- 3. Run this SQL to upgrade to admin:
--    UPDATE public.profiles SET role = 'admin' 
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'cubing_hyeonwoo@naver.com');
