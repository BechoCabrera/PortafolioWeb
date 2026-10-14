import { Service } from '../core/models/service.model';

export const services: readonly Service[] = [
  {
    id: 'web-applications',
    icon: 'panels-top-left',
    titleKey: 'services.web.title',
    descriptionKey: 'services.web.description',
  },
  {
    id: 'api-development',
    icon: 'braces',
    titleKey: 'services.api.title',
    descriptionKey: 'services.api.description',
  },
  {
    id: 'business-systems',
    icon: 'building-2',
    titleKey: 'services.business.title',
    descriptionKey: 'services.business.description',
  },
  {
    id: 'pwa-offline',
    icon: 'cloud-off',
    titleKey: 'services.pwa.title',
    descriptionKey: 'services.pwa.description',
  },
  {
    id: 'database-solutions',
    icon: 'database',
    titleKey: 'services.database.title',
    descriptionKey: 'services.database.description',
  },
  {
    id: 'software-modernization',
    icon: 'refresh-cw',
    titleKey: 'services.modernization.title',
    descriptionKey: 'services.modernization.description',
  },
];
