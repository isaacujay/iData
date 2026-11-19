import { getServices } from '../content/services';

export type NavIconName = 'Bot' | 'BarChart3' | 'LineChart' | 'Code';

export interface NavChild {
  label: string;
  path: string;
  description?: string;
  iconName?: NavIconName;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  description?: string;
  children?: NavChild[];
  isLowEmphasis?: boolean;
}

const iconNames: NavIconName[] = ['Bot', 'BarChart3', 'LineChart', 'Code'];

export const navigationConfig: {
  primary: NavItem[];
  clientArea: NavItem;
} = {
  primary: [
    {
      id: 'services',
      label: 'Services',
      path: '/services',
      children: getServices().map((service, index) => ({
        label: service.title,
        path: `/services/${service.slug}`,
        description: service.shortDescription,
        iconName: iconNames[index],
      })),
    },
    { id: 'work', label: 'Work', path: '/work' },
    { id: 'reviews', label: 'Reviews', path: '/reviews' },
    { id: 'team', label: 'Team', path: '/team' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ],
  clientArea: {
    id: 'client-area',
    label: 'Client Area',
    path: '/portal',
    children: [
      { label: 'Client Portal', path: '/portal', description: 'Track milestones and deliverables' },
      { label: 'Admin Console', path: '/admin', description: 'IData team workspace', },
    ],
  },
};
