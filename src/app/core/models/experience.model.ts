import { TranslationKey } from '../i18n/translations';

export interface Experience {
  readonly company: string;
  readonly roleKey: TranslationKey;
  readonly periodKey: TranslationKey;
  readonly location: string;
  readonly responsibilityKeys: readonly TranslationKey[];
}
