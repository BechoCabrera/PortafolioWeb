import { TranslationKey } from '../i18n/translations';

export interface Service {
  readonly id: string;
  readonly icon: string;
  readonly titleKey: TranslationKey;
  readonly descriptionKey: TranslationKey;
}
