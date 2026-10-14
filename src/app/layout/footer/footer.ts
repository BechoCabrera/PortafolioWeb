import { Component, inject } from '@angular/core';

import { navigationItems } from '../../core/constants/navigation.constants';
import { TranslationKey } from '../../core/i18n/translations';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly languageService = inject(LanguageService);

  protected readonly navigationItems = navigationItems;
  protected readonly year = new Date().getFullYear();

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }
}
