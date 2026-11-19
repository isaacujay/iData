-- ==============================================================================
-- IDATA SAMPLE SEED DATA (Optional for Supabase demo testing)
-- ==============================================================================
-- Run this in the Supabase SQL editor if you want initial test rows in your live DB.

-- Sample Reviews (Approved)
INSERT INTO public.reviews (author_name, company, role_title, service_slug, rating, body, status, featured)
VALUES
(
  'Adebayo Ogunlesi',
  'Apex Capital Partners',
  'Managing Partner',
  'data-analytics-dashboards',
  5,
  'IData transformed our weekly financial reporting from a 14-hour manual spreadsheet scramble into real-time executive dashboards. Flawless delivery and unmatched technical precision.',
  'approved',
  true
),
(
  'Elena Rostova',
  'Nordic Health Technologies',
  'VP of Engineering',
  'ai-agentic-systems',
  5,
  'Their multi-agent workflow automated 82% of our clinical triage notes intake with strict adherence to data governance. Highly recommend Isaac and the IData team.',
  'approved',
  true
),
(
  'Marcus Sterling',
  'HyperScale Logistics UK',
  'Chief Operating Officer',
  'data-science-machine-learning',
  5,
  'The route optimization and demand forecasting model cut our deadhead freight mileage by 18% in the first quarter of deployment. Transparent process from day one.',
  'approved',
  true
),
(
  'Chinedu Eze',
  'PayMatrix Africa',
  'Head of Product',
  'software-web-development',
  5,
  'Delivered our merchant settlement API and dashboard four weeks ahead of schedule. Rock-solid TypeScript architecture and zero production bugs since launch.',
  'approved',
  true
);

-- Sample Leads
INSERT INTO public.leads (name, email, company, service_slug, budget_range, message, status)
VALUES
(
  'Sarah Jenkins',
  's.jenkins@globex.io',
  'Globex Solutions',
  'ai-agentic-systems',
  '$10k - $25k',
  'We want to deploy an autonomous agent pipeline for customer onboarding verification.',
  'qualified'
),
(
  'Tunde Bakare',
  'tunde@lagosfin.ng',
  'Lagos Financial',
  'data-analytics-dashboards',
  '$5k - $10k',
  'Need real-time transaction monitoring and fraud detection dashboards.',
  'new'
);
