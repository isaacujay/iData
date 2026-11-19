# IData — Owner Setup & Deployment Manual
**Confidential Guide for Isaac Ujay & IData Technical Administrators**  
*Version 2.0 | November 2026*

This guide walks you through every step to personalize, run, configure, and deploy your new IData platform.

---

## 1. Quick Start (Zero-Config Demo Mode)

You can run this project locally right now without configuring any database, email, or third-party accounts:

```bash
# 1. Ensure Node.js 18+ is installed on your computer
node -v

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open your browser to `http://localhost:3000`.  
The site will run in **Demo Mode**:
- All quote request forms, newsletter signups, and client reviews work immediately and save to your local browser storage.
- The Client Portal (`/portal`) lets you log in with pre-configured demo client or admin accounts with a single click.
- An unobtrusive badge in the bottom-left corner confirms Demo Mode is active.

---

## 2. Master Checklist: Everything You Must Provide

| Item | Where to Enter It | File / Variable Name | Status |
| :--- | :--- | :--- | :--- |
| **Brand Logo (Full)** | `public/brand/` | `logo.svg` | Optional (Custom vector supplied) |
| **Brand Logo Mark** | `public/brand/` | `logo-mark.svg` | Optional (Custom vector supplied) |
| **Favicon** | `public/brand/` | `favicon.ico` or `logo-mark.svg` | Optional |
| **Social Share Card (OG)**| `public/brand/` | `og-image.png` (1200x630px) | Recommended |
| **Brand Name & Tagline** | `src/config/site.config.ts` | `brandName`, `tagline` | Configured |
| **Owner Contact Email** | `src/config/site.config.ts` | `ownerEmail: 'issacujay@gmail.com'` | Configured |
| **Support Email** | `src/config/site.config.ts` | `supportEmail` | Recommended |
| **Theme Accent Colors** | `src/config/site.config.ts` | `colors.accent`, `colors.accent2` | Configured |
| **Social Media Profiles** | `src/config/site.config.ts` | `social.linkedin`, `social.github`, etc. | Recommended |
| **Calendly Booking URL** | `src/config/site.config.ts` | `calendlyUrl` | Recommended |
| **Service Descriptions** | `src/content/services.ts` | `servicesData` array | Configured |
| **Case Studies & Metrics**| `src/content/caseStudies.ts`| `caseStudiesData` array | Configured |
| **Team Leadership & Bios**| `src/content/team.ts` | `teamData` array | Configured (Isaac Ujay set as CEO) |
| **Client Testimonials** | `src/content/reviews.ts` | `seedReviews` array | Configured |
| **Demo YouTube Videos** | `src/content/videos.ts` | `videosData` array (YouTube IDs) | Configured |
| **Delivery FAQs** | `src/content/faqs.ts` | `faqsData` array | Configured |
| **Privacy & Terms Text** | `src/content/legal/` | `privacy.ts`, `terms.ts` | Configured |
| **Supabase URL & Key** | `.env` or Vercel Settings | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Required for Live Mode |
| **Email API Key** | `.env` or Vercel Settings | `RESEND_API_KEY`, `OWNER_EMAIL` | Required for Live Email |

---

## 3. Logo and Images Guidelines

All media paths live in the `/public` folder:

```
public/
├── brand/
│   ├── logo.svg          <- Primary horizontal logo (Navbar & Footer)
│   ├── logo-mark.svg     <- Square brand mark / Favicon icon
│   └── og-image.png      <- 1200 x 630 px social share banner
└── images/
    ├── hero/             <- Optional hero visuals (< 200 KB)
    ├── team/             <- 800 x 800 px square portraits (WebP or JPG < 150 KB)
    ├── work/             <- 1200 x 675 px 16:9 case study screenshots (< 200 KB)
    └── reviews/          <- 200 x 200 px client avatars (< 50 KB)
```

**Format Recommendations:**
- Use **WebP** or **SVG** whenever possible for instant load times.
- Keep total page asset weight under 1.5 MB to maintain 90+ Lighthouse mobile performance.

---

## 4. Editing Content: Annotated Examples

All marketing copy is decoupled from UI code. Simply edit the corresponding file in `src/content/`:

### A. `src/config/site.config.ts` (Global Settings)
```typescript
export const siteConfig = {
  brandName: 'IData',
  // OWNER: Replace with your primary lead destination email
  ownerEmail: 'issacujay@gmail.com',
  // OWNER: Paste your custom Calendly discovery link
  calendlyUrl: 'https://calendly.com/your-team/30min',
  // OWNER: Feature flags to enable or disable sections
  features: {
    enablePortal: true,             // Enables /portal
    enableReviewsSubmission: true,  // Enables public review form on /reviews
    enableExtendedNetwork: true,    // Displays vetted freelancers on /team
  }
};
```

### B. `src/content/services.ts` (The 4 Core Services)
To change the bullets, promises, or deliverables for any practice:
```typescript
{
  slug: 'ai-agentic-systems',
  title: 'AI & Agentic Systems',
  tagline: 'Autonomous AI pipelines and reasoning models...',
  bullets: [
    'Multi-agent task orchestration & tool calling',
    'Enterprise RAG & private document reasoning',
    'Continuous evaluations & guardrail security'
  ],
  // Problem & Solution displayed side-by-side on the detail page:
  problem: 'Enterprises struggle to move generative AI beyond fragile prompts...',
  solution: 'We architect production-ready agentic architectures...'
}
```

### C. `src/content/team.ts` (Leadership & Squad)
```typescript
{
  id: 'team-isaac',
  name: 'Isaac Ujay', // OWNER: Your full name
  title: 'Founder & Chief Executive Officer',
  level: 'leadership', // 'leadership' | 'core' | 'extended'
  bio: 'Data architect and software engineer with over a decade of experience...',
  focus: ['Enterprise Architecture', 'AI Governance', 'Client Partner Relations'],
  links: {
    linkedin: 'https://linkedin.com/in/issacujay',
    github: 'https://github.com/issacujay',
    email: 'mailto:issacujay@gmail.com'
  }
}
```

---

## 5. Environment Variables Guide

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | What It Does | Where to Find It |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Connects your frontend to Supabase PostgreSQL | Supabase Dashboard -> Project Settings -> API -> Project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anonymous key (safe for browser) | Supabase Dashboard -> Project Settings -> API -> Project API Keys (`anon` `public`) |
| `VITE_SITE_URL` | Canonical production domain | Your domain (e.g. `https://idata.agency`) |
| `VITE_CALENDLY_URL` | Overrides Calendly booking link | Calendly -> Event Types -> Share -> Copy Link |
| `OWNER_EMAIL` | Receives lead alerts from serverless function | Your email address (`issacujay@gmail.com`) |
| `RESEND_API_KEY` | Authorizes email sending | Resend.com Dashboard -> API Keys -> Create API Key |
| `FROM_EMAIL` | Sender address | Resend.com -> Domains -> Verified Domain (e.g. `notifications@idata.agency`) |

---

## 6. Supabase Setup (Step-by-Step)

Follow these steps to turn on live database persistence:

1. **Create a Free Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a new project named `idata-platform`.
   - Choose the region closest to your primary audience (e.g., `eu-west-1` or `eu-central-1`).

2. **Execute Database Schema**:
   - In your Supabase dashboard, click **SQL Editor** -> **New Query**.
   - Open `supabase/schema.sql` in this repo, copy all contents, paste into the editor, and click **Run**.
   - This creates all tables: `profiles`, `leads`, `reviews`, `projects`, `project_members`, `milestones`, `deliverables`, `messages`, and `newsletter_subscribers`.

3. **Execute Security Policies (RLS)**:
   - Create another query in the SQL Editor.
   - Copy all contents from `supabase/policies.sql`, paste, and click **Run**.
   - This locks all tables with Row-Level Security: visitors can only insert leads and read approved reviews; clients only see their own projects; only admins see all leads.

4. **Seed Sample Data (Optional)**:
   - If you want initial test rows in your live database, run `supabase/seed.sql`.

5. **Create Storage Buckets**:
   - Go to **Storage** -> **New bucket**.
   - Create `attachments` (Private).
   - Create `deliverables` (Private).
   - Create `review-photos` (Public).
   - Create `avatars` (Public).

6. **Promote Yourself to Administrator**:
   - In Supabase -> **Authentication** -> **Users**, click **Add user** (or sign up through `/portal`).
   - Run this SQL query to give your account admin rights:
     ```sql
     UPDATE public.profiles
     SET role = 'admin'
     WHERE id = (SELECT id FROM auth.users WHERE email = 'issacujay@gmail.com');
     ```

---

## 7. Email Setup (Resend)

1. Register at [resend.com](https://resend.com) (free tier includes 3,000 emails/month).
2. Go to **API Keys** -> **Create API Key**.
3. Add a verified domain or use the free onboarding domain (`onboarding@resend.dev` for initial testing).
4. In Vercel or your `.env`, set:
   ```env
   RESEND_API_KEY=re_123456789
   OWNER_EMAIL=issacujay@gmail.com
   FROM_EMAIL=notifications@yourdomain.com
   ```

---

## 8. Calendly Setup

1. Log into your Calendly account.
2. Create an event type named **"IData Discovery Call"** (30 minutes).
3. Copy your link (e.g. `https://calendly.com/idata-consulting/discovery-call`).
4. Paste it into `src/config/site.config.ts` under `calendlyUrl`.

---

## 9. Videos Setup

1. Record your product or dashboard walkthroughs (e.g. via Loom or Screen Studio).
2. Upload them to YouTube with visibility set to **Unlisted** (free hosting, no ads, no recommendations).
3. Copy the 11-character video ID from the YouTube URL (e.g., in `youtube.com/watch?v=M7lc1UVf-VE`, the ID is `M7lc1UVf-VE`).
4. Open `src/content/videos.ts` and paste the ID into `youtubeId`.

---

## 10. Local Pre-Flight Test Checklist

Before deploying, verify these workflows on `http://localhost:3000`:
- [ ] **Home Page**: Scroll down; verify the tech marquee pauses on hover; click the video play button and confirm the YouTube embed loads without layout shifts.
- [ ] **Command Palette**: Press `Ctrl+K` (or `Cmd+K` on Mac); search "AI" or "Isaac"; click a result and verify it jumps directly to the page.
- [ ] **Quote Request**: Go to `/contact`, fill in all fields, attach a file, and click Submit. Confirm the confetti fires and the success card renders.
- [ ] **Reviews Page**: Go to `/reviews`, test the featured carousel arrows, and submit a review. Notice the success confirmation.
- [ ] **Admin Console**: Visit `/admin`. Click "Sign In as Admin" to view the lead and the pending review you just submitted. Click **Approve** on the review and verify it appears on `/reviews`.
- [ ] **Client Portal**: Visit `/portal`. Click "Instant Access as Demo Client". Inspect sprint milestones, test downloading deliverables, and post a message to the squad chat.

---

## 11. Deploying to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete IData portfolio and portal"
   git remote add origin https://github.com/your-username/idata-site.git
   git push -u origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **Add New...** -> **Project**.
3. Select your `idata-site` repository.
4. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SITE_URL` (your production URL)
   - `OWNER_EMAIL`
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
5. Click **Deploy**. Vercel will build the frontend and deploy the `api/notify.ts` serverless function automatically!
6. Once deployed, copy your production Vercel URL (e.g. `https://idata-site.vercel.app`) and add it to your Supabase project under **Authentication** -> **URL Configuration** -> **Redirect URLs**.

---

## 12. Adding Your Custom Domain (.com / .agency)

1. Buy your domain (e.g., from Namecheap or Cloudflare).
2. In Vercel -> Project Settings -> **Domains**, enter your domain name (e.g. `idata.agency`).
3. Follow the DNS instructions provided by Vercel (adding the `A` and `CNAME` records).
4. Update `siteUrl` in `src/config/site.config.ts` and `VITE_SITE_URL` in Vercel to match your new domain.

---

## 13. Modifying & Migrating

- **Changing the Color Theme**: Modify the hex colors in `src/config/site.config.ts` and `src/index.css`.
- **Adding a New Service**: Add a new entry to `servicesData` in `src/content/services.ts`. It will automatically appear in navigation, search, and footer!
- **Swapping the Database**: All database calls are centralized in `src/services/database.ts`. To switch to Firebase, Prisma, or Supabase self-hosted, only this single file needs updating.
- **Swapping Email Provider**: Edit `api/notify.ts` to connect SendGrid, Postmark, or Mailgun instead of Resend.

---

## 14. Free-Tier Monitoring & Backups

- **Supabase Free Tier**: Includes 500 MB database storage, 1 GB file storage, and 50,000 monthly active users.
  - *Tip*: Supabase pauses free-tier projects if they receive no queries for 7 days. Once live, regular visitor traffic prevents pausing.
  - *Exporting Backups*: Go to Supabase -> Database -> Backups, or export table CSVs anytime from the Table Editor.
- **Vercel Free Tier**: Includes 100 GB bandwidth and 100,000 serverless function invocations per month, which is more than enough for thousands of monthly visitors.
- **Resend Free Tier**: Includes 3,000 emails/month (100 emails/day).

---

## 15. Top 10 Troubleshooting Tips

1. **Build fails with missing import**: Run `npm run lint` locally to check TypeScript errors.
2. **Form succeeds but no email received**: Verify `RESEND_API_KEY` and ensure `FROM_EMAIL` is verified in your Resend account.
3. **Supabase returns 401 Unauthorized**: Confirm `VITE_SUPABASE_ANON_KEY` is the `anon` key, not the `service_role` key.
4. **YouTube video does not play**: Check that the video visibility is set to **Unlisted** (not Private).
5. **Calendly embed is blank**: Check that your Calendly event type is active and public.
6. **Client cannot see projects**: Ensure the client's `profiles.id` matches the `client_id` in the `projects` table.
7. **Uploaded file too large**: Files over 5 MB are rejected by design. Compress PDFs or screenshots before uploading.
8. **Styles not updating**: Tailwind v4 uses `@import "tailwindcss";` in `src/index.css`. Run `npm run build` to verify cache.
9. **Search palette does not show newly added content**: Refresh the index by adding items to `src/content/` files.
10. **Demo banner won't disappear**: The demo banner automatically hides as soon as valid `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` keys are detected.

---

## 16. Final Launch Checklist

- [ ] Replaced sample founder name and email in `src/config/site.config.ts`.
- [ ] Added real Calendly discovery link in `src/config/site.config.ts`.
- [ ] Replaced YouTube demo IDs in `src/content/videos.ts`.
- [ ] Created Supabase project and executed `supabase/schema.sql` and `supabase/policies.sql`.
- [ ] Configured environment variables in Vercel.
- [ ] Verified custom domain SSL certificate in Vercel.
- [ ] Tested quote form end-to-end.
