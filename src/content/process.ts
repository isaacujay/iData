// IData Delivery Process Content

export interface ProcessStage {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const deliveryProcess: ProcessStage[] = [
  {
    step: '01',
    title: 'Discovery & Architectural Audit',
    duration: 'Week 1',
    description: 'We audit your source data systems, security constraints, and business goals to produce a zero-ambiguity technical specification.',
    deliverables: ['Technical Specification Document', 'Architecture Blueprint', 'Fixed Milestone Schedule']
  },
  {
    step: '02',
    title: 'Sprint Architecture & Data Modeling',
    duration: 'Weeks 2–3',
    description: 'We configure development environments, schema foundations, and core data pipelines with continuous CI/CD integration.',
    deliverables: ['Database & Pipeline Schemas', 'Figma Component Prototypes', 'Private Client Portal Access']
  },
  {
    step: '03',
    title: 'Iterative Implementation & Testing',
    duration: 'Weeks 4–6',
    description: 'Rapid sprint cycles with weekly demo reviews. Automated unit, integration, and security test suites ensure robust stability.',
    deliverables: ['Functional Staging Environments', 'Weekly Video Demos', 'Automated Test Suites']
  },
  {
    step: '04',
    title: 'Deployment, Hardening & Handover',
    duration: 'Weeks 7–8',
    description: 'Zero-downtime production deployment, operational runbooks, telemetry configuration, and thorough team training.',
    deliverables: ['Production System Deployment', 'System Architecture Runbook', 'Staff Training & 30-Day Warranty']
  }
];

export function getDeliveryProcess(): ProcessStage[] {
  return deliveryProcess;
}
