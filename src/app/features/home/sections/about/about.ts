import { Component, inject } from '@angular/core';

import { TranslationKey } from '../../../../core/i18n/translations';
import { LanguageService } from '../../../../core/services/language.service';

interface AboutStat {
  readonly valueKey: TranslationKey;
  readonly labelKey: TranslationKey;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly languageService = inject(LanguageService);

  protected readonly stats: readonly AboutStat[] = [
    { valueKey: 'about.yearsValue', labelKey: 'about.yearsLabel' },
    { valueKey: 'about.fullStackValue', labelKey: 'about.fullStackLabel' },
    { valueKey: 'about.backendValue', labelKey: 'about.backendLabel' },
  ];

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  protected hideUnavailableImage(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement) {
      image.hidden = true;
    }
  }
}
