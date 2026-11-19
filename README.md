# IData — Enterprise AI, Analytics & Software Engineering Portfolio

IData turns business data into decisions through AI, analytics, and software, delivered by a trusted core team and vetted domain specialists.

![IData Platform Screenshot](public/brand/og-image.png)

---

## 1. About IData

IData is a full-service technical agency delivering high-impact solutions across four core practices:
1. **AI & Agentic Systems**: Autonomous task orchestration, enterprise RAG, and private LLM workflows.
2. **Data Analytics & Dashboards**: Low-latency executive BI dashboards, dbt modeling, and automated data pipelines.
3. **Data Science & Machine Learning**: Demand forecasting, churn prevention, and custom predictive inference.
4. **Software & Web Development**: Resilient React/TypeScript applications, client portals, and secure cloud APIs.

**Primary Audiences:**
- International enterprises and remote companies seeking senior data and software engineering capacity.
- Fast-growing African startups and fintechs requiring robust, scalable payment and data rails.
- Creative and digital agencies seeking technical delivery partners.

---

## 2. Site Structure & Route Map

Below is the complete page tree detailing how visitors and clients navigate the site:

```
/ (Home) ─── Striking short introduction, continuous tech marquee, service cards, video demo, proof points
 │
 ├── /services ─── Overview of the 4 core disciplines and the IData delivery standard
 │    ├── /services/ai-agentic-systems ─── Autonomous agents, RAG, and private fine-tuned LLMs
 │    ├── /services/data-analytics-dashboards ─── Real-time executive BI dashboards and dbt pipelines
 │    ├── /services/data-science-machine-learning ─── Forecasting, customer retention, and scoring models
 │    └── /services/software-web-development ─── Custom portals, APIs, and modern TypeScript web apps
 │
 ├── /work ─── Filterable gallery of case studies across client segments
 │    └── /work/:slug ─── In-depth case study breakdown: challenge, solution, metrics, stack, and demo
 │
 ├── /reviews ─── Client social proof showpiece: rating breakdown, featured carousel, masonry wall, submission form
 │
 ├── /team ─── Three-layer squad view: Leadership, Core Engineering Squad, and Vetted Extended Network
 │
 ├── /about ─── Mission, delivery methodology, four-phase sprint process, and FAQs
 │
 ├── /contact ─── Quote request form with budget range & file upload + 30-minute Calendly scheduling
 │
 ├── /portal ─── Client Portal: authenticated project status, sprint milestones, deliverables downloads, chat
 │
 ├── /admin ─── Private Admin Console: quote leads pipeline, review moderation, project oversight
 │
 ├── /privacy ─── Privacy Policy & data protection practices
 └── /terms ─── Terms of Service & intellectual property handover terms
```

---

## 3. What a Visitor Can Do

- **Explore Services**: Deep dive into any of the 4 core disciplines, inspecting problem-solution pairs, delivery stages, and sub-offerings.
- **Inspect Demos & Case Studies**: Watch privacy-friendly, click-to-load video demonstrations and review quantified results (e.g., *14 hrs saved/week*, *82% automated*).
- **Verify Testimonials**: Read ratings, filter by client segment, and submit a client review for administrative approval.
- **Instant Site Search**: Press `Ctrl+K` or click the search icon to search across all services, case studies, team members, and FAQs with zero server latency.
- **Request an Itemized Quote**: Submit technical specifications, timeline expectations, budget range, and attachments for a fixed-price proposal.
- **Schedule a Discovery Call**: Book a direct 30-minute consultation via integrated Calendly scheduling.
- **Access the Client Portal**: Clients log in to inspect sprint progress, download signed milestone deliverables, and message the squad.

---

## 4. Architecture & Technical Overview

IData is architected with a decoupled, modular design ensuring zero vendor lock-in:

```
┌────────────────────────────────────────────────────────┐
│             React 19 + TypeScript + Vite               │
│          Tailwind CSS v4 + Framer Motion               │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│     Content Layer     │       │     Service Layer     │
│   src/content/*.ts    │       │  src/services/*.ts    │
│  (Static & Cacheable) │       │   (Database / Auth)   │
└───────────────────────┘       └───────────┬───────────┘
                                            │
                      ┌─────────────────────┴─────────────────────┐
                      ▼                                           ▼
          [Live Mode: Supabase]                       [Demo Mode: Mock Store]
      • PostgreSQL + Row-Level Security            • Zero configuration required
      • Real-time Auth & Storage Buckets           • LocalStorage persistence
      • Vercel Serverless Function (Resend)        • Instant Client & Admin logins
```

- **Front End**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router v7.
- **Search Engine**: Fuse.js client-side indexing.
- **Database & Auth**: Supabase (PostgreSQL with Row-Level Security) with automatic fallback to zero-config Demo Mode.
- **Email Notifications**: Serverless API endpoint (`api/notify.ts`) sending alerts to the business owner via Resend.
- **Video Delivery**: Privacy-friendly YouTube nocookie click-to-load embeds.

---

## 5. Contact & Operations

- **Company**: IData Technologies & Consulting Ltd
- **Founder & CEO**: Isaac Ujay (`issacujay@gmail.com`)
- **Support**: `support@idata.agency`
- **Headquarters**: Lagos, Nigeria & Remote Worldwide

> **For the Owner / Administrator:**  
> Detailed instructions on adding API keys, deploying to Vercel, configuring Supabase, editing content, and launching your custom domain are provided in **`OWNER_GUIDE.md`**.
