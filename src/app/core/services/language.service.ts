import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { en } from '../i18n/en';
import { es } from '../i18n/es';
import { TranslationKey } from '../i18n/translations';
import { Language } from '../models/language.model';

const LANGUAGE_STORAGE_KEY = 'mc-language';
const dictionaries = { es, en } as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly selectedLanguage = signal<Language>(
    this.detectInitialLanguage(),
  );

  readonly language = this.selectedLanguage.asReadonly();
  readonly isSpanish = computed(() => this.language() === 'es');

  constructor() {
    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      }
    });
  }

  setLanguage(language: Language): void {
    this.selectedLanguage.set(language);
  }

  translate(key: TranslationKey): string {
    return dictionaries[this.language()][key];
  }

  private detectInitialLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'es';
    }

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}
