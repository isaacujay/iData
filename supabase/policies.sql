-- ==============================================================================
-- IDATA ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Paste this file into the Supabase SQL Editor after running schema.sql

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- Helper function: is_admin()
-- Checks if current auth user has role = 'admin' in profiles table
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- Profiles Policies
-- ------------------------------------------------------------------------------
-- Users can read their own profile; admins can read all profiles; team members on shared projects
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- ------------------------------------------------------------------------------
-- Leads (Quote Requests)
-- Anyone (visitors) can submit a lead. Only admins can view and manage leads.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can submit leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view and manage all leads"
  ON public.leads FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Reviews
-- Anyone can read approved reviews.
-- Anyone can submit a pending review.
-- Only admins can approve, edit, or delete reviews.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Public can submit review"
  ON public.reviews FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "Admins can manage all reviews"
  ON public.reviews FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Projects (Client Portal)
-- Clients read only their own projects.
-- Team members assigned in project_members can read projects.
-- Admins can read and manage all projects.
-- ------------------------------------------------------------------------------
CREATE POLICY "Clients read own projects"
  ON public.projects FOR SELECT
  USING (
    auth.uid() = client_id 
    OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = projects.id AND user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admins manage projects"
  ON public.projects FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Project Members
-- Members and clients can see who is on their projects; admins can manage.
-- ------------------------------------------------------------------------------
CREATE POLICY "View project members"
  ON public.project_members FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_members.project_id AND client_id = auth.uid())
    OR user_id = auth.uid()
    OR public.is_admin()
  );

CREATE POLICY "Admins manage project members"
  ON public.project_members FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Milestones
-- ------------------------------------------------------------------------------
CREATE POLICY "View project milestones"
  ON public.milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = milestones.project_id 
      AND (client_id = auth.uid() OR public.is_admin() OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = milestones.project_id AND user_id = auth.uid()))
    )
  );

CREATE POLICY "Admins manage milestones"
  ON public.milestones FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Deliverables
-- Clients can download published deliverables for their projects.
-- ------------------------------------------------------------------------------
CREATE POLICY "View published deliverables"
  ON public.deliverables FOR SELECT
  USING (
    (published = true AND EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = deliverables.project_id 
      AND (client_id = auth.uid() OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = deliverables.project_id AND user_id = auth.uid()))
    ))
    OR public.is_admin()
  );

CREATE POLICY "Admins manage deliverables"
  ON public.deliverables FOR ALL
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- Messages
-- Project participants can read and post messages in their projects.
-- ------------------------------------------------------------------------------
CREATE POLICY "Read project messages"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = messages.project_id 
      AND (client_id = auth.uid() OR public.is_admin() OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = messages.project_id AND user_id = auth.uid()))
    )
  );

CREATE POLICY "Insert project messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = messages.project_id 
      AND (client_id = auth.uid() OR public.is_admin() OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = messages.project_id AND user_id = auth.uid()))
    )
  );

-- ------------------------------------------------------------------------------
-- Newsletter Subscribers
-- Anyone can subscribe; only admins can list subscribers.
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view newsletter subscribers"
  ON public.newsletter_subscribers FOR SELECT
  USING (public.is_admin());
