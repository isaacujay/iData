// IData Quantitative Metrics & Social Proof

export interface MetricStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export const statsData: MetricStat[] = [
  {
    value: 45,
    suffix: '+',
    label: 'Enterprise Deliveries',
    description: 'Data platforms, AI pipelines, and web applications deployed worldwide'
  },
  {
    value: 99.2,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Measured by post-delivery milestone sign-offs and repeat retainers'
  },
  {
    value: 18000,
    suffix: '+',
    label: 'Hours Saved Annually',
    description: 'Manual spreadsheets and intake toil eliminated for client operations'
  },
  {
    value: 4.95,
    suffix: ' / 5.0',
    label: 'Average Client Rating',
    description: 'Verified reviews across enterprise, SME, and agency engagements'
  }
];

export function getStats(): MetricStat[] {
  return statsData;
}
