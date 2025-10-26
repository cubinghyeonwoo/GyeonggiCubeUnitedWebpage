-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.member_personal_bests CASCADE;
DROP TABLE IF EXISTS public.member_specialties CASCADE;
DROP TABLE IF EXISTS public.member_collection CASCADE;

-- Extend profiles table with member information
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS wca_id TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS main_cube TEXT,
ADD COLUMN IF NOT EXISTS competition_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS joined_date DATE DEFAULT CURRENT_DATE;

-- Create member_personal_bests table
CREATE TABLE IF NOT EXISTS public.member_personal_bests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL, -- e.g., "3x3x3", "2x2x2", "4x4x4", "Pyraminx", etc.
  single_time TEXT, -- e.g., "8.45"
  average_time TEXT, -- e.g., "10.23"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, event_name)
);

-- Create member_specialties table
CREATE TABLE IF NOT EXISTS public.member_specialties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL, -- e.g., "3x3x3", "One-Handed", "Blindfolded"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, specialty)
);

-- Create member_collection table
CREATE TABLE IF NOT EXISTS public.member_collection (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cube_name TEXT NOT NULL, -- e.g., "GAN 12 MagLev", "MoYu RS3M 2020"
  cube_type TEXT NOT NULL, -- e.g., "3x3x3", "2x2x2", "Pyraminx"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.member_personal_bests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_collection ENABLE ROW LEVEL SECURITY;

-- Policies for member_personal_bests
CREATE POLICY "personal_bests_select_all"
  ON public.member_personal_bests FOR SELECT
  USING (true);

CREATE POLICY "personal_bests_insert_own"
  ON public.member_personal_bests FOR INSERT
  WITH CHECK (auth.uid() = member_id);

CREATE POLICY "personal_bests_update_own"
  ON public.member_personal_bests FOR UPDATE
  USING (auth.uid() = member_id);

CREATE POLICY "personal_bests_delete_own"
  ON public.member_personal_bests FOR DELETE
  USING (auth.uid() = member_id);

-- Policies for member_specialties
CREATE POLICY "specialties_select_all"
  ON public.member_specialties FOR SELECT
  USING (true);

CREATE POLICY "specialties_insert_own"
  ON public.member_specialties FOR INSERT
  WITH CHECK (auth.uid() = member_id);

CREATE POLICY "specialties_update_own"
  ON public.member_specialties FOR UPDATE
  USING (auth.uid() = member_id);

CREATE POLICY "specialties_delete_own"
  ON public.member_specialties FOR DELETE
  USING (auth.uid() = member_id);

-- Policies for member_collection
CREATE POLICY "collection_select_all"
  ON public.member_collection FOR SELECT
  USING (true);

CREATE POLICY "collection_insert_own"
  ON public.member_collection FOR INSERT
  WITH CHECK (auth.uid() = member_id);

CREATE POLICY "collection_update_own"
  ON public.member_collection FOR UPDATE
  USING (auth.uid() = member_id);

CREATE POLICY "collection_delete_own"
  ON public.member_collection FOR DELETE
  USING (auth.uid() = member_id);

-- Admin policies for all tables
CREATE POLICY "personal_bests_admin_all"
  ON public.member_personal_bests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "specialties_admin_all"
  ON public.member_specialties FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "collection_admin_all"
  ON public.member_collection FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create tables for blog, events, resources, and gallery
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL, -- 'competition', 'practice', 'workshop'
  date DATE NOT NULL,
  time TEXT,
  location TEXT,
  venue TEXT,
  max_participants INTEGER,
  registration_deadline DATE,
  fee TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL, -- 'tutorial', 'video', 'document', 'link'
  category TEXT, -- 'beginner', 'intermediate', 'advanced'
  url TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT, -- 'competition', 'practice', 'workshop', 'social'
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "blog_posts_select_published"
  ON public.blog_posts FOR SELECT
  USING (published = true OR auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "events_select_all"
  ON public.events FOR SELECT
  USING (true);

CREATE POLICY "resources_select_all"
  ON public.resources FOR SELECT
  USING (true);

CREATE POLICY "gallery_select_all"
  ON public.gallery_images FOR SELECT
  USING (true);

-- Admin write policies
CREATE POLICY "blog_posts_admin_all"
  ON public.blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "events_admin_all"
  ON public.events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "resources_admin_all"
  ON public.resources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "gallery_admin_all"
  ON public.gallery_images FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Update admin credentials
-- Admin email: cubing_hyeonwoo@naver.com
-- Admin password: cubinghyeonwoo12
-- 
-- Instructions:
-- 1. Sign up at /auth/sign-up with the admin credentials
-- 2. Confirm email
-- 3. Run this to upgrade to admin:
--    UPDATE public.profiles SET role = 'admin' 
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'cubing_hyeonwoo@naver.com');
