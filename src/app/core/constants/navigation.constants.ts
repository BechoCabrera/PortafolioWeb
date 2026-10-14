import { TranslationKey } from '../i18n/translations';

export interface NavigationItem {
  readonly labelKey: TranslationKey;
  readonly fragment: string;
}

export const navigationItems: readonly NavigationItem[] = [
  { labelKey: 'nav.home', fragment: 'home' },
  { labelKey: 'nav.about', fragment: 'about' },
  { labelKey: 'nav.experience', fragment: 'experience' },
  { labelKey: 'nav.projects', fragment: 'projects' },
  { labelKey: 'nav.services', fragment: 'services' },
  { labelKey: 'nav.contact', fragment: 'contact' },
];
