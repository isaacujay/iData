// FAQs Content for IData
import { FAQ } from '../types';

export const faqsData: FAQ[] = [
  {
    id: 'faq-1',
    category: 'services',
    question: 'How do we know which service is right for our organization?',
    answer: 'During our initial 30-minute discovery call, we audit your existing data infrastructure, current operational bottlenecks, and strategic milestones. If you need immediate visibility, we recommend an Executive Dashboard. If you want to eliminate manual knowledge work, we scope an AI Agent workflow.'
  },
  {
    id: 'faq-2',
    category: 'delivery',
    question: 'How does IData deliver projects so quickly without sacrificing code quality?',
    answer: 'We operate through a battle-tested core leadership squad pairing directly with vetted domain specialists. Every project follows deterministic two-week sprint milestones, automated CI/CD test gates, and transparent access via our dedicated Client Portal.'
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: 'What are your typical engagement models and payment terms?',
    answer: 'We provide fixed-price milestone delivery for clearly defined scopes (e.g. MVPs, pipelines, dashboards) and monthly dedicated engineering squads for continuous product evolution. We never bill surprise overage hours.'
  },
  {
    id: 'faq-4',
    category: 'portal',
    question: 'How do clients follow their project progress and deliverables?',
    answer: 'Every client is provided secure login credentials to the IData Client Portal (/portal), where you can view live sprint progress, review milestone completions, download signed deliverables, and message your project leads directly.'
  },
  {
    id: 'faq-5',
    category: 'services',
    question: 'Can IData work with our existing engineering and data team?',
    answer: 'Yes. Over 40% of our engagements involve augmenting existing corporate engineering teams, providing specialized senior capacity in agentic AI architecture, dbt dimensional modeling, or modern React portals.'
  },
  {
    id: 'faq-6',
    category: 'delivery',
    question: 'Where is your team based and what time zones do you support?',
    answer: 'Our headquarters and core leadership are based in Lagos, Nigeria (WAT / GMT+1), with distributed senior specialists across Europe and the Americas. We provide daily overlapping coverage for North American, European, and African business hours.'
  }
];

export function getFAQs(category?: FAQ['category']): FAQ[] {
  if (category) {
    return faqsData.filter(f => f.category === category);
  }
  return faqsData;
}
