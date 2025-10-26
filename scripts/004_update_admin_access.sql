-- Update admin access to be restricted to specific email
-- This script ensures only cubing_hyeonwoo@naver.com has admin access

-- First, remove admin role from all users except the specific email
UPDATE public.profiles 
SET role = 'member' 
WHERE role = 'admin' 
AND id NOT IN (
  SELECT id FROM auth.users WHERE email = 'cubing_hyeonwoo@naver.com'
);

-- Grant admin role to the specific email if they exist
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'cubing_hyeonwoo@naver.com'
);

-- Add moderator role option to profiles
-- Moderators can help manage content but have less power than admins
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS moderator_permissions TEXT[];

-- Instructions for setting up the admin account:
-- 1. Sign up at /auth/sign-up with:
--    Email: cubing_hyeonwoo@naver.com
--    Password: cubinghyeonwoo12
-- 2. Confirm your email through the link sent
-- 3. Run this script to ensure admin access
-- 4. You can now access /admin with full control

-- Note: The admin layout now checks for BOTH:
-- - Specific email (cubing_hyeonwoo@naver.com) OR
-- - Admin role in database
-- This provides flexibility while maintaining security
