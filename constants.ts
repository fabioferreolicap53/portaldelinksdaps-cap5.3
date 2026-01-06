
import { LinkItem } from './types';

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: '1',
    title: 'Documentação do Projeto',
    url: 'https://docs.internal-project.com/v2/overview',
    icon: 'description',
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    id: '2',
    title: 'Assets do Design System',
    url: 'https://figma.com/file/design-system-2024',
    icon: 'design_services',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: '3',
    title: 'Repositório GitHub',
    url: 'https://github.com/organization/frontend-repo',
    icon: 'code',
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: '4',
    title: 'Dashboard de Produção',
    url: 'https://dashboard.db-provider.com/cluster/prod-01',
    icon: 'dataset',
    colorClass: 'text-green-600 dark:text-green-400',
    bgClass: 'bg-green-100 dark:bg-green-900/30'
  }
];

export const ACCESS_KEYS = {
  admin: '@Daps64125',
  user: 'user123'
};
