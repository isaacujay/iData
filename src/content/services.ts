// Content layer for IData Services
// Typed getter functions to isolate pages from raw data structures

import { Service, ServiceSlug } from '../types';

export const servicesData: Service[] = [
  {
    id: 'srv-1',
    slug: 'ai-agentic-systems',
    title: 'AI & Agentic Systems',
    tagline: 'Autonomous AI pipelines, agentic workflows, and reasoning models engineered for production reliability.',
    shortDescription: 'Multi-agent systems, document ingestion, and custom LLM workflows that automate high-friction operational tasks.',
    iconName: 'Bot',
    bullets: [
      'Multi-agent task orchestration & tool calling',
      'Enterprise RAG & private document reasoning',
      'Continuous evaluations & guardrail security'
    ],
    problem: 'Enterprises struggle to move generative AI beyond fragile prompt prototypes into reliable, auditable, and cost-efficient business infrastructure.',
    solution: 'We architect production-ready agentic architectures with structured schemas, human-in-the-loop validation checkpoints, strict data privacy, and telemetry that prevents hallucination.',
    process: [
      { step: '01', title: 'Knowledge Mapping', description: 'Auditing your enterprise documentation, APIs, and domain edge cases.' },
      { step: '02', title: 'Agent Architecture', description: 'Designing deterministic state graphs and specialized sub-agents with tool access.' },
      { step: '03', title: 'Guardrail Hardening', description: 'Implementing prompt safety firewalls, semantic caching, and latency optimization.' },
      { step: '04', title: 'Continuous Telemetry', description: 'Deploying automated eval test suites and latency-cost monitoring.' }
    ],
    subOfferings: [
      {
        title: 'Autonomous Workflow Agents',
        description: 'Multi-step autonomous agents that triage incoming requests, search internal ERPs, and draft complete resolutions.',
        deliverables: ['State graph architecture', 'API integration connectors', 'Failure recovery fallbacks']
      },
      {
        title: 'Enterprise Semantic Retrieval (RAG)',
        description: 'High-precision hybrid vector and keyword search over company manuals, policies, and contracts.',
        deliverables: ['Document ingestion pipeline', 'Vector embedding index', 'Context window optimizer']
      },
      {
        title: 'Fine-Tuned Domain Models',
        description: 'Custom fine-tuned open-source LLMs deployed on private cloud infrastructure to protect proprietary IP.',
        deliverables: ['Dataset cleaning & synthetic data', 'LoRA / QLoRA training run', 'Inference latency tuning']
      }
    ],
    techStack: ['LangGraph', 'Python', 'FastAPI', 'OpenAI', 'Gemini API', 'PostgreSQL pgvector', 'Qdrant'],
    deliverables: ['Functional Agent Backend', 'Evaluation Test Bench', 'Operational Runbook', 'API Documentation']
  },
  {
    id: 'srv-2',
    slug: 'data-analytics-dashboards',
    title: 'Data Analytics & Dashboards',
    tagline: 'Executive decision dashboards and automated analytics pipelines that turn messy operational data into daily clarity.',
    shortDescription: 'Modern data stack implementations, warehouse modeling, and low-latency interactive BI dashboards.',
    iconName: 'BarChart3',
    bullets: [
      'Interactive executive dashboards with instant load times',
      'Automated ETL pipelines eliminating manual Excel work',
      'Single source of truth metrics modeling'
    ],
    problem: 'Leadership teams waste hours reconciling conflicting spreadsheet figures, resulting in delayed decisions and blind spots in cash flow and customer retention.',
    solution: 'We build unified business intelligence foundations with automated data ingestion, semantic metric layers, and intuitive visual dashboards updated in real time.',
    process: [
      { step: '01', title: 'Metric Definition', description: 'Locking down standardized KPI definitions across finance, sales, and operations.' },
      { step: '02', title: 'Data Ingestion', description: 'Building resilient ETL pipelines connecting ERPs, payment gateways, and CRMs.' },
      { step: '03', title: 'Warehouse Modeling', description: 'Creating clean dimensional tables and aggregated views with dbt.' },
      { step: '04', title: 'Dashboard Delivery', description: 'Crafting responsive, beautiful executive dashboards with automated daily alerts.' }
    ],
    subOfferings: [
      {
        title: 'Executive KPI Command Centers',
        description: 'C-suite dashboards tracking revenue, churn, unit economics, and cash burn with drill-down capabilities.',
        deliverables: ['Real-time KPI view', 'Scheduled email summary digests', 'Mobile-friendly views']
      },
      {
        title: 'Modern Data Stack Setup',
        description: 'End-to-end data pipelines from source APIs into a managed cloud warehouse with transformed schemas.',
        deliverables: ['Cloud warehouse configuration', 'Automated dbt models', 'Data freshness alerts']
      },
      {
        title: 'Operational & Sales Dashboards',
        description: 'Frontline tooling for sales managers and logistics directors to monitor rep quotas and delivery bottlenecks.',
        deliverables: ['Faceted filtering UI', 'Anomaly detection alerts', 'Role-based access controls']
      }
    ],
    techStack: ['PostgreSQL', 'Snowflake', 'BigQuery', 'dbt', 'PowerBI', 'Tableau', 'Metabase', 'Python'],
    deliverables: ['Clean Data Warehouse', 'Production Dashboards', 'Data Dictionary', 'Stakeholder Training Session']
  },
  {
    id: 'srv-3',
    slug: 'data-science-machine-learning',
    title: 'Data Science & Machine Learning',
    tagline: 'Custom predictive models, customer segmentation, and demand forecasting engineered to generate tangible ROI.',
    shortDescription: 'Machine learning systems that predict churn, optimize inventory, and detect fraud before it harms revenue.',
    iconName: 'LineChart',
    bullets: [
      'Predictive customer churn & lifetime value models',
      'Dynamic pricing & demand forecasting engines',
      'Production ML pipelines with automated retraining'
    ],
    problem: 'Companies sit on years of transactional records without the specialized statistical modeling needed to forecast demand or mitigate customer attrition.',
    solution: 'We deploy robust statistical and deep learning models directly into production, wrapped in clean APIs with explainable feature importance.',
    process: [
      { step: '01', title: 'Feasibility Analysis', description: 'Benchmarking data sufficiency, signal strength, and business ROI targets.' },
      { step: '02', title: 'Feature Engineering', description: 'Transforming raw events into high-signal feature stores.' },
      { step: '03', title: 'Model Training', description: 'Training, validating, and hyperparameter tuning diverse candidate models.' },
      { step: '04', title: 'Production API & Drift', description: 'Packaging models in Docker containers with real-time drift monitoring.' }
    ],
    subOfferings: [
      {
        title: 'Churn Prevention & Retention Engines',
        description: 'Early-warning scoring systems identifying high-value accounts at risk of defection 30 days in advance.',
        deliverables: ['Propensity score API', 'Risk tiering dashboard', 'Intervention triggers']
      },
      {
        title: 'Demand & Inventory Forecasting',
        description: 'Time-series forecasting models considering seasonality, marketing promotions, and lead times.',
        deliverables: ['SKU-level forecast pipeline', 'Safety stock recommendations', 'Inventory optimization guide']
      },
      {
        title: 'Fraud & Anomaly Detection',
        description: 'Sub-second transaction risk scoring preventing chargebacks and unauthorized account takeovers.',
        deliverables: ['Low-latency scoring endpoint', 'Rules engine override UI', 'Explainability logs']
      }
    ],
    techStack: ['Python', 'scikit-learn', 'XGBoost', 'PyTorch', 'MLflow', 'Docker', 'FastAPI'],
    deliverables: ['Trained Model Artifacts', 'Inference Microservice', 'Validation Report', 'Model Drift Monitor']
  },
  {
    id: 'srv-4',
    slug: 'software-web-development',
    title: 'Software & Web Development',
    tagline: 'Production-grade web applications, client portals, and resilient cloud backends built with modern TypeScript.',
    shortDescription: 'Custom SaaS products, internal operations tools, and payment integrations built with rigorous engineering standards.',
    iconName: 'Code',
    bullets: [
      'Modern React, Next.js & TypeScript frontends',
      'Scalable serverless & containerized backends',
      'Complex payment & CRM third-party integrations'
    ],
    problem: 'Off-the-shelf software rarely fits proprietary workflows, while low-quality outsourced code creates brittle systems that collapse under load.',
    solution: 'We engineer maintainable, secure software systems using modular architectures, thorough automated tests, and delightful responsive user interfaces.',
    process: [
      { step: '01', title: 'System Architecture', description: 'Defining database schemas, auth boundaries, and API contract specifications.' },
      { step: '02', title: 'UX & Interface Design', description: 'Crafting high-fidelity, accessible Figma components with strict design systems.' },
      { step: '03', title: 'Agile Implementation', description: 'Bi-weekly sprint releases with continuous preview deployments and test automation.' },
      { step: '04', title: 'CI/CD & Handover', description: 'Zero-downtime deployment pipelines with full documentation and knowledge transfer.' }
    ],
    subOfferings: [
      {
        title: 'Custom Client Portals & B2B Apps',
        description: 'Secure customer-facing portals featuring role-based authentication, file delivery, and invoicing.',
        deliverables: ['React / Vite frontend', 'Secure RBAC auth', 'File upload & download storage']
      },
      {
        title: 'API & Integration Middleware',
        description: 'High-throughput microservices connecting payment providers, legacy databases, and marketing suites.',
        deliverables: ['REST / GraphQL APIs', 'Webhook handling queues', 'Rate limiting & retry logic']
      },
      {
        title: 'Full-Stack Web Platforms',
        description: 'High-performance marketing sites, e-commerce platforms, and interactive web tools optimized for conversion.',
        deliverables: ['Sub-second Lighthouse scores', 'Mobile-first responsive design', 'SEO structured data']
      }
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Next.js', 'Docker', 'Vercel'],
    deliverables: ['Production Codebase', 'Complete Test Suite', 'Deployment Pipeline', 'System Architecture Guide']
  }
];

// Content Access Layer
export function getServices(): Service[] {
  return servicesData;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find(s => s.slug === slug);
}
